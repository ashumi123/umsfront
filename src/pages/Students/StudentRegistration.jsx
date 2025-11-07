
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiAddBoxLine, RiDeleteBin2Fill, RiSaveLine,RiLoader2Fill } from 'react-icons/ri';

// IMPORTANT: Define your backend API URLs
const API_URL = 'https://umsbackend-l795.onrender.com/api/v1/students';
// New API URL for fetching courses
const COURSES_API_URL = 'https://umsbackend-l795.onrender.com/api/v1/courses';

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
    { examination: 'Matriculation (10th)', totalMarks: '', boardUniversity: '', percentageCGPA: '', subjects: '', documentPath: '' }
  ],

  // 4. Programme Details
  programCode: '', // Renamed from 'course' to 'programCode'
  modeOfStudy: 'Regular', admissionType: 'Normal', academicSession: '2025-2026',
  
  // NEW: Store current program's subjects and marks
  programSubjects: [], 

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
    const [user,setUser]=useState(null)
  useEffect(() => {
    getUserDetail()
  }, [])
  const getUserDetail=async()=>{
    let userDetail= localStorage.getItem('userData')
    let parseUserDetail= await JSON.parse(userDetail)
    setUser(parseUserDetail.user)
  }

  // --- Data Fetching ---
  useEffect(() => {
    const fetchCourses = async () => {
      setIsCoursesLoading(true);
      setCourseError(null);
      try {
        // NOTE: This Axios call will likely fail in the sandbox, resulting in mock data being used.
        const response = await axios.get(COURSES_API_URL);

        // Map API response to course options
        const courseOptions = response.data?.map(course => ({
          value: course?.name+course?.semester,
          label: course.name+course?.semester,
          // Extract fees
          admissionFee: Number(course?.feeStructure?.admissionFee) || 0,
          enrollmentFee: Number(course?.feeStructure?.enrollmentFee) || 0,
          registrationFee: Number(course?.feeStructure?.registrationFee) || 0,
          tuitionFee: Number(course?.feeStructure?.tuitionFee) || 0,
          // Extract subjects (assuming a structure like [{ code, name, maxMarks }])
          subjects: course.subjects || [] 
        })) || [];

        setCourses(courseOptions);


      } catch (err) {
        // Use mock data on failure to ensure form usability
        console.error('Error fetching courses:', err.response?.data || err.message);
        setCourseError('Failed to load courses. Using mock data.');
        setCourses([
          { 
            value: 'BCOM', label: 'Bachelor of Commerce (B.Com)', 
            registrationFee: 1000, admissionFee: 15000, tuitionFee: 35000, enrollmentFee: 500,
            subjects: [
              { subjectCode: 'BCOM-101', subjectName: 'Financial Accounting', maxMarks: 100 },
              { subjectCode: 'BCOM-102', subjectName: 'Business Economics', maxMarks: 100 },
              { subjectCode: 'BCOM-103', subjectName: 'Business Mathematics', maxMarks: 100 },
            ]
          },
          { 
            value: 'MBA', label: 'Master of Business Administration (MBA)',
            registrationFee: 2000, admissionFee: 25000, tuitionFee: 50000, enrollmentFee: 1000,
            subjects: [
              { subjectCode: 'MBA-101', subjectName: 'Management Principles', maxMarks: 100 },
              { subjectCode: 'MBA-102', subjectName: 'Organizational Behaviour', maxMarks: 100 },
            ]
          },
          { 
            value: 'BTECH_CS', label: 'B.Tech Computer Science', 
            registrationFee: 1500, admissionFee: 30000, tuitionFee: 60000, enrollmentFee: 800,
            subjects: [] // Example of a course with no subjects pre-defined
          },
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

    // 1. Handle Program Code Change (Updates Fees and Subjects)
    if (name === 'programCode') {
        const selectedCourse = courses.find(c => c.value === value);
        
        if (selectedCourse) {
            // Update fees
            const feesUpdate = {
                registrationFee: selectedCourse.registrationFee, 
                admissionFee: selectedCourse.admissionFee, 
                tuitionFee: selectedCourse.tuitionFee, 
                enrollmentFee: selectedCourse.enrollmentFee
            };
            feesUpdate.totalFeesPaid = Object.values(feesUpdate).reduce((a, b) => a + b, 0);

            // Initialize programSubjects: map subjects to include 'marksObtained'
            const initialSubjects = (selectedCourse.subjects || []).map(subject => ({
                subjectCode: subject.subjectCode,
                subjectName: subject.subjectName,
                // maxMarks: subject.maxMarks, // Keep maxMarks for display/validation
                // marksObtained: '' ,// New field for user input,
                internalMax:subject.internalMax,
              externalMax: subject.externalMax,
              internalObtain:'',
              externalObtain:''
            }));

            setFormData(prev => ({ 
                ...prev, 
                [name]: newValue, 
                ...feesUpdate,
                programSubjects: initialSubjects // Update subjects list
            }));
            return;
        }
    }
    
    // 2. Handle Academic Session Change (Updates Batch)
    if (name === 'academicSession') {
      const year = value.split('-')[0]; // e.g., '2025' from '2025-2026'
      setFormData(prev => ({
        ...prev,
        academicSession: newValue,
        batch: year // Update batch based on session start year
      }));
      return;
    }

    // 3. Handle Generic Field Change
    
    // Handle number conversion for fee fields (though disabled, kept for robustness)
    if (['registrationFee', 'admissionFee', 'tuitionFee', 'totalFeesPaid', 'enrollmentFee'].includes(name)) {
      newValue = parseFloat(value) || 0;
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  // Handler for marks obtained in the current program's subjects
  const handleSubjectMarkChange = (index, value,field) => {
    const newSubjects = [...formData.programSubjects];
    // Ensure value is a non-negative number and doesn't exceed maxMarks
    const maxMarks = newSubjects[index].maxMarks || Infinity;
    
    let marks = value === '' ? '' : Math.max(0, parseInt(value, 10));
    
    // if (marks > maxMarks) {
    //     marks = maxMarks; // Prevent exceeding max marks
    //     setMessage(`⚠️ Marks obtained cannot exceed maximum marks (${maxMarks}).`);
    // } else if(message.startsWith('⚠️')) {
    //      setMessage(''); // Clear warning if valid input is entered
    // }

    newSubjects[index] = { ...newSubjects[index], [field]: marks };

    setFormData(prev => ({ ...prev, programSubjects: newSubjects }));
  };
  
  // Utility for Session Options
  const getSession=()=>{
    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: 21 }, (_, i) => {
      const year = currentYear - 10 + i;
      return { value: `${year}-${year + 1}`, label: `${year}-${year + 1}` };
    });
    return years.reverse()
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
      // SIMULATION: Store the file name locally 
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
        program: formData.programCode,
        // Remove documentPath for the backend
        previousQualifications: formData.previousQualifications.map(({ documentPath, ...rest }) => rest),
        // Include registered subjects, removing the 'maxMarks' field which is UI-only
        registeredSubjects: formData.programSubjects.map(({ maxMarks, ...rest }) => rest),
        userId:user?.id
      };

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
        
        {isCoursesLoading && (
            <div className="flex items-center justify-center p-4 text-teal-600 font-semibold">
                <RiLoader2Fill className="w-5 h-5 animate-spin mr-2" /> Loading Course Data...
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
              {/* <InputField label="Enrollment No" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} /> */}
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
              <InputField label="State" name="state" value={formData.state} onChange={handleChange}  />
              <InputField label="District/City" name="city" value={formData.city} onChange={handleChange}  />
              <InputField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange}  />
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
              <SelectField label="Mode of Study" name="modeOfStudy" value={formData.modeOfStudy} onChange={handleChange} options={[{ value: 'Regular', label: 'Regular' }]} />
              <SelectField label="Admission Type" name="admissionType" value={formData.admissionType} onChange={handleChange} options={[{ value: 'Normal', label: 'Normal' }, { value: 'Lateral', label: 'Lateral' }]} />
              <SelectField label="Academic Session" name="academicSession" value={formData.academicSession} onChange={handleChange} options={getSession()} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Center Code (Auto-populated for Enrollment)" name="centerCode" value={formData.centerCode} onChange={handleChange} required disabled />
                <InputField label="Batch Year (Generated from Session)" name="batch" value={formData.batch} onChange={handleChange} required disabled />
            </div>
          </div>
          
          {/* 5. CURRENT PROGRAM SUBJECT MARKS */}
          {user?.type === 'Admin'?<SectionHeader title="5. Current Program Subject Marks" color="bg-indigo-50" textColor="text-indigo-700" />:null}
          {user?.type === 'Admin'?<div className="p-4 border border-indigo-200 rounded-b-lg space-y-4">
              {formData.programCode ? (
                formData.programSubjects.length > 0 ? (
                    <div className="space-y-3">
                        <div className="hidden md:grid grid-cols-5 gap-4 text-xs font-bold text-gray-700 pb-2 mb-2 bg-indigo-100 p-2 rounded-md">
                            <div className="col-span-1">Subject Code</div>
                            <div className="col-span-2">Subject Name</div>
                            <div className="col-span-1">External Marks Obtained</div>
                            <div className="col-span-1">Internal Marks Obtained</div>
                        </div>
                        {formData.programSubjects.map((subject, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3 items-center p-3 border border-indigo-100 rounded-lg bg-white shadow-sm">
                                {/* Subject Code */}
                                <div className="col-span-1">
                                    <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Subject Code</label>
                                    <p className="text-sm font-semibold text-gray-800">{subject.subjectCode}</p>
                                </div>
                                
                                {/* Subject Name */}
                                <div className="col-span-2">
                                    <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Subject Name</label>
                                    <p className="text-sm text-gray-600">{subject.subjectName}</p>
                                </div>
                                
                                {/* Max Marks */}
                                <div className="col-span-1">
                                    <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">External Marks Obtained</label>
                                    <input
                                        type="number"
                                        value={subject.externalObtain}
                                        onChange={(e) => handleSubjectMarkChange(index, e.target.value,'externalObtain')}
                                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                                        placeholder="Enter External Marks"
                                        min="0"
                                        max={subject.maxMarks || undefined}
                                        required
                                    />
                                </div>
                                
                                {/* Marks Obtained (User Input) */}
                                <div className="col-span-1">
                                    <label className="md:hidden block text-xs font-medium text-gray-700 mb-1">Internal Marks Obtained</label>
                                    <input
                                        type="number"
                                        value={subject.internalObtain}
                                        onChange={(e) => handleSubjectMarkChange(index, e.target.value,'internalObtain')}
                                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                                        placeholder="Enter Internal Marks"
                                        min="0"
                                        max={subject.maxMarks || undefined}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 p-2 bg-indigo-50 rounded-lg">No subjects defined for the selected program in the first semester/year.</p>
                )
              ) : (
                <p className="text-sm text-gray-500 p-2 bg-indigo-50 rounded-lg">Select a **Program Applied For** in Section 4 to view subjects and enter marks.</p>
              )}
          </div>:null}


          {/* 6. FEE DETAILS */}
          <SectionHeader title="6. Fee Structure and Payment" color="bg-red-50" textColor="text-red-700" />
          <div className="p-4 border border-red-200 rounded-b-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <InputField disabled label="Registration Fee (₹)" name="registrationFee" value={formData.registrationFee} onChange={handleChange} type="number" />
              <InputField disabled label="Admission Fee (₹)" name="admissionFee" value={formData.admissionFee} onChange={handleChange} type="number" />
              <InputField disabled label="Enrollment Fee (₹)" name="enrollmentFee" value={formData.enrollmentFee} onChange={handleChange} type="number" />
              <InputField disabled label="Tuition Fee (₹)" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} type="number" />
              <InputField disabled label="Total Fees Paid (₹)" name="totalFeesPaid" value={formData.totalFeesPaid} onChange={handleChange} type="number" required />
            </div>
          </div>

          {/* 7. DECLARATION & SUBMISSION */}
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

