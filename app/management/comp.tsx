'use client';

import { useState} from 'react';
import deleteEmployee from "./emplyoeeToDelete";
import updateEmployee from './employeeToUpdate';
import addEmployee from './employeeToAdd'
import { useRouter } from "next/navigation";

import {
  Search,
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  UserPlus,
  Users,
  ShieldCheck,
  TrendingUp,
  Clock,
} from 'lucide-react';

export interface Employee {
  _id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'on-leave';
}

export interface nEmployee {
  name: string;
  email: string;
  department: string;
  position: string;
  salary: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'on-leave';
}

const departments = [
  { label: "All Departments", value: "All" },
  { label: "Engineering", value: "engineering" },
  { label: "HR", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
];

export default function EmployeeManagementPage({data}:{data:Employee[]}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState<nEmployee>({
  name: "",
  email: "",
  department: "",
  position: "",
  salary: "",
  hireDate: "",
  status: "active",
});

  const itemsPerPage = 10;

  const router = useRouter();
  
  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      'on-leave': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      inactive: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      engineering: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      hr: 'bg-green-500/20 text-green-400 border-green-500/30',
      finance: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      marketing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      sales: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    };
    return colors[department] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  /////Clear Filters
  const clearFilters=()=>{
    setSelectedDepartment('All');
    setSelectedStatus('All');
    setSearchQuery('');
  }

  // Filter employees
  const filteredEmployees = data.filter((employee) => {
    const matchesSearch =
      searchQuery === '' ||
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment =
      selectedDepartment === 'All' || employee.department === selectedDepartment;
    
    const matchesStatus =
      selectedStatus === 'All' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });


  //pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
  const totalFilteredPages = Math.max(1, Math.ceil(filteredEmployees.length / itemsPerPage));

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto" style={{ backgroundColor: '#0a0e1a', color: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-orange-200 to-yellow-100 bg-clip-text text-transparent">
            Employee Management 
          </h1>
          <p className="mt-2 text-xl text-white/70">Complete CRUD operations with advanced validation & security</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="cursor-default flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={
              ()=>{
                 setNewEmployee({
                  name: "",
                  email: "",
                  department: "",
                  position: "",
                  salary: "",
                  hireDate: "",
                  status: "active",
                    });
                setShowNewModal(true)}}
          >
            <PlusCircle className="w-5 h-5" />
            Add New Employee
          </button>
          <button
            className="cursor-default flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
            onClick={clearFilters}
