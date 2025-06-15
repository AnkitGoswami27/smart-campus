import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  Search,
  GraduationCap,
  Building,
  UserCheck,
  MessageSquare,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your campus assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    logout();
    navigate('/login');
    toast.success('Returned to login');
  };

  const handleSendChatMessage = () => {
    if (!newChatMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newChatMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate bot response based on user role and message
    setTimeout(() => {
      let botResponse = '';
      const message = newChatMessage.toLowerCase();

      if (user?.role === 'faculty') {
        if (message.includes('schedule') || message.includes('timetable')) {
          botResponse = "I can help you create schedules! You can use the schedule management in your dashboard to set up class timings, office hours, and exam schedules.";
        } else if (message.includes('attendance')) {
          botResponse = "For attendance, you can generate QR codes for your classes. Students scan them to mark attendance automatically with location verification.";
        } else if (message.includes('grade') || message.includes('marks')) {
          botResponse = "You can manage grades through the grading interface. Upload assignments, set rubrics, and provide feedback to students.";
        } else {
          botResponse = "I can assist with scheduling classes, managing attendance, grading assignments, and course management. What specific task would you like help with?";
        }
      } else if (user?.role === 'student') {
        if (message.includes('assignment') || message.includes('homework')) {
          botResponse = "You can view all your assignments in the assignments section. Check due dates, submission status, and grades there.";
        } else if (message.includes('schedule') || message.includes('timetable')) {
          botResponse = "Your class schedule is available in the dashboard. You can also set reminders for upcoming classes and exams.";
        } else if (message.includes('grade') || message.includes('marks')) {
          botResponse = "Check your grades in the grades section. You can see detailed breakdowns by course and track your GPA progress.";
        } else if (message.includes('fee') || message.includes('payment')) {
          botResponse = "You can pay fees through the fee payment portal in your dashboard. Multiple payment methods are supported.";
        } else {
          botResponse = "I can help with assignments, schedules, grades, fee payments, course registration, and general campus information. What would you like to know?";
        }
      } else {
        botResponse = "I can help with various campus management tasks. What specific information do you need?";
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      };

      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);

    setNewChatMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Smart Campus</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>

            <button
              onClick={handleBackToLogin}
              className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Back to Login
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="w-full">
        {children}
      </main>

      {/* Chatbot Button */}
      <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {showChatbot && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setShowChatbot(false)}
            />
            
            {/* Chat Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Campus Assistant</h3>
                      <p className="text-xs text-blue-100">
                        {user?.role === 'faculty' ? 'Schedule & Course Helper' : 'Student Support'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChatbot(false)}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isBot ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  />
                  <button
                    onClick={handleSendChatMessage}
                    disabled={!newChatMessage.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;