import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Award,
  TrendingUp,
  Bell,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Download,
  MessageSquare,
  Star,
  Target,
  Activity,
  X,
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  QrCode,
  Scan,
  Wifi,
  Navigation
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [studentData, setStudentData] = useState({
    name: user?.name || 'John Doe',
    studentId: user?.studentId || 'ST2024001',
    semester: '6th Semester',
    department: user?.department || 'Computer Science',
    gpa: 3.85,
    attendanceRate: 92.5,
    completedCredits: 140,
    totalCredits: 160,
    email: user?.email || 'john.doe@campus.edu',
    phone: '+1 (555) 123-4567',
    address: '123 Campus Drive, University City, UC 12345',
    enrollmentDate: '2022-08-15',
    expectedGraduation: '2026-05-15'
  });

  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [showQRScanModal, setShowQRScanModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [isOnCampusWifi, setIsOnCampusWifi] = useState(false);

  const performanceData = [
    { month: 'Jan', gpa: 3.2 },
    { month: 'Feb', gpa: 3.4 },
    { month: 'Mar', gpa: 3.6 },
    { month: 'Apr', gpa: 3.7 },
    { month: 'May', gpa: 3.8 },
    { month: 'Jun', gpa: 3.85 }
  ];

  const attendanceData = [
    { subject: 'Overall', attendance: 92.5, fill: '#3B82F6' }
  ];

  const gradeData = [
    { course: 'CS401', grade: 95 },
    { course: 'CS402', grade: 88 },
    { course: 'CS403', grade: 92 },
    { course: 'CS404', grade: 90 }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Data Structures Quiz', date: '2024-03-15', time: '10:00 AM', type: 'quiz' },
    { id: 2, title: 'Web Development Project Due', date: '2024-03-18', time: '11:59 PM', type: 'assignment' },
    { id: 3, title: 'Database Systems Midterm', date: '2024-03-22', time: '2:00 PM', type: 'exam' },
    { id: 4, title: 'Career Fair', date: '2024-03-25', time: '9:00 AM', type: 'event' }
  ];

  const currentCourses = [
    { id: 1, name: 'Advanced Algorithms', code: 'CS401', instructor: 'Dr. Smith', credits: 3, grade: 'A-' },
    { id: 2, name: 'Database Systems', code: 'CS402', instructor: 'Prof. Johnson', credits: 3, grade: 'B+' },
    { id: 3, name: 'Web Development', code: 'CS403', instructor: 'Dr. Brown', credits: 4, grade: 'A' },
    { id: 4, name: 'Software Engineering', code: 'CS404', instructor: 'Prof. Davis', credits: 3, grade: 'A-' }
  ];

  const recentAnnouncements = [
    { 
      id: 1, 
      title: 'Spring Break Schedule', 
      content: 'Campus will be closed from March 20-27', 
      time: '2 hours ago',
      type: 'announcement'
    },
    { 
      id: 2, 
      title: 'New Message from Dr. Smith', 
      content: 'Assignment deadline extended to next Friday', 
      time: '1 day ago',
      type: 'message'
    },
    { 
      id: 3, 
      title: 'Library Extended Hours', 
      content: 'Open 24/7 during finals week', 
      time: '1 day ago',
      type: 'announcement'
    },
    { 
      id: 4, 
      title: 'Message from Prof. Johnson', 
      content: 'Please review the updated syllabus for Database Systems', 
      time: '2 days ago',
      type: 'message'
    },
    { 
      id: 5, 
      title: 'Registration Opens', 
      content: 'Fall 2024 course registration begins April 1', 
      time: '2 days ago',
      type: 'announcement'
    }
  ];

  const assignments = [
    { id: 1, title: 'Algorithm Analysis Report', course: 'CS401', dueDate: '2024-03-20', status: 'pending' },
    { id: 2, title: 'Database Design Project', course: 'CS402', dueDate: '2024-03-18', status: 'submitted' },
    { id: 3, title: 'React Application', course: 'CS403', dueDate: '2024-03-25', status: 'in-progress' }
  ];

  // Comprehensive transcript data
  const transcriptData = {
    personalInfo: {
      name: studentData.name,
      studentId: studentData.studentId,
      department: studentData.department,
      program: 'Bachelor of Science in Computer Science',
      enrollmentDate: studentData.enrollmentDate,
      expectedGraduation: studentData.expectedGraduation,
      currentGPA: studentData.gpa,
      totalCredits: studentData.completedCredits,
      requiredCredits: studentData.totalCredits
    },
    semesters: [
      {
        term: 'Fall 2022',
        courses: [
          { code: 'CS101', name: 'Introduction to Programming', credits: 3, grade: 'A', points: 4.0 },
          { code: 'MATH101', name: 'Calculus I', credits: 4, grade: 'B+', points: 3.3 },
          { code: 'ENG101', name: 'English Composition', credits: 3, grade: 'A-', points: 3.7 },
          { code: 'PHYS101', name: 'Physics I', credits: 4, grade: 'B', points: 3.0 }
        ],
        gpa: 3.43,
        credits: 14
      },
      {
        term: 'Spring 2023',
        courses: [
          { code: 'CS102', name: 'Object-Oriented Programming', credits: 3, grade: 'A', points: 4.0 },
          { code: 'MATH102', name: 'Calculus II', credits: 4, grade: 'A-', points: 3.7 },
          { code: 'CS201', name: 'Data Structures', credits: 3, grade: 'A', points: 4.0 },
          { code: 'HIST101', name: 'World History', credits: 3, grade: 'B+', points: 3.3 }
        ],
        gpa: 3.75,
        credits: 13
      },
      {
        term: 'Fall 2023',
        courses: [
          { code: 'CS301', name: 'Database Systems', credits: 3, grade: 'B+', points: 3.3 },
          { code: 'CS302', name: 'Computer Networks', credits: 3, grade: 'A-', points: 3.7 },
          { code: 'MATH201', name: 'Discrete Mathematics', credits: 3, grade: 'A', points: 4.0 },
          { code: 'ECON101', name: 'Microeconomics', credits: 3, grade: 'B', points: 3.0 }
        ],
        gpa: 3.5,
        credits: 12
      },
      {
        term: 'Spring 2024',
        courses: [
          { code: 'CS401', name: 'Advanced Algorithms', credits: 3, grade: 'A-', points: 3.7 },
          { code: 'CS402', name: 'Database Systems', credits: 3, grade: 'B+', points: 3.3 },
          { code: 'CS403', name: 'Web Development', credits: 4, grade: 'A', points: 4.0 },
          { code: 'CS404', name: 'Software Engineering', credits: 3, grade: 'A-', points: 3.7 }
        ],
        gpa: 3.68,
        credits: 13
      }
    ]
  };

  // Check location and WiFi status
  React.useEffect(() => {
    // Get user location
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
          // Handle geolocation errors gracefully
          if (error.code === error.PERMISSION_DENIED) {
            console.log('Location access denied by user');
            // Set location to null but don't show error to user
            setLocation(null);
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            console.log('Location information unavailable');
            setLocation(null);
          } else if (error.code === error.TIMEOUT) {
            console.log('Location request timed out');
            setLocation(null);
          } else {
            console.log('An unknown error occurred while retrieving location');
            setLocation(null);
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }

    // Simulate campus WiFi detection
    const checkWifi = () => {
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

  const viewGrades = () => {
    setShowGradeModal(true);
    toast.success('Opening grade details');
  };

  const viewSchedule = () => {
    setShowScheduleModal(true);
    toast.success('Opening class schedule');
  };

  const viewAssignments = () => {
    setShowAssignmentModal(true);
    toast.success('Opening assignments');
  };

  const downloadTranscript = () => {
    setShowTranscriptModal(true);
    toast.success('Opening official transcript');
  };

  const generateTranscriptPDF = () => {
    // Generate comprehensive transcript content
    const transcriptContent = `
OFFICIAL ACADEMIC TRANSCRIPT
Smart Campus Management System
Generated on: ${new Date().toLocaleString()}

========================================
STUDENT INFORMATION
========================================
Name: ${transcriptData.personalInfo.name}
Student ID: ${transcriptData.personalInfo.studentId}
Program: ${transcriptData.personalInfo.program}
Department: ${transcriptData.personalInfo.department}
Enrollment Date: ${new Date(transcriptData.personalInfo.enrollmentDate).toLocaleDateString()}
Expected Graduation: ${new Date(transcriptData.personalInfo.expectedGraduation).toLocaleDateString()}

========================================
ACADEMIC SUMMARY
========================================
Current GPA: ${transcriptData.personalInfo.currentGPA}
Total Credits Completed: ${transcriptData.personalInfo.totalCredits}
Credits Required for Graduation: ${transcriptData.personalInfo.requiredCredits}
Academic Standing: Good Standing

========================================
SEMESTER-BY-SEMESTER RECORD
========================================

${transcriptData.semesters.map(semester => `
${semester.term.toUpperCase()}
Credits: ${semester.credits} | GPA: ${semester.gpa}
${'─'.repeat(50)}
${semester.courses.map(course => 
  `${course.code.padEnd(8)} ${course.name.padEnd(30)} ${course.credits} ${course.grade.padEnd(3)} ${course.points.toFixed(1)}`
).join('\n')}

`).join('')}

========================================
GRADE POINT AVERAGE CALCULATION
========================================
${transcriptData.semesters.map(semester => 
  `${semester.term}: ${semester.gpa} GPA (${semester.credits} credits)`
).join('\n')}

Cumulative GPA: ${transcriptData.personalInfo.currentGPA}
Total Credits: ${transcriptData.personalInfo.totalCredits}

========================================
GRADING SCALE
========================================
A   = 4.0    A-  = 3.7    B+  = 3.3
B   = 3.0    B-  = 2.7    C+  = 2.3
C   = 2.0    C-  = 1.7    D+  = 1.3
D   = 1.0    F   = 0.0

========================================
CERTIFICATION
========================================
This is to certify that the above is a true and complete record of the academic work completed by the above-named student at Smart Campus Management System.

Issued: ${new Date().toLocaleDateString()}
Registrar's Office
Smart Campus Management System

*** OFFICIAL TRANSCRIPT ***
*** NOT VALID WITHOUT OFFICIAL SEAL ***
    `;

    // Create and download the transcript
    const blob = new Blob([transcriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${studentData.studentId}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Official transcript downloaded successfully!');
  };

  const registerForCourse = () => {
    toast.success('Opening course registration...');
    navigate('/courses');
  };

  const payFees = () => {
    toast.success('Redirecting to fee payment portal...');
    setTimeout(() => {
      toast.success('Payment portal opened');
    }, 1000);
  };

  const openMessages = () => {
    // When student opens messages, ensure faculty can see the conversation
    const facultyMessages = JSON.parse(localStorage.getItem('faculty-student-messages') || '[]');
    
    // Add a new message notification for faculty if student is starting a conversation
    const newMessage = {
      id: Date.now(),
      from: studentData.name,
      subject: 'New message from student',
      time: 'Just now',
      unread: true
    };

    // Check if there's already a conversation with this student
    const existingMessage = facultyMessages.find(msg => msg.from === studentData.name);
    
    if (!existingMessage) {
      // Add new conversation to faculty messages
      const updatedFacultyMessages = [newMessage, ...facultyMessages];
      localStorage.setItem('faculty-student-messages', JSON.stringify(updatedFacultyMessages));
    }

    // Navigate to messages page
    navigate('/messages');
    toast.success('Opening messages - you can now chat with faculty');
  };

  const handleAnnouncementClick = (announcement: any) => {
    if (announcement.type === 'message') {
      // Open messages when clicking on message-type announcements
      openMessages();
    } else {
      // For regular announcements, just show a toast
      toast(`Viewing: ${announcement.title}`);
    }
  };

  const openQRScanner = () => {
    setShowQRScanModal(true);
  };

  const startQRScan = () => {
    if (!location) {
      toast.error('Location access required for attendance');
      return;
    }

    if (!isOnCampusWifi) {
      toast.error('Please connect to campus WiFi to mark attendance');
      return;
    }

    setIsScanning(true);
    toast.success('Starting QR scan...');

    // Simulate QR scanning process
    setTimeout(() => {
      // Simulate successful attendance marking
      const attendanceData = {
        studentId: user?.studentId,
        studentName: user?.name,
        course: 'CS401', // This would come from the QR code
        timestamp: new Date().toLocaleString(),
        location: location,
        method: 'QR Code',
        status: 'present'
      };

      // Store attendance record
      const existingAttendance = JSON.parse(localStorage.getItem('student-attendance') || '[]');
      const newAttendance = [attendanceData, ...existingAttendance];
      localStorage.setItem('student-attendance', JSON.stringify(newAttendance));

      setIsScanning(false);
      setShowQRScanModal(false);
      toast.success('Attendance marked successfully!');
      
      // Update attendance rate
      setStudentData(prev => ({
        ...prev,
        attendanceRate: Math.min(100, prev.attendanceRate + 0.5)
      }));
    }, 3000);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'assignment': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'exam': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'event': return <Calendar className="h-4 w-4 text-purple-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-red-50 text-red-700 border-red-200';
      case 'in-progress': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getGradePoints = (grade: string) => {
    const gradeMap: { [key: string]: number } = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    return gradeMap[grade] || 0.0;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {studentData.name}!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {studentData.studentId} • {studentData.semester} • {studentData.department}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <button
              onClick={openQRScanner}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Scan QR
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current GPA</p>
              <p className="text-2xl font-bold text-green-600">{studentData.gpa}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={viewGrades}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            <Award className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">View Grades</span>
          </button>
          <button
            onClick={viewSchedule}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
          >
            <Calendar className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Class Schedule</span>
          </button>
          <button
            onClick={viewAssignments}
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
          >
            <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Assignments</span>
          </button>
          <button
            onClick={downloadTranscript}
            className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
          >
            <Download className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Transcript</span>
          </button>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentData.gpa}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+0.05</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentData.attendanceRate}%</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">Excellent</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Credits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {studentData.completedCredits}/{studentData.totalCredits}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${(studentData.completedCredits / studentData.totalCredits) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentCourses.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This semester</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Chart & Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Academic Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-300" />
                <YAxis domain={[0, 4]} className="text-gray-600 dark:text-gray-300" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(31 41 55)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="gpa" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Attendance Rate</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={attendanceData}>
                <RadialBar dataKey="attendance" cornerRadius={10} fill="#3B82F6" />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{studentData.attendanceRate}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overall Attendance</p>
            </div>
          </motion.div>
        </div>

        {/* Current Courses & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Courses</h3>
              <button
                onClick={registerForCourse}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Register for More
              </button>
            </div>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{course.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{course.code} • {course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{course.grade}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{course.credits} credits</p>
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="mr-3">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Services</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={payFees}
                className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-center"
              >
                <Target className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Pay Fees</span>
              </button>
              <button
                onClick={openMessages}
                className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-center"
              >
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Messages</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Announcements</h3>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors ${
                    announcement.type === 'message' 
                      ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleAnnouncementClick(announcement)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-medium ${announcement.type === 'message' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                          {announcement.title}
                        </h4>
                        {announcement.type === 'message' && (
                          <MessageSquare className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{announcement.content}</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-4">
                      {announcement.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* QR Scanner Modal */}
        {showQRScanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">QR Attendance Scanner</h2>
                <button
                  onClick={() => setShowQRScanModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="text-center space-y-6">
                {/* Status Indicators */}
                <div className="space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    location ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                  }`}>
                    <div className="flex items-center">
                      <Navigation className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <span className={`text-sm ${location ? 'text-green-600' : 'text-red-600'}`}>
                      {location ? 'Verified' : 'Required'}
                    </span>
                  </div>
                  
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isOnCampusWifi ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                  }`}>
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Campus WiFi</span>
                    </div>
                    <span className={`text-sm ${isOnCampusWifi ? 'text-green-600' : 'text-red-600'}`}>
                      {isOnCampusWifi ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                </div>

                {/* QR Scanner Area */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                  {isScanning ? (
                    <div className="space-y-4">
                      <div className="animate-spin mx-auto">
                        <Scan className="h-16 w-16 text-blue-600" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Scanning QR code...</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please hold the QR code steady
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <QrCode className="h-16 w-16 text-gray-400 mx-auto" />
                      <p className="text-gray-600 dark:text-gray-300">
                        Ready to scan attendance QR code
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Position the QR code within the frame
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={startQRScan}
                    disabled={!location || !isOnCampusWifi || isScanning}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    {isScanning ? 'Scanning...' : 'Start Scanning'}
                  </button>
                  
                  {(!location || !isOnCampusWifi) && (
                    <div className="text-sm text-red-600 dark:text-red-400">
                      {!location && !isOnCampusWifi 
                        ? 'Location access and campus WiFi required'
                        : !location 
                        ? 'Location access required'
                        : 'Campus WiFi connection required'
                      }
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modals */}
        {showGradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Grade Details</h2>
                <button
                  onClick={() => setShowGradeModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="grade" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )}

        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Class Schedule</h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                {currentCourses.map((course) => (
                  <div key={course.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">{course.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {course.code} • {course.instructor} • Mon, Wed, Fri 10:00 AM
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {showAssignmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assignments</h2>
                <button
                  onClick={() => setShowAssignmentModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {assignment.course} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Official Transcript Modal */}
        {showTranscriptModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Official Academic Transcript</h2>
                <button
                  onClick={() => setShowTranscriptModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Student Information Header */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Student Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">Name:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{transcriptData.personalInfo.name}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">Student ID:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{transcriptData.personalInfo.studentId}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">Program:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{transcriptData.personalInfo.program}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Academic Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Current GPA:</span>
                        <span className="ml-2 font-bold text-green-600 text-lg">{transcriptData.personalInfo.currentGPA}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Credits Completed:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{transcriptData.personalInfo.totalCredits}/{transcriptData.personalInfo.requiredCredits}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Expected Graduation:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{new Date(transcriptData.personalInfo.expectedGraduation).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Semester Records */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Academic Record</h3>
                {transcriptData.semesters.map((semester, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{semester.term}</h4>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Semester GPA: <span className="font-semibold">{semester.gpa}</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Credits: <span className="font-semibold">{semester.credits}</span></p>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Course Code</th>
                            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Course Name</th>
                            <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-300">Credits</th>
                            <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-300">Grade</th>
                            <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-300">Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {semester.courses.map((course, courseIndex) => (
                            <tr key={courseIndex} className="border-t border-gray-200 dark:border-gray-700">
                              <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{course.code}</td>
                              <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{course.name}</td>
                              <td className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">{course.credits}</td>
                              <td className="px-4 py-2 text-center">
                                <span className={`font-semibold ${
                                  course.points >= 3.7 ? 'text-green-600' :
                                  course.points >= 3.0 ? 'text-blue-600' :
                                  course.points >= 2.0 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {course.grade}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">{course.points.toFixed(1)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowTranscriptModal(false)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={generateTranscriptPDF}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Official Transcript
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;