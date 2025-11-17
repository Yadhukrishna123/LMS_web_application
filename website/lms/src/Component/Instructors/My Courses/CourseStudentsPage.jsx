import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';

const CourseStudentsPage = () => {
  const enrolledStudents = [
    { id: 1, name: 'John Doe', email: 'john@example.com', enrolledDate: '2024-01-15', progress: 75, status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', enrolledDate: '2024-01-20', progress: 45, status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', enrolledDate: '2024-02-01', progress: 100, status: 'completed' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', enrolledDate: '2024-02-10', progress: 30, status: 'active' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', enrolledDate: '2024-03-05', progress: 60, status: 'active' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', enrolledDate: '2024-03-12', progress: 90, status: 'active' },
    { id: 7, name: 'David Wilson', email: 'david@example.com', enrolledDate: '2024-03-18', progress: 100, status: 'completed' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', enrolledDate: '2024-04-01', progress: 25, status: 'active' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = enrolledStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    // You can open a modal or navigate to a detail page
    console.log('Viewing details for:', student);
  };

  const exportStudents = () => {
    console.log('Exporting students data...');
    alert('Student data exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Enrolled Students</h1>
          <button
            onClick={exportStudents}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <p className="text-3xl font-bold text-gray-800">{enrolledStudents.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Active Students</p>
            <p className="text-3xl font-bold text-blue-600">
              {enrolledStudents.filter(s => s.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {enrolledStudents.filter(s => s.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Enrolled Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Progress
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.enrolledDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ maxWidth: '100px' }}>
                          <div
                            className={`${getProgressColor(student.progress)} h-2 rounded-full transition-all`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 min-w-[45px]">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => viewStudentDetails(student)}
                        className="text-blue-500 hover:text-blue-700 font-semibold text-sm hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No students found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <div>
            Showing <span className="font-semibold">{filteredStudents.length}</span> of{' '}
            <span className="font-semibold">{enrolledStudents.length}</span> students
          </div>
          <div>
            Filtered by: <span className="font-semibold">{statusFilter === 'all' ? 'All' : statusFilter}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStudentsPage;