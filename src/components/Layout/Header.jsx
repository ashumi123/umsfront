// src/components/Layout/Header.jsx
import React, { useEffect, useState } from 'react';
import { RiSearchLine, RiNotification2Line, RiUser2Line, RiArrowDownSLine } from 'react-icons/ri';

const Header = () => {
  const [user,setUser]=useState(null)
  useEffect(() => {
    getUserDetail()
  }, [])
  const getUserDetail=async()=>{
    let userDetail= localStorage.getItem('userData')
    let parseUserDetail= await JSON.parse(userDetail)
    setUser(parseUserDetail.user)
    console.log('parseUserDetail',parseUserDetail.user);
  }
  
  return (
    <header className="fixed top-0 left-60 right-0 bg-white shadow-md z-10 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        {/* Breadcrumbs/Current Page Title (Dynamic in a real app) */}
        <h2 className="text-xl font-semibold text-gray-800">
          View All Centers
        </h2>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="border border-gray-300 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:ring-teal-500 focus:border-teal-500" 
          />
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Quick Links / Icons */}
        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
          <RiNotification2Line className="text-xl" />
        </button>
        
        {/* User Profile Dropdown (based on screenshot) */}
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <RiUser2Line className="text-3xl text-teal-600 border rounded-full p-1" />
          <div className="flex flex-col text-sm">
            <span className="font-medium text-gray-800">{user?.type === 'Admin'?'Admin User':'Center User'}</span>
            <span className="text-xs text-gray-500">{user?.type === 'Admin'? 'Center Head':'Center'}</span>
          </div>
          <RiArrowDownSLine className="text-lg text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;