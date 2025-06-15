import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { QrCode, Scan, Users, Calendar, CheckCircle, XCircle, Clock, UserCheck, MapPin, Wifi, Timer, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import QRCode from 'qrcode';

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'take' | 'view' | 'qr'>('qr');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [qrSession, setQrSession] = useState<any>(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [isOnCampusWifi, setIsOnCampusWifi] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', rollNo: 'CS001', status: 'present' },
    { id: 2, name: 'Jane Smith', rollNo: 'CS002', status: 'absent' },
    { id: 3, name: 'Mike Johnson', rollNo: 'CS003', status: 'present' },
    { id: 4, name: 'Sarah Wilson', rollNo: 'CS004', status: 'present' },
    { id: 5, name: 'David Brown', rollNo: 'CS005', status: 'late' }
  ]);

  const courses = [
    { id: 1, code: 'CS101', name: 'Introduction to Programming', students: 45 },
    { id: 2, code: 'CS201', name: 'Data Structures', students: 38 },
    { id: 3, code: 'CS301', name: 'Database Systems', students: 42 }
  ];

  const attendanceHistory = [
    { date: '2024-03-14', course: 'CS101', present: 42, absent: 3, rate: 93.3 },
    { date: '2024-03-13', course: 'CS201', present: 35, absent: 3, rate: 92.1 },
    { date: '2024-03-12', course: 'CS301', present: 38, absent: 4, rate: 90.5 },
    { date: '2024-03-11', course: 'CS101', present: 40, absent: 5, rate: 88.9 }
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          toast.success('Location verified');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Location access required for attendance');
        }
      );
    }
  }, []);

  // Check WiFi connection (simulated campus WiFi detection)
  useEffect(() => {
    const checkWifi = () => {
      // Simulate campus WiFi detection based on connection info
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const isConnected = connection ? connection.effectiveType === '4g' || Math.random() > 0.3 : Math.random() > 0.3;
      setIsOnCampusWifi(isConnected);
      
      if (isConnected) {
        toast.success('Connected to Campus WiFi');
      }
    };
    
    checkWifi();
    const interval = setInterval(checkWifi, 10000);
    return () => clearInterval(interval);
  }, []);

  // Timer for QR session
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (qrSession && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setQrSession(null);
            setQrCodeDataURL('');
            toast.error('QR session expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [qrSession, timeRemaining]);

  const generateQRSession = async () => {
    if (!selectedCourse) {
      toast.error('Please select a course first');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    const sessionData = {
      id: Math.random().toString(36).substring(2, 15),
      course: selectedCourse,
      date: selectedDate,
      timestamp: Date.now(),
      location: location || {
        latitude: 40.7128, // Default coordinates
        longitude: -74.0060
      },
      validFor: 300, // 5 minutes
      teacher: user?.name,
      teacherId: user?.id
    };

    try {
      // Generate actual QR code
      const qrData = JSON.stringify(sessionData);
      const qrCodeURL = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      setQrSession(sessionData);
      setQrCodeDataURL(qrCodeURL);
      setTimeRemaining(300);
      toast.success('QR session created! Valid for 5 minutes');

      // Add to attendance records
      const newRecord = {
        id: Date.now(),
        course: selectedCourse,
        date: selectedDate,
        teacher: user?.name,
        sessionId: sessionData.id,
        studentsPresent: [],
        status: 'active',
        createdAt: new Date().toLocaleString()
      };
      setAttendanceRecords(prev => [newRecord, ...prev]);

    } catch (error) {
      toast.error('Failed to generate QR code');
    }
  };

  const scanQRCode = () => {
    if (!qrSession) {
      toast.error('No active QR session');
      return;
    }

    // Check location (within 100m)
    if (location && qrSession.location) {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        qrSession.location.latitude,
        qrSession.location.longitude
      );

      if (distance > 100) {
        toast.error('You must be within 100m of the classroom');
        return;
      }
    } else {
      toast.error('Location verification required');
      return;
    }

    // Check WiFi
    if (!isOnCampusWifi) {
      toast.error('You must be connected to campus WiFi');
      return;
    }

    // Check time window
    if (timeRemaining <= 0) {
      toast.error('QR session has expired');
      return;
    }

    // Mark attendance
    toast.success('Attendance marked successfully!');
    
    // Update attendance record
    setAttendanceRecords(prev => prev.map(record => {
      if (record.sessionId === qrSession.id) {
        return {
          ...record,
          studentsPresent: [...record.studentsPresent, {
            studentId: user?.id,
            studentName: user?.name,
            timestamp: new Date().toLocaleString(),
            method: 'QR Scan'
          }]
        };
      }
      return record;
    }));
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const markAttendance = (studentId: number, status: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
    toast.success(`Attendance marked as ${status}`);
  };

  const saveAttendance = () => {
    if (!selectedCourse) {
      toast.error('Please select a course first');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    
    // Create attendance record
    const presentStudents = students.filter(s => s.status === 'present');
    const absentStudents = students.filter(s => s.status === 'absent');
    const lateStudents = students.filter(s => s.status === 'late');

    const newRecord = {
      id: Date.now(),
      course: selectedCourse,
      date: selectedDate,
      teacher: user?.name,
      present: presentStudents.length,
      absent: absentStudents.length,
      late: lateStudents.length,
      rate: ((presentStudents.length + lateStudents.length) / students.length * 100).toFixed(1),
      method: 'Manual',
      createdAt: new Date().toLocaleString(),
      students: students.map(s => ({
        ...s,
        timestamp: new Date().toLocaleString()
      }))
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    toast.success('Attendance saved successfully!');
  };

  const downloadQRCode = () => {
    if (!qrCodeDataURL) return;
    
    const link = document.createElement('a');
    link.download = `attendance-qr-${selectedCourse}-${selectedDate}.png`;
    link.href = qrCodeDataURL;
    link.click();
    toast.success('QR Code downloaded');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'late':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'absent':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'late':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Smart Attendance</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              QR-based attendance with location and WiFi verification
            </p>
          </div>
          
          {/* Status Indicators */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
              location ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <MapPin className="h-4 w-4 mr-1" />
              {location ? 'Location OK' : 'No Location'}
            </div>
            <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
              isOnCampusWifi ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <Wifi className="h-4 w-4 mr-1" />
              {isOnCampusWifi ? 'Campus WiFi' : 'Not Connected'}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'qr', name: 'QR Attendance', icon: QrCode },
              { id: 'take', name: 'Manual Attendance', icon: Users },
              { id: 'view', name: 'Attendance Records', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* QR Attendance Tab */}
        {activeTab === 'qr' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Session Creation */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {user?.role === 'faculty' ? 'Create Attendance Session' : 'Scan QR Code'}
                </h3>
                
                {user?.role === 'faculty' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Course
                      </label>
                      <select 
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Choose a course...</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.code}>
                            {course.code} - {course.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button
                      onClick={generateQRSession}
                      disabled={!selectedCourse || !selectedDate}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Generate QR Session
                    </button>

                    {qrSession && (
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-700 dark:text-green-300 font-medium">Session Active</span>
                          <div className="flex items-center text-green-600 dark:text-green-400">
                            <Timer className="h-4 w-4 mr-1" />
                            {formatTime(timeRemaining)}
                          </div>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Course: {qrSession.course} | Date: {qrSession.date}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {user?.role === 'student' && (
                  <div className="text-center">
                    <button
                      onClick={scanQRCode}
                      disabled={!qrSession}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      {qrSession ? 'Mark My Attendance' : 'Waiting for QR Session'}
                    </button>
                  </div>
                )}
              </div>

              {/* QR Code Display */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    QR Code
                  </h3>
                  {qrCodeDataURL && (
                    <button
                      onClick={downloadQRCode}
                      className="flex items-center px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-64 h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-white">
                    {qrCodeDataURL ? (
                      <img src={qrCodeDataURL} alt="Attendance QR Code" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center">
                        <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.role === 'faculty' ? 'Generate session to display QR' : 'Waiting for QR code'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Verification Status */}
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Location Verified</span>
                      {location ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Campus WiFi</span>
                      {isOnCampusWifi ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Valid Time Window</span>
                      {qrSession && timeRemaining > 0 ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Manual Attendance Tab */}
        {activeTab === 'take' && user?.role === 'faculty' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Course and Date Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Course & Date</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course
                  </label>
                  <select 
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a course...</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.code}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Student List */}
            {selectedCourse && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Mark Attendance for {selectedCourse} - {selectedDate}
                </h3>
                <div className="space-y-3">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{student.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{student.rollNo}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => markAttendance(student.id, 'present')}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              student.status === 'present'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-green-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-green-900/20'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => markAttendance(student.id, 'absent')}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              student.status === 'absent'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-red-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-900/20'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            onClick={() => markAttendance(student.id, 'late')}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              student.status === 'late'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-yellow-900/20'
                            }`}
                          >
                            Late
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getStatusIcon(student.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={saveAttendance}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Save Attendance
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Attendance Records Tab */}
        {activeTab === 'view' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Real-time Attendance Records */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Real-time Attendance Records
              </h3>
              
              {attendanceRecords.length > 0 ? (
                <div className="space-y-4">
                  {attendanceRecords.map((record) => (
                    <div key={record.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {record.course} - {record.date}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Teacher: {record.teacher} | Created: {record.createdAt}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(record.status || 'completed')}`}>
                          {record.status || 'Completed'}
                        </span>
                      </div>
                      
                      {record.present !== undefined && (
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-green-600 dark:text-green-400">
                            Present: {record.present}
                          </div>
                          <div className="text-red-600 dark:text-red-400">
                            Absent: {record.absent}
                          </div>
                          <div className="text-blue-600 dark:text-blue-400">
                            Rate: {record.rate}%
                          </div>
                        </div>
                      )}
                      
                      {record.studentsPresent && record.studentsPresent.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Students Present: {record.studentsPresent.length}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {record.studentsPresent.map((student: any, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded">
                                {student.studentName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No attendance records yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Create a QR session or take manual attendance to see records here
                  </p>
                </div>
              )}
            </div>

            {/* Historical Records */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Historical Records</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Present
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Absent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {attendanceHistory.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {record.course}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                          {record.present}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                          {record.absent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                            record.rate >= 90 
                              ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                              : record.rate >= 80
                              ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                              : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                          }`}>
                            {record.rate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Attendance;