>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-white/20 text-black placeholder-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none"
            >
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>{dept.label}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-4 py-3 bg-white border border-white/20 text-black placeholder-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none"
            >
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

              
        </div>
        <p className="text-white/70 text-lg">{filteredEmployees.length} employees found • Total {data.length} employees</p>
      </div>

      {/* Employees Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-bold text-white/80 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-6 text-left text-sm font-bold text-white/80 uppercase tracking-wider">Department</th>
                <th className="px-6 py-6 text-left text-sm font-bold text-white/80 uppercase tracking-wider">Position</th>
                <th className="px-6 py-6 text-left text-sm font-bold text-white/80 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-6 text-left text-sm font-bold text-white/80 uppercase tracking-wider">Hire Date</th>
                <th className="px-6 py-6 text-left text-sm font-bold text-white/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-6 text-right text-sm font-bold text-white/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedEmployees.map((employee) => (
                <tr key={employee._id} className="group hover:bg-white/10 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/30 to-orange-400/50 rounded-2xl flex items-center justify-center border-2 border-orange-500/40">
                        <Users className="w-6 h-6 text-orange-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-orange-300 transition-colors">{employee.name}</h3>
                        <p className="text-white/70 text-sm">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${getDepartmentColor(employee.department)}`}>
                      {employee.department.charAt(0).toUpperCase() + employee.department.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-white/90 font-semibold">{employee.position}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-orange-400 font-bold text-lg">{employee.salary}</span>
                  </td>
                  <td className="px-6 py-6 text-white/70">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(employee.hireDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border ${getStatusColor(employee.status)}`}>
                      {employee.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          //writes data in modal
                          setEditingEmployee(employee);
                          //shows modal 
                          setShowEditModal(true);
                        }}
                        className="p-3 rounded-2xl bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/30 transition-all group"
                        title="Edit Employee"
                      >
                        <Edit className="w-5 h-5 group-hover:scale-110" />
                      </button>
                      <button
                        onClick={
                          ()=>{
                               setShowDeleteModal(true)
                               setEmployeeToDelete(employee._id)
                          }
                        }
                        className="p-3 rounded-2xl bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 transition-all group"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredEmployees.length > itemsPerPage && (
          <div className="px-8 py-6 border-t border-white/10 bg-white/5">
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-sm">
                Page {currentPage} of {totalFilteredPages} • Showing {paginatedEmployees.length} of {filteredEmployees.length} employees
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="cursor-default p-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-all"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg">
                  {currentPage}
                </button>
                <button
                  className="cursor-default p-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {/* need to add what should be done after clicking the delete  */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-500/20 rounded-2xl border border-red-500/30">
                <AlertCircle className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Delete Employee?</h3>
                <p className="text-white/70">This action cannot be undone. Employee data will be permanently removed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                setShowDeleteModal(false);
                }}
                className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!employeeToDelete) return;

                  try {
                    await deleteEmployee(employeeToDelete); 
                    setShowDeleteModal(false);
                    setEmployeeToDelete(null);
                    router.refresh();
                  } catch (error) {
                    console.error(error);
                    alert("Failed to delete employee");
                  }
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete 
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Edit Modal */}
      {/* need to add what should be done after clicking the update  */}
      {(showEditModal ) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              {editingEmployee && (
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{editingEmployee.department}</span>
              )}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/90 font-semibold mb-3">Full Name</label>
                <input
                  type="text"
                  value={editingEmployee?.name}
                  onChange={(e) => {
                    if (editingEmployee) setEditingEmployee({ ...editingEmployee, name: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Email</label>
                <input
                  type="email"
                  value={editingEmployee?.email}
                  onChange={(e) => {
                    if (editingEmployee) setEditingEmployee({ ...editingEmployee, email: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="employee@company.com"
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Department</label>
                <select
                    value={editingEmployee?.department || ""}
                    onChange={(e) =>
                      editingEmployee &&
                      setEditingEmployee({ ...editingEmployee, department: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/50"
                  >
                    <option value="" className="bg-white text-black">
                      Select Department
                    </option>
                    <option value="engineering" className="bg-white text-black">
                      Engineering
                    </option>
                    <option value="hr" className="bg-white text-black">
                      HR
                    </option>
                    <option value="finance" className="bg-white text-black">
                      Finance
                    </option>
                    <option value="marketing" className="bg-white text-black">
                      Marketing
                    </option>
                    <option value="sales" className="bg-white text-black">
                      Sales
                    </option>
                  </select>

              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Position</label>
                <input
                  type="text"
                  value={editingEmployee?.position}
                  onChange={(e) => {
                    if (editingEmployee) setEditingEmployee({ ...editingEmployee, position: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="Job title"
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Salary</label>
                <input
                  type="text"
                  value={editingEmployee?.salary }
                  onChange={(e) => {
                    if (editingEmployee) setEditingEmployee({ ...editingEmployee, salary: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="$0"
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Hire Date</label>
                <input
                  type="date"
                  value={editingEmployee?.hireDate.split('T')[0]}
                  onChange={(e) => {
                    if (editingEmployee) setEditingEmployee({ ...editingEmployee, hireDate: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/90 font-semibold mb-3">Status</label>
                <select
                  value={editingEmployee?.status || ""}
                  onChange={(e) =>
                    editingEmployee &&
                    setEditingEmployee({ ...editingEmployee, status: e.target.value as any })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/50"
                >
                  <option value="active" className="bg-white text-black">
                    Active
                  </option>
                  <option value="on-leave" className="bg-white text-black">
                    On Leave
                  </option>
                  <option value="inactive" className="bg-white text-black">
                    Inactive
                  </option>
                </select>

              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingEmployee(null);
                }}
                className="flex-1 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!editingEmployee) return;

                  try {
                    await updateEmployee(editingEmployee); 
                    setShowEditModal(false);
                    setEditingEmployee(null);
                    router.refresh();
                  } catch (error) {
                    console.error(error);
                    alert("Failed to delete employee");
                  }
                }}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-3"
              >
                <UserPlus className="w-5 h-5" />
                {editingEmployee ? 'Update Employee' : 'Create Employee'}
              </button>
            </div>
          </div>
        </div>
      )}

       {/* New add Modal */}
      {(showNewModal) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              Add New Employee
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/90 font-semibold mb-3">Full Name</label>
                <input
                  type="text"
                  value={newEmployee?.name}
                  onChange={(e) => {
                    if (newEmployee) setNewEmployee({ ...newEmployee, name: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Email</label>
                <input
                  type="email"
                  value={newEmployee?.email}
                  onChange={(e) => {
                    if (newEmployee) setNewEmployee({ ...newEmployee, email: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="employee@company.com"
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Department</label>
                <select
                    value={newEmployee.department}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, department: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/50"
                  >
                    <option value="" className="text-black bg-white">
                      Select Department
                    </option>
                    <option value="engineering" className="text-black bg-white">
                      Engineering
                    </option>
                    <option value="hr" className="text-black bg-white">
                      HR
                    </option>
                    <option value="finance" className="text-black bg-white">
                      Finance
                    </option>
                    <option value="marketing" className="text-black bg-white">
                      Marketing
                    </option>
                    <option value="sales" className="text-black bg-white">
                      Sales
                    </option>
                </select>

              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Position</label>
                <input
                  type="text"
                  value={newEmployee?.position}
                  onChange={(e) => {
                    if (newEmployee) setNewEmployee({ ...newEmployee, position: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="Job title"
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Salary</label>
                <input
                  type="text"
                  value={newEmployee?.salary }
                  onChange={(e) => {
                    if (newEmployee) setNewEmployee({ ...newEmployee, salary: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="$0"
                />
              </div>
              <div>
                <label className="block text-white/90 font-semibold mb-3">Hire Date</label>
                <input
                  type="date"
                  value={newEmployee?.hireDate.split('T')[0]}
                  onChange={(e) => {
                    if (newEmployee) setNewEmployee({ ...newEmployee, hireDate: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/90 font-semibold mb-3">Status</label>
                <select
                  value={newEmployee.status}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, status: e.target.value as any })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/50"
                >
                  <option value="active" className="text-black bg-white">
                    Active
                  </option>
                  <option value="on-leave" className="text-black bg-white">
                    On Leave
                  </option>
                  <option value="inactive" className="text-black bg-white">
                    Inactive
                  </option>
                </select>

              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => {
                  setShowNewModal(false);
                }}
                className="flex-1 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!newEmployee) return;

                  try {
                    if (
                      !newEmployee.name.trim() ||
                      !newEmployee.email.trim() ||
                      !newEmployee.department ||
                      !newEmployee.position ||
                      !newEmployee.salary ||
                      !newEmployee.hireDate
                    ) {
                      alert("All fields are required");
                      return;
                    }
                    await addEmployee(newEmployee); 
                    setShowNewModal(false);
                    router.refresh();
                  } catch (error) {
                    console.error(error);
                    alert("Failed to delete employee");
                  }
                }}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-3"
              >
                <UserPlus className="w-5 h-5" />
                Create Employee
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


