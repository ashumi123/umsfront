// // // src/pages/Students/StudentRegistrationForm.jsx - IMPLEMENTED API CALL

// // import React, { useState } from 'react';
// // import { RiSaveLine } from 'react-icons/ri';
// // import axios from 'axios';

// // // IMPORTANT: Define your backend API URL
// // const API_URL = 'https://devserver-main--umsbackend.netlify.app/api/v1/students';

// // // Mock initial data structure matching the backend schema
// // const initialFormData = {
// //   // Core Data
// //   centerCode: 'AMC001', // REQUIRED: Needs to be dynamically selected or fetched for the actual center

// //   // 1. Personal Details
// //   nameCandidate: '', nameFather: '', nameMother: '', dob: '',
// //   gender: '', category: '', aadharNumber: '', designation: '',

// //   // 2. Communication
// //   contactNumber: '', emailAddress: '', fatherContact: '', motherContact: '',
// //   address: '', state: '', city: '', pinCode: '',

// //   // 3. Previous Qualifications (Simplified initial state for the complex array)
// //   // NOTE: This must be handled carefully to send a valid array to the API
// //   previousQualifications: [
// //       // Example structure for one qualification entry
// //       { examination: 'Matriculation', totalMarks: '', boardUniversity: '', percentageCGPA: '', subjects: '' }
// //   ],

// //   // 4. Programme Details
// //   course: '', modeOfStudy: 'Regular', admissionType: 'Normal', academicSession: '2025-2026',

// //   // 5. Fee Details (Send as numbers)
// //   registrationFee: 1000, admissionFee: 15000, tuitionFee: 35000, totalFeesPaid: 16000
// // };

