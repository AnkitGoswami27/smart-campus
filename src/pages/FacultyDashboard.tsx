import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileText,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  UserCheck,
  Plus,
  Download,
  Edit,
  Send,
  Award,
  Target,
  Bell,
  Upload,
  X,
  Eye,
  ExternalLink
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useLocalStorage('faculty-data', {
    name: 'Dr. Sarah Johnson',
    facultyId: 'FAC001',
    department: 'Computer Science',
    designation: 'Associate Professor',
    totalStudents: 156,
    activeCourses: 3,
    pendingGrading: 24,
    upcomingClasses: 5
  });

  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [announcementPdf, setAnnouncementPdf] = useState<File | null>(null);
  
  const [studentMessages, setStudentMessages] = useLocalStorage('faculty-student-messages', [
    { id: 1, from: 'John Doe', subject: 'Question about Assignment 2', time: '30 min ago', unread: true },
    { id: 2, from: 'Jane Smith', subject: 'Request for Extension', time: '2 hours ago', unread: true },
    { id: 3, from: 'Mike Johnson', subject: 'Database Project Help', time: '4 hours ago', unread: false }
  ]);

  const [announcements, setAnnouncements] = useLocalStorage('faculty-announcements', []);

  const coursePerformanceData = [
    { course: 'CS101', average: 78 },
    { course: 'CS201', average: 82 },
    { course: 'CS301', average: 85 }
  ];

  const attendanceData = [
    { date: 'Mon', CS101: 85, CS201: 92, CS301: 88 },
    { date: 'Tue', CS101: 88, CS201: 89, CS301: 91 },
    { date: 'Wed', CS101: 92, CS201: 95, CS301: 87 },
    { date: 'Thu', CS101: 87, CS201: 88, CS301: 93 },
    { date: 'Fri', CS101: 90, CS201: 94, CS301: 89 }
  ];

  const courses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      students: 45,
      schedule: 'Mon, Wed, Fri 9:00 AM',
      nextClass: '2024-03-15 09:00',
      attendanceRate: 88
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures',
      students: 38,
      schedule: 'Tue, Thu 2:00 PM',
      nextClass: '2024-03-16 14:00',
      attendanceRate: 92
    },
    {
      id: 3,
      code: 'CS301',
      name: 'Database Systems',
      students: 42,
      schedule: 'Mon, Wed 11:00 AM',
      nextClass: '2024-03-15 11:00',
      attendanceRate: 85
    }
  ];

  const [pendingTasks, setPendingTasks] = useLocalStorage('faculty-pending-tasks', [
    { id: 1, task: 'Grade CS101 Assignment 3', dueDate: '2024-03-16', priority: 'high' },
    { id: 2, task: 'Review CS201 Project Proposals', dueDate: '2024-03-18', priority: 'medium' },
    { id: 3, task: 'Prepare CS301 Midterm Exam', dueDate: '2024-03-20', priority: 'high' },
    { id: 4, task: 'Update Course Materials', dueDate: '2024-03-22', priority: 'low' }
  ]);

  const [gradingAssignments] = useState([
    { id: 1, course: 'CS101', title: 'Assignment 3: Algorithms', submissions: 24, pending: 24 },
    { id: 2, course: 'CS201', title: 'Project Proposal', submissions: 18, pending: 12 },
    { id: 3, course: 'CS301', title: 'Database Design', submissions: 22, pending: 8 }
  ]);

  const [studentProgress] = useState([
    { id: 1, name: 'John Doe', studentId: 'ST001', gpa: 3.8, attendance: 95, courses: 4 },
    { id: 2, name: 'Jane Smith', studentId: 'ST002', gpa: 3.6, attendance: 88, courses: 4 },
    { id: 3, name: 'Mike Johnson', studentId: 'ST003', gpa: 3.9, attendance: 92, courses: 3 },
    { id: 4, name: 'Sarah Wilson', studentId: 'ST004', gpa: 3.7, attendance: 90, courses: 4 },
    { id: 5, name: 'David Brown', studentId: 'ST005', gpa: 3.5, attendance: 85, courses: 3 },
    { id: 6, name: 'Emily Davis', studentId: 'ST006', gpa: 3.9, attendance: 97, courses: 4 }
  ]);

  // Mock student submissions data
  const [studentSubmissions] = useState([
    {
      id: 1,
      studentName: 'Alice Johnson',
      studentId: 'CS2024001',
      submittedAt: '2024-01-14 14:30',
      status: 'submitted',
      fileName: 'assignment_alice_johnson.pdf',
      fileSize: '2.4 MB',
      grade: null
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      studentId: 'CS2024002',
      submittedAt: '2024-01-14 16:45',
      status: 'graded',
      grade: 85,
      fileName: 'assignment_bob_smith.pdf',
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      studentName: 'Carol Davis',
      studentId: 'CS2024003',
      submittedAt: '2024-01-15 09:15',
      status: 'late',
      fileName: 'assignment_carol_davis.pdf',
      fileSize: '3.1 MB',
      grade: null
    },
    {
      id: 4,
      studentName: 'David Wilson',
      studentId: 'CS2024004',
      submittedAt: '2024-01-13 22:30',
      status: 'graded',
      grade: 92,
      fileName: 'assignment_david_wilson.pdf',
      fileSize: '2.1 MB'
    },
    {
      id: 5,
      studentName: 'Emma Brown',
      studentId: 'CS2024005',
      submittedAt: '2024-01-14 11:20',
      status: 'submitted',
      fileName: 'assignment_emma_brown.pdf',
      fileSize: '1.9 MB',
      grade: null
    }
  ]);

  const handleTakeAttendance = () => {
    navigate('/attendance');
    toast.success('Opening attendance system');
  };

  const createAnnouncement = (announcementData: any) => {
    const newAnnouncement = {
      id: Date.now(),
      title: announcementData.title,
      content: announcementData.content,
      priority: announcementData.priority,
      pdfFile: announcementPdf?.name || null,
      timestamp: new Date().toLocaleString(),
      author: facultyData.name
    };

    // Add to faculty announcements
    setAnnouncements(prev => [newAnnouncement, ...prev]);

    // Add to student announcements (simulate real-time)
    const studentAnnouncements = JSON.parse(localStorage.getItem('student-announcements') || '[]');
    const studentAnnouncement = {
      id: newAnnouncement.id,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      time: 'Just now',
      priority: newAnnouncement.priority,
      hasAttachment: !!newAnnouncement.pdfFile
    };
    localStorage.setItem('student-announcements', JSON.stringify([studentAnnouncement, ...studentAnnouncements]));

    setShowAnnouncementModal(false);
    setAnnouncementPdf(null);
    toast.success('Announcement sent to all students!');
  };

  const startGrading = (assignment: any) => {
    // Navigate to grading interface
    navigate('/grading', { state: { assignment } });
    toast.success(`Opening grading interface for ${assignment.title}`);
  };

  const viewSubmissions = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowSubmissionsModal(true);
    toast.success(`Loading submissions for ${assignment.title}`);
  };

  const viewStudentProgress = () => {
    setShowStudentModal(true);
    toast.success('Loading student progress data');
  };

  const generateReport = () => {
    setShowReportModal(true);
    toast.success('Generating course report...');
  };

  const uploadMaterials = () => {
    setShowUploadModal(true);
  };

  const handleFileUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    toast.success(`Uploading ${selectedFiles.length} file(s)...`);
    
    setTimeout(() => {
      toast.success('Course materials uploaded successfully!');
      setShowUploadModal(false);
      setSelectedFiles([]);
    }, 2000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnnouncementPdfSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setAnnouncementPdf(file);
    } else {
      toast.error('Please select a PDF file');
    }
  };

  const addNewTask = (taskData: any) => {
    const newTask = {
      id: Date.now(),
      task: taskData.task,
      dueDate: taskData.dueDate,
      priority: taskData.priority
    };
    
    setPendingTasks(prev => [newTask, ...prev]);
    setShowAddTaskModal(false);
    toast.success('Task added successfully!');
  };

  const completeTask = (taskId: number) => {
    setPendingTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success('Task completed!');
  };

  const markMessageAsRead = (messageId: number) => {
    setStudentMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, unread: false } : msg
    ));
  };

  const replyToMessage = (messageId: number) => {
    markMessageAsRead(messageId);
    navigate('/messages');
    toast.success('Opening message to reply');
  };

  const downloadSubmission = (submission: any) => {
    toast.success(`Downloading ${submission.fileName}...`);
    setTimeout(() => {
      toast.success(`${submission.fileName} downloaded successfully!`);
    }, 1000);
  };

  const viewPDF = (submission: any) => {
    // Create a mock PDF URL for demonstration
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${submission.fileName}</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f5f5f5; }
              .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .pdf-viewer { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); min-height: 80vh; }
              .mock-content { max-width: 800px; margin: 0 auto; line-height: 1.6; }
              h1, h2, h3 { color: #333; }
              .student-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 30px; }
              .section { margin-bottom: 30px; }
              .code-block { background: #f5f5f5; padding: 15px; border-radius: 4px; font-family: monospace; margin: 10px 0; }
              .highlight { background: #fff3cd; padding: 2px 4px; border-radius: 3px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📄 ${submission.fileName}</h1>
              <div class="student-info">
                <strong>Student:</strong> ${submission.studentName}<br>
                <strong>Student ID:</strong> ${submission.studentId}<br>
                <strong>Submitted:</strong> ${new Date(submission.submittedAt).toLocaleString()}<br>
                <strong>Assignment:</strong> ${selectedAssignment?.title || 'Assignment'}
              </div>
            </div>
            <div class="pdf-viewer">
              <div class="mock-content">
                <h2>Assignment Submission</h2>
                
                <div class="section">
                  <h3>1. Introduction</h3>
                  <p>This document contains the completed assignment submission for ${selectedAssignment?.title || 'the given assignment'}. The work demonstrates understanding of the core concepts and practical application of the learned material.</p>
                </div>

                <div class="section">
                  <h3>2. Problem Analysis</h3>
                  <p>The assignment required analysis of <span class="highlight">algorithm complexity</span> and implementation of efficient solutions. Key considerations included:</p>
                  <ul>
                    <li>Time complexity optimization</li>
                    <li>Space efficiency</li>
                    <li>Code readability and documentation</li>
                    <li>Test case coverage</li>
                  </ul>
                </div>

                <div class="section">
                  <h3>3. Implementation</h3>
                  <p>The solution was implemented using the following approach:</p>
                  
                  <div class="code-block">
function efficientSort(arr) {
    // Implementation of optimized sorting algorithm
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...efficientSort(left), ...middle, ...efficientSort(right)];
}
                  </div>
                </div>

                <div class="section">
                  <h3>4. Testing and Results</h3>
                  <p>Comprehensive testing was performed with various input sizes:</p>
                  <ul>
                    <li><strong>Small datasets (n < 100):</strong> Average performance of O(n log n)</li>
                    <li><strong>Medium datasets (100 ≤ n < 1000):</strong> Consistent O(n log n) performance</li>
                    <li><strong>Large datasets (n ≥ 1000):</strong> Maintained efficiency with minimal memory overhead</li>
                  </ul>
                </div>

                <div class="section">
                  <h3>5. Conclusion</h3>
                  <p>The implemented solution successfully meets all assignment requirements while maintaining optimal performance characteristics. The code is well-documented and follows best practices for maintainability.</p>
                </div>

                <div class="section">
                  <h3>6. References</h3>
                  <ul>
                    <li>Course textbook: "Introduction to Algorithms" by Cormen et al.</li>
                    <li>Lecture notes from ${selectedAssignment?.course || 'course'}</li>
                    <li>Additional research from peer-reviewed sources</li>
                  </ul>
                </div>

                <hr style="margin: 40px 0; border: 1px solid #ddd;">
                <p style="text-align: center; color: #666; font-style: italic;">
                  This is a demonstration of PDF viewing functionality in the faculty dashboard.<br>
                  File: ${submission.fileName} | Size: ${submission.fileSize} | Student: ${submission.studentName}
                </p>
              </div>
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
    
    toast.success(`Opening ${submission.fileName} in new tab`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'graded':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'late':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {facultyData.name}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {facultyData.designation} • {facultyData.department} • {facultyData.facultyId}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button 
              onClick={handleTakeAttendance}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Take Attendance
            </button>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Announce
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowGradeModal(true)}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            <Award className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Grade Work</span>
          </button>
          <button
            onClick={viewStudentProgress}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
          >
            <Users className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Student Progress</span>
          </button>
          <button
            onClick={generateReport}
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
          >
            <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Reports</span>
          </button>
          <button
            onClick={uploadMaterials}
            className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
          >
            <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Upload Materials</span>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{facultyData.totalStudents}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12 this semester</span>
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
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{facultyData.activeCourses}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This semester</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Grading</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{facultyData.pendingGrading}</p>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Action needed</span>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Classes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{facultyData.upcomingClasses}</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">This week</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Performance</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursePerformanceData}>
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
                <Bar dataKey="average" fill="#10B981" radius={[4, 4, 0, 0]} />
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
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-gray-600 dark:text-gray-300" />
                <YAxis className="text-gray-600 dark:text-gray-300" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(31 41 55)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line type="monotone" dataKey="CS101" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="CS201" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="CS301" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Courses, Tasks & Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Courses</h3>
              <button
                onClick={() => navigate('/courses')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Manage All
              </button>
            </div>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{course.code}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{course.name}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{course.students} students</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{course.schedule}</span>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600">{course.attendanceRate}% attendance</span>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Tasks</h3>
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{task.task}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => completeTask(task.id)}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">All tasks completed!</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Great job staying on top of your work
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Student Messages</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/messages')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </button>
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="space-y-4">
              {studentMessages.length > 0 ? (
                studentMessages.map((message) => (
                  <div key={message.id} className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                      <span className="text-white font-medium text-sm">
                        {message.from.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-medium ${message.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                            {message.from}
                            {message.unread && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{message.subject}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                            {message.time}
                          </span>
                          <button
                            onClick={() => replyToMessage(message.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No new messages</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Student messages will appear here
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Modals */}
        {showGradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Grade Assignments</h2>
                <button
                  onClick={() => setShowGradeModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                {gradingAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.course}</p>
                      </div>
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-xs">
                        {assignment.pending} pending
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {assignment.submissions} total submissions • {assignment.pending} pending review
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => startGrading(assignment)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Start Grading
                      </button>
                      <button 
                        onClick={() => viewSubmissions(assignment)}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        View Submissions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* View Submissions Modal */}
        {showSubmissionsModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedAssignment.title} - Submissions
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedAssignment.course}</p>
                </div>
                <button
                  onClick={() => setShowSubmissionsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-4">
                  {studentSubmissions.map((submission) => (
                    <div key={submission.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {submission.studentName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{submission.studentName}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">ID: {submission.studentId}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                                {submission.status}
                              </span>
                              {submission.grade && (
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                  Grade: {submission.grade}/100
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-300">{submission.fileName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {submission.fileSize} • {new Date(submission.submittedAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => viewPDF(submission)}
                              className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              title="View PDF"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => downloadSubmission(submission)}
                              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showAnnouncementModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Announcement</h2>
                <button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                createAnnouncement({
                  title: formData.get('title'),
                  content: formData.get('content'),
                  priority: formData.get('priority')
                });
              }}>
                <div className="space-y-4">
                  <input
                    name="title"
                    type="text"
                    placeholder="Announcement title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    name="content"
                    rows={4}
                    placeholder="Announcement content"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                  <select
                    name="priority"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Attach PDF (Optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleAnnouncementPdfSelect}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {announcementPdf && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Selected: {announcementPdf.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Send Announcement
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showAddTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Task</h2>
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                addNewTask({
                  task: formData.get('task'),
                  dueDate: formData.get('dueDate'),
                  priority: formData.get('priority')
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Task Description
                    </label>
                    <input
                      name="task"
                      type="text"
                      placeholder="Enter task description"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Due Date
                    </label>
                    <input
                      name="dueDate"
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddTaskModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showStudentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Progress</h2>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studentProgress.map((student) => (
                  <div key={student.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{student.studentId}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">GPA:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.gpa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Attendance:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.attendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Courses:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.courses}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Reports</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-blue-900 dark:text-blue-300">Total Students</h3>
                    <p className="text-2xl font-bold text-blue-600">{facultyData.totalStudents}</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-green-900 dark:text-green-300">Active Courses</h3>
                    <p className="text-2xl font-bold text-green-600">{facultyData.activeCourses}</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-orange-900 dark:text-orange-300">Avg. Attendance</h3>
                    <p className="text-2xl font-bold text-orange-600">88.3%</p>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Course Performance Summary</h3>
                  <div className="space-y-2">
                    {courses.map((course) => (
                      <div key={course.id} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{course.code}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{course.attendanceRate}% attendance</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    toast.success('Report downloaded successfully!');
                    setShowReportModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upload Course Materials</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Drag & drop files here or click to browse</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors"
                  >
                    Choose Files
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">Selected Files:</h3>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFileUpload}
                  disabled={selectedFiles.length === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Upload Files
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FacultyDashboard;