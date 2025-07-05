import React, { useState, useEffect } from 'react';
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
  Trash2,
  Search,
  Filter,
  Building,
  MapPin,
  Settings,
  Activity,
  DollarSign,
  GraduationCap,
  Shield,
  UserPlus,
  Mail,
  Phone
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const [adminData, setAdminData] = useState({
    name: 'Admin User',
    adminId: 'ADM001',
    department: 'Administration',
    totalStudents: 1247,
    totalFaculty: 89,
    activeCourses: 156,
    totalRevenue: 2450000
  });

  const [showUserModal, setShowUserModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [activeResourceTab, setActiveResourceTab] = useState<'rooms' | 'equipment' | 'bookings'>('rooms');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userModalMode, setUserModalMode] = useState<'add' | 'edit' | 'view'>('add');
  
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'New student registered', user: 'John Doe', time: '5 min ago', type: 'user' },
    { id: 2, action: 'Course CS301 created', user: 'Dr. Smith', time: '15 min ago', type: 'course' },
    { id: 3, action: 'Resource Lab-A booked', user: 'Prof. Johnson', time: '30 min ago', type: 'resource' },
    { id: 4, action: 'Fee payment received', user: 'Jane Smith', time: '1 hour ago', type: 'payment' }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@campus.edu',
      role: 'student',
      studentId: 'ST2024001',
      department: 'Computer Science',
      status: 'active',
      joinDate: '2024-01-15',
      phone: '+1 234-567-8901',
      gpa: '3.8'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@campus.edu',
      role: 'faculty',
      facultyId: 'FAC001',
      department: 'Computer Science',
      status: 'active',
      joinDate: '2020-08-20',
      phone: '+1 234-567-8902',
      courses: 3
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane.smith@campus.edu',
      role: 'student',
      studentId: 'ST2024002',
      department: 'Engineering',
      status: 'active',
      joinDate: '2024-01-20',
      phone: '+1 234-567-8903',
      gpa: '3.6'
    },
    {
      id: 4,
      name: 'Prof. Michael Brown',
      email: 'michael.brown@campus.edu',
      role: 'faculty',
      facultyId: 'FAC002',
      department: 'Mathematics',
      status: 'active',
      joinDate: '2019-09-10',
      phone: '+1 234-567-8904',
      courses: 4
    },
    {
      id: 5,
      name: 'Admin User',
      email: 'admin@campus.edu',
      role: 'admin',
      adminId: 'ADM001',
      department: 'Administration',
      status: 'active',
      joinDate: '2018-01-01',
      phone: '+1 234-567-8900'
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    department: '',
    phone: '',
    studentId: '',
    facultyId: '',
    adminId: ''
  });

  const rooms = [
    {
      id: 1,
      name: 'Lecture Hall A',
      type: 'Lecture Hall',
      capacity: 150,
      location: 'Building A, Floor 1',
      amenities: ['Projector', 'Audio System', 'AC', 'WiFi'],
      status: 'available',
      nextBooking: '2024-03-15 14:00'
    },
    {
      id: 2,
      name: 'Computer Lab 1',
      type: 'Computer Lab',
      capacity: 40,
      location: 'Building B, Floor 2',
      amenities: ['40 PCs', 'Projector', 'AC', 'WiFi'],
      status: 'occupied',
      nextBooking: '2024-03-15 16:00'
    },
    {
      id: 3,
      name: 'Conference Room',
      type: 'Meeting Room',
      capacity: 20,
      location: 'Admin Building, Floor 3',
      amenities: ['Video Conferencing', 'Whiteboard', 'AC'],
      status: 'available',
      nextBooking: null
    }
  ];

  const equipment = [
    {
      id: 1,
      name: 'Portable Projector',
      type: 'AV Equipment',
      quantity: 5,
      available: 3,
      location: 'Equipment Room A',
      status: 'available',
      condition: 'excellent'
    },
    {
      id: 2,
      name: 'Laptop Cart (20 units)',
      type: 'Computing',
      quantity: 2,
      available: 1,
      location: 'IT Storage',
      status: 'available',
      condition: 'good'
    },
    {
      id: 3,
      name: 'Digital Camera',
      type: 'Recording',
      quantity: 8,
      available: 5,
      location: 'Media Center',
      status: 'available',
      condition: 'excellent'
    },
    {
      id: 4,
      name: 'Microscope Set',
      type: 'Lab Equipment',
      quantity: 15,
      available: 0,
      location: 'Science Lab',
      status: 'unavailable',
      condition: 'good'
    }
  ];

  const bookings = [
    {
      id: 1,
      resource: 'Lecture Hall A',
      type: 'room',
      bookedBy: 'Dr. Sarah Johnson',
      date: '2024-03-15',
      time: '14:00 - 16:00',
      purpose: 'CS101 Lecture',
      status: 'confirmed'
    },
    {
      id: 2,
      resource: 'Computer Lab 1',
      type: 'room',
      bookedBy: 'Prof. Michael Brown',
      date: '2024-03-15',
      time: '10:00 - 12:00',
      purpose: 'Programming Lab',
      status: 'confirmed'
    },
    {
      id: 3,
      resource: 'Portable Projector',
      type: 'equipment',
      bookedBy: 'Dr. Emily Davis',
      date: '2024-03-16',
      time: '09:00 - 11:00',
      purpose: 'Database Presentation',
      status: 'pending'
    },
    {
      id: 4,
      resource: 'Conference Room',
      type: 'room',
      bookedBy: 'Admin Office',
      date: '2024-03-16',
      time: '14:00 - 16:00',
      purpose: 'Faculty Meeting',
      status: 'confirmed'
    }
  ];

  const performanceData = [
    { month: 'Jan', students: 1180, faculty: 85, courses: 145 },
    { month: 'Feb', students: 1205, faculty: 87, courses: 150 },
    { month: 'Mar', students: 1247, faculty: 89, courses: 156 }
  ];

  const attendanceData = [
    { date: 'Mon', attendance: 85 },
    { date: 'Tue', attendance: 88 },
    { date: 'Wed', attendance: 92 },
    { date: 'Thu', attendance: 87 },
    { date: 'Fri', attendance: 90 }
  ];

  const departmentData = [
    { name: 'Computer Science', value: 450, fill: '#3B82F6' },
    { name: 'Engineering', value: 380, fill: '#10B981' },
    { name: 'Mathematics', value: 220, fill: '#F59E0B' },
    { name: 'Physics', value: 197, fill: '#EF4444' }
  ];

  const addActivity = (action: string, user: string, type: string) => {
    const newActivity = {
      id: Date.now(),
      action,
      user,
      time: 'Just now',
      type
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 9)]);
  };

  const handleAddUser = () => {
    setUserModalMode('add');
    setSelectedUser(null);
    setNewUser({
      name: '',
      email: '',
      role: 'student',
      department: '',
      phone: '',
      studentId: '',
      facultyId: '',
      adminId: ''
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user: any) => {
    setUserModalMode('edit');
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      phone: user.phone,
      studentId: user.studentId || '',
      facultyId: user.facultyId || '',
      adminId: user.adminId || ''
    });
    setShowUserModal(true);
  };

  const handleViewUser = (user: any) => {
    setUserModalMode('view');
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (userModalMode === 'add') {
      const newUserData = {
        id: Date.now(),
        ...newUser,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      // Generate ID based on role
      if (newUser.role === 'student' && !newUser.studentId) {
        newUserData.studentId = `ST${Date.now().toString().slice(-6)}`;
      } else if (newUser.role === 'faculty' && !newUser.facultyId) {
        newUserData.facultyId = `FAC${Date.now().toString().slice(-3)}`;
      } else if (newUser.role === 'admin' && !newUser.adminId) {
        newUserData.adminId = `ADM${Date.now().toString().slice(-3)}`;
      }
      
      setUsers(prev => [newUserData, ...prev]);
      addActivity(`New ${newUser.role} added`, newUser.name, 'user');
      toast.success(`${newUser.role} added successfully!`);
    } else if (userModalMode === 'edit') {
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id ? { ...user, ...newUser } : user
      ));
      addActivity(`${newUser.role} updated`, newUser.name, 'user');
      toast.success('User updated successfully!');
    }
    setShowUserModal(false);
  };

  const handleDeleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      addActivity(`${user.role} removed`, user.name, 'user');
      toast.success('User deleted successfully!');
    }
  };

  const toggleUserStatus = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, status: newStatus } : u
      ));
      addActivity(`${user.role} ${newStatus}`, user.name, 'user');
      toast.success(`User ${newStatus} successfully!`);
    }
  };

  const generateReport = () => {
    setShowReportModal(true);
    toast.success('Generating comprehensive report...');
  };

  const downloadReport = () => {
    toast.success('Downloading system report...');
    setTimeout(() => {
      toast.success('Report downloaded successfully!');
      setShowReportModal(false);
    }, 2000);
  };

  const createAnnouncement = () => {
    setShowAnnouncementModal(true);
  };

  const manageResources = () => {
    setShowResourceModal(true);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'faculty': return <BookOpen className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'faculty': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'admin': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'inactive':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'available':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'occupied':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'maintenance':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'unavailable':
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-500" />;
      case 'course': return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'resource': return <Building className="h-4 w-4 text-purple-500" />;
      case 'payment': return <DollarSign className="h-4 w-4 text-orange-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              System Overview & Management • {adminData.adminId}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button 
              onClick={handleAddUser}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
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
            onClick={() => setShowUserModal(true)}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Manage Users</span>
          </button>
          <button
            onClick={manageResources}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
          >
            <Building className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Manage Resources</span>
          </button>
          <button
            onClick={generateReport}
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
          >
            <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">System Reports</span>
          </button>
          <button
            onClick={() => toast.success('Opening system settings...')}
            className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
          >
            <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">System Settings</span>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminData.totalStudents}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+42 this month</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Faculty Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminData.totalFaculty}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Active staff</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminData.activeCourses}</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">This semester</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(adminData.totalRevenue / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center mt-2">
                  <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.2% growth</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Growth</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-300" />
                <YAxis className="text-gray-600 dark:text-gray-300" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(31 41 55)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={2} name="Students" />
                <Line type="monotone" dataKey="faculty" stroke="#10B981" strokeWidth={2} name="Faculty" />
                <Line type="monotone" dataKey="courses" stroke="#F59E0B" strokeWidth={2} name="Courses" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Department Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: dept.fill }}
                    ></div>
                    <span className="text-gray-600 dark:text-gray-300">{dept.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{dept.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Users & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</h3>
              <button
                onClick={handleAddUser}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Manage All
              </button>
            </div>
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{user.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1 capitalize">{user.role}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-green-600 hover:text-green-800 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="mr-3">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{activity.action}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Management Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {userModalMode === 'add' ? 'Add New User' : 
                   userModalMode === 'edit' ? 'Edit User' : 'User Details'}
                </h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {userModalMode === 'view' ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-medium text-xl">
                        {selectedUser?.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedUser?.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{selectedUser?.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center ${getRoleColor(selectedUser?.role)}`}>
                          {getRoleIcon(selectedUser?.role)}
                          <span className="ml-1 capitalize">{selectedUser?.role}</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(selectedUser?.status)}`}>
                          {selectedUser?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                        <p className="text-gray-900 dark:text-white">{selectedUser?.department}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <p className="text-gray-900 dark:text-white">{selectedUser?.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Join Date</label>
                        <p className="text-gray-900 dark:text-white">{new Date(selectedUser?.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {selectedUser?.studentId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student ID</label>
                          <p className="text-gray-900 dark:text-white">{selectedUser.studentId}</p>
                        </div>
                      )}
                      {selectedUser?.facultyId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Faculty ID</label>
                          <p className="text-gray-900 dark:text-white">{selectedUser.facultyId}</p>
                        </div>
                      )}
                      {selectedUser?.adminId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin ID</label>
                          <p className="text-gray-900 dark:text-white">{selectedUser.adminId}</p>
                        </div>
                      )}
                      {selectedUser?.gpa && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GPA</label>
                          <p className="text-gray-900 dark:text-white">{selectedUser.gpa}</p>
                        </div>
                      )}
                      {selectedUser?.courses && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Courses</label>
                          <p className="text-gray-900 dark:text-white">{selectedUser.courses}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => toggleUserStatus(selectedUser.id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedUser?.status === 'active'
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {selectedUser?.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEditUser(selectedUser)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Edit User
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Role *
                        </label>
                        <select
                          value={newUser.role}
                          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="student">Student</option>
                          <option value="faculty">Faculty</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Department *
                        </label>
                        <select
                          value={newUser.department}
                          onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Department</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Administration">Administration</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={newUser.phone}
                          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    {/* Role-specific fields */}
                    <div className="space-y-4">
                      {newUser.role === 'student' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Student ID
                          </label>
                          <input
                            type="text"
                            value={newUser.studentId}
                            onChange={(e) => setNewUser({ ...newUser, studentId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Auto-generated if empty"
                          />
                        </div>
                      )}

                      {newUser.role === 'faculty' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Faculty ID
                          </label>
                          <input
                            type="text"
                            value={newUser.facultyId}
                            onChange={(e) => setNewUser({ ...newUser, facultyId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Auto-generated if empty"
                          />
                        </div>
                      )}

                      {newUser.role === 'admin' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Admin ID
                          </label>
                          <input
                            type="text"
                            value={newUser.adminId}
                            onChange={(e) => setNewUser({ ...newUser, adminId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Auto-generated if empty"
                          />
                        </div>
                      )}

                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Role Permissions</h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                          {newUser.role === 'student' && (
                            <>
                              <li>• View courses and grades</li>
                              <li>• Submit assignments</li>
                              <li>• Access student portal</li>
                              <li>• View attendance records</li>
                            </>
                          )}
                          {newUser.role === 'faculty' && (
                            <>
                              <li>• Manage courses and students</li>
                              <li>• Grade assignments</li>
                              <li>• Take attendance</li>
                              <li>• Generate reports</li>
                            </>
                          )}
                          {newUser.role === 'admin' && (
                            <>
                              <li>• Full system access</li>
                              <li>• Manage all users</li>
                              <li>• System configuration</li>
                              <li>• Generate system reports</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={() => setShowUserModal(false)}
                      className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveUser}
                      disabled={!newUser.name || !newUser.email || !newUser.department}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      {userModalMode === 'add' ? 'Add User' : 'Update User'}
                    </button>
                  </div>
                </>
              )}

              {/* All Users List */}
              {userModalMode !== 'view' && (
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Users</h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option value="">All Roles</option>
                        <option value="student">Students</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admins</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                                  <span className="text-white font-medium text-xs">
                                    {user.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center w-fit ${getRoleColor(user.role)}`}>
                                {getRoleIcon(user.role)}
                                <span className="ml-1 capitalize">{user.role}</span>
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {user.department}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewUser(user)}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleEditUser(user)}
                                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Resource Management Modal */}
        {showResourceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resource Management</h2>
                <button
                  onClick={() => setShowResourceModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Resource Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'rooms', name: 'Rooms & Facilities', icon: Building },
                    { id: 'equipment', name: 'Equipment', icon: Settings },
                    { id: 'bookings', name: 'My Bookings', icon: Calendar }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveResourceTab(tab.id as any)}
                      className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                        activeResourceTab === tab.id
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

              {/* Rooms Tab */}
              {activeResourceTab === 'rooms' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <div key={room.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{room.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{room.type}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(room.status)}`}>
                          {room.status}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Capacity: {room.capacity}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{room.location}</span>
                        </div>
                        {room.nextBooking && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Next: {new Date(room.nextBooking).toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Amenities:</p>
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Equipment Tab */}
              {activeResourceTab === 'equipment' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {equipment.map((item) => (
                    <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                            <Settings className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Available</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {item.available}/{item.quantity}
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.available > 0 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(item.available / item.quantity) * 100}%` }}
                          ></div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{item.location}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Condition:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.condition === 'excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                            item.condition === 'good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                          }`}>
                            {item.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bookings Tab */}
              {activeResourceTab === 'bookings' && (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                              {booking.type === 'room' ? (
                                <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              ) : (
                                <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{booking.resource}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{booking.purpose}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{booking.time}</span>
                            </div>
                            <span>by {booking.bookedBy}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* System Reports Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Reports & Analytics</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-blue-900 dark:text-blue-300">Total Users</h3>
                    <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-green-900 dark:text-green-300">Active Courses</h3>
                    <p className="text-2xl font-bold text-green-600">{adminData.activeCourses}</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-orange-900 dark:text-orange-300">Resources</h3>
                    <p className="text-2xl font-bold text-orange-600">{rooms.length + equipment.length}</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-purple-900 dark:text-purple-300">Revenue</h3>
                    <p className="text-2xl font-bold text-purple-600">${(adminData.totalRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">System Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">User Distribution</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Students</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {users.filter(u => u.role === 'student').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Faculty</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {users.filter(u => u.role === 'faculty').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Admins</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {users.filter(u => u.role === 'admin').length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Resource Utilization</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Rooms Available</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {rooms.filter(r => r.status === 'available').length}/{rooms.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Equipment Available</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {equipment.filter(e => e.available > 0).length}/{equipment.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Active Bookings</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {bookings.filter(b => b.status === 'confirmed').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                    Download System Report
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Announcement</h2>
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
                addActivity('System announcement sent', 'Admin', 'announcement');
                toast.success('Announcement sent to all users!');
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Audience
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                      <option value="all">All Users</option>
                      <option value="students">Students Only</option>
                      <option value="faculty">Faculty Only</option>
                      <option value="admins">Admins Only</option>
                    </select>
                  </div>
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

export default AdminDashboard;