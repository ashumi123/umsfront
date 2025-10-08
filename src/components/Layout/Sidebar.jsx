// src/components/Layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// Install react-icons: npm install react-icons
import { 
  RiDashboardLine, RiAccountBoxLine, RiUserLine, 
  RiTeamLine, RiSettingsLine, RiArrowDownSLine, 
  RiArrowUpSLine, RiBookletLine 
} from 'react-icons/ri'; 

// Define the navigation structure
const sidebarData = [
  { 
    title: 'Dashboard', 
    icon: <RiDashboardLine />, 
    path: '/', 
    key: 'dashboard' 
  },
  {
    title: 'User',
    icon: <RiUserLine />,
    key: 'user',
    subItems: [
      { title: 'Add New Center', path: '/user/add-center', key: 'add-center' },
      { title: 'View All Centers', path: '/user/view-all-centers', key: 'view-all-centers' },
      { title: 'View Active Centers', path: '/user/view-active-centers', key: 'view-active-centers' },
      { title: 'View Inactive Centers', path: '/user/view-inactive-centers', key: 'view-inactive-centers' },
    ],
  },
  {
    title: 'Students',
    icon: <RiBookletLine />,
    key: 'students',
    subItems: [
      { title: 'View All Students', path: '/students/all', key: 'all' },
      { title: 'Registered Students', path: '/students/registered', key: 'registered' },
      // ... other student sub-routes
    ],
  },
  {
    title: 'Accounts',
    icon: <RiAccountBoxLine />,
    key: 'accounts',
    subItems: [
      { title: 'Paid Students', path: '/accounts/paid', key: 'paid' },
      { title: 'Partially Paid', path: '/accounts/partial', key: 'partial' },
      { title: 'Wallet Summary', path: '/accounts/wallet', key: 'wallet' }, // Screenshot 6.35.46 AM.png
      // ... other account sub-routes
    ],
  },
  { title: 'Team', icon: <RiTeamLine />, path: '/team', key: 'team' },
  { title: 'Settings', icon: <RiSettingsLine />, path: '/settings', key: 'settings' },
];

const SidebarItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  
  // Check if any sub-item is currently active to keep the parent open
  const isActiveParent = hasSubItems 
    ? item.subItems.some(sub => location.pathname === sub.path) 
    : location.pathname === item.path;
    
  const toggleSubMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Determine initial state: open if the current route is one of its sub-items
  React.useEffect(() => {
    if (isActiveParent) {
      setIsOpen(true);
    }
  }, [isActiveParent]);

  const activeClass = isActiveParent ? 'bg-teal-700' : 'hover:bg-teal-700';
  const itemClasses = `flex items-center p-3 text-sm font-medium text-white transition-colors duration-200 ${activeClass}`;

  if (hasSubItems) {
    return (
      <div>
        <div className={itemClasses} onClick={toggleSubMenu}>
          <span className="text-xl mr-3">{item.icon}</span>
          <span>{item.title}</span>
          <span className="ml-auto text-lg">
            {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </span>
        </div>
        {(isOpen || isActiveParent) && (
          <div className="pl-6 bg-teal-800/50">
            {item.subItems.map(subItem => (
              <NavLink 
                key={subItem.key}
                to={subItem.path}
                className={({ isActive }) => 
                  `block p-2 text-sm pl-4 ${isActive ? 'bg-teal-600 font-bold' : 'text-gray-200 hover:bg-teal-700'}`
                }
              >
                {subItem.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Regular single link
  return (
    <NavLink 
      to={item.path} 
      className={({ isActive }) => 
        `flex items-center p-3 text-sm font-medium transition-colors duration-200 ${
          isActive ? 'bg-teal-700 text-white font-bold' : 'text-gray-200 hover:bg-teal-700'
        }`
      }
    >
      <span className="text-xl mr-3">{item.icon}</span>
      <span>{item.title}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <div className="w-60 bg-teal-900 h-screen fixed top-0 left-0 overflow-y-auto shadow-xl">
      <div className="p-4 border-b border-teal-700">
        {/* Placeholder for University Logo and Title */}
        <h1 className="text-white text-xl font-bold">UMS Portal</h1>
        <p className="text-xs text-gray-400">Amity Online</p>
      </div>
      <nav className="mt-4">
        {sidebarData.map(item => (
          <SidebarItem key={item.key} item={item} />
        ))}
      </nav>
      
      {/* Footer/Logout section */}
      <div className="absolute bottom-0 w-full p-4 border-t border-teal-700">
        <button className="w-full text-left text-gray-300 hover:text-white flex items-center">
          <RiSettingsLine className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;