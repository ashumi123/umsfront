import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/Tables/DataTable'; // Assuming this path
import Tabs from '../../components/UI/Tabs'; // Assuming this path
// import CertificateModal from '../../components/modals/CertificateModal'; // To display the certificate
import axios from 'axios';
import { RiCheckLine, RiDownloadLine, RiEyeLine } from 'react-icons/ri';
import CertificateTemplate from './CertificateTemplate';

const API_URL = 'https://umsbackend-l795.onrender.com/api/v1/students/studentsMarks/';
const API_URL_STUDENT = 'https://umsbackend-l795.onrender.com/api/v1/students/';

// Columns for the Marks Management Dashboard
const columns = [
  { accessor: 'enrollmentNo', header: 'Reg No.', sortable: true },
  { accessor: 'nameCandidate', header: 'Student Name', sortable: true },
  { accessor: 'program', header: 'Course', sortable: true },
  // { accessor: 'centerCode', header: 'Center Code', sortable: true },
  // { accessor: 'marksStatus', header: 'Marks Status', sortable: true },
  // { accessor: 'certificateStatus', header: 'Certificate Approval', sortable: true },
  { accessor: 'overallPercentage', header: 'SGPA', sortable: false },
  { accessor: 'finalCGPA', header: 'CGPA', sortable: false },
];

const MarksAndCertificateManagement = () => {
  const [activeTab, setActiveTab] = useState('Ready for Approval');
  const [studentMarksData, setStudentMarksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const navigate = useNavigate();

  // Load user details from localStorage (simulating auth context)
  useEffect(() => {
    const userDetail = localStorage.getItem('userData');
    if (userDetail) {
      const parsedUserDetail = JSON.parse(userDetail);
      setUser(parsedUserDetail.user);
    }
  }, []);

  // Unified fetch function
  const fetchMarksData = useCallback(async (filter) => {
    setLoading(true);
    try {
      // The backend should handle filtering based on 'marksStatus' and 'certificateStatus'
      let statusParam = '';
      if (filter === 'Ready for Approval') {
        // Fetch students whose marks are entered and final approval is pending
        statusParam = '?marksStatus=Entered&certificateStatus=Pending';
      } else if (filter === 'Approved') {
        // Fetch students whose certificate is finally approved
        statusParam = '?certificateStatus=Approved';
      } else if (filter === 'Marks Pending') {
        // Fetch students whose marks haven't been entered yet
        statusParam = '?marksStatus=Pending';
      }

      const response = await axios.get(`${API_URL}${statusParam}`);
      console.log('response',response);
      // Map the response data to match DataTable structure
      const formattedData = response.data.data.map(item => ({
        ...item.student, // spread student details
        ...item, // overwrite with marks/status details
        _id: item?._id, // Ensure student ID is available
        sgpa: item?.sgpa?.toFixed(2) || 'N/A',
        cgpa: item?.finalCGPA?.toFixed(2) || 'N/A',
      }));


      setStudentMarksData(formattedData);
    } catch (error) {
      console.error('Error fetching marks data:', error);
      setStudentMarksData([]);
      setNotification('❌ Error fetching student marks data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarksData(activeTab);
  }, [activeTab, fetchMarksData]);

  // Handler for Admin Certificate Approval
  const handleCertificateApproval = async (studentMarksId) => {
    setLoading(true);
    try {
      // API call to update certificateStatus to 'Approved'
      const response = await axios.put(`${API_URL}/approve-certificate/${studentMarksId}`);
      
      setNotification(`🚀 Certificate for student ${response.data.data.regNo} successfully approved!`);
      
      // Re-fetch data to update the table
      fetchMarksData(activeTab); 

    } catch (error) {
      const errorMsg = error.response?.data?.message || `Failed to approve certificate.`;
      setNotification(`❌ Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Handler for generating/downloading the PDF
  const handleCertificateDownload = async (studentId) => {
    setNotification('Preparing certificate for download...');
    try {
      const response = await axios.get(`${API_URL}/download-certificate/${studentId}`, {
        responseType: 'blob', // Important for downloading files
      });

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${studentId}_Certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setNotification('✅ Certificate download initiated successfully!');

    } catch (error) {
      console.error('Error downloading certificate:', error);
      setNotification('❌ Error generating or downloading the certificate.');
    }
  };
  
  // Handler for viewing mark sheet in modal
  const handleViewCertificate =async (student) => {

    try {
        const response =await axios.post(`${API_URL_STUDENT}studentsMarksById`,{_id:student?._id})
        setSelectedStudent(response.data.data[0]);
    setIsModalOpen(true);
    } catch (error) {
        
    }

  };

  // DataTable custom render function for Actions column
  const renderActions = (row) => {
    // Determine the ID to use. The row is the combined marks object, but we often need the student._id
    const studentId = row._id;
    const marksId = row.marksId; // The ID of the marks document (or use row._id if it's the marks doc ID)

    if (user?.type === 'Admin') {
      return (
        <div className="flex space-x-2 py-2 whitespace-nowrap text-sm font-medium">
          {/* View Button */}
          <button 
            onClick={() => handleViewCertificate(row)}
            className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs flex items-center shadow-md transition-colors"
            title="View Mark Sheet Details"
          >
            <RiEyeLine className="mr-1" /> View
          </button>

          {/* Approval Button (Only shown if Pending) */}
          {row.certificateStatus === 'Pending' && row.marksStatus === 'Entered' && (
            <button 
              onClick={() => handleCertificateApproval(row.marksId || row._id)} 
              className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-xs flex items-center shadow-md transition-colors"
              title="Final Certificate Approval"
            >
              <RiCheckLine className="mr-1" /> Approve Final
            </button>
          )}

          {/* Download Button (Only shown if Approved) */}
          {row.certificateStatus === 'Approved' && (
            <button 
              onClick={() => handleCertificateDownload(studentId)}
              className="text-white bg-teal-500 hover:bg-teal-600 px-3 py-1 rounded-md text-xs flex items-center shadow-md transition-colors"
              title="Download Final Certificate"
            >
              <RiDownloadLine className="mr-1" /> Download
            </button>
          )}

          {/* Placeholder for Data Entry if marks are pending */}
          {row.marksStatus === 'Pending' && (
            <span className="text-sm text-gray-500 italic">Marks Entry Pending</span>
          )}
        </div>
      );
    }
    
    return <span className="text-sm text-gray-500 italic">No Actions</span>;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-800">Marks & Certificate Management ({user?.type} View)</h1>
      </div>

      {notification && (
        <div className={`p-3 rounded-lg text-white font-medium ${notification.startsWith('✅') || notification.startsWith('🚀') ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* <Tabs
          tabs={[
            { label: 'Ready for Approval', path: 'ready' },
            { label: 'Approved', path: 'approved' },
            { label: 'Marks Pending', path: 'pending' },
          ]}       
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        /> */}
        {loading ? (
          <p className="text-center py-8 text-lg text-teal-600">Loading student marks data...</p>
        ) : (
          <DataTable 
            data={studentMarksData} 
            columns={columns} 
            renderActions={renderActions} 
          />
        )}
      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedStudent && (
        <CertificateTemplate 
          studentData={selectedStudent} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default MarksAndCertificateManagement;
