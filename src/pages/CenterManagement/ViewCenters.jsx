
import React, { useState, useEffect } from 'react';
import DataTable from '../../components/Tables/DataTable';
import Tabs from '../../components/UI/Tabs';
import { RiAddCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure you have installed axios

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
  const navigate = useNavigate();

  useEffect(()=>{
    if(activeTab.label === tabs[1].label){
        fetchCenters('Active')
    }
    else if(activeTab.label === tabs[2].label){
        fetchCenters('Inactive')
    }
    else{
        fetchCenters('All Centers');

    }
  },[activeTab.label])

  const fetchCenters = async (statusFilter) => {
    setLoading(true);
    try {
      // Constructs the API URL with a query parameter for filtering
      // Example: /api/v1/centers?status=Active
      const statusParam = statusFilter === 'All Centers' ? '' : `?status=${statusFilter}`;
      
      const response = await axios.get(`${API_URL}${statusParam}`);
      console.log (response.data.data)
      setCenterData(response.data.data);
    } catch (error) {
      console.error('Error fetching centers:', error);
      setCenterData([]); 
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever the active tab changes
  useEffect(() => {
    fetchCenters('All Centers');
  }, []);

  const tabs = [
    { label: 'View All Centers', path: '/user/view-all-centers' },
    { label: 'View Active Centers', path: '/user/view-active-centers' },
    { label: 'View Inactive Centers', path: '/user/view-inactive-centers' },
];

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

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Tabs for filtering: 'View All', 'View Active', 'View Inactive' */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
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