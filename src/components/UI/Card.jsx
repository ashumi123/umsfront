// src/components/UI/Card.jsx
import React from 'react';

/**
 * Reusable Card component for dashboard summaries.
 * @param {string} title - The title of the card.
 * @param {string} value - The main numerical/text value.
 * @param {React.ReactNode} icon - An icon element to display.
 * @param {string} colorClass - Tailwind class for the color theme (e.g., 'bg-blue-100 text-blue-800').
 */
const Card = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${colorClass}`}>
        {React.cloneElement(icon, { className: 'text-3xl' })}
      </div>
    </div>
  );
};

export default Card;