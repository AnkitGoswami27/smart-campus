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
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: 'John Doe',
    studentId: 'ST2024001',
    semester: '6th Semester',
    department: 'Computer Science',
    gpa: 3.85,
    attendanceRate: 92.5,
    completedCredits: 140,
    totalCredits: 160
  });

  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

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
    { id: 1, title: 'Spring Break Schedule', content: 'Campus will be closed from March 20-27', time: '2 hours ago' },
    { id: 2, title: 'Library Extended Hours', content: 'Open 24/7 during finals week', time: '1 day ago' },
    { id: 3, title: 'Registration Opens', content: 'Fall 2024 course registration begins April 1', time: '2 days ago' }
  ];

  const assignments = [
    { id: 1, title: 'Algorithm Analysis Report', course: 'CS401', dueDate: '2024-03-20', status: 'pending' },
    { id: 2, title: 'Database Design Project', course: 'CS402', dueDate: '2024-03-18', status: 'submitted' },
    { id: 3, title: 'React Application', course: 'CS403', dueDate: '2024-03-25', status: 'in-progress' }
  ];

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
    toast.success('Downloading official transcript...');
    setTimeout(() => {
      toast.success('Transcript downloaded successfully!');
    }, 2000);
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
                <div key={announcement.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
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
                  ×
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
                  ×
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
                  ×
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
      </div>
    </Layout>
  );
};

export default StudentDashboard;