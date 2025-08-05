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

  // Global attendance storage for all sessions - shared between faculty and students
  const [globalAttendance, setGlobalAttendance] = useState(() => {
    const stored = localStorage.getItem('campus-attendance-sessions');
    return stored ? JSON.parse(stored) : [];
  });

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

  // Save global attendance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('campus-attendance-sessions', JSON.stringify(globalAttendance));
  }, [globalAttendance]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          toast.success('Location verified');
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log('Location access denied by user');
            // Don't show error toast for user-denied permission
            setLocation(null);
          } else {
            console.error('Error getting location:', error);
            toast.error('Location access required for attendance');
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  }, []);

  // Check WiFi connection (simulated campus WiFi detection)
  useEffect(() => {
    const checkWifi = () => {
      // Simulate campus WiFi detection based on connection info
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const isConnected = connection ? 
        (connection.effectiveType === '4g' || connection.effectiveType === 'wifi') && Math.random() > 0.2 : 
        Math.random() > 0.3;
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
            // Update session status to expired
            setGlobalAttendance(prevAttendance => 
              prevAttendance.map(record => 
                record.sessionId === qrSession.id 
                  ? { ...record, status: 'expired' }
                  : record
              )
            );
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

  // Load attendance records for current user
  useEffect(() => {
    const userRecords = globalAttendance.filter(record => 
      record.teacherId === user?.id || record.studentAttendance?.some((att: any) => att.studentId === user?.id)
    );
    setAttendanceRecords(userRecords);
  }, [globalAttendance, user?.id]);

  const generateQRSession = async () => {
    if (!selectedCourse) {
      toast.error('Please select a course first');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    // Allow QR generation without location for testing purposes
    if (!location) {
      toast('Location not available - QR will work without location verification', { 
        icon: '⚠️',
        style: {
          borderColor: '#f59e0b',
          color: '#f59e0b',
        },
      });
    }

    const sessionId = Math.random().toString(36).substring(2, 15);
    const expiresAt = Date.now() + (300 * 1000); // 5 minutes from now

    const sessionData = {
      id: sessionId,
      course: selectedCourse,
      date: selectedDate,
      timestamp: Date.now(),
      location: location || { latitude: 0, longitude: 0, accuracy: 0 }, // Default location if not available
      validFor: 300, // 5 minutes
      teacher: user?.name,
      teacherId: user?.id,
      expiresAt: expiresAt
    };

    try {
      // Generate actual QR code with session data
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

      // Add to global attendance records
      const newRecord = {
        id: Date.now(),
        sessionId: sessionId,
        course: selectedCourse,
        date: selectedDate,
        teacher: user?.name,
        teacherId: user?.id,
        studentAttendance: [], // Will be populated when students scan
        status: 'active',
        createdAt: new Date().toLocaleString(),
        expiresAt: expiresAt,
        location: location || { latitude: 0, longitude: 0, accuracy: 0 },
        qrData: qrData // Store the QR data for validation
      };
      
      setGlobalAttendance(prev => [newRecord, ...prev]);

    } catch (error) {
      console.error('QR Generation Error:', error);
      toast.error('Failed to generate QR code');
    }
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

  // Function to validate and mark attendance from QR scan
  const validateQRAttendance = (scannedData: string, studentLocation: any) => {
    try {
      const qrSessionData = JSON.parse(scannedData);
      
      // Find the active session
      const activeSession = globalAttendance.find(session => 
        session.sessionId === qrSessionData.id && 
        session.status === 'active' &&
        Date.now() < session.expiresAt
      );

      if (!activeSession) {
        return { success: false, message: 'QR code is invalid or expired' };
      }

      // Check if student already marked attendance for this session
      const alreadyMarked = activeSession.studentAttendance.some(
        (att: any) => att.studentId === user?.id
      );

      if (alreadyMarked) {
        return { success: false, message: 'Attendance already marked for this session' };
      }

      // Validate location (within 100 meters of session location)
      if (studentLocation && activeSession.location) {
        const distance = calculateDistance(
          studentLocation.latitude,
          studentLocation.longitude,
          activeSession.location.latitude,
          activeSession.location.longitude
        );

        if (distance > 100) { // 100 meters tolerance
          return { success: false, message: 'You are too far from the class location' };
        }
      }

      // Mark attendance
      const attendanceEntry = {
        studentId: user?.id,
        studentName: user?.name,
        studentRollNo: user?.studentId,
        timestamp: new Date().toLocaleString(),
        location: studentLocation,
        method: 'QR Code',
        status: 'present'
      };

      // Update the session with new attendance
      setGlobalAttendance(prev => prev.map(session => 
        session.sessionId === qrSessionData.id
          ? { ...session, studentAttendance: [...session.studentAttendance, attendanceEntry] }
          : session
      ));

      return { 
        success: true, 
        message: `Attendance marked for ${activeSession.course}`,
        course: activeSession.course,
        teacher: activeSession.teacher
      };

    } catch (error) {
      return { success: false, message: 'Invalid QR code format' };
    }
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
    
    // Create attendance record for manual attendance
    const presentStudents = students.filter(s => s.status === 'present');
    const absentStudents = students.filter(s => s.status === 'absent');
    const lateStudents = students.filter(s => s.status === 'late');

    const newRecord = {
      id: Date.now(),
      sessionId: `manual-${Date.now()}`,
      course: selectedCourse,
      date: selectedDate,
      teacher: user?.name,
      teacherId: user?.id,
      present: presentStudents.length,
      absent: absentStudents.length,
      late: lateStudents.length,
      rate: ((presentStudents.length + lateStudents.length) / students.length * 100).toFixed(1),
      method: 'Manual',
      createdAt: new Date().toLocaleString(),
      status: 'completed',
      studentAttendance: students.map(s => ({
        studentId: s.id,
        studentName: s.name,
        studentRollNo: s.rollNo,
        status: s.status,
        timestamp: new Date().toLocaleString(),
        method: 'Manual'
      }))
    };

    setGlobalAttendance(prev => [newRecord, ...prev]);
    toast.success('Attendance saved successfully!');
  };

  // Simulate QR code scanning for students
  const simulateQRScan = () => {
    if (!location) {
      toast.error('Location access required for attendance');
      return;
    }

    if (!isOnCampusWifi) {
      toast.error('Please connect to campus WiFi to mark attendance');
      return;
    }

    // Find an active session to simulate scanning
    const activeSessions = globalAttendance.filter(session => 
      session.status === 'active' && Date.now() < session.expiresAt
    );

    if (activeSessions.length === 0) {
      toast.error('No active QR sessions available');
      return;
    }

    // Use the first active session for simulation
    const sessionToScan = activeSessions[0];
    const result = validateQRAttendance(sessionToScan.qrData, location);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
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
      case 'expired':
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
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
                  {user?.role === 'faculty' ? 'Create Attendance Session' : 'Active QR Sessions'}
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
                    <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <Scan className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                          Scan QR code to mark attendance
                        </p>
                        <button
                          onClick={simulateQRScan}
                          disabled={!location || !isOnCampusWifi}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Simulate QR Scan
                        </button>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Make sure you're connected to campus WiFi and location is enabled
                        </p>
                      </div>
                    </div>
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
                          {user?.role === 'faculty' ? 'Generate session to display QR' : 'No active QR session'}
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
                {user?.role === 'faculty' ? 'My Attendance Sessions' : 'My Attendance Records'}
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
                            {user?.role === 'faculty' ? `Created: ${record.createdAt}` : `Teacher: ${record.teacher}`}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(record.status || 'completed')}`}>
                          {record.status || 'Completed'}
                        </span>
                      </div>
                      
                      {user?.role === 'faculty' && record.studentAttendance && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            Students Present: {record.studentAttendance.length}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {record.studentAttendance.slice(0, 5).map((student: any, idx: number) => (
                              <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded">
                                {student.studentName}
                              </span>
                            ))}
                            {record.studentAttendance.length > 5 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                                +{record.studentAttendance.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {user?.role === 'student' && record.studentAttendance && (
                        <div className="mt-3">
                          {record.studentAttendance.find((att: any) => att.studentId === user?.id) ? (
                            <div className="flex items-center text-green-600 dark:text-green-400">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span className="text-sm">Present - {record.studentAttendance.find((att: any) => att.studentId === user?.id)?.timestamp}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600 dark:text-red-400">
                              <XCircle className="h-4 w-4 mr-2" />
                              <span className="text-sm">Absent</span>
                            </div>
                          )}
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
                    {user?.role === 'faculty' 
                      ? 'Create a QR session or take manual attendance to see records here'
                      : 'Your attendance records will appear here'
                    }
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