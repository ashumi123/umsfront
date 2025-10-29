import React, { useState, useEffect } from 'react';
import DataTable from '../../components/Tables/DataTable';
import Tabs from '../../components/UI/Tabs';
import { RiAddCircleLine, RiFileExcel2Fill } from 'react-icons/ri'; // Import RiFileExcel2Fill
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://umsbackend-l795.onrender.com/api/v1/centers';

// Defines the columns for the DataTable component
const columns = [
  { accessor: 'centerCode', header: 'CODE', sortable: true },
  { accessor: 'name', header: 'CENTER NAME', sortable: true },
  { accessor: 'city', header: 'CITY', sortable: true },
  { accessor: 'email', header: 'EMAIL', sortable: false },
  // Corresponds to 'STUDENTS ENROLLED'
  { accessor: 'studentsEnrolled', header: 'STUDENTS ENROLLED', sortable: true }, 
  { accessor: 'status', header: 'STATUS', sortable: true },
];

const ViewCenters = () => {
  const [activeTab, setActiveTab] = useState({ label: 'View All Centers', path: '/user/view-all-centers' });
  const [centerData, setCenterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // Added for success/error messages
  const navigate = useNavigate();

  const tabs = [
    { label: 'View All Centers', path: '/user/view-all-centers' },
    { label: 'View Active Centers', path: '/user/view-active-centers' },
    { label: 'View Inactive Centers', path: '/user/view-inactive-centers' },
];

  useEffect(()=>{
    // Determine filter based on activeTab.label
    let filter;
    if(activeTab.label === tabs[1].label){
        filter = 'Active';
    }
    else if(activeTab.label === tabs[2].label){
        filter = 'Inactive';
    }
    else{
        filter = 'All Centers';
    }
    fetchCenters(filter);
  },[activeTab.label])

  const fetchCenters = async (statusFilter) => {
    setLoading(true);
    setMessage('');
    try {
      // Constructs the API URL with a query parameter for filtering
      const statusParam = statusFilter === 'All Centers' ? '' : `?status=${statusFilter}`;
      
      const response = await axios.get(`${API_URL}${statusParam}`);
      // Ensure data is structured correctly if nested
      const data = response.data.data || response.data; 
      
      // Map data to ensure 'studentsEnrolled' is a consistent number
      setCenterData(data.map(center => ({
        ...center,
        studentsEnrolled: center.studentsEnrolled || 0 // Default to 0 if missing
      })));

    } catch (error) {
      console.error('Error fetching centers:', error);
      setMessage('❌ Failed to load center data.');
      setCenterData([]); 
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: CSV Export Handler ---
  const handleExportToCSV = () => {
    if (centerData.length === 0) {
        setMessage('⚠️ No data to export.');
        setTimeout(() => setMessage(''), 3000);
        return;
    }

    // 1. Define CSV Headers
    const headers = [
        "Center Code", "Center Name", "City", "State", "Pincode", 
        "Email", "Phone", "Students Enrolled", "Status"
    ];
    
    // 2. Format the data rows
    const csvRows = centerData.map(center => {
        // Simple function to safely escape strings for CSV
        const safeString = (str) => `"${(str || '').toString().replace(/"/g, '""')}"`;

        return [
            center.centerCode,
            safeString(center.name),
            safeString(center.city),
            safeString(center.state),
            safeString(center.pincode),
            safeString(center.email),
            safeString(center.phone),
            center.studentsEnrolled || 0,
            center.status,
        ].join(','); 
    });

    // 3. Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...csvRows
    ].join('\n');

    // 4. Trigger the download using Blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeTab.label.replace(/ /g, '_')}_Centers_Export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object

    setMessage(`✅ ${centerData.length} centers exported successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };
  // --- End CSV Export Handler ---

  return (
    <div className="space-y-8">
      {/* Page Header and Add New Center Button */}
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-800">Center Management</h1>
        <button
          onClick={() => navigate('/user/add-center')}
          className="flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 transition-colors"
        >
          <RiAddCircleLine className="mr-2 w-5 h-5" />
          Add New Center
        </button>
      </div>
      
      {/* Feedback Message */}
      {message && (
          <div className={`p-3 rounded-lg font-medium shadow-md ${
              message.startsWith('✅') ? 'bg-green-100 text-green-800' : 
              message.startsWith('❌') ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'
          }`}>
              {message}
          </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Tabs and Export Button placed side-by-side */}
        <div className="flex justify-between items-start mb-6">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {centerData.length > 0 && (
                <button
                    onClick={handleExportToCSV}
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 transition-colors mt-2"
                    title={`Download ${activeTab.label} Data as CSV`}
                >
                    <RiFileExcel2Fill className="w-5 h-5 mr-2" /> Export to CSV
                </button>
            )}
        </div>
        
        {/* The main table component */}
        {loading ? (
          <p className="text-center py-8 text-lg text-teal-600">Loading center data...</p>
        ) : (
          <DataTable 
            data={centerData} 
            columns={columns} 
          />
        )}
      </div>
    </div>
  );
};

export default ViewCenters;