import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  Download, 
  Upload, 
  Save, 
  Send, 
  FileText, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle,
  Star,
  MessageSquare,
  Eye,
  Edit3,
  Calendar,
  Award,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Student {
  id: number;
  name: string;
  studentId: string;
  submissionDate: string;
  status: 'submitted' | 'graded' | 'late' | 'missing';
  grade?: number;
  feedback?: string;
  attachments: string[];
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  totalPoints: number;
  dueDate: string;
  description: string;
}

const GradingInterface: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assignmentData = location.state?.assignment;

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentGrade, setCurrentGrade] = useState<number>(0);
  const [currentFeedback, setCurrentFeedback] = useState<string>('');
  const [showRubric, setShowRubric] = useState(false);
  const [gradingMode, setGradingMode] = useState<'individual' | 'batch'>('individual');

  // Mock assignment data
  const [assignment] = useState<Assignment>(assignmentData || {
    id: 1,
    title: 'Algorithm Analysis Report',
    course: 'CS401',
    totalPoints: 100,
    dueDate: '2024-03-20',
    description: 'Analyze the time and space complexity of various sorting algorithms'
  });

  // Mock student submissions
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'John Doe',
      studentId: 'ST2024001',
      submissionDate: '2024-03-19 23:45',
      status: 'submitted',
      grade: undefined,
      feedback: '',
      attachments: ['algorithm_analysis.pdf', 'code_samples.zip']
    },
    {
      id: 2,
      name: 'Jane Smith',
      studentId: 'ST2024002',
      submissionDate: '2024-03-20 10:30',
      status: 'submitted',
      grade: 95,
      feedback: 'Excellent analysis with clear explanations and well-documented code.',
      attachments: ['report.pdf', 'implementation.py']
    },
    {
      id: 3,
      name: 'Mike Johnson',
      studentId: 'ST2024003',
      submissionDate: '2024-03-21 08:15',
      status: 'late',
      grade: undefined,
      feedback: '',
      attachments: ['late_submission.pdf']
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      studentId: 'ST2024004',
      submissionDate: '2024-03-18 14:20',
      status: 'submitted',
      grade: 88,
      feedback: 'Good work overall. Consider optimizing the bubble sort implementation.',
      attachments: ['analysis.docx', 'charts.xlsx']
    },
    {
      id: 5,
      name: 'David Brown',
      studentId: 'ST2024005',
      submissionDate: '',
      status: 'missing',
      grade: undefined,
      feedback: '',
      attachments: []
    }
  ]);

  const [rubricCriteria] = useState([
    { name: 'Algorithm Understanding', points: 25, description: 'Demonstrates clear understanding of algorithms' },
    { name: 'Complexity Analysis', points: 30, description: 'Accurate time and space complexity analysis' },
    { name: 'Code Quality', points: 25, description: 'Clean, well-documented code' },
    { name: 'Report Writing', points: 20, description: 'Clear explanations and proper formatting' }
  ]);

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      const firstUngraded = students.find(s => s.grade === undefined && s.status !== 'missing');
      setSelectedStudent(firstUngraded || students[0]);
    }
  }, [students, selectedStudent]);

  useEffect(() => {
    if (selectedStudent) {
      setCurrentGrade(selectedStudent.grade || 0);
      setCurrentFeedback(selectedStudent.feedback || '');
    }
  }, [selectedStudent]);

  const saveGrade = () => {
    if (!selectedStudent) return;

    setStudents(prev => prev.map(student => 
      student.id === selectedStudent.id 
        ? { 
            ...student, 
            grade: currentGrade, 
            feedback: currentFeedback,
            status: student.status === 'missing' ? 'missing' : 'graded'
          }
        : student
    ));

    toast.success(`Grade saved for ${selectedStudent.name}`);
  };

  const submitGrade = () => {
    if (!selectedStudent) return;

    saveGrade();
    
    // Move to next ungraded student
    const currentIndex = students.findIndex(s => s.id === selectedStudent.id);
    const nextUngraded = students.slice(currentIndex + 1).find(s => s.grade === undefined && s.status !== 'missing');
    
    if (nextUngraded) {
      setSelectedStudent(nextUngraded);
      toast.success(`Grade submitted for ${selectedStudent.name}. Moving to next student.`);
    } else {
      toast.success(`Grade submitted for ${selectedStudent.name}. All submissions graded!`);
    }
  };

  const downloadSubmission = (attachment: string) => {
    toast.success(`Downloading ${attachment}...`);
    setTimeout(() => {
      toast.success(`${attachment} downloaded successfully!`);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'graded':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'late':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'missing':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 dark:text-green-400';
    if (grade >= 80) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const gradedCount = students.filter(s => s.grade !== undefined).length;
  const submittedCount = students.filter(s => s.status !== 'missing').length;
  const averageGrade = students.filter(s => s.grade !== undefined).reduce((sum, s) => sum + (s.grade || 0), 0) / gradedCount || 0;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/faculty')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Grading: {assignment.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {assignment.course} • Due: {new Date(assignment.dueDate).toLocaleDateString()} • {assignment.totalPoints} points
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {gradedCount}/{submittedCount} graded
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
                <p className={`text-lg font-semibold ${getGradeColor(averageGrade)}`}>
                  {averageGrade.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-5rem)]">
          {/* Student List Sidebar */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Submissions</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setGradingMode('individual')}
                    className={`px-3 py-1 rounded text-sm ${
                      gradingMode === 'individual'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Individual
                  </button>
                  <button
                    onClick={() => setGradingMode('batch')}
                    className={`px-3 py-1 rounded text-sm ${
                      gradingMode === 'batch'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Batch
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Grading Progress</span>
                  <span>{Math.round((gradedCount / submittedCount) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(gradedCount / submittedCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {students.map((student) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedStudent?.id === student.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                          {student.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {student.studentId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {student.grade !== undefined ? (
                        <span className={`text-sm font-semibold ${getGradeColor(student.grade)}`}>
                          {student.grade}%
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Not graded</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                    {student.submissionDate && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(student.submissionDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Grading Area */}
          <div className="flex-1 flex flex-col">
            {selectedStudent ? (
              <>
                {/* Student Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-lg">
                          {selectedStudent.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {selectedStudent.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedStudent.studentId} • 
                          {selectedStudent.submissionDate ? (
                            <span className="ml-1">
                              Submitted: {new Date(selectedStudent.submissionDate).toLocaleString()}
                            </span>
                          ) : (
                            <span className="ml-1 text-red-600">No submission</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowRubric(!showRubric)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Rubric
                      </button>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedStudent.status)}`}>
                        {selectedStudent.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex">
                  {/* Submission Content */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    {selectedStudent.status !== 'missing' ? (
                      <>
                        {/* Assignment Description */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Assignment Description</h3>
                          <p className="text-blue-800 dark:text-blue-200">{assignment.description}</p>
                        </div>

                        {/* Attachments */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Submitted Files</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedStudent.attachments.map((attachment, index) => (
                              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    <div>
                                      <h4 className="font-medium text-gray-900 dark:text-white">{attachment}</h4>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {Math.floor(Math.random() * 500) + 100} KB
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => toast.success(`Viewing ${attachment}...`)}
                                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => downloadSubmission(attachment)}
                                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                    >
                                      <Download className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rubric */}
                        {showRubric && (
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grading Rubric</h3>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                              {rubricCriteria.map((criteria, index) => (
                                <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-medium text-gray-900 dark:text-white">{criteria.name}</h4>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">{criteria.description}</p>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                        /{criteria.points}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Submission</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          This student has not submitted their assignment.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Grading Panel */}
                  <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Grade Assignment</h3>
                    
                    {/* Grade Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Grade (out of {assignment.totalPoints})
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max={assignment.totalPoints}
                          value={currentGrade}
                          onChange={(e) => setCurrentGrade(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter grade"
                        />
                        <div className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">
                          /{assignment.totalPoints}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Percentage: {((currentGrade / assignment.totalPoints) * 100).toFixed(1)}%
                      </div>
                    </div>

                    {/* Quick Grade Buttons */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quick Grades
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[100, 95, 90, 85, 80, 75, 70, 65].map((grade) => (
                          <button
                            key={grade}
                            onClick={() => setCurrentGrade((grade / 100) * assignment.totalPoints)}
                            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            {grade}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Feedback
                      </label>
                      <textarea
                        rows={6}
                        value={currentFeedback}
                        onChange={(e) => setCurrentFeedback(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Provide feedback for the student..."
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={saveGrade}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </button>
                      <button
                        onClick={submitGrade}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Grade
                      </button>
                    </div>

                    {/* Previous Grade Info */}
                    {selectedStudent.grade !== undefined && (
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Previously Graded</h4>
                        <p className="text-sm text-green-800 dark:text-green-200">
                          Grade: {selectedStudent.grade}% ({selectedStudent.grade})
                        </p>
                        {selectedStudent.feedback && (
                          <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                            Feedback: {selectedStudent.feedback}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Student</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose a student from the list to start grading their submission.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GradingInterface;