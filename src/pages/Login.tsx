import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { GraduationCap, Sun, Moon, Users, BookOpen, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const { user, login } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRoleLogin = (role: 'admin' | 'faculty' | 'student') => {
    login(role);
    toast.success(`Welcome ${role}!`);
  };

  const roleCards = [
    {
      role: 'admin' as const,
      title: 'Administrator',
      description: 'Full system access and management',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      role: 'faculty' as const,
      title: 'Faculty',
      description: 'Course and student management',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      role: 'student' as const,
      title: 'Student',
      description: 'Access courses and resources',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white opacity-5 rounded-full animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full glass-morphism text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300"
      >
        {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <div className="w-full max-w-4xl mx-4 glass-morphism rounded-2xl overflow-hidden shadow-2xl">
        <motion.div 
          className="p-8 lg:p-12 bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Smart Campus</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Management System</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Choose your role to continue</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roleCards.map((card, index) => (
              <motion.button
                key={card.role}
                onClick={() => handleRoleLogin(card.role)}
                className={`p-8 rounded-xl bg-gradient-to-br ${card.color} ${card.hoverColor} text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                    <card.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white text-opacity-90 text-sm">{card.description}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">QR Code Attendance</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Location-verified attendance with real-time updates</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Dashboard</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Live updates and comprehensive analytics</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;