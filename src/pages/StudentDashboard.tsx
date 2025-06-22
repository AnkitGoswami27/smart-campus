import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Layout from '../components/Layout';
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  QrCode,
  Scan,
  MapPin,
  Wifi,
  UserCheck,
  X,
  TrendingUp,
  Award,
  Bell,
  Download,
  Users,
  Target,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // QR Scanner states
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success' | 'error'>('idle');
  const [location, setLocation] = useState<any>(null);
  const [isOnCampusWifi, setIsOnCampusWifi] = useState(false);
  const [verificationDetails, setVerificationDetails] = useState({
    location: false,
    wifi: false,
    qrValid: false,
    timeValid: false
  });

  // Get global attendance records
  const [globalAttendance] = useLocalStorage('global-attendance-records', []);
  const [studentAnnouncements] = useLocalStorage('student-announcements', []);

  const [stats, setStats] = useState({
    totalCourses: 4,
    attendanceRate: 88.5,
    pendingAssignments: 3,
    upcomingExams: 2,
    gpa: 3.7,
    completedCredits: 45
  });

  const courses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      instructor: 'Dr. Sarah Johnson',
      schedule: 'Mon, Wed, Fri 9:00 AM',
      attendance: 92,
      nextClass: '2024-03-15 09:00',
      assignments: 2
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures',
      instructor: 'Prof. Michael Brown',
      schedule: 'Tue, Thu 2:00 PM',
      attendance: 85,
      nextClass: '2024-03-16 14:00',
      assignments: 1
    },
    {
      id: 3,
      code: 'CS301',
      name: 'Database Systems',
      instructor: 'Dr. Emily Davis',
      schedule: 'Mon, Wed 11:00 AM',
      attendance: 88,
      nextClass: '2024-03-15 11:00',
      assignments: 3
    },
    {
      id: 4,
      code: 'MATH201',
      name: 'Discrete Mathematics',
      instructor: 'Prof. James Wilson',
      schedule: 'Tue, Thu 10:00 AM',
      attendance: 90,
      nextClass: '2024-03-16 10:00',
      assignments: 1
    }
  ];

  const assignments = [
    { id: 1, title: 'Programming Assignment 3', course: 'CS101', dueDate: '2024-03-18', status: 'pending', priority: 'high' },
    { id: 2, title: 'Database Design Project', course: 'CS301', dueDate: '2024-03-20', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Algorithm Analysis Report', course: 'CS201', dueDate: '2024-03-22', status: 'pending', priority: 'low' },
    { id: 4, title: 'Math Problem Set 5', course: 'MATH201', dueDate: '2024-03-16', status: 'submitted', priority: 'medium' }
  ];

  const gradeData = [
    { course: 'CS101', grade: 85 },
    { course: 'CS201', grade: 92 },
    { course: 'CS301', grade: 78 },
    { course: 'MATH201', grade: 88 }
  ];

  const attendanceData = [
    { name: 'Week 1', attendance: 95 },
    { name: 'Week 2', attendance: 88 },
    { name: 'Week 3', attendance: 92 },
    { name: 'Week 4', attendance: 85 },
    { name: 'Week 5', attendance: 90 }
  ];

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
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  }, []);

  // Check WiFi connection (simulate campus WiFi detection)
  useEffect(() => {
    const checkWifi = () => {
      // Simulate campus WiFi detection
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const isConnected = connection ? 
        (connection.effectiveType === '4g' || connection.effectiveType === 'wifi') && Math.random() > 0.3 : 
        Math.random() > 0.4;
      setIsOnCampusWifi(isConnected);
    };
    
    checkWifi();
    const interval = setInterval(checkWifi, 10000);
    return () => clearInterval(interval);
  }, []);

  // Start camera for QR scanning
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsScanning(true);
      scanForQRCode();
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Camera access denied. Please allow camera access to scan QR codes.');
      setAttendanceStatus('error');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  // Scan for QR code using canvas
  const scanForQRCode = () => {
    const scanInterval = setInterval(() => {
      if (videoRef.current && canvasRef.current && isScanning) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Get image data for QR code detection
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          
          // Simulate QR code detection (in real implementation, use a QR code library like jsQR)
          // For demo purposes, we'll simulate finding a QR code after a few seconds
          if (Math.random() > 0.95) { // 5% chance per scan to simulate finding QR
            const mockQRData = JSON.stringify({
              sessionId: 'session-123',
              course: 'CS101',
              date: new Date().toISOString().split('T')[0],
              timestamp: Date.now(),
              location: { latitude: 40.7128, longitude: -74.0060 },
              teacher: 'Dr. Sarah Johnson',
              expiresAt: Date.now() + (300 * 1000) // 5 minutes from now
            });
            
            handleQRCodeDetected(mockQRData);
            clearInterval(scanInterval);
          }
        }
      }
    }, 100); // Scan every 100ms

    // Auto-stop scanning after 30 seconds if no QR found
    setTimeout(() => {
      if (isScanning) {
        clearInterval(scanInterval);
        setAttendanceStatus('error');
        toast.error('No QR code detected. Please try again.');
      }
    }, 30000);
  };

  // Handle QR code detection
  const handleQRCodeDetected = (qrData: string) => {
    try {
      const sessionData = JSON.parse(qrData);
      setScanResult(qrData);
      setAttendanceStatus('verifying');
      stopCamera();
      
      // Verify attendance step by step
      verifyAttendance(sessionData);
    } catch (error) {
      console.error('Invalid QR code data:', error);
      setAttendanceStatus('error');
      toast.error('Invalid QR code. Please scan a valid attendance QR code.');
    }
  };

  // Verify attendance with multiple checks
  const verifyAttendance = async (sessionData: any) => {
    const checks = { location: false, wifi: false, qrValid: false, timeValid: false };
    
    // Check 1: Time validity
    setTimeout(() => {
      const now = Date.now();
      const isTimeValid = now < sessionData.expiresAt;
      checks.timeValid = isTimeValid;
      setVerificationDetails({ ...checks });
      
      if (!isTimeValid) {
        setAttendanceStatus('error');
        toast.error('QR code has expired. Please ask your instructor for a new one.');
        return;
      }
    }, 500);

    // Check 2: QR code validity
    setTimeout(() => {
      // Check if this session exists in global attendance records
      const sessionExists = globalAttendance.some(record => record.sessionId === sessionData.sessionId);
      checks.qrValid = sessionExists;
      setVerificationDetails({ ...checks });
      
      if (!sessionExists) {
        setAttendanceStatus('error');
        toast.error('Invalid QR code session. Please scan a valid attendance QR code.');
        return;
      }
    }, 1000);

    // Check 3: WiFi verification
    setTimeout(() => {
      checks.wifi = isOnCampusWifi;
      setVerificationDetails({ ...checks });
      
      if (!isOnCampusWifi) {
        setAttendanceStatus('error');
        toast.error('Please connect to campus WiFi to mark attendance.');
        return;
      }
    }, 1500);

    // Check 4: Location verification
    setTimeout(() => {
      if (location && sessionData.location) {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          sessionData.location.latitude,
          sessionData.location.longitude
        );
        
        // Allow attendance if within 100 meters of class location
        const isLocationValid = distance <= 100;
        checks.location = isLocationValid;
        setVerificationDetails({ ...checks });
        
        if (!isLocationValid) {
          setAttendanceStatus('error');
          toast.error('You must be in the classroom area to mark attendance.');
          return;
        }
        
        // All checks passed - mark attendance
        markAttendanceSuccess(sessionData);
      } else {
        setAttendanceStatus('error');
        toast.error('Location access required to mark attendance.');
      }
    }, 2000);
  };

  // Calculate distance between two coordinates
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

  // Mark attendance as successful
  const markAttendanceSuccess = (sessionData: any) => {
    setAttendanceStatus('success');
    
    // Update the global attendance record with student's attendance
    const updatedAttendance = globalAttendance.map(record => {
      if (record.sessionId === sessionData.sessionId) {
        const studentAttendance = record.studentAttendance || [];
        const existingAttendance = studentAttendance.find(att => att.studentId === user?.id);
        
        if (!existingAttendance) {
          studentAttendance.push({
            studentId: user?.id,
            studentName: user?.name,
            studentRollNo: user?.studentId,
            status: 'present',
            timestamp: new Date().toLocaleString(),
            method: 'QR Code',
            location: location,
            verifiedWifi: isOnCampusWifi
          });
        }
        
        return { ...record, studentAttendance };
      }
      return record;
    });
    
    // Save updated attendance
    localStorage.setItem('global-attendance-records', JSON.stringify(updatedAttendance));
    
    toast.success(`Attendance marked for ${sessionData.course}!`);
    
    // Close scanner after 2 seconds
    setTimeout(() => {
      closeQRScanner();
    }, 2000);
  };

  // Open QR scanner
  const openQRScanner = () => {
    if (!location) {
      toast.error('Please enable location access to mark attendance.');
      return;
    }
    
    if (!isOnCampusWifi) {
      toast.error('Please connect to campus WiFi to mark attendance.');
      return;
    }
    
    setShowQRScanner(true);
    setAttendanceStatus('scanning');
    setVerificationDetails({ location: false, wifi: false, qrValid: false, timeValid: false });
    startCamera();
  };

  // Close QR scanner
  const closeQRScanner = () => {
    stopCamera();
    setShowQRScanner(false);
    setAttendanceStatus('idle');
    setScanResult('');
    setVerificationDetails({ location: false, wifi: false, qrValid: false, timeValid: false });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300';
      case 'submitted': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300';
      case 'graded': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Student ID: {user?.studentId} • {user?.department}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            {/* Status Indicators */}
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
            <button
              onClick={openQRScanner}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Scan QR
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">GPA</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.gpa}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+0.2 this semester</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.attendanceRate}%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This semester</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingAssignments}</p>
                <div className="flex items-center mt-2">
                  <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Due this week</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Credits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedCredits}</p>
                <div className="flex items-center mt-2">
                  <Target className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">of 120 total</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Grades</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="course" className="text-gray-600 dark:text-gray-300" />
                <YAxis className="text-gray-600 dark:text-gray-300" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(31 41 55)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="grade" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-gray-600 dark:text-gray-300" />
                <YAxis className="text-gray-600 dark:text-gray-300" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(31 41 55)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="attendance" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Courses, Assignments & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Courses</h3>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{course.code}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{course.name}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{course.attendance}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{course.instructor}</span>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-orange-500 mr-1" />
                      <span className="text-orange-600">{course.assignments} pending</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assignments</h3>
            <div className="space-y-4">
              {assignments.slice(0, 4).map((assignment) => (
                <div key={assignment.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {assignment.course} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(assignment.priority)}`}></span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Announcements</h3>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {studentAnnouncements.length > 0 ? (
                studentAnnouncements.slice(0, 4).map((announcement: any) => (
                  <div key={announcement.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
                      <span className="text-xs text-gray-400">{announcement.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{announcement.content}</p>
                    {announcement.hasAttachment && (
                      <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Attachment
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No announcements yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Faculty announcements will appear here
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* QR Scanner Modal */}
        {showQRScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scan QR Code</h2>
                <button
                  onClick={closeQRScanner}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="text-center">
                {attendanceStatus === 'scanning' && (
                  <div className="space-y-4">
                    <div className="relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-64 bg-gray-100 rounded-lg object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-blue-500"></div>
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-500"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-500"></div>
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-500"></div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Position QR code within the frame</p>
                    <div className="flex items-center justify-center space-x-2">
                      <Scan className="h-4 w-4 text-blue-500 animate-pulse" />
                      <span className="text-sm text-blue-600">Scanning...</span>
                    </div>
                  </div>
                )}

                {attendanceStatus === 'verifying' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                      <UserCheck className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Verifying attendance...</p>
                    <div className="space-y-2">
                      <div className={`flex items-center justify-center space-x-2 ${verificationDetails.timeValid ? 'text-green-600' : 'text-gray-400'}`}>
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Time validity</span>
                        {verificationDetails.timeValid && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div className={`flex items-center justify-center space-x-2 ${verificationDetails.qrValid ? 'text-green-600' : 'text-gray-400'}`}>
                        <QrCode className="w-4 h-4" />
                        <span className="text-sm">QR code validity</span>
                        {verificationDetails.qrValid && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div className={`flex items-center justify-center space-x-2 ${verificationDetails.wifi ? 'text-green-600' : 'text-gray-400'}`}>
                        <Wifi className="w-4 h-4" />
                        <span className="text-sm">Network verification</span>
                        {verificationDetails.wifi && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div className={`flex items-center justify-center space-x-2 ${verificationDetails.location ? 'text-green-600' : 'text-gray-400'}`}>
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Location verification</span>
                        {verificationDetails.location && <CheckCircle className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                )}

                {attendanceStatus === 'success' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-600 font-semibold">Attendance Marked!</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">You have been marked present</p>
                    </div>
                  </div>
                )}

                {attendanceStatus === 'error' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <p className="text-red-600 font-semibold">Verification Failed</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Please check requirements and try again</p>
                    </div>
                    <button
                      onClick={() => {
                        setAttendanceStatus('scanning');
                        startCamera();
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;

// Note: Ensure you have the necessary dependencies installed: