// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LoginScreen from './pages/LoginScreen';
import Dashboard from './pages/Dashboard';
import AddNewCenter from './pages/CenterManagement/AddNewCenter';
import ViewCenters from './pages/CenterManagement/ViewCenters';
import ViewStudents from './pages/Students/ViewStudents';
import StudentRegistration from './pages/Students/StudentRegistration';
import WalletSummary from './pages/Accounts/WalletSummary'; 
// Import other pages as needed

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route index element={<LoginScreen />} />
        
        {/* Protected Routes (Wrapped in Layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard"  element={<Dashboard />} /> {/* / */}
          
          {/* User/Center Routes (Based on Sidebar Structure) */}
          <Route path="/user/add-center" element={<AddNewCenter />} />
          <Route path="/user/view-all-centers" element={<ViewCenters type="all" />} />
          <Route path="/user/view-active-centers" element={<ViewCenters type="active" />} />
          <Route path="/user/view-inactive-centers" element={<ViewCenters type="inactive" />} />
          
          {/* Student Routes */}
          <Route path="/students/all" element={<ViewStudents />} />
          <Route path="/students/register" element={<StudentRegistration />} />
          {/* Accounts Routes */}
          <Route path="/accounts/wallet" element={<WalletSummary />} />
          
          {/* Fallback/404 Route */}
          <Route path="*" element={
            <div className="p-10 text-center text-xl">404 - Page Not Found</div>
          } />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;