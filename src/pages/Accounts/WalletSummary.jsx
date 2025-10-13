// // src/pages/Accounts/WalletSummary.jsx
// import React from 'react';
// import DataTable from '../../components/Tables/DataTable';
// import { RiMoneyDollarCircleLine, RiWalletLine } from 'react-icons/ri';

// const mockDeposits = [
//     { date: '2025-09-01', transactionId: 'TXN1001', amount: 50000, source: 'Admin', status: 'Completed' },
//     { date: '2025-09-15', transactionId: 'TXN1002', amount: 25000, source: 'Admin', status: 'Completed' },
// ];

// const mockUsage = [
//     { date: '2025-09-05', transactionId: 'USAGE2001', student: 'STU1001', deduction: 15000, reason: 'Registration Fee' },
//     { date: '2025-09-20', transactionId: 'USAGE2002', student: 'STU1004', deduction: 10000, reason: 'Partial Fee' },
// ];

// const depositColumns = [
//     { header: 'Date', accessor: 'date' },
//     { header: 'Transaction ID', accessor: 'transactionId' },
//     { header: 'Amount (₹)', accessor: 'amount' },
//     { header: 'Source', accessor: 'source' },
//     { header: 'Status', accessor: 'status' },
// ];

// const usageColumns = [
//     { header: 'Date', accessor: 'date' },
//     { header: 'Transaction ID', accessor: 'transactionId' },
//     { header: 'Student', accessor: 'student' },
//     { header: 'Deduction (₹)', accessor: 'deduction' },
//     { header: 'Reason', accessor: 'reason' },
// ];

// const WalletSummary = () => {
//     const totalDeposits = mockDeposits.reduce((sum, item) => sum + item.amount, 0);
//     const totalUsage = mockUsage.reduce((sum, item) => sum + item.deduction, 0);
//     const currentBalance = totalDeposits - totalUsage;

//     return (
//         <div className="container mx-auto space-y-8">
//             <h1 className="text-2xl font-semibold text-gray-800">Wallet Summary</h1>
            
//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between border-l-4 border-teal-500">
//                     <div>
//                         <p className="text-sm font-medium text-gray-500">Current Balance</p>
//                         <p className="text-3xl font-bold text-teal-700">₹{currentBalance.toLocaleString('en-IN')}</p>
//                     </div>
//                     <RiWalletLine className="text-5xl text-teal-200" />
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between border-l-4 border-green-500">
//                     <div>
//                         <p className="text-sm font-medium text-gray-500">Total Deposits</p>
//                         <p className="text-3xl font-bold text-green-700">₹{totalDeposits.toLocaleString('en-IN')}</p>
//                     </div>
//                     <RiMoneyDollarCircleLine className="text-5xl text-green-200" />
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between border-l-4 border-red-500">
//                     <div>
//                         <p className="text-sm font-medium text-gray-500">Total Usage</p>
//                         <p className="text-3xl font-bold text-red-700">₹{totalUsage.toLocaleString('en-IN')}</p>
//                     </div>
//                     <RiMoneyDollarCircleLine className="text-5xl text-red-200" />
//                 </div>
//             </div>

//             {/* Deposits Table */}
//             <DataTable 
//                 data={mockDeposits} 
//                 columns={depositColumns} 
//                 title="Deposits Summary" 
//             />

//             {/* Usage Table */}
//             <DataTable 
//                 data={mockUsage} 
//                 columns={usageColumns} 
//                 title="Usage Summary" 
//             />
//         </div>
//     );
// };

// export default WalletSummary;

// src/pages/Accounts/WalletSummary.jsx - UPDATED FOR DYNAMIC DATA
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/UI/Card';
import DataTable from '../../components/Tables/DataTable';
import { RiWalletLine, RiArrowDownCircleLine, RiArrowUpCircleLine } from 'react-icons/ri';

const API_BASE = 'https://umsbackend-l795.onrender.com/api/v1/accounts';

const columns = [
  { key: 'id', header: 'Txn ID', sortable: true },
  { key: 'date', header: 'Date', sortable: true },
  { key: 'center', header: 'Center Code', sortable: true },
  { key: 'amount', header: 'Amount', sortable: true },
  { key: 'reason', header: 'Reason', sortable: false },
];

const WalletSummary = () => {
  const [summary, setSummary] = useState({});
  const [deposits, setDeposits] = useState([]);
  const [usage, setUsage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, depositsRes, usageRes] = await Promise.all([
          axios.get(`${API_BASE}/summary`),
          axios.get(`${API_BASE}/transactions?type=Deposit`),
          axios.get(`${API_BASE}/transactions?type=Usage`),
        ]);

        setSummary(summaryRes.data.data);
        setDeposits(depositsRes.data.data);
        setUsage(usageRes.data.data);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const summaryData = [
    { title: 'Current Balance', value: summary.currentBalance || '...', icon: <RiWalletLine />, colorClass: 'bg-teal-100 text-teal-600' },
    { title: 'Total Deposits', value: summary.totalDeposits || '...', icon: <RiArrowUpCircleLine />, colorClass: 'bg-green-100 text-green-600' },
    { title: 'Total Usage', value: summary.totalUsage || '...', icon: <RiArrowDownCircleLine />, colorClass: 'bg-red-100 text-red-600' },
  ];

  if (loading) {
      return <p className="text-center text-lg text-teal-600 py-10">Loading Wallet Summary...</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Wallet & Account Summary</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryData.map(data => (
            <Card 
                key={data.title}
                title={data.title}
                value={data.value}
                icon={data.icon}
                colorClass={data.colorClass}
            />
        ))}
      </div>

      {/* Transactions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Deposits Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Deposits</h2>
          <DataTable 
            data={deposits} 
            columns={columns} 
          />
        </div>

        {/* Usage Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Usage / Deductions</h2>
          <DataTable 
            data={usage} 
            columns={columns} 
          />
        </div>
      </div>
    </div>
  );
};

export default WalletSummary;