import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Send, Search, Users, MessageSquare, Clock, CheckCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const Messages: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  // Use localStorage for persistent conversations and messages
  const [conversations, setConversations] = useLocalStorage(`conversations-${user?.role}`, []);
  const [messages, setMessages] = useLocalStorage(`messages-${selectedConversation?.id || 'none'}`, []);

  // Initialize conversations based on user role if empty
  useEffect(() => {
    if (conversations.length === 0 && user?.role) {
      if (user?.role === 'faculty') {
        setConversations([
          {
            id: 1,
            name: 'John Doe',
            role: 'Student',
            studentId: 'ST2024001',
            lastMessage: 'Thank you for the clarification on the assignment.',
            timestamp: '2 min ago',
            unread: 2,
            avatar: 'JD'
          },
          {
            id: 2,
            name: 'Jane Smith',
            role: 'Student',
            studentId: 'ST2024002',
            lastMessage: 'When is the next office hour?',
            timestamp: '1 hour ago',
            unread: 1,
            avatar: 'JS'
          },
          {
            id: 3,
            name: 'Mike Johnson',
            role: 'Student',
            studentId: 'ST2024003',
            lastMessage: 'I need help with the database project.',
            timestamp: '3 hours ago',
            unread: 0,
            avatar: 'MJ'
          }
        ]);
      } else if (user?.role === 'student') {
        setConversations([
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'Faculty',
            department: 'Computer Science',
            lastMessage: 'The assignment deadline has been extended.',
            timestamp: '30 min ago',
            unread: 1,
            avatar: 'SJ'
          },
          {
            id: 2,
            name: 'Prof. Michael Brown',
            role: 'Faculty',
            department: 'Computer Science',
            lastMessage: 'Please review the updated syllabus.',
            timestamp: '2 hours ago',
            unread: 0,
            avatar: 'MB'
          }
        ]);
      }
    }
  }, [user, conversations.length, setConversations]);

  // Initialize messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const conversationKey = `messages-${selectedConversation.id}`;
      const storedMessages = localStorage.getItem(conversationKey);
      
      if (!storedMessages) {
        // Initialize with default messages if none exist
        const defaultMessages = user?.role === 'faculty' ? [
          {
            id: 1,
            senderId: selectedConversation.id,
            senderName: selectedConversation.name,
            content: 'Hello Professor! I have a question about the upcoming assignment.',
            timestamp: '10:30 AM',
            isOwn: false
          },
          {
            id: 2,
            senderId: user?.id || 'current-user',
            senderName: user?.name || 'You',
            content: 'Hi! I\'d be happy to help. What specific question do you have?',
            timestamp: '10:32 AM',
            isOwn: true
          },
          {
            id: 3,
            senderId: selectedConversation.id,
            senderName: selectedConversation.name,
            content: 'I\'m having trouble understanding the requirements for the database design project.',
            timestamp: '10:35 AM',
            isOwn: false
          },
          {
            id: 4,
            senderId: user?.id || 'current-user',
            senderName: user?.name || 'You',
            content: 'The project requires you to design a normalized database schema for an e-commerce system. You need to include at least 5 tables with proper relationships.',
            timestamp: '10:38 AM',
            isOwn: true
          },
          {
            id: 5,
            senderId: selectedConversation.id,
            senderName: selectedConversation.name,
            content: 'Thank you for the clarification on the assignment.',
            timestamp: '10:40 AM',
            isOwn: false
          }
        ] : [
          {
            id: 1,
            senderId: user?.id || 'current-user',
            senderName: user?.name || 'You',
            content: 'Hello Professor! I have a question about the upcoming assignment.',
            timestamp: '10:30 AM',
            isOwn: true
          },
          {
            id: 2,
            senderId: selectedConversation.id,
            senderName: selectedConversation.name,
            content: 'Hi! I\'d be happy to help. What specific question do you have?',
            timestamp: '10:32 AM',
            isOwn: false
          },
          {
            id: 3,
            senderId: user?.id || 'current-user',
            senderName: user?.name || 'You',
            content: 'I\'m having trouble understanding the requirements for the database design project.',
            timestamp: '10:35 AM',
            isOwn: true
          },
          {
            id: 4,
            senderId: selectedConversation.id,
            senderName: selectedConversation.name,
            content: 'The assignment deadline has been extended to next Friday. You have more time to work on it.',
            timestamp: '10:38 AM',
            isOwn: false
          }
        ];
        
        localStorage.setItem(conversationKey, JSON.stringify(defaultMessages));
        setMessages(defaultMessages);
      } else {
        setMessages(JSON.parse(storedMessages));
      }
    }
  }, [selectedConversation, user, setMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: Date.now(),
        senderId: user?.id || 'current-user',
        senderName: user?.name || 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };

      // Update messages for this conversation
      const conversationKey = `messages-${selectedConversation.id}`;
      const currentMessages = JSON.parse(localStorage.getItem(conversationKey) || '[]');
      const updatedMessages = [...currentMessages, message];
      localStorage.setItem(conversationKey, JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      
      // Update conversation last message
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, lastMessage: newMessage, timestamp: 'Just now' }
          : conv
      ));

      setNewMessage('');
      toast.success('Message sent!');

      // Simulate reply after 2 seconds
      setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          senderId: selectedConversation.id,
          senderName: selectedConversation.name,
          content: user?.role === 'student' 
            ? 'Thank you for your message. I\'ll get back to you soon with more details.'
            : 'Thank you Professor! This helps a lot.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false
        };
        
        const latestMessages = JSON.parse(localStorage.getItem(conversationKey) || '[]');
        const withReply = [...latestMessages, reply];
        localStorage.setItem(conversationKey, JSON.stringify(withReply));
        setMessages(withReply);
      }, 2000);
    }
  };

  const startNewConversation = (recipientData: any) => {
    const newConv = {
      id: Date.now(),
      name: recipientData.name,
      role: recipientData.role,
      lastMessage: 'New conversation started',
      timestamp: 'Just now',
      unread: 0,
      avatar: recipientData.name.split(' ').map((n: string) => n[0]).join('')
    };
    
    setConversations(prev => [newConv, ...prev]);
    setSelectedConversation(newConv);
    setShowNewMessageModal(false);
    toast.success('New conversation started!');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className="w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
              <button
                onClick={() => setShowNewMessageModal(true)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-medium">{conversation.avatar}</span>
                    </div>
                    {conversation.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {conversation.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {conversation.role}
                          {conversation.studentId && ` • ${conversation.studentId}`}
                          {conversation.department && ` • ${conversation.department}`}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-medium">{selectedConversation.avatar}</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {selectedConversation.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedConversation.role}
                      {selectedConversation.studentId && ` • ${selectedConversation.studentId}`}
                      {selectedConversation.department && ` • ${selectedConversation.department}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-between mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.isOwn && <CheckCircle className="h-3 w-3" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Conversation Selected */
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>

        {/* New Message Modal */}
        {showNewMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Message</h2>
                <button
                  onClick={() => setShowNewMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {user?.role === 'student' ? (
                  // Student can message faculty
                  <>
                    <button
                      onClick={() => startNewConversation({ name: 'Dr. Emily Davis', role: 'Faculty' })}
                      className="w-full p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white">Dr. Emily Davis</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Database Systems Professor</p>
                    </button>
                    <button
                      onClick={() => startNewConversation({ name: 'Prof. James Wilson', role: 'Faculty' })}
                      className="w-full p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white">Prof. James Wilson</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Advanced Algorithms Professor</p>
                    </button>
                  </>
                ) : (
                  // Faculty can message students
                  <>
                    <button
                      onClick={() => startNewConversation({ name: 'Sarah Wilson', role: 'Student' })}
                      className="w-full p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white">Sarah Wilson</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Student • ST2024004</p>
                    </button>
                    <button
                      onClick={() => startNewConversation({ name: 'David Brown', role: 'Student' })}
                      className="w-full p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white">David Brown</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Student • ST2024005</p>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Messages;