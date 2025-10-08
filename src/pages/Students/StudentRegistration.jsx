// src/pages/Students/StudentRegistrationForm.jsx - IMPLEMENTED API CALL

import React, { useState } from 'react';
import { RiSaveLine } from 'react-icons/ri';
import axios from 'axios';

// IMPORTANT: Define your backend API URL
const API_URL = 'http://localhost:5000/api/v1/students';

// Mock initial data structure matching the backend schema
const initialFormData = {
  // Core Data
  centerCode: 'AMC001', // REQUIRED: Needs to be dynamically selected or fetched for the actual center
  
  // 1. Personal Details
  nameCandidate: '', nameFather: '', nameMother: '', dob: '',
  gender: '', category: '', aadharNumber: '', designation: '',
  
  // 2. Communication
  contactNumber: '', emailAddress: '', fatherContact: '', motherContact: '',
  address: '', state: '', city: '', pinCode: '',
  
  // 3. Previous Qualifications (Simplified initial state for the complex array)
  // NOTE: This must be handled carefully to send a valid array to the API
  previousQualifications: [
      // Example structure for one qualification entry
      { examination: 'Matriculation', totalMarks: '', boardUniversity: '', percentageCGPA: '', subjects: '' }
  ],
  
  // 4. Programme Details
  course: '', modeOfStudy: 'Regular', admissionType: 'Normal', academicSession: '2025-2026',
  
  // 5. Fee Details (Send as numbers)
  registrationFee: 1000, admissionFee: 15000, tuitionFee: 35000, totalFeesPaid: 16000
};

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQualificationChange = (index, field, value) => {
    const newQualifications = [...formData.previousQualifications];
    newQualifications[index] = { ...newQualifications[index], [field]: value };
    setFormData(prev => ({ ...prev, previousQualifications: newQualifications }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
        // We will send the formData directly. The backend controller handles generating the regNo.
        const response = await axios.post(API_URL, formData);
        
        if (response.status === 201) {
            setMessage(`✅ Student registered successfully! Reg No: ${response.data.data.regNo}`);
            setFormData(initialFormData); // Reset form
        }
    } catch (error) {
        console.error('Registration Error:', error.response ? error.response.data : error.message);
        const errorMsg = error.response?.data?.message || 'Server connection failed.';
        setMessage(`❌ Registration failed. ${errorMsg}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  // --- Helper Components (Simplified for brevity) ---
  const InputField = ({ label, name, value, onChange, type = 'text', required = false, cols = 1 }) => (
    <div className={`col-span-1 md:col-span-${cols}`}>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
  const SelectField = ({ label, name, value, onChange, options, required = false, cols = 1 }) => (
    <div className={`col-span-1 md:col-span-${cols}`}>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm bg-white focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="">Select</option>
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


  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        <h1 className="text-2xl font-extrabold text-teal-800 mb-6 border-b pb-2">
          New Student Online Registration
        </h1>

        {message && (
            <div className={`p-3 rounded-lg mb-4 text-white font-medium ${message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}>
                {message}
            </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* 1. PERSONAL DETAILS */}
          <SectionHeader title="Personal Details" color="bg-green-100" textColor="text-green-800" />
          <div className="p-4 border border-green-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Candidate Name" name="nameCandidate" value={formData.nameCandidate} onChange={handleChange} required />
              <InputField label="Mother Name" name="nameMother" value={formData.nameMother} onChange={handleChange} required />
              <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Upload Photo (Max size 500KB, JPG/PNG)</label>
                <div className="flex items-center space-x-2">
                    {/* File upload would require state and backend logic for Multer/file handling */}
                    <input type="file" id="photo" className="text-sm p-1 border border-gray-300 rounded-md w-full file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                    <button type="button" className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600">Upload</button>
                </div>
              </div>
            </div>
            {/* ... (rest of personal fields) ... */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <InputField label="Father Name" name="nameFather" value={formData.nameFather} onChange={handleChange} required cols={2} />
              <InputField label="DOB" name="dob" value={formData.dob} onChange={handleChange} type="date" required cols={2} />
              <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} required options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]} />
              <SelectField label="Category" name="category" value={formData.category} onChange={handleChange} required options={[{value: 'General', label: 'General'}, {value: 'OBC', label: 'OBC'}]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InputField label="Aadhar Number" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} />
              {/* Note: passport field omitted for brevity but should be included */}
              <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            </div>
          </div>

          {/* 2. COMMUNICATION DETAILS */}
          <SectionHeader title="Communication Details" color="bg-yellow-100" textColor="text-yellow-800" />
          <div className="p-4 border border-yellow-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InputField label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
              <InputField label="Email Address" name="emailAddress" value={formData.emailAddress} onChange={handleChange} type="email" required />
              <InputField label="Father Contact No." name="fatherContact" value={formData.fatherContact} onChange={handleChange} />
              <InputField label="Mother Contact No." name="motherContact" value={formData.motherContact} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <SelectField label="Country" name="country" value={'India'} onChange={handleChange} options={[{value: 'India', label: 'India'}]} required />
              <SelectField label="Nationality" name="nationality" value={'Indian'} onChange={handleChange} options={[{value: 'Indian', label: 'Indian'}]} required />
              <InputField label="State" name="state" value={formData.state} onChange={handleChange} required />
              <InputField label="District" name="city" value={formData.city} onChange={handleChange} required /> {/* Mapping District to City in the model */}
              <InputField label="Address" name="address" value={formData.address} onChange={handleChange} cols={1} />
              <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
            </div>
          </div>

          {/* 3. PREVIOUS QUALIFICATION DETAILS (Using simplified entry for the array) */}
          <SectionHeader title="Previous Qualification Details" color="bg-red-100" textColor="text-red-800" />
          <div className="p-4 border border-red-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-6 text-xs font-medium text-gray-700 border-b pb-2 mb-2">
                <div>Examination</div>
                <div>Total Marks</div>
                <div>Board/University</div>
                <div>Percentage/CGPA</div>
                <div>Subjects</div>
                <div>Uploads</div>
            </div>
            {/* Displaying and editing the first (and only, in this simplified example) qualification */}
            {formData.previousQualifications.map((qual, index) => (
                <div key={index} className="grid grid-cols-6 gap-2">
                    <InputField label={index === 0 ? "Matriculation" : " "} name={`exam-${index}`} value={qual.examination} onChange={(e) => handleQualificationChange(index, 'examination', e.target.value)} cols={1} />
                    <InputField label=" " name={`marks-${index}`} value={qual.totalMarks} onChange={(e) => handleQualificationChange(index, 'totalMarks', e.target.value)} />
                    <InputField label=" " name={`board-${index}`} value={qual.boardUniversity} onChange={(e) => handleQualificationChange(index, 'boardUniversity', e.target.value)} />
                    <InputField label=" " name={`percentage-${index}`} value={qual.percentageCGPA} onChange={(e) => handleQualificationChange(index, 'percentageCGPA', e.target.value)} />
                    <InputField label=" " name={`subjects-${index}`} value={qual.subjects} onChange={(e) => handleQualificationChange(index, 'subjects', e.target.value)} />
                    <button type="button" className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md hover:bg-gray-300 self-start mt-4">Upload Marksheet</button>
                </div>
            ))}
          </div>


          {/* 4. PROGRAMME DETAILS */}
          <SectionHeader title="Programme Details" color="bg-blue-100" textColor="text-blue-800" />
          <div className="p-4 border border-blue-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SelectField label="Course" name="course" value={formData.course} onChange={handleChange} required options={[{value: 'MBA', label: 'MBA'}, {value: 'BCA', label: 'BCA'}]} />
                <SelectField label="Mode of Study" name="modeOfStudy" value={formData.modeOfStudy} onChange={handleChange} options={[{value: 'Regular', label: 'Regular'}, {value: 'ODL', label: 'ODL'}]} />
                <SelectField label="Admission Type" name="admissionType" value={formData.admissionType} onChange={handleChange} options={[{value: 'Normal', label: 'Normal'}, {value: 'Lateral', label: 'Lateral'}]} />
                <SelectField label="Academic Session" name="academicSession" value={formData.academicSession} onChange={handleChange} options={[{value: '2025-2026', label: '2025-2026'}]} />
            </div>
          </div>
          
          {/* 5. FEE DETAILS (Note: Fee fields should likely be read-only/calculated in a real app) */}
          <SectionHeader title="Fee Details" color="bg-purple-100" textColor="text-purple-800" />
          <div className="p-4 border border-purple-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <InputField label="Registration Fee" name="registrationFee" value={formData.registrationFee} onChange={handleChange} type="number" />
                <InputField label="Admission Fee" name="admissionFee" value={formData.admissionFee} onChange={handleChange} type="number" />
                <InputField label="Enrollment Fee" name="enrollmentFee" value={formData.enrollmentFee} onChange={handleChange} type="number" />
                <InputField label="Tuition Fee" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} type="number" />
                <InputField label="Total Paid" name="totalFeesPaid" value={formData.totalFeesPaid} onChange={handleChange} type="number" />
            </div>
          </div>

          {/* 6. DECLARATION & SUBMISSION */}
          <div className="mt-8 p-4 bg-gray-50 border rounded-lg text-sm text-gray-600 space-y-3">
            <p>
              <input type="checkbox" required className="mr-2 text-teal-600 focus:ring-teal-500" />
              I hereby declare the details furnished by me above are true and correct to the best of my knowledge...
            </p>
            <p>
              <input type="checkbox" required className="mr-2 text-teal-600 focus:ring-teal-500" />
              I note that my admission is provisional and subject to the clearance of all dues to the University...
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:bg-teal-400"
            >
              <RiSaveLine className="mr-3 w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'CONTINUE APPLICATION'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;