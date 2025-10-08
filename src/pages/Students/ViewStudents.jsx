
// // src/pages/Students/ViewStudents.jsx - FIXED COLUMN KEY MISMATCH
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'; // <-- Added useNavigate
// import DataTable from '../../components/Tables/DataTable';
// import Tabs from '../../components/UI/Tabs';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/v1/students';

// // FIXED: Changed 'key' to 'accessor' to match DataTable.jsx
// const columns = [
//     { accessor: 'regNo', header: 'Reg No.', sortable: true },
//     { accessor: 'nameCandidate', header: 'Student Name', sortable: true }, // Use nameCandidate from model
//     { accessor: 'course', header: 'Course', sortable: true },
//     { accessor: 'centerCode', header: 'Center Code', sortable: true },
//     { accessor: 'status', header: 'Status', sortable: true },
//     { accessor: 'regDate', header: 'Reg Date', sortable: true },
// ];

// const ViewStudents = () => {
//     const [activeTab, setActiveTab] = useState('All Students');
//     const [studentData, setStudentData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [notification, setNotification] = useState(null);

//     const location = useLocation();
//     const navigate = useNavigate(); // <-- Initialized useNavigate

//     const fetchStudents = async (statusFilter) => {
//         setLoading(true);
//         try {
//             const statusParam = statusFilter === 'All Students' ? '' : `?status=${statusFilter}`;
//             const response = await axios.get(`${API_URL}${statusParam}`);

//             setStudentData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//             setStudentData([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchStudents(activeTab);
//     }, [activeTab]);

//     useEffect(() => {
//         if (location.state && location.state.successMessage) {
//             setNotification(location.state.successMessage);

//             const timer = setTimeout(() => {
//                 setNotification(null);
//                 window.history.replaceState({}, document.title);
//             }, 5000);

//             return () => clearTimeout(timer);
//         }
//     }, [location.state]);

//     const handleNewEntry = () => {
//         navigate('/students/register'); // Navigate to the new registration form
//     };

//     return (
//         <div className="space-y-8">
//             <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">Student Enrollment List</h1>

//             {notification && (
//                 <div className="p-3 rounded-lg bg-green-500 text-white font-medium">
//                     {notification}
//                 </div>
//             )}

//             <div className="bg-white p-6 rounded-xl shadow-lg">
//                 <Tabs
//                     tabs={[{ label: 'All Students' }]}
//                     activeTab={activeTab}
//                     setActiveTab={setActiveTab}
//                 />
//                 {loading ? (
//                     <p className="text-center py-8 text-lg text-teal-600">Loading student data...</p>
//                 ) : (
//                     <DataTable
//                         data={studentData}
//                         columns={columns}
//                         onNewEntryClick={handleNewEntry} // <-- Pass the correct handler
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ViewStudents;

// src/pages/Students/ViewStudents.jsx - MODIFIED for Approval Workflow
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../components/Tables/DataTable';
import Tabs from '../../components/UI/Tabs';
import axios from 'axios';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

const API_URL = 'http://localhost:5000/api/v1/students';

// MOCK USER ROLE: In a real app, this would come from an authentication context.
const CURRENT_USER_ROLE = 'Admin'; // Change to 'Center' to test center view

const columns = [
  { accessor: 'regNo', header: 'Reg No.', sortable: true },
  { accessor: 'nameCandidate', header: 'Student Name', sortable: true },
  { accessor: 'course', header: 'Course', sortable: true },
  { accessor: 'centerCode', header: 'Center Code', sortable: true },
  // NEW COLUMNS
  { accessor: 'approvalStatus', header: 'Approval', sortable: true },
  { accessor: 'paymentStatus', header: 'Payment', sortable: true },
  { accessor: 'regDate', header: 'Reg Date', sortable: true },
];

const ViewStudents = () => {
  const [activeTab, setActiveTab] = useState('All Students');
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Unified fetch function (memoized to prevent infinite loops)
  const fetchStudents = useCallback(async (statusFilter) => {
    setLoading(true);
    try {
      // We will filter by approval status if the Admin is looking for 'Pending' items,
      // but for simplicity here, we just use the existing 'status' filter.
      const statusParam = statusFilter === 'All Students' ? '' : `?status=${statusFilter}`;
      const response = await axios.get(`${API_URL}${statusParam}`);
      setStudentData(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudentData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handler for Admin Approve/Reject buttons
  const handleApprovalAction = async (studentId, action) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/approve/${studentId}`, { action });
      
      const statusText = action === 'approve' ? 'Approved' : 'Rejected';
      setNotification(`🚀 Registration for ${studentId} was successfully ${statusText}.`);
      
      // Re-fetch the data to update the table immediately
      fetchStudents(activeTab); 

    } catch (error) {
      const errorMsg = error.response?.data?.message || `Failed to perform ${action} action.`;
      setNotification(`❌ Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStudents(activeTab);
  }, [activeTab, fetchStudents]); // Depend on activeTab and fetchStudents

  useEffect(() => {
    if (location.state && location.state.successMessage) {
        setNotification(location.state.successMessage);
        
        const timer = setTimeout(() => {
            setNotification(null);
            window.history.replaceState({}, document.title); 
        }, 5000); 

        return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleNewEntry = () => {
    navigate('/students/register');
  };

  // DataTable requires a custom render function for the Actions column
  const renderActions = (row) => {
    console.log(row);
    if (CURRENT_USER_ROLE === 'Admin' && row?.approvalStatus === 'Pending') {
      return (
        <div className="flex space-x-2 px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button 
            onClick={() => handleApprovalAction(row._id, 'approve')} // Use MongoDB _id
            className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-xs flex items-center shadow-md transition-colors"
            title="Approve Registration (Final Payment Confirmation)"
          >
            <RiCheckLine className="mr-1" /> Approve
          </button>
          <button 
            onClick={() => handleApprovalAction(row._id, 'reject')}
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-xs flex items-center shadow-md transition-colors"
            title="Reject Registration (Payment Pending/Invalid)"
          >
            <RiCloseLine className="mr-1" /> Reject
          </button>
        </div>
      );
    }
    
    // Default actions for non-admin or already approved/rejected students
    return (
       null
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">Student Enrollment List ({CURRENT_USER_ROLE} View)</h1>

      {notification && (
          <div className={`p-3 rounded-lg text-white font-medium ${notification.startsWith('✅') || notification.startsWith('🚀') ? 'bg-green-500' : 'bg-red-500'}`}>
              {notification}
          </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Tabs
          tabs={['All Students', 'Active', 'Registered', 'Graduated']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {loading ? (
          <p className="text-center py-8 text-lg text-teal-600">Loading student data...</p>
        ) : (
          <DataTable 
            data={studentData} 
            columns={columns} 
            onNewEntryClick={handleNewEntry}
            renderActions={renderActions} // <-- Pass the custom action renderer
          />
        )}
      </div>
    </div>
  );
};

export default ViewStudents;

