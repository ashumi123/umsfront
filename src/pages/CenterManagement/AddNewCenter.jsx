// // src/pages/CenterManagement/AddNewCenter.jsx
// import React, { useState } from 'react';
// import { RiSaveLine, RiArrowGoBackLine } from 'react-icons/ri';

// const AddNewCenter = () => {
//   const [formData, setFormData] = useState({
//     centerName: '',
//     centerCode: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     universities: [] // To store selected university data
//   });

//   const availableUniversities = [
//     { id: 1, name: 'Amity University ODL', commission: 25 },
//     { id: 2, name: 'Amity Online', commission: 20 },
//     // ... more universities
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleUniversitySelect = (uni) => {
//     const isSelected = formData.universities.some(u => u.id === uni.id);
//     if (isSelected) {
//       setFormData(prev => ({
//         ...prev,
//         universities: prev.universities.filter(u => u.id !== uni.id)
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         universities: [...prev.universities, uni]
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting new center data:', formData);
//     // In a real app: Send data to API -> Show success/error -> Redirect/Clear form
//     alert('Center Submitted! (Check console for data)');
//   };

//   // Helper component for form input
//   const FormInput = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => (
//     <div className="flex-1 min-w-[250px]">
//       <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         className="w-full border border-gray-300 rounded-lg p-2 focus:ring-teal-500 focus:border-teal-500"
//       />
//     </div>
//   );

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg">
//       <h1 className="text-2xl font-semibold text-teal-700 border-b pb-3 mb-6">
//         Add New Center
//       </h1>

//       <form onSubmit={handleSubmit}>
//         {/* Center Details Section */}
//         <div className="space-y-4 mb-8 border border-gray-200 p-4 rounded-lg">
//           <h2 className="text-lg font-medium text-gray-800">Basic Details</h2>
//           <div className="flex flex-wrap gap-4">
//             <FormInput label="Center Name" name="centerName" value={formData.centerName} onChange={handleInputChange} required />
//             <FormInput label="Center Code" name="centerCode" value={formData.centerCode} onChange={handleInputChange} required />
//             <FormInput label="Email ID" name="email" value={formData.email} onChange={handleInputChange} type="email" required />
//             <FormInput label="Mobile Number" name="phone" value={formData.phone} onChange={handleInputChange} type="tel" required />
//             <FormInput label="City" name="city" value={formData.city} onChange={handleInputChange} required />
//             <FormInput label="State" name="state" value={formData.state} onChange={handleInputChange} required />
//           </div>
//           <div className="w-full">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Address <span className="text-red-500">*</span></label>
//             <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//                 rows="3"
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-teal-500 focus:border-teal-500"
//             ></textarea>
//           </div>
//         </div>

//         {/* University Commission Section (Table) */}
//         <div className="space-y-4 mb-8 border border-gray-200 p-4 rounded-lg">
//           <h2 className="text-lg font-medium text-gray-800">University Commission Settings</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Select</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">University Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission (%)</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {availableUniversities.map(uni => (
//                   <tr key={uni.id} className={formData.universities.some(u => u.id === uni.id) ? 'bg-teal-50' : 'hover:bg-gray-50'}>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
//                       <input
//                         type="checkbox"
//                         checked={formData.universities.some(u => u.id === uni.id)}
//                         onChange={() => handleUniversitySelect(uni)}
//                         className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
//                       />
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{uni.name}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{uni.commission}%</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
        
//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4">
//           <button
//             type="button"
//             onClick={() => setFormData({ centerName: '', centerCode: '', email: '', phone: '', address: '', city: '', state: '', universities: [] })}
//             className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <RiArrowGoBackLine className="mr-2" /> Reset
//           </button>
//           <button
//             type="submit"
//             className="flex items-center px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors"
//           >
//             <RiSaveLine className="mr-2" /> Save Center
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddNewCenter;

// src/pages/CenterManagement/AddNewCenter.jsx - UPDATED FOR API POST
import React, { useState } from 'react';
import { RiSaveLine, RiArrowGoBackLine } from 'react-icons/ri';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/centers';

const initialFormData = {
    centerCode: '', name: '', email: '', mobile: '', city: '', address: '', status: 'Active'
};

const AddNewCenter = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
        const response = await axios.post(API_URL, formData);
        
        if (response.data.success) {
            setMessage('✅ New Center added successfully!');
            setFormData(initialFormData); // Reset form
        } else {
            setMessage('❌ Failed to add center. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting center data:', error.response ? error.response.data : error.message);
        setMessage(`❌ Error: ${error.response?.data?.message || 'Server connection failed.'}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-3">Add New Center</h1>
      
      {message && (
          <div className={`p-3 rounded-lg text-white ${message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
          </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... (Form fields remain the same) ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Center Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="centerCode">Center Code (Unique)</label>
              <input type="text" id="centerCode" name="centerCode" required
                value={formData.centerCode} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Center Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">Center Name</label>
              <input type="text" id="name" name="name" required
                value={formData.name} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required
                value={formData.email} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="mobile">Mobile</label>
              <input type="text" id="mobile" name="mobile"
                value={formData.mobile} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="city">City</label>
              <input type="text" id="city" name="city" required
                value={formData.city} onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Full Address</label>
            <textarea id="address" name="address" rows="3"
              value={formData.address} onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
          </div>
          {/* ... (End of form fields) ... */}
          
          <div className="pt-4 flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={() => setFormData(initialFormData)}
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RiArrowGoBackLine className="mr-2 w-5 h-5" />
              Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:bg-teal-400"
            >
              <RiSaveLine className="mr-2 w-5 h-5" />
              {isSubmitting ? 'Saving...' : 'Save New Center'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCenter;