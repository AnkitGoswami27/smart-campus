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
  ArrowLeft,
  Settings,
  FileText,
  Target,
  Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
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

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showScheduleEventModal, setShowScheduleEventModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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

  const handleBackToLogin = () => {
    navigate('/login');
    toast.success('Returned to login');
  };

  const handleBrowserBack = () => {
    navigate(-1);
  };

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

  const manageResources = () => {
    addRecentActivity('Resource management accessed', 'Admin', 'info');
    toast.success('Opening resource management...');
    navigate('/resources');
  };

  const manageUsers = () => {
    addRecentActivity('User management accessed', 'Admin', 'info');
    toast.success('Opening user management...');
  };

  const viewAnalytics = () => {
    addRecentActivity('Analytics dashboard accessed', 'Admin', 'info');
    toast.success('Opening detailed analytics...');
  };

  const systemSettings = () => {
    setShowSettingsModal(true);
    addRecentActivity('System settings accessed', 'Admin', 'info');
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

  return (
    <div className="p-6 space-y-6">
      {/* Header with Back Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBrowserBack}
            className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <button
            onClick={handleBackToLogin}
            className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </button>
        </div>
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
            onClick={systemSettings}
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
          onClick={manageResources}
          className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
        >
          <Building className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-2" />
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Manage Resources</span>
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
              onClick={() => setShowScheduleEventModal(true)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-purple-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Schedule Event</span>
              </div>
            </button>
            <button 
              onClick={manageResources}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Building className="h-5 w-5 text-orange-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Manage Resources</span>
              </div>
            </button>
            <button 
              onClick={manageUsers}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 text-indigo-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Manage Users</span>
              </div>
            </button>
            <button 
              onClick={viewAnalytics}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-pink-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">View Analytics</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
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
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Activity will appear here as you use the system
                </p>
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

      {showCreateCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Course</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              createCourse({
                code: formData.get('code'),
                name: formData.get('name'),
                credits: formData.get('credits'),
                instructor: formData.get('instructor')
              });
            }}>
              <div className="space-y-4">
                <input
                  name="code"
                  type="text"
                  placeholder="Course Code (e.g., CS101)"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="name"
                  type="text"
                  placeholder="Course Name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="credits"
                  type="number"
                  placeholder="Credits"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="instructor"
                  type="text"
                  placeholder="Instructor Name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateCourseModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Create Course
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showScheduleEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Schedule New Event</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              scheduleEvent({
                title: formData.get('title'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location')
              });
            }}>
              <div className="space-y-4">
                <input
                  name="title"
                  type="text"
                  placeholder="Event Title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="date"
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="time"
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="location"
                  type="text"
                  placeholder="Event Location"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowScheduleEventModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Schedule Event
                </button>
              </div>
            </form>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">System Report</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium text-blue-900 dark:text-blue-300">Total Students</h3>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-medium text-green-900 dark:text-green-300">Faculty Members</h3>
                  <p className="text-2xl font-bold text-green-600">{stats.totalFaculty}</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-medium text-purple-900 dark:text-purple-300">Active Courses</h3>
                  <p className="text-2xl font-bold text-purple-600">{stats.activeCourses}</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h3 className="font-medium text-orange-900 dark:text-orange-300">Attendance Rate</h3>
                  <p className="text-2xl font-bold text-orange-600">{stats.attendanceRate}%</p>
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

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">System Settings</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Notification Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Configure system notifications</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Security Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Manage security preferences</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">Backup Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Configure automatic backups</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success('Settings saved successfully!');
                  setShowSettingsModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Settings
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
// project/src/pages/AdminDashboard.tsx