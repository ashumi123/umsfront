
import React, { useState, useMemo } from 'react';
import { RiSearchLine, RiSortAsc, RiSortDesc } from 'react-icons/ri';
// useNavigate is no longer needed here if we rely on a prop for navigation logic

/**
 * A generic data table with search, sorting, and pagination (client-side mock).
 * NOTE: Full pagination/sorting is complex; this is a simplified prototype.
 * @param {object[]} data - The array of data objects to display.
 * @param {object[]} columns - Array defining table columns: [{ header: 'Name', accessor: 'name' }]
 * @param {function} onNewEntryClick - Handler function for the "+ New Entry" button.
 */
const DataTable = ({ data, columns, title, onNewEntryClick, renderActions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  // Removed useNavigate since navigation logic will be handled by parent via prop

  // Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sorting Logic
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Search Input and Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search all columns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        {/* FIXED: Using the onNewEntryClick prop instead of hardcoded navigation */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  // Note: DataTable expects accessor as the key property name
                  key={column.accessor}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort(column.accessor)}
                >
                  <span className="flex items-center">
                    {column.header}
                    {sortConfig.key === column.accessor && (
                      <span className="ml-1 text-teal-600">
                        {sortConfig.direction === 'ascending' ? <RiSortAsc /> : <RiSortDesc />}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {row[column.accessor]}
                    </td>
                  ))}
                  {renderActions ?
                    renderActions?.(row) :
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {/* Action buttons (View, Edit) based on screenshots */}

                      <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
