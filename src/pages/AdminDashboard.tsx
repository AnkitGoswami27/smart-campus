import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  X,
  UserPlus,
  Shield,
  GraduationCap,
  MapPin,
  Wrench
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell } from 'recharts';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeResourceTab, setActiveResourceTab] = useState<'rooms' | 'equipment' | 'bookings'>('rooms');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    department: '',
    studentId: '',
    facultyId: ''
  });

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
      lastLogin: '2024-03-14 10:30'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@campus.edu',
      role: 'faculty',
      facultyId: 'FAC001',
      department: 'Computer Science',
      status: 'active',
      joinDate: '2020-08-01',
      lastLogin: '2024-03-14 09:15'
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@campus.edu',
      role: 'admin',
      department: 'Administration',
      status: 'active',
      joinDate: '2019-01-01',
      lastLogin: '2024-03-14 08:00'
    },
    {
      id: 4,
      name: 'Jane Smith',
      email: 'jane.smith@campus.edu',
      role: 'student',
      studentId: 'ST2024002',
      department: 'Engineering',
      status: 'active',
      joinDate: '2024-01-20',
      lastLogin: '2024-03-13 16:45'
    }
  ]);

  const [resources] = useState({
    rooms: [
      {
        id: 1,
        name: 'Lecture Hall A',
        type: 'Lecture Hall',
        capacity: 150,
        location: 'Building A, Floor 1',
        status: 'available',
        amenities: ['Projector', 'Audio System', 'AC', 'WiFi']
      },
      {
        id: 2,
        name: 'Computer Lab 1',
        type: 'Computer Lab',
        capacity: 40,
        location: 'Building B, Floor 2',
        status: 'occupied',
        amenities: ['40 PCs', 'Projector', 'AC', 'WiFi']
      }
    ],
    equipment: [
      {
        id: 1,
        name: 'Portable Projector',
        type: 'AV Equipment',
        quantity: 5,
        available: 3,
        location: 'Equipment Room A',
        condition: 'excellent',
        lastMaintenance: '2024-02-15'
      },
      {
        id: 2,
        name: 'Laptop Cart (20 units)',
        type: 'Computing',
        quantity: 2,
        available: 1,
        location: 'IT Storage',
        condition: 'good',
        lastMaintenance: '2024-03-01'
      },
      {
        id: 3,
        name: 'Digital Camera',
        type: 'Recording',
        quantity: 8,
        available: 5,
        location: 'Media Center',
        condition: 'excellent',
        lastMaintenance: '2024-02-20'
      }
    ],
    bookings: [
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
        resource: 'Portable Projector',
        type: 'equipment',
        bookedBy: 'Prof. Michael Brown',
        date: '2024-03-16',
        time: '10:00 - 12:00',
        purpose: 'Presentation',
        status: 'pending'
      }
    ]
  });

  const adminData = {
    totalUsers: 1247,
    totalStudents: 1156,
    totalFaculty: 89,
    totalStaff: 2,
    activeUsers: 1198,
    newRegistrations: 23,
    systemUptime: '99.9%',
    storageUsed: '78%'
  };

  const departmentData = [
    { name: 'Computer Science', value: 450, color: '#3B82F6' },
    { name: 'Engineering', value: 380, color: '#10B981' },
    { name: 'Mathematics', value: 220, color: '#F59E0B' },
    { name: 'Physics', value: 180, color: '#EF4444' },
    { name: 'Others', value: 126, color: '#8B5CF6' }
  ];

  const growthData = [
    { month: 'Jan', users: 1100 },
    { month: 'Feb', users: 1150 },
    { month: 'Mar', users: 1200 },
    { month: 'Apr', users: 1247 }
  ];

  const recentActivities = [
    { id: 1, action: 'New student registered', user: 'John Doe', time: '5 min ago', type: 'user' },
    { id: 2, action: 'Course created', user: 'Dr. Smith', time: '15 min ago', type: 'course' },
    { id: 3, action: 'Resource booked', user: 'Prof. Johnson', time: '30 min ago', type: 'resource' },
    { id: 4, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'system' }
  ];

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.role) {
      const userId = Date.now();
      const generatedId = newUser.role === 'student' 
        ? `ST${new Date().getFullYear()}${String(users.filter(u => u.role === 'student').length + 1).padStart(3, '0')}`
        : newUser.role === 'faculty'
        ? `FAC${String(users.filter(u => u.role === 'faculty').length + 1).padStart(3, '0')}`
        : '';

      const user = {
        id: userId,
        ...newUser,
        studentId: newUser.role === 'student' ? generatedId : '',
        facultyId: newUser.role === 'faculty' ? generatedId : '',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never'
      };

      setUsers(prev => [user, ...prev]);
      setNewUser({ name: '', email: '', role: 'student', department: '', studentId: '', facultyId: '' });
      setShowUserModal(false);
      toast.success(`${newUser.role} added successfully!`);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    toast.success('User status updated');
  };

  const deleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast.success('User deleted successfully');
  };

  const viewUserDetails = (user: any) => {
    setSelectedUser(user);
    setShowUserDetailsModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === '' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

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
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'excellent':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'good':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'fair':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'faculty':
        return <GraduationCap className="h-4 w-4" />;
      case 'student':
        return <Users className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Comprehensive system overview and management
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={() => setShowUserModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
            <button
              onClick={() => setShowResourceModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <Building className="h-4 w-4 mr-2" />
              Manage Resources
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
            onClick={() => setShowResourceModal(true)}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
          >
            <Building className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Manage Resources</span>
          </button>
          <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
            <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Analytics</span>
          </button>
          <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
            <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">System Settings</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminData.totalUsers}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{adminData.newRegistrations} this month</span>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminData.totalStudents}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enrolled this semester</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Faculty Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminData.totalFaculty}</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">All active</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{adminData.systemUptime}</p>
                <div className="flex items-center mt-2">
                  <Activity className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Excellent</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Department Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
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
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex-shrink-0 mr-4">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'user' ? 'bg-blue-50 dark:bg-blue-900/20' :
                    activity.type === 'course' ? 'bg-green-50 dark:bg-green-900/20' :
                    activity.type === 'resource' ? 'bg-purple-50 dark:bg-purple-900/20' :
                    'bg-orange-50 dark:bg-orange-900/20'
                  }`}>
                    {activity.type === 'user' && <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'course' && <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />}
                    {activity.type === 'resource' && <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                    {activity.type === 'system' && <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">by {activity.user}</p>
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-500">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Add User Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New User</h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role *
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
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
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Administration">Administration</option>
                    </select>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Role Information</h4>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    {newUser.role === 'student' && (
                      <p>Student ID will be auto-generated (Format: ST{new Date().getFullYear()}XXX)</p>
                    )}
                    {newUser.role === 'faculty' && (
                      <p>Faculty ID will be auto-generated (Format: FACXXX)</p>
                    )}
                    {newUser.role === 'admin' && (
                      <p>Admin users have full system access and management privileges</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Manage Resources Modal */}
        {showResourceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Resources</h2>
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
                    { id: 'equipment', name: 'Equipment', icon: Wrench },
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

              {/* Rooms & Facilities */}
              {activeResourceTab === 'rooms' && (
                <div className="space-y-4">
                  {resources.rooms.map((room) => (
                    <div key={room.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{room.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{room.type}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(room.status)}`}>
                          {room.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Capacity:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{room.capacity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Location:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{room.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Amenities:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{room.amenities.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Equipment */}
              {activeResourceTab === 'equipment' && (
                <div className="space-y-4">
                  {resources.equipment.map((equipment) => (
                    <div key={equipment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{equipment.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{equipment.type}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(equipment.condition)}`}>
                          {equipment.condition}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Available:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{equipment.available}/{equipment.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Location:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{equipment.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Condition:</span>
                          <span className="ml-2 text-gray-900 dark:text-white capitalize">{equipment.condition}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Last Maintenance:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{new Date(equipment.lastMaintenance).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* My Bookings */}
              {activeResourceTab === 'bookings' && (
                <div className="space-y-4">
                  {resources.bookings.map((booking) => (
                    <div key={booking.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{booking.resource}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{booking.purpose}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Type:</span>
                          <span className="ml-2 text-gray-900 dark:text-white capitalize">{booking.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Date:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Time:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{booking.time}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Booked by:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{booking.bookedBy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* User Details Modal */}
        {showUserDetailsModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Details</h2>
                <button
                  onClick={() => setShowUserDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-medium text-xl">
                      {selectedUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedUser.name}</h3>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(selectedUser.role)}
                      <span className="text-gray-600 dark:text-gray-300 capitalize">{selectedUser.role}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Email:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">{selectedUser.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Department:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">{selectedUser.department}</span>
                      </div>
                      {selectedUser.studentId && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Student ID:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{selectedUser.studentId}</span>
                        </div>
                      )}
                      {selectedUser.facultyId && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Faculty ID:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{selectedUser.facultyId}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Join Date:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Last Login:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">{selectedUser.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => toggleUserStatus(selectedUser.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedUser.status === 'active'
                        ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400'
                    }`}
                  >
                    {selectedUser.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => {
                      deleteUser(selectedUser.id);
                      setShowUserDetailsModal(false);
                    }}
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg transition-colors"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* User Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                          <span className="text-white font-medium text-sm">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span className="ml-2 text-sm text-gray-900 dark:text-white capitalize">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewUserDetails(user)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
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
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;