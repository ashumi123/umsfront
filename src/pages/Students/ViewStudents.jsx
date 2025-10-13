
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../components/Tables/DataTable';
import Tabs from '../../components/UI/Tabs';
import axios from 'axios';
import { RiCheckLine, RiCloseLine,RiAddCircleLine } from 'react-icons/ri';

const API_URL = 'https://umsbackend-l795.onrender.com/api/v1/students';

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
  const [user,setUser]=useState(null)
useEffect(() => {
  getUserDetail()
}, [])
const getUserDetail=async()=>{
  let userDetail= localStorage.getItem('userData')
  let parseUserDetail= await JSON.parse(userDetail)
  setUser(parseUserDetail.user)
}
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
    if (user?.type === 'Admin' && row?.approvalStatus === 'Pending') {
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
            <div className="flex justify-between items-center border-b pb-3">

      <h1 className="text-2xl font-bold text-gray-800  pb-3">Student Enrollment List ({user?.type} View)</h1>
      <button
          onClick={() => navigate('/students/marks')}
          className="flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 transition-colors"
        >
          Student Certificate
        </button>
      <button
          onClick={() => navigate('/students/register')}
          className="flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 transition-colors"
        >
          <RiAddCircleLine className="mr-2 w-5 h-5" />
          Add New Student
        </button>
        </div>
      {notification && (
          <div className={`p-3 rounded-lg text-white font-medium ${notification.startsWith('✅') || notification.startsWith('🚀') ? 'bg-green-500' : 'bg-red-500'}`}>
              {notification}
          </div>
      )}



      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Tabs
          tabs={[{ label: 'Student List', path: '/students/all' }] }       
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