// // const StudentRegistrationForm = () => {
// //   const [formData, setFormData] = useState(initialFormData);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [message, setMessage] = useState('');

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleQualificationChange = (index, field, value) => {
// //     const newQualifications = [...formData.previousQualifications];
// //     newQualifications[index] = { ...newQualifications[index], [field]: value };
// //     setFormData(prev => ({ ...prev, previousQualifications: newQualifications }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     setMessage('');

// //     try {
// //         // We will send the formData directly. The backend controller handles generating the regNo.
// //         const response = await axios.post(API_URL, formData);

// //         if (response.status === 201) {
// //             setMessage(`✅ Student registered successfully! Reg No: ${response.data.data.regNo}`);
// //             setFormData(initialFormData); // Reset form
// //         }
// //     } catch (error) {
// //         console.error('Registration Error:', error.response ? error.response.data : error.message);
// //         const errorMsg = error.response?.data?.message || 'Server connection failed.';
// //         setMessage(`❌ Registration failed. ${errorMsg}`);
// //     } finally {
// //         setIsSubmitting(false);
// //     }
// //   };

// //   // --- Helper Components (Simplified for brevity) ---
// //   const InputField = ({ label, name, value, onChange, type = 'text', required = false, cols = 1 }) => (
// //     <div className={`col-span-1 md:col-span-${cols}`}>
// //       <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
// //       <input
// //         type={type}
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         required={required}
// //         className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
// //         placeholder={`Enter ${label}`}
// //       />
// //     </div>
// //   );
// //   const SelectField = ({ label, name, value, onChange, options, required = false, cols = 1 }) => (
// //     <div className={`col-span-1 md:col-span-${cols}`}>
// //       <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
// //       <select
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         required={required}
// //         className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm bg-white focus:ring-teal-500 focus:border-teal-500"
// //       >
// //         <option value="">Select</option>
// //         {options.map(opt => (
// //           <option key={opt.value} value={opt.value}>{opt.label}</option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// //   const SectionHeader = ({ title, color = 'bg-red-100', textColor = 'text-red-800' }) => (
// //     <h2 className={`text-sm font-semibold p-2 rounded-t-lg mt-6 ${color} ${textColor}`}>
// //       {title}
// //     </h2>
// //   );
// //   // --- End Helper Components ---


// //   return (
// //     <div className="bg-gray-50 min-h-screen p-8">
// //       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6">
// //         <h1 className="text-2xl font-extrabold text-teal-800 mb-6 border-b pb-2">
// //           New Student Online Registration
// //         </h1>

// //         {message && (
// //             <div className={`p-3 rounded-lg mb-4 text-white font-medium ${message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}>
// //                 {message}
// //             </div>
// //         )}

// //         <form onSubmit={handleSubmit}>

// //           {/* 1. PERSONAL DETAILS */}
// //           <SectionHeader title="Personal Details" color="bg-green-100" textColor="text-green-800" />
// //           <div className="p-4 border border-green-200 rounded-b-lg space-y-4">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               <InputField label="Candidate Name" name="nameCandidate" value={formData.nameCandidate} onChange={handleChange} required />
// //               <InputField label="Mother Name" name="nameMother" value={formData.nameMother} onChange={handleChange} required />
// //               <div className="col-span-1">
// //                 <label className="block text-xs font-medium text-gray-700 mb-1">Upload Photo (Max size 500KB, JPG/PNG)</label>
// //                 <div className="flex items-center space-x-2">
// //                     {/* File upload would require state and backend logic for Multer/file handling */}
// //                     <input type="file" id="photo" className="text-sm p-1 border border-gray-300 rounded-md w-full file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
// //                     <button type="button" className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600">Upload</button>
// //                 </div>
// //               </div>
// //             </div>
// //             {/* ... (rest of personal fields) ... */}
// //             <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
// //               <InputField label="Father Name" name="nameFather" value={formData.nameFather} onChange={handleChange} required cols={2} />
// //               <InputField label="DOB" name="dob" value={formData.dob} onChange={handleChange} type="date" required cols={2} />
// //               <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} required options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]} />
// //               <SelectField label="Category" name="category" value={formData.category} onChange={handleChange} required options={[{value: 'General', label: 'General'}, {value: 'OBC', label: 'OBC'}]} />
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //               <InputField label="Aadhar Number" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} />
// //               {/* Note: passport field omitted for brevity but should be included */}
// //               <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
// //             </div>
// //           </div>

// //           {/* 2. COMMUNICATION DETAILS */}
// //           <SectionHeader title="Communication Details" color="bg-yellow-100" textColor="text-yellow-800" />
// //           <div className="p-4 border border-yellow-200 rounded-b-lg space-y-4">
// //             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //               <InputField label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
// //               <InputField label="Email Address" name="emailAddress" value={formData.emailAddress} onChange={handleChange} type="email" required />
// //               <InputField label="Father Contact No." name="fatherContact" value={formData.fatherContact} onChange={handleChange} />
// //               <InputField label="Mother Contact No." name="motherContact" value={formData.motherContact} onChange={handleChange} />
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
// //               <SelectField label="Country" name="country" value={'India'} onChange={handleChange} options={[{value: 'India', label: 'India'}]} required />
// //               <SelectField label="Nationality" name="nationality" value={'Indian'} onChange={handleChange} options={[{value: 'Indian', label: 'Indian'}]} required />
// //               <InputField label="State" name="state" value={formData.state} onChange={handleChange} required />
// //               <InputField label="District" name="city" value={formData.city} onChange={handleChange} required /> {/* Mapping District to City in the model */}
// //               <InputField label="Address" name="address" value={formData.address} onChange={handleChange} cols={1} />
// //               <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
// //             </div>
// //           </div>

// //           {/* 3. PREVIOUS QUALIFICATION DETAILS (Using simplified entry for the array) */}
// //           <SectionHeader title="Previous Qualification Details" color="bg-red-100" textColor="text-red-800" />
// //           <div className="p-4 border border-red-200 rounded-b-lg space-y-4">
// //             <div className="grid grid-cols-6 text-xs font-medium text-gray-700 border-b pb-2 mb-2">
// //                 <div>Examination</div>
// //                 <div>Total Marks</div>
// //                 <div>Board/University</div>
// //                 <div>Percentage/CGPA</div>
// //                 <div>Subjects</div>
// //                 <div>Uploads</div>
// //             </div>
// //             {/* Displaying and editing the first (and only, in this simplified example) qualification */}
// //             {formData.previousQualifications.map((qual, index) => (
// //                 <div key={index} className="grid grid-cols-6 gap-2">
// //                     <InputField label={index === 0 ? "Matriculation" : " "} name={`exam-${index}`} value={qual.examination} onChange={(e) => handleQualificationChange(index, 'examination', e.target.value)} cols={1} />
// //                     <InputField label=" " name={`marks-${index}`} value={qual.totalMarks} onChange={(e) => handleQualificationChange(index, 'totalMarks', e.target.value)} />
// //                     <InputField label=" " name={`board-${index}`} value={qual.boardUniversity} onChange={(e) => handleQualificationChange(index, 'boardUniversity', e.target.value)} />
// //                     <InputField label=" " name={`percentage-${index}`} value={qual.percentageCGPA} onChange={(e) => handleQualificationChange(index, 'percentageCGPA', e.target.value)} />
// //                     <InputField label=" " name={`subjects-${index}`} value={qual.subjects} onChange={(e) => handleQualificationChange(index, 'subjects', e.target.value)} />
// //                     <button type="button" className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md hover:bg-gray-300 self-start mt-4">Upload Marksheet</button>
// //                 </div>
// //             ))}
// //           </div>


// //           {/* 4. PROGRAMME DETAILS */}
// //           <SectionHeader title="Programme Details" color="bg-blue-100" textColor="text-blue-800" />
// //           <div className="p-4 border border-blue-200 rounded-b-lg space-y-4">
// //             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                 <SelectField label="Course" name="course" value={formData.course} onChange={handleChange} required options={[{value: 'MBA', label: 'MBA'}, {value: 'BCA', label: 'BCA'}]} />
// //                 <SelectField label="Mode of Study" name="modeOfStudy" value={formData.modeOfStudy} onChange={handleChange} options={[{value: 'Regular', label: 'Regular'}, {value: 'ODL', label: 'ODL'}]} />
// //                 <SelectField label="Admission Type" name="admissionType" value={formData.admissionType} onChange={handleChange} options={[{value: 'Normal', label: 'Normal'}, {value: 'Lateral', label: 'Lateral'}]} />
// //                 <SelectField label="Academic Session" name="academicSession" value={formData.academicSession} onChange={handleChange} options={[{value: '2025-2026', label: '2025-2026'}]} />
// //             </div>
// //           </div>

// //           {/* 5. FEE DETAILS (Note: Fee fields should likely be read-only/calculated in a real app) */}
// //           <SectionHeader title="Fee Details" color="bg-purple-100" textColor="text-purple-800" />
// //           <div className="p-4 border border-purple-200 rounded-b-lg space-y-4">
// //             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
// //                 <InputField label="Registration Fee" name="registrationFee" value={formData.registrationFee} onChange={handleChange} type="number" />
// //                 <InputField label="Admission Fee" name="admissionFee" value={formData.admissionFee} onChange={handleChange} type="number" />
// //                 <InputField label="Enrollment Fee" name="enrollmentFee" value={formData.enrollmentFee} onChange={handleChange} type="number" />
// //                 <InputField label="Tuition Fee" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} type="number" />
// //                 <InputField label="Total Paid" name="totalFeesPaid" value={formData.totalFeesPaid} onChange={handleChange} type="number" />
// //             </div>
// //           </div>

// //           {/* 6. DECLARATION & SUBMISSION */}
// //           <div className="mt-8 p-4 bg-gray-50 border rounded-lg text-sm text-gray-600 space-y-3">
// //             <p>
// //               <input type="checkbox" required className="mr-2 text-teal-600 focus:ring-teal-500" />
// //               I hereby declare the details furnished by me above are true and correct to the best of my knowledge...
// //             </p>
// //             <p>
// //               <input type="checkbox" required className="mr-2 text-teal-600 focus:ring-teal-500" />
// //               I note that my admission is provisional and subject to the clearance of all dues to the University...
// //             </p>
// //           </div>

// //           <div className="mt-6 flex justify-center">
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className="flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:bg-teal-400"
// //             >
// //               <RiSaveLine className="mr-3 w-5 h-5" />
// //               {isSubmitting ? 'Submitting...' : 'CONTINUE APPLICATION'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentRegistrationForm;

// import React, { useState } from 'react';
// // import { LuSave } from 'lucide-react'; // Changed from 'react-icons/ri' to 'lucide-react'
// import axios from 'axios';
// import { RiSaveLine } from 'react-icons/ri';

// // IMPORTANT: Define your backend API URL
// const API_URL = 'https://devserver-main--umsbackend.netlify.app/api/v1/students';

// // --- Helper Components (MUST be defined outside the main component) ---

// const InputField = ({ label, name, value, onChange, type = 'text', required = false, cols = 1, disabled = false, maxLength }) => (
//   <div className={`col-span-1 md:col-span-${cols}`}>
//     <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
//     <input
//       type={type}
//       name={name}
//       // Note: Value must be controlled. If value is null/undefined, React throws a warning.
//       // Coercing to an empty string avoids this if data structure isn't perfect.
//       value={value || ''} 
//       onChange={onChange}
//       required={required}
//       disabled={disabled}
//       maxLength={maxLength}
//       className={`w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500 ${disabled ? 'bg-gray-100' : 'bg-white'}`}
//       placeholder={`Enter ${label}`}
//     />
//   </div>
// );

// const SelectField = ({ label, name, value, onChange, options, required = false, cols = 1 }) => (
//   <div className={`col-span-1 md:col-span-${cols}`}>
//     <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
//     <select
//       name={name}
//       value={value || ''}
//       onChange={onChange}
//       required={required}
//       className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm bg-white focus:ring-teal-500 focus:border-teal-500"
//     >
//       <option value="">Select</option>
//       {options.map(opt => (
//         <option key={opt.value} value={opt.value}>{opt.label}</option>
//       ))}
//     </select>
//   </div>
// );

// const SectionHeader = ({ title, color = 'bg-red-100', textColor = 'text-red-800' }) => (
//   <h2 className={`text-sm font-semibold p-2 rounded-t-lg mt-6 ${color} ${textColor}`}>
//     {title}
//   </h2>
// );

// // --- End Helper Components ---


// // Mock initial data structure matching the backend schema
// const initialFormData = {
//   // Core Data
//   centerCode: 'AMC001', 

//   // 1. Personal Details
//   nameCandidate: '', nameFather: '', nameMother: '', dob: '',
//   gender: '', category: '', aadharNumber: '', designation: '',

//   // 2. Communication
//   contactNumber: '', emailAddress: '', fatherContact: '', motherContact: '',
//   address: '', state: '', city: '', pinCode: '',

//   // 3. Previous Qualifications
//   previousQualifications: [
//       { examination: 'Matriculation', totalMarks: '', boardUniversity: '', percentageCGPA: '', subjects: '' }
//   ],

//   // 4. Programme Details
//   course: '', modeOfStudy: 'Regular', admissionType: 'Normal', academicSession: '2025-2026',

//   // 5. Fee Details (Send as numbers)
//   registrationFee: 1000, admissionFee: 15000, tuitionFee: 35000, totalFeesPaid: 16000, enrollmentFee: 0
// };

// const StudentRegistrationForm = () => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Handle number conversion for fee fields
//     let newValue = value;
//     if (['registrationFee', 'admissionFee', 'tuitionFee', 'totalFeesPaid', 'enrollmentFee'].includes(name)) {
//         newValue = parseFloat(value) || 0;
//     }

//     setFormData(prev => ({ ...prev, [name]: newValue }));
//   };

//   const handleQualificationChange = (index, field, value) => {
//     const newQualifications = [...formData.previousQualifications];
//     newQualifications[index] = { ...newQualifications[index], [field]: value };
//     setFormData(prev => ({ ...prev, previousQualifications: newQualifications }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');

//     try {
//         // Use a structure that matches the backend expectation
//         const dataToSend = {
//             ...formData,
//             // Ensure numbers are sent as numbers, especially if they are coming from controlled inputs
//             registrationFee: Number(formData.registrationFee),
//             admissionFee: Number(formData.admissionFee),
//             tuitionFee: Number(formData.tuitionFee),
//             totalFeesPaid: Number(formData.totalFeesPaid),
//             enrollmentFee: Number(formData.enrollmentFee) || 0, // Ensure enrollmentFee is included if it was added
//         };

//         const response = await axios.post(API_URL, dataToSend);

//         if (response.status === 201) {
//             setMessage(`✅ Student registered successfully! Reg No: ${response.data.data.regNo}`);
//             setFormData(initialFormData); // Reset form
//         }
//     } catch (error) {
//         console.error('Registration Error:', error.response ? error.response.data : error.message);
//         const errorMsg = error.response?.data?.message || 'Server connection failed.';
//         setMessage(`❌ Registration failed. ${errorMsg}`);
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-8 font-sans">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6">
//         <h1 className="text-3xl font-extrabold text-teal-700 mb-6 border-b-4 border-teal-500 pb-3">
//           New Student Online Registration
//         </h1>

//         {message && (
//             <div className={`p-3 rounded-lg mb-4 font-medium ${message.startsWith('✅') ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
//                 {message}
//             </div>
//         )}

//         <form onSubmit={handleSubmit}>

//           {/* 1. PERSONAL DETAILS */}
//           <SectionHeader title="1. Personal Details" color="bg-green-50" textColor="text-green-700" />
//           <div className="p-4 border border-green-200 rounded-b-lg space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <InputField label="Candidate Name" name="nameCandidate" value={formData.nameCandidate} onChange={handleChange} required />
//               <InputField label="Mother Name" name="nameMother" value={formData.nameMother} onChange={handleChange} required />
//               <div className="col-span-1">
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Upload Photo (Max size 500KB)</label>
//                 <div className="flex items-center space-x-2">
//                     <input type="file" id="photo" accept=".jpg, .jpeg, .png" className="text-sm p-1 border border-gray-300 rounded-md w-full file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
//                     <button type="button" className="bg-teal-600 text-white text-sm px-3 py-1 rounded-md shadow-md hover:bg-teal-700 transition-colors">Upload</button>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
//               <InputField label="Father Name" name="nameFather" value={formData.nameFather} onChange={handleChange} required cols={2} />
//               <InputField label="DOB" name="dob" value={formData.dob} onChange={handleChange} type="date" required cols={2} />
//               <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} required options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]} />
//               <SelectField label="Category" name="category" value={formData.category} onChange={handleChange} required options={[{value: 'General', label: 'General'}, {value: 'OBC', label: 'OBC'}, {value: 'SC', label: 'SC'}, {value: 'ST', label: 'ST'}]} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <InputField label="Aadhar Number" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} maxLength={12} />
//               <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
//             </div>
//           </div>

//           {/* 2. COMMUNICATION DETAILS */}
//           <SectionHeader title="2. Communication Details" color="bg-blue-50" textColor="text-blue-700" />
//           <div className="p-4 border border-blue-200 rounded-b-lg space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <InputField label="Contact Number (Candidate)" name="contactNumber" value={formData.contactNumber} onChange={handleChange} type="tel" required />
//               <InputField label="Email Address" name="emailAddress" value={formData.emailAddress} onChange={handleChange} type="email" required />
//               <InputField label="Father Contact No." name="fatherContact" value={formData.fatherContact} onChange={handleChange} type="tel" />
//               <InputField label="Mother Contact No." name="motherContact" value={formData.motherContact} onChange={handleChange} type="tel" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
//               <SelectField label="Country" name="country" value={'India'} onChange={handleChange} options={[{value: 'India', label: 'India'}]} required />
//               <SelectField label="Nationality" name="nationality" value={'Indian'} onChange={handleChange} options={[{value: 'Indian', label: 'Indian'}]} required />
//               <InputField label="State" name="state" value={formData.state} onChange={handleChange} required />
//               <InputField label="District" name="city" value={formData.city} onChange={handleChange} required />
//               <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
//               <InputField label="Address Line" name="address" value={formData.address} onChange={handleChange} cols={1} />
//             </div>
//           </div>

//           {/* 3. PREVIOUS QUALIFICATION DETAILS */}
//           <SectionHeader title="3. Previous Qualification Details (Matriculation)" color="bg-yellow-50" textColor="text-yellow-700" />
//           <div className="p-4 border border-yellow-200 rounded-b-lg space-y-4">
//             <div className="grid grid-cols-5 text-xs font-bold text-gray-700 pb-2 mb-2 bg-yellow-100 p-2 rounded-md">
//                 <div>Total Marks</div>
//                 <div>Board/University</div>
//                 <div>Percentage/CGPA</div>
//                 <div>Subjects</div>
//                 <div>Uploads</div>
//             </div>
//             {formData.previousQualifications.map((qual, index) => (
//                 <div key={index} className="grid grid-cols-5 gap-4 items-center">
//                     {/* Note: Examination name is hardcoded in initial state for Matriculation */}
//                     {/* <InputField label={index === 0 ? "Examination" : " "} name={`exam-${index}`} value={qual.examination} onChange={(e) => handleQualificationChange(index, 'examination', e.target.value)} /> */}
//                     <InputField label=" " name={`marks-${index}`} value={qual.totalMarks} onChange={(e) => handleQualificationChange(index, 'totalMarks', e.target.value)} type="number" />
//                     <InputField label=" " name={`board-${index}`} value={qual.boardUniversity} onChange={(e) => handleQualificationChange(index, 'boardUniversity', e.target.value)} />
//                     <InputField label=" " name={`percentage-${index}`} value={qual.percentageCGPA} onChange={(e) => handleQualificationChange(index, 'percentageCGPA', e.target.value)} />
//                     <InputField label=" " name={`subjects-${index}`} value={qual.subjects} onChange={(e) => handleQualificationChange(index, 'subjects', e.target.value)} />
//                     <div className="flex">
//                         <button type="button" className="bg-gray-200 text-gray-700 text-xs px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors shadow-sm">Upload</button>
//                     </div>
//                 </div>
//             ))}
//           </div>


//           {/* 4. PROGRAMME DETAILS */}
//           <SectionHeader title="4. Programme & Enrollment Details" color="bg-purple-50" textColor="text-purple-700" />
//           <div className="p-4 border border-purple-200 rounded-b-lg space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <SelectField label="Course Applied For" name="course" value={formData.course} onChange={handleChange} required options={[{value: 'MBA', label: 'MBA'}, {value: 'BCA', label: 'BCA'}, {value: 'B.Tech', label: 'B.Tech'}]} />
//                 <SelectField label="Mode of Study" name="modeOfStudy" value={formData.modeOfStudy} onChange={handleChange} options={[{value: 'Regular', label: 'Regular'}, {value: 'ODL', label: 'ODL'}]} />
//                 <SelectField label="Admission Type" name="admissionType" value={formData.admissionType} onChange={handleChange} options={[{value: 'Normal', label: 'Normal'}, {value: 'Lateral', label: 'Lateral'}]} />
//                 <SelectField label="Academic Session" name="academicSession" value={formData.academicSession} onChange={handleChange} options={[{value: '2025-2026', label: '2025-2026'}]} />
//             </div>
//              <InputField label="Center Code (Auto-populated)" name="centerCode" value={formData.centerCode} onChange={handleChange} required disabled />
//           </div>

//           {/* 5. FEE DETAILS */}
//           <SectionHeader title="5. Fee Structure and Payment" color="bg-red-50" textColor="text-red-700" />
//           <div className="p-4 border border-red-200 rounded-b-lg space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                 <InputField label="Registration Fee (₹)" name="registrationFee" value={formData.registrationFee} onChange={handleChange} type="number" />
//                 <InputField label="Admission Fee (₹)" name="admissionFee" value={formData.admissionFee} onChange={handleChange} type="number" />
//                 <InputField label="Enrollment Fee (₹)" name="enrollmentFee" value={formData.enrollmentFee} onChange={handleChange} type="number" />
//                 <InputField label="Tuition Fee (₹)" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} type="number" />
//                 <InputField label="Total Fees Paid (₹)" name="totalFeesPaid" value={formData.totalFeesPaid} onChange={handleChange} type="number" required />
//             </div>
//           </div>

//           {/* 6. DECLARATION & SUBMISSION */}
//           <div className="mt-8 p-4 bg-teal-50 border border-teal-200 rounded-xl text-sm text-gray-700 space-y-3 shadow-inner">
//             <h3 className="font-bold text-teal-800 mb-2">Declaration</h3>
//             <p>
//               <input type="checkbox" id="declaration1" required className="mr-2 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
//               <label htmlFor="declaration1" className="align-middle">I hereby declare the details furnished by me above are true and correct to the best of my knowledge and belief.</label>
//             </p>
//             <p>
//               <input type="checkbox" id="declaration2" required className="mr-2 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
//               <label htmlFor="declaration2" className="align-middle">I note that my admission is provisional and subject to the clearance of all dues and verification of my original documents.</label>
//             </p>
//           </div>

//           <div className="mt-8 flex justify-center">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex items-center px-10 py-3 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-teal-600 hover:bg-teal-700 transition-all duration-200 transform hover:scale-[1.02] disabled:bg-gray-400 disabled:transform-none"
//             >
//                <RiSaveLine className="mr-3 w-5 h-5" />
//               {isSubmitting ? 'Submitting Application...' : 'CONTINUE APPLICATION'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentRegistrationForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// FIX: Using supported icons from lucide-react and an SVG for Delete
import { RiAddBoxLine, RiDeleteBackFill, RiDeleteBin2Fill, RiSaveLine } from 'react-icons/ri';

// IMPORTANT: Define your backend API URLs
const API_URL = 'https://devserver-main--umsbackend.netlify.app/api/v1/students';
// New API URL for fetching courses
const COURSES_API_URL = 'https://devserver-main--umsbackend.netlify.app/api/v1/courses';

// --- Helper Components ---

const InputField = ({ label, name, value, onChange, type = 'text', required = false, cols = 1, disabled = false, maxLength, placeholder }) => (
  <div className={`col-span-1 md:col-span-${cols}`}>
    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      // Note: Value must be controlled. Coercing to an empty string avoids warnings.
      value={value || ''}
      onChange={onChange}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      className={`w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500 ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
      placeholder={placeholder || `Enter ${label}`}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required = false, cols = 1, disabled = false }) => (
  <div className={`col-span-1 md:col-span-${cols}`}>
    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value || ''}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm bg-white focus:ring-teal-500 focus:border-teal-500 ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
    >
      <option value="" disabled>Select {label}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const SectionHeader = ({ title, color = 'bg-red-100', textColor = 'text-red-800' }) => (
  <h2 className={`text-sm font-semibold p-2 rounded-t-lg mt-6 ${color} ${textColor}`}>
    {title}
  </h2>
);

// --- End Helper Components ---


// Mock initial data structure matching the backend schema
const initialFormData = {
  // Core Data for Enrollment Generation (must be provided by user/admin)
  centerCode: '351',
  batch: '2025',

  // 1. Personal Details
  nameCandidate: '', nameFather: '', nameMother: '', dob: '',
  gender: '', category: '', aadharNumber: '', designation: '',enrollmentNo:'',

  // 2. Communication
  contactNumber: '', emailAddress: '', fatherContact: '', motherContact: '',
  address: '', state: '', city: '', pinCode: '',

  // 3. Previous Qualifications
  previousQualifications: [
    // documentPath will store the simulated file name/path
    { examination: 'Matriculation (10th)', totalMarks: '', boardUniversity: '', percentageCGPA: '', subjects: '', documentPath: '' }
  ],

  // 4. Programme Details
  programCode: '', // Renamed from 'course' to 'programCode'
  modeOfStudy: 'Regular', admissionType: 'Normal', academicSession: '2025-2026',

  // 5. Fee Details (Send as numbers)
  registrationFee: 1000, admissionFee: 15000, tuitionFee: 35000, totalFeesPaid: 16000, enrollmentFee: 0
};

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // States for dynamic course loading
  const [courses, setCourses] = useState([]);
  const [isCoursesLoading, setIsCoursesLoading] = useState(true);
  const [courseError, setCourseError] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchCourses = async () => {
      setIsCoursesLoading(true);
      setCourseError(null);
      try {
        // NOTE: This Axios call will likely fail in the sandbox, resulting in mock data being used.
        const response = await axios.get(COURSES_API_URL);

        const courseOptions = response.data?.map(course => ({
          value: course?.name,
          label: course.name,
          admissionFee: Number(course?.feeStructure?.admissionFee),
          enrollmentFee: Number(course?.feeStructure?.enrollmentFee),
          registrationFee: Number(course?.feeStructure?.registrationFee),
          tuitionFee: Number(course?.feeStructure?.tuitionFee)
        })) || [];

        console.log('response.data', response.data);

        // FALLBACK MOCK DATA if API fails or returns no data

        setCourses(courseOptions);


      } catch (err) {
        // Use mock data on failure to ensure form usability
        console.error('Error fetching courses:', err.response?.data || err.message);
        setCourseError('Failed to load courses. Using mock data.');
        setCourses([
          { value: 'BCOM', label: 'Bachelor of Commerce (B.Com)' },
          { value: 'MBA', label: 'Master of Business Administration (MBA)' },
          { value: 'BTECH_CS', label: 'B.Tech Computer Science' },
        ]);
      } finally {
        setIsCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // --- Form & Qualification Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    let ind = courses.findIndex((x) => x.value === value)
    console.log(courses[ind]);
    let frmData = {
      ...formData,
      registrationFee: courses[ind]?.registrationFee, admissionFee: courses[ind]?.admissionFee, tuitionFee: courses[ind]?.tuitionFee, totalFeesPaid: courses[ind]?.registrationFee + courses[ind]?.admissionFee + courses[ind]?.tuitionFee + courses[ind]?.enrollmentFee, enrollmentFee: courses[ind]?.enrollmentFee
    }
    setFormData(frmData)

    // admissionFee: course?.feeStructure?.admissionFee,
    // enrollmentFee: course?.feeStructure?.enrollmentFee,
    // registrationFee: course?.feeStructure?.registrationFee,
    // tuitionFee: course?.feeStructure?.tuitionFee
    // Handle number conversion for fee fields
    if (['registrationFee', 'admissionFee', 'tuitionFee', 'totalFeesPaid', 'enrollmentFee'].includes(name)) {
      newValue = parseFloat(value) || 0;
    }

    // Special handler for academicSession and batch (for enrollment number generation)
    if (name === 'academicSession') {
      const year = value.split('-')[0]; // e.g., '2025' from '2025-2026'
      setFormData(prev => ({
        ...prev,
        academicSession: newValue,
        batch: year // Update batch based on session start year
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const getSession=()=>{
    const currentYear = new Date().getFullYear();

const years = Array.from({ length: 21 }, (_, i) => {
  const year = currentYear - 10 + i;
  return { value: String(year), label: String(year) };
});
return years
  }

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      previousQualifications: [
        ...prev.previousQualifications,
        { examination: '', totalMarks: '', boardUniversity: '', percentageCGPA: '', subjects: '', documentPath: '' }
      ]
    }));
  };

  const removeQualification = (index) => {
    if (formData.previousQualifications.length > 1) {
      setFormData(prev => ({
        ...prev,
        previousQualifications: prev.previousQualifications.filter((_, i) => i !== index)
      }));
    } else {
      setMessage('❌ You must retain at least one qualification record (e.g., Matriculation).');
    }
  };

  const handleQualificationChange = (index, field, value, file = null) => {
    const newQualifications = [...formData.previousQualifications];

    if (field === 'documentUpload') {
      // --- REAL WORLD: File Upload Logic ---
      // 1. Upload file (file) to a storage service (S3/GCS/Firebase Storage).
      // 2. Get the public URL/Path.
      // 3. Store that URL/Path in newQualifications[index].documentPath

      // --- SIMULATION: Store the file name locally ---
      newQualifications[index].documentPath = file ? file.name : '';
      setMessage(`Document attached: ${file ? file.name : 'None'}. (In a real app, this file would be uploaded to storage now.)`);
    } else {
      newQualifications[index] = { ...newQualifications[index], [field]: value };
    }

    setFormData(prev => ({ ...prev, previousQualifications: newQualifications }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const dataToSend = {
        ...formData,
        // Ensure numbers are explicitly converted and names are consistent
        program: formData.programCode, // Use programCode for the backend
        // Remove the temporary documentPath from the payload before sending
        previousQualifications: formData.previousQualifications.map(({ documentPath, ...rest }) => rest),
      };

      // NOTE: Because the form now requires 'batch', which is derived from 'academicSession', 
      // the backend should be able to generate the Enrollment No successfully.

      const response = await axios.post(API_URL, dataToSend);

      if (response.status === 201) {
        setMessage(`✅ Student registered successfully! Enrollment No: ${response.data.data.enrollmentNo}`);
        setFormData(initialFormData); // Reset form
      }
    } catch (error) {
      console.error('Registration Error:', error.response ? error.response.data : error.message);
      const errorMsg = error.response?.data?.message || 'Server connection failed. Check your API URL.';
      setMessage(`❌ Registration failed. ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Component Rendering ---
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        <h1 className="text-3xl font-extrabold text-teal-700 mb-6 border-b-4 border-teal-500 pb-3">
          New Student Online Registration
        </h1>

        {message && (
          <div className={`p-3 rounded-xl mb-4 font-medium text-sm ${message.startsWith('✅') ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* 1. PERSONAL DETAILS */}
          <SectionHeader title="1. Personal Details" color="bg-green-50" textColor="text-green-700" />
          <div className="p-4 border border-green-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Candidate Name" name="nameCandidate" value={formData.nameCandidate} onChange={handleChange} required />
              <InputField label="Mother Name" name="nameMother" value={formData.nameMother} onChange={handleChange} required />
              <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Upload Photo (Max 500KB)</label>
                <div className="flex items-center space-x-2">
                  <input type="file" id="photo" accept=".jpg, .jpeg, .png" className="text-sm p-1 border border-gray-300 rounded-md w-full file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
                  <button type="button" className="bg-teal-600 text-white text-sm px-3 py-1 rounded-md shadow-md hover:bg-teal-700 transition-colors">Upload</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <InputField label="Father Name" name="nameFather" value={formData.nameFather} onChange={handleChange} required cols={2} />
              <InputField label="DOB" name="dob" value={formData.dob} onChange={handleChange} type="date" required cols={2} />
              <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} required options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]} />
              <SelectField label="Category" name="category" value={formData.category} onChange={handleChange} required options={[{ value: 'General', label: 'General' }, { value: 'OBC', label: 'OBC' }, { value: 'SC', label: 'SC' }, { value: 'ST', label: 'ST' }]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InputField label="Aadhar Number" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} maxLength={12} placeholder="Must be 12 digits" />
              <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
              <InputField label="Enrollment No" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} />
            </div>
          </div>

          {/* 2. COMMUNICATION DETAILS */}
          <SectionHeader title="2. Communication Details" color="bg-blue-50" textColor="text-blue-700" />
          <div className="p-4 border border-blue-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InputField label="Contact Number (Candidate)" name="contactNumber" value={formData.contactNumber} onChange={handleChange} type="tel" required />
              <InputField label="Email Address" name="emailAddress" value={formData.emailAddress} onChange={handleChange} type="email" required />
              <InputField label="Father Contact No." name="fatherContact" value={formData.fatherContact} onChange={handleChange} type="tel" />
              <InputField label="Mother Contact No." name="motherContact" value={formData.motherContact} onChange={handleChange} type="tel" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InputField label="State" name="state" value={formData.state} onChange={handleChange} required />
              <InputField label="District/City" name="city" value={formData.city} onChange={handleChange} required />
              <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
              <InputField label="Address Line" name="address" value={formData.address} onChange={handleChange} cols={1} />
            </div>
          </div>

          {/* 3. PREVIOUS QUALIFICATION DETAILS (Dynamic) */}
          <SectionHeader title={`3. Previous Qualification Details (${formData.previousQualifications.length} Records)`} color="bg-yellow-50" textColor="text-yellow-700" />
          <div className="p-4 border border-yellow-200 rounded-b-lg space-y-4">

            {/* Qualification Headers */}
            <div className="hidden md:grid grid-cols-7 gap-3 text-xs font-bold text-gray-700 pb-2 mb-2 bg-yellow-100 p-2 rounded-md">
              <div className="col-span-1">Examination/Degree</div>
              <div className="col-span-1">Total Marks</div>
              <div className="col-span-1">Board/University</div>
              <div className="col-span-1">Percentage/CGPA</div>
              <div className="col-span-1">Subjects (Stream)</div>
              <div className="col-span-1">Document (Attached)</div>
              <div className="col-span-1">Action</div>
            </div>

            {/* Dynamic Qualification Rows */}
            {formData.previousQualifications.map((qual, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-3 items-center p-3 border border-yellow-100 rounded-lg bg-white shadow-sm">

                {/* Examination/Degree */}
                <div className="col-span-1">
                  <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Examination/Degree</label>
                  <input
                    type="text"
                    value={qual.examination}
                    onChange={(e) => handleQualificationChange(index, 'examination', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    required
                    placeholder="e.g., Higher Secondary (12th)"
                  />
                </div>

                {/* Total Marks */}
                <div className="col-span-1">
                  <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={qual.totalMarks}
                    onChange={(e) => handleQualificationChange(index, 'totalMarks', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Max marks"
                  />
                </div>

                {/* Board/University */}
                <div className="col-span-1">
                  <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Board/University</label>
                  <input
                    type="text"
                    value={qual.boardUniversity}
                    onChange={(e) => handleQualificationChange(index, 'boardUniversity', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g., CBSE/Punjab Uni."
                  />
                </div>

                {/* Percentage/CGPA */}
                <div className="col-span-1">
                  <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Percentage/CGPA</label>
                  <input
                    type="text"
                    value={qual.percentageCGPA}
                    onChange={(e) => handleQualificationChange(index, 'percentageCGPA', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g., 85% or 9.1"
                  />
                </div>

                {/* Subjects */}
                <div className="col-span-1">
                  <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Subjects (Stream)</label>
                  <input
                    type="text"
                    value={qual.subjects}
                    onChange={(e) => handleQualificationChange(index, 'subjects', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    placeholder="e.g., PCM / Commerce"
                  />
                </div>

                {/* Document Upload */}
                <div className="col-span-1">
                  <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Attach Document</label>
                  <input
                    type="file"
                    accept=".pdf, .jpg, .png"
                    onChange={(e) => handleQualificationChange(index, 'documentUpload', e.target.value, e.target.files[0])}
                    className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                  {qual.documentPath && (
                    <p className="text-[10px] text-gray-500 mt-1 truncate">Attached: {qual.documentPath}</p>
                  )}
                </div>

                {/* Action */}
                <div className="col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    disabled={formData.previousQualifications.length === 1}
                    className="p-2 text-red-600 rounded-full hover:bg-red-100 disabled:text-gray-400 disabled:bg-gray-50 transition-colors"
                    title="Remove Qualification"
                  >
                    <RiDeleteBin2Fill className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Qualification Button */}
            <div className="flex justify-start mt-4">
              <button
                type="button"
                onClick={addQualification}
                className="flex items-center px-4 py-2 text-sm font-semibold rounded-full text-teal-700 bg-teal-100 hover:bg-teal-200 transition-colors shadow-md"
              >
                <RiAddBoxLine className="w-4 h-4 mr-2" /> Add Another Qualification
              </button>
            </div>
          </div>


          {/* 4. PROGRAMME DETAILS */}
          <SectionHeader title="4. Programme & Enrollment Details" color="bg-purple-50" textColor="text-purple-700" />
          <div className="p-4 border border-purple-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Dynamically loaded Course Field (renamed to programCode) */}
              <SelectField
                label="Program Applied For"
                name="programCode"
                value={formData.programCode}
                onChange={handleChange}
                required
                options={courses}
                disabled={isCoursesLoading}
              />
              <SelectField label="Mode of Study" name="modeOfStudy" value={formData.modeOfStudy} onChange={handleChange} options={[{ value: 'Regular', label: 'Regular' }, { value: 'ODL', label: 'ODL' }]} />
              <SelectField label="Admission Type" name="admissionType" value={formData.admissionType} onChange={handleChange} options={[{ value: 'Normal', label: 'Normal' }, { value: 'Lateral', label: 'Lateral' }]} />
              <SelectField label="Academic Session" name="academicSession" value={formData.academicSession} onChange={handleChange} options={getSession()} required />
            </div>
            <InputField label="Center Code (Auto-populated for Enrollment)" name="centerCode" value={formData.centerCode} onChange={handleChange} required disabled />
            <InputField label="Batch Year (Generated from Session)" name="batch" value={formData.batch} onChange={handleChange} required disabled />
          </div>

          {/* 5. FEE DETAILS */}
          <SectionHeader title="5. Fee Structure and Payment" color="bg-red-50" textColor="text-red-700" />
          <div className="p-4 border border-red-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <InputField disabled label="Registration Fee (₹)" name="registrationFee" value={formData.registrationFee} onChange={handleChange} type="number" />
              <InputField disabled label="Admission Fee (₹)" name="admissionFee" value={formData.admissionFee} onChange={handleChange} type="number" />
              <InputField disabled label="Enrollment Fee (₹)" name="enrollmentFee" value={formData.enrollmentFee} onChange={handleChange} type="number" />
              <InputField disabled label="Tuition Fee (₹)" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} type="number" />
              <InputField disabled label="Total Fees Paid (₹)" name="totalFeesPaid" value={formData.totalFeesPaid} onChange={handleChange} type="number" required />
            </div>
          </div>

          {/* 6. DECLARATION & SUBMISSION */}
          <div className="mt-8 p-4 bg-teal-50 border border-teal-200 rounded-xl text-sm text-gray-700 space-y-3 shadow-inner">
            <h3 className="font-bold text-teal-800 mb-2">Declaration</h3>
            <p>
              <input type="checkbox" id="declaration1" required className="mr-2 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
              <label htmlFor="declaration1" className="align-middle">I hereby declare the details furnished by me above are true and correct to the best of my knowledge and belief.</label>
            </p>
            <p>
              <input type="checkbox" id="declaration2" required className="mr-2 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
              <label htmlFor="declaration2" className="align-middle">I note that my admission is provisional and subject to the clearance of all dues and verification of my original documents.</label>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || isCoursesLoading}
              className="flex items-center px-10 py-3 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-teal-600 hover:bg-teal-700 transition-all duration-200 transform hover:scale-[1.02] disabled:bg-gray-400 disabled:transform-none"
            >
              <RiSaveLine className="mr-3 w-5 h-5" />
              {isSubmitting ? 'Submitting Application...' : (isCoursesLoading ? 'Loading Form Data...' : 'CONTINUE APPLICATION')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
