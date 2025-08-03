import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { GraduationCap, Sun, Moon, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const { user, login, loading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Remove automatic redirect - let user explicitly login each time
  // if (user) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast.success('Login successful!');
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const fillDemoCredentials = (role: 'admin' | 'faculty' | 'student') => {
    const credentials = {
      admin: { email: 'admin@campus.edu', password: 'admin123' },
      faculty: { email: 'faculty@campus.edu', password: 'faculty123' },
      student: { email: 'student@campus.edu', password: 'student123' }
    };
    
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
    toast.success(`Demo ${role} credentials filled`);
  };

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

      <div className="w-full max-w-md mx-4 glass-morphism rounded-2xl overflow-hidden shadow-2xl">
        <motion.div 
          className="p-8 bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Smart Campus</h1>
            <p className="text-gray-600 dark:text-gray-300">Management System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
              Demo Credentials (Click to fill)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => fillDemoCredentials('admin')}
                className="px-3 py-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                Admin
              </button>
              <button
                onClick={() => fillDemoCredentials('faculty')}
                className="px-3 py-2 text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
              >
                Faculty
              </button>
              <button
                onClick={() => fillDemoCredentials('student')}
                className="px-3 py-2 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
              >
                Student
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">QR Code Attendance</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Location-verified attendance with real-time updates</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
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