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
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState({
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const [studentMessages, setStudentMessages] = useState([
    { id: 1, from: 'John Doe', subject: 'Question about Assignment 2', time: '30 min ago', unread: true },
    { id: 2, from: 'Jane Smith', subject: 'Request for Extension', time: '2 hours ago', unread: true },
    { id: 3, from: 'Mike Johnson', subject: 'Database Project Help', time: '4 hours ago', unread: false }
  ]);

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

  const [pendingTasks, setPendingTasks] = useState([
    { id: 1, task: 'Grade CS101 Assignment 3', dueDate: '2024-03-16', priority: 'high' },
    { id: 2, task: 'Review CS201 Project Proposals', dueDate: '2024-03-18', priority: 'medium' },
    { id: 3, task: 'Prepare CS301 Midterm Exam', dueDate: '2024-03-20', priority: 'high' },
    { id: 4, task: 'Update Course Materials', dueDate: '2024-03-22', priority: 'low' }
  ]);

  const studentProgress = [
    {
      id: '1',
      name: 'Alice Johnson',
      studentId: 'ST001',
      gpa: '3.8',
      attendance: 95,
      courses: 4
    },
    {
      id: '2',
      name: 'Bob Smith',
      studentId: 'ST002',
      gpa: '3.6',
      attendance: 88,
      courses: 5
    },
    {
      id: '3',
      name: 'Carol Davis',
      studentId: 'ST003',
      gpa: '3.9',
      attendance: 92,
      courses: 4
    },
    {
      id: '4',
      name: 'David Wilson',
      studentId: 'ST004',
      gpa: '3.4',
      attendance: 85,
      courses: 3
    },
    {
      id: '5',
      name: 'Eva Brown',
      studentId: 'ST005',
      gpa: '3.7',
      attendance: 90,
      courses: 4
    },
    {
      id: '6',
      name: 'Frank Miller',
      studentId: 'ST006',
      gpa: '3.5',
      attendance: 87,
      courses: 5
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'CS101 Assignment 3',
      course: 'Introduction to Programming',
      submissions: 24,
      graded: 8,
      dueDate: '2024-03-16'
    },
    {
      id: 2,
      title: 'CS201 Project Proposal',
      course: 'Data Structures',
      submissions: 18,
      graded: 18,
      dueDate: '2024-03-14'
    },
    {
      id: 3,
      title: 'CS301 Database Design',
      course: 'Database Systems',
      submissions: 22,
      graded: 5,
      dueDate: '2024-03-18'
    }
  ];

  const handleTakeAttendance = () => {
    navigate('/attendance');
    toast.success('Opening attendance system');
  };

  const createAnnouncement = () => {
    setShowAnnouncementModal(true);
  };

  const gradeAssignments = () => {
    setShowGradeModal(true);
  };

  const viewStudentProgress = () => {
    setShowStudentModal(true);
  };

  const generateReport = () => {
    setShowReportModal(true);
  };

  const scheduleOfficeHours = () => {
    toast.success('Opening office hours scheduler...');
    setTimeout(() => {
      toast.success('Office hours scheduled successfully!');
    }, 2000);
  };

  const uploadMaterials = () => {
    setShowUploadModal(true);
  };

  const sendMessage = () => {
    toast.success('Opening messaging interface...');
    navigate('/messages');
  };

  const addTask = (taskName: string) => {
    const newTask = {
      id: Date.now(),
      task: taskName,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'medium' as const
    };
    setPendingTasks(prev => [newTask, ...prev]);
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

  const startGrading = (assignmentId: number) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      navigate('/grading', { state: { assignment } });
      toast.success(`Opening grading interface for ${assignment.title}`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleFileUpload = () => {
    if (selectedFiles.length > 0) {
      toast.success(`${selectedFiles.length} file(s) uploaded successfully!`);
      setSelectedFiles([]);
      setShowUploadModal(false);
    }
  };

  const downloadReport = () => {
    toast.success('Generating comprehensive report...');
    setTimeout(() => {
      toast.success('Report downloaded successfully!');
      setShowReportModal(false);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
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
              onClick={createAnnouncement}
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
            onClick={gradeAssignments}
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
                onClick={() => addTask('New Task')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Add Task
              </button>
            </div>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Student Messages</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={sendMessage}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </button>
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="space-y-4">
              {studentMessages.map((message) => (
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
              ))}
            </div>
          </motion.div>
        </div>

        {/* Grade Assignments Modal */}
        {showGradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
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
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.course}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {assignment.graded}/{assignment.submissions} graded
                        </p>
                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(assignment.graded / assignment.submissions) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assignment.graded === assignment.submissions
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                          : 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
                      }`}>
                        {assignment.graded === assignment.submissions ? 'Completed' : 'Pending'}
                      </span>
                      <button
                        onClick={() => startGrading(assignment.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        {assignment.graded === assignment.submissions ? 'Review Grades' : 'Start Grading'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Student Progress Modal */}
        {showStudentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Progress Overview</h2>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentProgress.map((student) => (
                  <div key={student.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-lg">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{student.studentId}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">GPA:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.gpa}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Attendance:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.attendance}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Courses:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.courses}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Reports Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Reports & Analytics</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-purple-900 dark:text-purple-300">Avg. Performance</h3>
                    <p className="text-2xl font-bold text-purple-600">81.7%</p>
                  </div>
                </div>

                {/* Course Performance Details */}
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Course Performance Summary</h3>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{course.code}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{course.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{course.attendanceRate}% attendance</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{course.students} students</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={downloadReport}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Upload Materials Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
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
              
              <div className="space-y-6">
                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Course
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose a course...</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.code}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Drag & drop files here or click to browse</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer inline-block transition-colors"
                  >
                    Choose Files
                  </label>
                </div>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">Selected Files:</h3>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFileUpload}
                    disabled={selectedFiles.length === 0}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Materials
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Announcement Modal */}
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
                setShowAnnouncementModal(false);
                toast.success('Announcement sent to all students!');
              }}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Announcement title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    rows={4}
                    placeholder="Announcement content"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
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
      </div>
    </Layout>
  );
};

export default FacultyDashboard;