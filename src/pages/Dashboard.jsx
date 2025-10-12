// src/pages/Dashboard.jsx - UPDATED FOR DYNAMIC DATA
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/UI/Card';
import { RiUserLine, RiTeamLine, RiBookOpenLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

const API_BASE = 'https://devserver-main--umsbackend.netlify.app/api/v1';

const COLORS = ['#14B8A6', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [courseDistribution, setCourseDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Summary Data (Centers, Students, Wallet)
        const [
          centerSummaryRes, 
          walletSummaryRes, 
          enrollmentRes, 
          distributionRes
        ] = await Promise.all([
          axios.get(`${API_BASE}/centers/summary`),
          axios.get(`${API_BASE}/accounts/summary`),
          axios.get(`${API_BASE}/students/enrollment-data`),
          axios.get(`${API_BASE}/students/course-distribution`),
        ]);

        setSummary({
          ...centerSummaryRes.data.data,
          ...walletSummaryRes.data.data,
          totalCourses: 18, // Mocked as no course model was created
        });
        setEnrollmentData(enrollmentRes.data.data);
        setCourseDistribution(distributionRes.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const summaryData = [
    { title: 'Total Centers', value: summary.totalCenters || '...', icon: <RiTeamLine />, colorClass: 'bg-teal-100 text-teal-600' },
    { title: 'Total Students', value: summary.totalStudents || '...', icon: <RiUserLine />, colorClass: 'bg-blue-100 text-blue-600' },
    { title: 'Total Courses', value: summary.totalCourses || '...', icon: <RiBookOpenLine />, colorClass: 'bg-purple-100 text-purple-600' },
    { title: 'Wallet Balance', value: summary.currentBalance || '...', icon: <RiMoneyDollarCircleLine />, colorClass: 'bg-green-100 text-green-600' },
  ];

  if (loading) {
      return <p className="text-center text-lg text-teal-600 py-10">Loading Dashboard Data...</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* 1. Summary Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((data) => (
          <Card 
            key={data.title}
            title={data.title}
            value={data.value}
            icon={data.icon}
            colorClass={data.colorClass}
          />
        ))}
      </div>

      {/* 2. Charts / Data Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Enrollment Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2 h-96">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">Monthly Student Enrollment</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={enrollmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Students" fill="#14B8A6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Course Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-96">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">Course Distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={courseDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {courseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value} students`, props.payload.name]}/>
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* 3. Recent Activity/Quick Status Table - REMAINS MOCK FOR NOW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">Recent Activities (Mock)</h3>
          {/* ... (Mock activity list) ... */}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">Performance Metrics (Mock)</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// // src/pages/Dashboard.jsx
// import React from 'react';
// import Card from '../components/UI/Card';
// import { RiUserLine, RiTeamLine, RiBookOpenLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   PieChart, Pie, Cell 
// } from 'recharts'; // Assumes recharts is installed

// // --- Mock Data ---

// const summaryData = [
//   { 
//     title: 'Total Centers', 
//     value: '45', 
//     icon: <RiTeamLine />, 
//     colorClass: 'bg-teal-100 text-teal-600' 
//   },
//   { 
//     title: 'Total Students', 
//     value: '1,248', 
//     icon: <RiUserLine />, 
//     colorClass: 'bg-blue-100 text-blue-600' 
//   },
//   { 
//     title: 'Total Courses', 
//     value: '18', 
//     icon: <RiBookOpenLine />, 
//     colorClass: 'bg-purple-100 text-purple-600' 
//   },
//   { 
//     title: 'Revenue (YTD)', 
//     value: '₹1.5 Cr', 
//     icon: <RiMoneyDollarCircleLine />, 
//     colorClass: 'bg-green-100 text-green-600' 
//   },
// ];

// const studentEnrollmentData = [
//   { name: 'Jan', Students: 400 },
//   { name: 'Feb', Students: 300 },
//   { name: 'Mar', Students: 600 },
//   { name: 'Apr', Students: 450 },
//   { name: 'May', Students: 700 },
//   { name: 'Jun', Students: 500 },
//   { name: 'Jul', Students: 800 },
//   { name: 'Aug', Students: 950 },
//   { name: 'Sep', Students: 1000 },
// ];

// const courseDistributionData = [
//     { name: 'MBA', value: 400 },
//     { name: 'BBA', value: 300 },
//     { name: 'MCA', value: 300 },
//     { name: 'M.Com', value: 200 },
//     { name: 'BCA', value: 150 },
// ];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];


// const Dashboard = () => {
//   return (
//     <div className="space-y-8">
//       {/* 1. Summary Cards Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {summaryData.map((data) => (
//           <Card 
//             key={data.title}
//             title={data.title}
//             value={data.value}
//             icon={data.icon}
//             colorClass={data.colorClass}
//           />
//         ))}
//       </div>

//       {/* 2. Charts / Data Visualization Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Monthly Enrollment Bar Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2 h-96">
//           <h3 className="text-lg font-semibold mb-4 border-b pb-2">Monthly Student Enrollment</h3>
//           <ResponsiveContainer width="100%" height="85%">
//             <BarChart data={studentEnrollmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis dataKey="name" stroke="#6b7280" />
//               <YAxis stroke="#6b7280" />
//               <Tooltip 
//                 contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
//                 labelStyle={{ fontWeight: 'bold', color: '#111' }}
//               />
//               <Legend />
//               <Bar dataKey="Students" fill="#14B8A6" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
        
//         {/* Course Distribution Pie Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-lg h-96">
//           <h3 className="text-lg font-semibold mb-4 border-b pb-2">Course Distribution</h3>
//           <ResponsiveContainer width="100%" height="85%">
//             <PieChart>
//               <Pie
//                 data={courseDistributionData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//               >
//                 {courseDistributionData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                  formatter={(value, name, props) => [`${value} students`, props.payload.name]}
//               />
//               <Legend layout="vertical" align="right" verticalAlign="middle" />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
      
//       {/* 3. Recent Activity/Quick Status Table */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-1">
//           <h3 className="text-lg font-semibold mb-4 border-b pb-2">Recent Activities</h3>
//           <ul className="space-y-4 text-sm">
//             <li className="flex justify-between border-b pb-2">
//               <span className="text-gray-600">New Center **AMC006** added.</span>
//               <span className="text-xs text-gray-400">2 min ago</span>
//             </li>
//             <li className="flex justify-between border-b pb-2">
//               <span className="text-gray-600">**STU1050** registered for MBA.</span>
//               <span className="text-xs text-gray-400">1 hr ago</span>
//             </li>
//             <li className="flex justify-between border-b pb-2">
//               <span className="text-gray-600">Wallet deposit: **₹50,000**.</span>
//               <span className="text-xs text-gray-400">4 hrs ago</span>
//             </li>
//             <li className="flex justify-between border-b pb-2">
//               <span className="text-gray-600">Center **AMC003** status changed to **Active**.</span>
//               <span className="text-xs text-gray-400">Yesterday</span>
//             </li>
//           </ul>
//         </div>
//         {/* Placeholder for another card/table */}
//         <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
//             <h3 className="text-lg font-semibold mb-4 border-b pb-2">Pending Tasks & Approvals</h3>
//             <p className="text-gray-500">List of tasks like center verification, student fee approval, etc., would go here, likely using a simplified data table component.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;