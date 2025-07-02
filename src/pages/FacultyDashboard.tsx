import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  Award, 
  TrendingUp,
  Eye,
  Download,
  ExternalLink,
  X
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: 'pending' | 'graded' | 'overdue';
}

interface StudentSubmission {
  id: string;
  studentName: string;
  studentId: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
  grade?: number;
  fileName: string;
  fileSize: string;
}

const FacultyDashboard: React.FC = () => {
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const stats = [
    { title: 'Active Courses', value: '6', icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Total Students', value: '142', icon: Users, color: 'bg-green-500' },
    { title: 'Pending Grades', value: '23', icon: Award, color: 'bg-yellow-500' },
    { title: 'This Week Classes', value: '18', icon: Calendar, color: 'bg-purple-500' },
  ];

  const gradingAssignments: Assignment[] = [
    {
      id: '1',
      title: 'Midterm Examination',
      course: 'Computer Science 101',
      dueDate: '2024-01-15',
      submissions: 28,
      totalStudents: 30,
      status: 'pending'
    },
    {
      id: '2',
      title: 'Data Structures Project',
      course: 'Computer Science 201',
      dueDate: '2024-01-12',
      submissions: 25,
      totalStudents: 25,
      status: 'graded'
    },
    {
      id: '3',
      title: 'Algorithm Analysis',
      course: 'Computer Science 301',
      dueDate: '2024-01-10',
      submissions: 22,
      totalStudents: 24,
      status: 'overdue'
    },
  ];

  const studentSubmissions: StudentSubmission[] = [
    {
      id: '1',
      studentName: 'Alice Johnson',
      studentId: 'CS2024001',
      submittedAt: '2024-01-14 14:30',
      status: 'submitted',
      fileName: 'midterm_alice_johnson.pdf',
      fileSize: '2.4 MB'
    },
    {
      id: '2',
      studentName: 'Bob Smith',
      studentId: 'CS2024002',
      submittedAt: '2024-01-14 16:45',
      status: 'graded',
      grade: 85,
      fileName: 'midterm_bob_smith.pdf',
      fileSize: '1.8 MB'
    },
    {
      id: '3',
      studentName: 'Carol Davis',
      studentId: 'CS2024003',
      submittedAt: '2024-01-15 09:15',
      status: 'late',
      fileName: 'midterm_carol_davis.pdf',
      fileSize: '3.1 MB'
    },
  ];

  const recentActivities = [
    { action: 'Graded assignment', course: 'CS 201', time: '2 hours ago' },
    { action: 'Posted new material', course: 'CS 101', time: '4 hours ago' },
    { action: 'Scheduled office hours', course: 'CS 301', time: '1 day ago' },
    { action: 'Updated course syllabus', course: 'CS 101', time: '2 days ago' },
  ];

  const viewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionsModal(true);
  };

  const downloadSubmission = (submission: StudentSubmission) => {
    // Simulate file download
    console.log(`Downloading ${submission.fileName}`);
  };

  const viewPDF = (submission: StudentSubmission) => {
    // Simulate PDF viewing
    console.log(`Viewing ${submission.fileName}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back, Professor Johnson
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grading Queue */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Grading Queue</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {gradingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">{assignment.course}</p>
                    <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {assignment.submissions}/{assignment.totalStudents}
                      </p>
                      <p className="text-xs text-gray-500">Submitted</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                    <button
                      onClick={() => viewSubmissions(assignment)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="View Submissions"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.course}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <div className="text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Create Assignment</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Schedule Class</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">View Analytics</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* View Submissions Modal */}
      {showSubmissionsModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedAssignment.title} - Submissions
                </h2>
                <p className="text-sm text-gray-600">{selectedAssignment.course}</p>
              </div>
              <button
                onClick={() => setShowSubmissionsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {studentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{submission.studentName}</h3>
                          <p className="text-sm text-gray-600">ID: {submission.studentId}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Submitted: {submission.submittedAt}</p>
                        <p>File: {submission.fileName} ({submission.fileSize})</p>
                        {submission.grade && (
                          <p className="font-medium text-green-600">Grade: {submission.grade}/100</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => viewPDF(submission)}
                        className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                        title="View PDF"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => downloadSubmission(submission)}
                        className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;