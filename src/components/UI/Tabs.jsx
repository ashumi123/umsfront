// src/components/UI/Tabs.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Reusable Tab component for navigation within a section (like Active/Inactive Centers).
 * @param {object[]} tabs - Array of tab objects: [{ label: 'All', path: '/path/all' }]
 */
const Tabs = ({ tabs,setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <NavLink
        onClick={()=>setActiveTab(tab)}
          key={tab.label}
          to={tab.path}
          className={({ isActive }) => 
            `px-6 py-2 text-sm font-medium transition-colors duration-150 ${
              isActive 
                ? 'border-b-2 border-teal-600 text-teal-700' 
                : 'text-gray-500 hover:text-teal-600 hover:border-b-2 hover:border-teal-300'
            }`
          }
          end // Ensures only exact path matches are 'active' if needed
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Tabs;