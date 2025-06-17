import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  GraduationCap,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  Download,
  UserPlus,
  Settings,
  FileText,
  Target,
  Award,
  Edit,
  Trash2,
  Send,
  Upload
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useLocalStorage('admin-stats', {
    totalStudents: 1248,
    totalFaculty: 89,
    activeCourses: 156,
    upcomingEvents: 12,
    attendanceRate: 85.4,
    resourceUtilization: 72.8
  });

  const [recentActivities, setRecentActivities] = useLocalStorage('admin-recent-activities', [
    { id: 1, action: 'New student registration', user: 'John Doe', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Course schedule updated', user: 'Dr. Smith', time: '15 minutes ago', type: 'info' },
    { id: 3, action: 'Resource booking cancelled', user: 'Jane Wilson', time: '1 hour ago', type: 'warning' },
    { id: 4, action: 'Event created', user: 'Admin', time: '2 hours ago', type: 'success' },
    { id: 5, action: 'System maintenance scheduled', user: 'IT Team', time: '3 hours ago', type: 'info' }
  ]);

  const [pendingTasks, setPendingTasks] = useLocalStorage('admin-pending-tasks', [
    { id: 1, name: 'Review Faculty Applications', description: 'Review and approve new faculty applications', priority: 'high', dueDate: '2024-03-20', assignedTo: 'HR Department' },
    { id: 2, name: 'Update Course Catalog', description: 'Update course catalog for next semester', priority: 'medium', dueDate: '2024-03-25', assignedTo: 'Academic Office' },
    { id: 3, name: 'System Backup', description: 'Perform monthly system backup', priority: 'low', dueDate: '2024-03-30', assignedTo: 'IT Team' }
  ]);

  const [announcements, setAnnouncements] = useLocalStorage('admin-announcements', []);
  const [students, setStudents] = useLocalStorage('admin-students', [
    { id: 1, name: 'John Doe', studentId: 'ST2024001', gpa: 3.85, attendance: 92, courses: 5, status: 'active' },
    { id: 2, name: 'Jane Smith', studentId: 'ST2024002', gpa: 3.92, attendance: 95, courses: 6, status: 'active' },
    { id: 3, name: 'Mike Johnson', studentId: 'ST2024003', gpa: 3.67, attendance: 88, courses: 5, status: 'active' },
    { id: 4, name: 'Sarah Wilson', studentId: 'ST2024004', gpa: 3.78, attendance: 90, courses: 5, status: 'active' }
  ]);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showScheduleEventModal, setShowScheduleEventModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showStudentProgressModal, setShowStudentProgressModal] = useState(false);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const attendanceData = [
    { name: 'Mon', attendance: 85 },
    { name: 'Tue', attendance: 92 },
    { name: 'Wed', attendance: 78 },
    { name: 'Thu', attendance: 88 },
    { name: 'Fri', attendance: 95 },
    { name: 'Sat', attendance: 67 },
    { name: 'Sun', attendance: 45 }
  ];

  const departmentData = [
    { name: 'Computer Science', value: 35, color: '#3B82F6' },
    { name: 'Engineering', value: 28, color: '#10B981' },
    { name: 'Business', value: 20, color: '#F59E0B' },
    { name: 'Arts', value: 12, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' }
  ];

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      icon: GraduationCap,
      color: 'blue',
      change: '+5.2%',
      changeType: 'increase'
    },
    {
      title: 'Faculty Members',
      value: stats.totalFaculty.toLocaleString(),
      icon: Users,
      color: 'green',
      change: '+2.1%',
      changeType: 'increase'
    },
    {
      title: 'Active Courses',
      value: stats.activeCourses.toLocaleString(),
      icon: BookOpen,
      color: 'purple',
      change: '+8.5%',
      changeType: 'increase'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents.toLocaleString(),
      icon: Calendar,
      color: 'orange',
      change: '+12.3%',
      changeType: 'increase'
    }
  ];

  const addRecentActivity = (action: string, user: string, type: 'success' | 'info' | 'warning') => {
    const newActivity = {
      id: Date.now(),
      action,
      user,
      time: 'Just now',
      type
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
  };

  const generateReport = () => {
    setShowReportModal(true);
    addRecentActivity('System report generated', 'Admin', 'info');
    toast.success('Generating comprehensive report...');
    setTimeout(() => {
      toast.success('Report generated successfully! Check your downloads.');
    }, 2000);
  };

  const addNewStudent = (studentData: any) => {
    const newStudent = {
      id: Date.now(),
      name: studentData.name,
      studentId: studentData.studentId,
      gpa: 0.0,
      attendance: 0,
      courses: 0,
      status: 'active'
    };
    setStudents(prev => [newStudent, ...prev]);
    setStats(prev => ({ ...prev, totalStudents: prev.totalStudents + 1 }));
    addRecentActivity(`New student ${studentData.name} added`, 'Admin', 'success');
    toast.success('Student added successfully!');
    setShowAddStudentModal(false);
  };

  const createCourse = (courseData: any) => {
    setStats(prev => ({ ...prev, activeCourses: prev.activeCourses + 1 }));
    addRecentActivity(`Course ${courseData.code} created`, 'Admin', 'success');
    toast.success('Course created successfully!');
    setShowCreateCourseModal(false);
  };

  const scheduleEvent = (eventData: any) => {
    setStats(prev => ({ ...prev, upcomingEvents: prev.upcomingEvents + 1 }));
    addRecentActivity(`Event "${eventData.title}" scheduled`, 'Admin', 'success');
    toast.success('Event scheduled successfully!');
    setShowScheduleEventModal(false);
  };

  const addTask = (taskData: any) => {
    const newTask = {
      id: Date.now(),
      name: taskData.name,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      assignedTo: taskData.assignedTo
    };
    setPendingTasks(prev => [newTask, ...prev]);
    addRecentActivity(`Task "${taskData.name}" added`, 'Admin', 'info');
    toast.success('Task added successfully!');
    setShowAddTaskModal(false);
  };

  const completeTask = (taskId: number) => {
    const task = pendingTasks.find(t => t.id === taskId);
    setPendingTasks(prev => prev.filter(t => t.id !== taskId));
    addRecentActivity(`Task "${task?.name}" completed`, 'Admin', 'success');
    toast.success('Task completed!');
  };

  const startGrading = () => {
    setShowGradingModal(true);
    addRecentActivity('Grading system accessed', 'Admin', 'info');
  };

  const viewStudentProgress = () => {
    setShowStudentProgressModal(true);
    addRecentActivity('Student progress viewed', 'Admin', 'info');
  };

  const uploadMaterials = () => {
    setShowUploadModal(true);
    addRecentActivity('Material upload initiated', 'Admin', 'info');
  };

  const createAnnouncement = (announcementData: any) => {
    const newAnnouncement = {
      id: Date.now(),
      title: announcementData.title,
      content: announcementData.content,
      author: 'Admin',
      timestamp: new Date().toLocaleString(),
      priority: announcementData.priority || 'normal'
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    addRecentActivity(`Announcement "${announcementData.title}" created`, 'Admin', 'success');
    toast.success('Announcement sent to all students!');
    setShowAnnouncementModal(false);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
    };
    return colors[color as keyof typeof colors];
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'low': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Welcome back! Here's what's happening at your institution today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button 
            onClick={generateReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </button>
          <button 
            onClick={() => setShowAnnouncementModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Announce
          </button>
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setShowAddStudentModal(true)}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
        >
          <UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Add Student</span>
        </button>
        <button
          onClick={() => setShowCreateCourseModal(true)}
          className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
        >
          <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">Create Course</span>
        </button>
        <button
          onClick={() => setShowScheduleEventModal(true)}
          className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
        >
          <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Schedule Event</span>
        </button>
        <button
          onClick={() => setShowAddTaskModal(true)}
          className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
        >
          <Plus className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-2" />
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Add Task</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 dark:text-green-400">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Attendance</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
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
              <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Department Distribution</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <RechartsPieChart data={departmentData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPieChart>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(31 41 55)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            {departmentData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setShowAddStudentModal(true)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <UserPlus className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Add New Student</span>
              </div>
            </button>
            <button 
              onClick={() => setShowCreateCourseModal(true)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Create Course</span>
              </div>
            </button>
            <button 
              onClick={startGrading}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Award className="h-5 w-5 text-purple-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Start Grading</span>
              </div>
            </button>
            <button 
              onClick={viewStudentProgress}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 text-indigo-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Student Progress</span>
              </div>
            </button>
            <button 
              onClick={uploadMaterials}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Upload className="h-5 w-5 text-pink-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Upload Materials</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Pending Tasks */}
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
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Add Task
            </button>
          </div>
          <div className="space-y-4">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <motion.div 
                  key={task.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{task.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => completeTask(task.id)}
                      className="text-green-600 hover:text-green-800 text-sm ml-2"
                    >
                      Complete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">All tasks completed!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <button
              onClick={() => setRecentActivities([])}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <motion.div 
                  key={activity.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="mr-3">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">by {activity.user}</p>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {activity.time}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Student</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              addNewStudent({
                name: formData.get('name'),
                email: formData.get('email'),
                studentId: formData.get('studentId'),
                department: formData.get('department')
              });
            }}>
              <div className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Student Name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="studentId"
                  type="text"
                  placeholder="Student ID"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="department"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Student
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Task</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              addTask({
                name: formData.get('name'),
                description: formData.get('description'),
                priority: formData.get('priority'),
                dueDate: formData.get('dueDate'),
                assignedTo: formData.get('assignedTo')
              });
            }}>
              <div className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Task Name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="description"
                  placeholder="Task Description"
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="priority"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  name="dueDate"
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="assignedTo"
                  type="text"
                  placeholder="Assigned To"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
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

      {showStudentProgressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Progress Overview</h2>
              <button
                onClick={() => setShowStudentProgressModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => (
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

      {showGradingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Grading System</h2>
              <button
                onClick={() => setShowGradingModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">CS101 - Introduction to Programming</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">24 assignments pending review</p>
                <div className="mt-3 flex space-x-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    Start Grading
                  </button>
                  <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
                    View Submissions
                  </button>
                </div>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">CS201 - Data Structures</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">18 assignments pending review</p>
                <div className="mt-3 flex space-x-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    Start Grading
                  </button>
                  <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
                    View Submissions
                  </button>
                </div>
              </div>
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upload Materials</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Drag and drop files here or click to browse</p>
                <input type="file" multiple className="hidden" />
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Choose Files
                </button>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Materials uploaded successfully!');
                    setShowUploadModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Upload
                </button>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create Announcement</h2>
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
                  placeholder="Announcement Title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="content"
                  rows={4}
                  placeholder="Announcement Content"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="priority"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
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

      {/* Other existing modals... */}
    </div>
  );
};

export default AdminDashboard;
// project/src/pages/AdminDashboard.tsx