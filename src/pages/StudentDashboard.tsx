import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  QrCode,
  Scan,
  MapPin,
  Wifi,
  UserCheck,
  X
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  schedule: string;
  attendance: number;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
}

interface AttendanceRecord {
  id: string;
  course: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success' | 'error'>('idle');
  const [locationVerified, setLocationVerified] = useState(false);
  const [wifiVerified, setWifiVerified] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setCourses([
      {
        id: '1',
        name: 'Computer Science Fundamentals',
        code: 'CS101',
        instructor: 'Dr. Smith',
        schedule: 'Mon, Wed, Fri 9:00 AM',
        attendance: 85
      },
      {
        id: '2',
        name: 'Data Structures',
        code: 'CS201',
        instructor: 'Prof. Johnson',
        schedule: 'Tue, Thu 2:00 PM',
        attendance: 92
      },
      {
        id: '3',
        name: 'Web Development',
        code: 'CS301',
        instructor: 'Dr. Brown',
        schedule: 'Mon, Wed 11:00 AM',
        attendance: 78
      }
    ]);

    setAssignments([
      {
        id: '1',
        title: 'Algorithm Analysis Report',
        course: 'CS201',
        dueDate: '2024-01-15',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Web Portfolio Project',
        course: 'CS301',
        dueDate: '2024-01-20',
        status: 'submitted'
      },
      {
        id: '3',
        title: 'Programming Assignment 3',
        course: 'CS101',
        dueDate: '2024-01-12',
        status: 'graded'
      }
    ]);

    setAttendance([
      {
        id: '1',
        course: 'CS101',
        date: '2024-01-10',
        status: 'present'
      },
      {
        id: '2',
        course: 'CS201',
        date: '2024-01-09',
        status: 'present'
      },
      {
        id: '3',
        course: 'CS301',
        date: '2024-01-08',
        status: 'late'
      }
    ]);
  }, []);

  const handleQRScan = () => {
    setShowQRScanner(true);
    setAttendanceStatus('scanning');
  };

  const handleScanComplete = (result: string) => {
    setScanResult(result);
    setAttendanceStatus('verifying');
    
    // Simulate verification process
    setTimeout(() => {
      setLocationVerified(true);
      setWifiVerified(true);
      setAttendanceStatus('success');
      
      // Add new attendance record
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        course: 'Current Class',
        date: new Date().toISOString().split('T')[0],
        status: 'present'
      };
      setAttendance(prev => [newRecord, ...prev]);
      
      setTimeout(() => {
        setShowQRScanner(false);
        setAttendanceStatus('idle');
        setScanResult('');
        setLocationVerified(false);
        setWifiVerified(false);
      }, 2000);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'absent': return 'text-red-600 bg-red-100';
      case 'late': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'graded': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-gray-600">Here's your academic overview for today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={handleQRScan}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
              <QrCode className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Mark Attendance</h3>
            <p className="text-sm text-gray-600">Scan QR code</p>
          </button>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Courses</h3>
            <p className="text-sm text-gray-600">{courses.length} enrolled</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Assignments</h3>
            <p className="text-sm text-gray-600">{assignments.filter(a => a.status === 'pending').length} pending</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Messages</h3>
            <p className="text-sm text-gray-600">3 unread</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">My Courses</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.code} • {course.instructor}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(course.attendance)}`}>
                        {course.attendance}% attendance
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.schedule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h2>
              <div className="space-y-3">
                {assignments.slice(0, 3).map((assignment) => (
                  <div key={assignment.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {assignment.status === 'graded' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : assignment.status === 'submitted' ? (
                        <Clock className="w-4 h-4 text-blue-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {assignment.title}
                      </p>
                      <p className="text-xs text-gray-500">{assignment.course}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Attendance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Attendance</h2>
              <div className="space-y-3">
                {attendance.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{record.course}</p>
                      <p className="text-xs text-gray-500">{record.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* QR Scanner Modal */}
        {showQRScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Mark Attendance</h3>
                <button
                  onClick={() => {
                    setShowQRScanner(false);
                    setAttendanceStatus('idle');
                    setScanResult('');
                    setLocationVerified(false);
                    setWifiVerified(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center">
                {attendanceStatus === 'scanning' && (
                  <div className="space-y-4">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                      <Scan className="w-16 h-16 text-gray-400 animate-pulse" />
                    </div>
                    <p className="text-gray-600">Position QR code within the frame</p>
                    <button
                      onClick={() => handleScanComplete('mock-qr-code-data')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Simulate Scan
                    </button>
                  </div>
                )}

                {attendanceStatus === 'verifying' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                      <UserCheck className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <p className="text-gray-600">Verifying attendance...</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Location verified</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Network verified</span>
                      </div>
                    </div>
                  </div>
                )}

                {attendanceStatus === 'success' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-600 font-semibold">Attendance Marked!</p>
                      <p className="text-sm text-gray-600">You have been marked present</p>
                    </div>
                  </div>
                )}

                {attendanceStatus === 'error' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <p className="text-red-600 font-semibold">Verification Failed</p>
                      <p className="text-sm text-gray-600">Please try again or contact support</p>
                    </div>
                    <button
                      onClick={() => setAttendanceStatus('scanning')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;