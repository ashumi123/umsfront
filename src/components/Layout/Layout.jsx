// src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col">
        <Header />
        
        {/* Main Content Area: Padding top is 16 (4rem) to clear the header height */}
        <main className="flex-1 p-6 mt-16 overflow-y-auto">
          <Outlet /> {/* Renders the current page component based on the route */}
        </main>
      </div>
    </div>
  );
};

export default Layout;