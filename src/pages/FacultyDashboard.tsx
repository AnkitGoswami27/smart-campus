       </div>
              </form>
            </motion.div>
          </div>
        )}

        {showStudentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Progress</h2>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studentProgress.map((student) => (
                  <div key={student.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{student.studentId}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">GPA:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.gpa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Attendance:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.attendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Courses:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{student.courses}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Reports</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-blue-900 dark:text-blue-300">Total Students</h3>
                    <p className="text-2xl font-bold text-blue-600">{facultyData.totalStudents}</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-green-900 dark:text-green-300">Active Courses</h3>
                    <p className="text-2xl font-bold text-green-600">{facultyData.activeCourses}</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <h3 className="font-medium text-orange-900 dark:text-orange-300">Avg. Attendance</h3>
                    <p className="text-2xl font-bold text-orange-600">88.3%</p>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Course Performance Summary</h3>
                  <div className="space-y-2">
                    {courses.map((course) => (
                      <div key={course.id} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{course.code}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{course.attendanceRate}% attendance</span>
                      </div>
                    ))}
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

        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upload Course Materials</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Drag & drop files here or click to browse</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors"
                  >
                    Choose Files
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">Selected Files:</h3>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFileUpload}
                  disabled={selectedFiles.length === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Upload Files
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FacultyDashboard;