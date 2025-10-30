// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { RiSaveLine,RiDeleteBack2Fill } from 'react-icons/ri';

// // IMPORTANT: Define your backend API URL for courses
// const API_URL = 'https://umsbackend-l795.onrender.com/api/v1/courses';

// const initialFeeStructure = {
//     registrationFee: 0,
//     admissionFee: 0,
//     tuitionFee: 0,
//     enrollmentFee: 0,
// };

// const initialFormData = {
//     name: '', // Full Course Name (e.g., Bachelor of Computer Applications)
//     value: '', // Course Code (e.g., BCA)
//     feeStructure: initialFeeStructure,
// };

// // --- Helper Components (Defined outside to prevent focus loss) ---
// const InputField = ({ label, name, value, onChange, type = 'text', required = false, disabled = false }) => (
//     <div>
//         <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
//         <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             required={required}
//             disabled={disabled}
//             className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
//             placeholder={`Enter ${label}`}
//         />
//     </div>
// );

// const SectionHeader = ({ title }) => (
//     <h2 className="text-lg font-bold text-teal-700 border-b border-teal-200 pb-2 mb-4 mt-6">
//         {title}
//     </h2>
// );
// // --- End Helper Components ---


// const CourseManagement = () => {
//     const [formData, setFormData] = useState(initialFormData);
//     const [courses, setCourses] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     // --- Data Fetching ---
//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     const fetchCourses = async () => {
//         setIsLoading(true);
//         setError('');
//         try {
//             const response = await axios.get(API_URL);
//             setCourses(response.data);
//         } catch (err) {
//             console.error('Error fetching courses:', err);
//             setError('Failed to load courses. Please check the backend connection.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // --- Handlers ---
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         // For fee structure, ensure values are stored as numbers
//         if (name in initialFeeStructure) {
//             setFormData(prev => ({
//                 ...prev,
//                 feeStructure: {
//                     ...prev.feeStructure,
//                     [name]: parseFloat(value) || 0, // Convert to number, default to 0
//                 }
//             }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setMessage('');
//         setError('');

//         try {
//             // Basic client-side validation for course code/name
//             if (!formData.name || !formData.value) {
//                 setError('Course Name and Code are required.');
//                 return;
//             }

//             // Clean up fee structure to ensure all fields are present
//             const payload = {
//                 ...formData,
//                 value: formData.value.toUpperCase(), // Ensure code is uppercase
//             };

//             const response = await axios.post(API_URL, payload);

//             if (response.status === 201) {
//                 setMessage(`✅ Course "${response.data.name}" added successfully!`);
//                 setFormData(initialFormData); // Reset form
//                 fetchCourses(); // Refresh the list
//             }
//         } catch (err) {
//             console.error('Submission Error:', err.response ? err.response.data : err.message);
//             const errorMsg = err.response?.data?.message || 'Failed to submit course data.';
//             setError(`❌ Submission failed. ${errorMsg}`);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Calculate total fees
//     const totalFee = Object.values(formData.feeStructure).reduce((sum, fee) => sum + (fee || 0), 0);
    
//     // --- Render ---
//     return (
//         <div className="bg-gray-50 min-h-screen p-8">
//             <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6">
//                 <h1 className="text-3xl font-extrabold text-teal-800 mb-6 border-b pb-2">
//                     Admin: Course & Fee Management
//                 </h1>

//                 {/* Feedback Messages */}
//                 {message && (
//                     <div className="p-3 rounded-lg mb-4 text-white font-medium bg-green-500">
//                         {message}
//                     </div>
//                 )}
//                 {error && (
//                     <div className="p-3 rounded-lg mb-4 text-white font-medium bg-red-500">
//                         {error}
//                     </div>
//                 )}

//                 {/* --- 1. NEW COURSE REGISTRATION FORM --- */}
//                 <SectionHeader title="Register New Course" />
//                 <form onSubmit={handleSubmit} className="space-y-6 p-4 border border-teal-200 rounded-lg">
                    
//                     {/* Course Details */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <InputField label="Course Name (e.g., BCA)" name="name" value={formData.name} onChange={handleChange} required />
//                         <InputField label="Course Code (e.g., BCA)" name="value" value={formData.value} onChange={handleChange} required />
//                         <div className="col-span-1">
//                             <label className="block text-xs font-medium text-gray-700 mb-1">Total Course Fee</label>
//                             <div className="w-full border border-teal-500 bg-teal-50 text-teal-800 rounded-md shadow-sm p-2 text-sm font-semibold">
//                                 ₹ {totalFee.toLocaleString('en-IN')}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Fee Structure */}
//                     <SectionHeader title="Fee Structure (Amounts in ₹)" />
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         <InputField 
//                             label="Registration Fee" 
//                             name="registrationFee" 
//                             value={formData.feeStructure.registrationFee} 
//                             onChange={handleChange} 
//                             type="number"
//                         />
//                         <InputField 
//                             label="Admission Fee" 
//                             name="admissionFee" 
//                             value={formData.feeStructure.admissionFee} 
//                             onChange={handleChange} 
//                             type="number"
//                         />
//                         <InputField 
//                             label="Tuition Fee" 
//                             name="tuitionFee" 
//                             value={formData.feeStructure.tuitionFee} 
//                             onChange={handleChange} 
//                             type="number"
//                         />
//                         <InputField 
//                             label="Enrollment Fee" 
//                             name="enrollmentFee" 
//                             value={formData.feeStructure.enrollmentFee} 
//                             onChange={handleChange} 
//                             type="number"
//                         />
//                     </div>
                    
//                     {/* Submit Button */}
//                     <div className="pt-4 flex justify-center">
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:bg-teal-400"
//                         >
//                                            <RiSaveLine className="mr-3 w-5 h-5" />

//                             {isSubmitting ? 'Saving Course...' : 'Save New Course'}
//                         </button>
//                     </div>
//                 </form>

//                 {/* --- 2. EXISTING COURSES LIST --- */}
//                 <SectionHeader title="Existing Courses" />
                
//                 {isLoading && (
//                     <div className="text-center p-4 text-gray-500">Loading courses...</div>
//                 )}

//                 {!isLoading && courses.length === 0 && (
//                     <div className="text-center p-4 text-red-500 border border-red-200 rounded-lg bg-red-50">
//                         No courses found. Please add a new course above.
//                     </div>
//                 )}

//                 {!isLoading && courses.length > 0 && (
//                     <div className="overflow-x-auto shadow-md rounded-lg">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name (Code)</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuition</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider font-bold">Total Fee</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {courses.map((course) => {
//                                     const fees = course.feeStructure;
//                                     const total = fees.registrationFee + fees.admissionFee + fees.tuitionFee + fees.enrollmentFee;
//                                     return (
//                                         <tr key={course.value}>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-700">
//                                                 {course.name} <span className="text-gray-500">({course.value})</span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{fees.registrationFee.toLocaleString('en-IN')}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{fees.admissionFee.toLocaleString('en-IN')}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{fees.tuitionFee.toLocaleString('en-IN')}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{fees.enrollmentFee.toLocaleString('en-IN')}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-600">₹{total.toLocaleString('en-IN')}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 <button
//                                                     onClick={() => console.log('Edit course:', course.value)}
//                                                     className="text-indigo-600 hover:text-indigo-900 mr-2 p-1 rounded hover:bg-indigo-50"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => console.log('Delete course:', course.value)}
//                                                     className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
//                                                 >
//                                                     <RiDeleteBack2Fill className="w-4 h-4 inline" />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CourseManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiSaveLine,RiDeleteBack2Fill, RiEdit2Fill,RiCrossFill, RiAddBoxFill, RiRotateLockFill, RiFileExcel2Fill } from 'react-icons/ri'; // Import new icon

// IMPORTANT: Define your backend API URL for courses
const API_URL = 'https://umsbackend-l795.onrender.com/api/v1/courses';

const initialFeeStructure = {
    registrationFee: 0,
    admissionFee: 0,
    tuitionFee: 0,
    enrollmentFee: 0,
};

// New Subject structure for state management
const initialSubject = {
    subjectName: '',
    subjectCode: '',
    credit: 0,
    internalMax: 0,
    externalMax: 0,
};

const initialFormData = {
    name: '', // Full Course Name (e.g., Bachelor of Computer Applications)
    value: '', // Course Code (e.g., BCA)
    school: '', 
    department: '', 
    semester:'',
    feeStructure: initialFeeStructure,
    subjects: [], // NEW: Array to hold subject objects
};

const getSession = () => {
  const semesters = Array.from({ length: 8 }, (_, i) => {
    const sem = i + 1;
    return { value: `Semester ${sem}`, label: `Semester ${sem}` };
  });
  return semesters;
};

// --- Helper Components ---
const InputField = ({ label, name, value, onChange, type = 'text', required = false, disabled = false }) => (
    <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-shadow"
            placeholder={`Enter ${label}`}
            min={type === 'number' ? 0 : undefined}
        />
    </div>
);

const SectionHeader = ({ title }) => (
    <h2 className="text-xl font-bold text-teal-700 border-b border-teal-200 pb-3 mb-6 mt-8">
        {title}
    </h2>
);
// --- End Helper Components ---


const CourseManagement = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [courses, setCourses] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    const [editingCourse, setEditingCourse] = useState(null); 
    const [confirmDelete, setConfirmDelete] = useState(null); 

    // NEW STATE for managing the subject currently being added/edited
    const [newSubject, setNewSubject] = useState(initialSubject);
    const [editingSubjectIndex, setEditingSubjectIndex] = useState(null); // Index of subject being edited

    // --- Data Fetching ---
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get(API_URL);
            // Ensure course data has a subjects array for consistency
            setCourses(response.data.map(course => ({
                ...course,
                subjects: course.subjects || []
            })));
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('❌ Failed to load courses. Check backend connection and URL.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Form Handlers (Omitted for brevity, assume they are the same as in the original code) ---
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in initialFeeStructure) {
            setFormData(prev => ({
                ...prev,
                feeStructure: {
                    ...prev.feeStructure,
                    [name]: parseFloat(value) || 0,
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubjectChange = (e) => {
        const { name, value } = e.target;
        const typedValue = (name === 'subjectName' || name === 'subjectCode') 
            ? value : parseFloat(value) < 0 ? 0 : parseFloat(value) || 0;

        setNewSubject(prev => ({
            ...prev,
            [name]: typedValue,
        }));
    };

    const handleAddOrUpdateSubject = () => {
        if (!newSubject.subjectName || !newSubject.subjectCode || newSubject.credit <= 0 || (newSubject.internalMax + newSubject.externalMax) <= 0) {
            setError('Please complete all subject fields and ensure credit/total marks are greater than 0.');
            return;
        }

        const isDuplicate = formData.subjects.some((s, index) => 
            s.subjectCode.toUpperCase() === newSubject.subjectCode.toUpperCase() && index !== editingSubjectIndex
        );

        if (isDuplicate) {
            setError(`Subject code '${newSubject.subjectCode.toUpperCase()}' already exists in this course.`);
            return;
        }

        setError(''); 

        setFormData(prev => {
            const updatedSubjects = [...prev.subjects];
            
            const subjectPayload = {
                ...newSubject,
                subjectCode: newSubject.subjectCode.toUpperCase()
            };

            if (editingSubjectIndex !== null) {
                updatedSubjects[editingSubjectIndex] = subjectPayload;
            } else {
                updatedSubjects.push(subjectPayload);
            }

            return { ...prev, subjects: updatedSubjects };
        });

        setNewSubject(initialSubject);
        setEditingSubjectIndex(null);
    };

    const startEditSubject = (subject, index) => {
        setNewSubject(subject);
        setEditingSubjectIndex(index);
        setError('');
    };

    const cancelSubjectEdit = () => {
        setNewSubject(initialSubject);
        setEditingSubjectIndex(null);
        setError('');
    }

    const removeSubject = (index) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.filter((_, i) => i !== index)
        }));
        if (editingSubjectIndex === index) {
            cancelSubjectEdit();
        }
    };
    
    const handleSave = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setError('');

        const isUpdating = editingCourse?._id;
        const url = isUpdating ? `${API_URL}/${editingCourse._id}` : API_URL;
        const method = isUpdating ? 'put' : 'post';
        const action = isUpdating ? 'Updated' : 'Added';

        try {
            if (!formData.name || !formData.value) {
                setError('Course Name and Code are required.');
                setIsSubmitting(false);
                return;
            }
            if (formData.subjects.length === 0) {
                 console.warn("Saving course with no subjects.");
            }

            const payload = {
                ...formData,
                value: formData.value.toUpperCase(),
            };

            const response = await axios[method](url, payload);

            setMessage(`✅ Course "${response.data.name}" ${action} successfully!`);
            handleCancelEdit(); 
            fetchCourses(); 
            
        } catch (err) {
            console.error('Submission Error:', err.response ? err.response.data : err.message);
            const errorMsg = err.response?.data?.message || `Failed to ${isUpdating ? 'update' : 'submit'} course data.`;
            setError(`❌ Submission failed. ${errorMsg}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const startEdit = (course) => {
        setEditingCourse(course);
        setMessage('');
        setError('');
        cancelSubjectEdit(); 
        
        setFormData({
            name: course.name,
            value: course.value,
            feeStructure: { ...course.feeStructure },
            subjects: course.subjects ? [...course.subjects] : [],
            school:course?.school?course?.school:'',
            department:course?.department?course?.department:''
        });
    };

    const handleCancelEdit = () => {
        setEditingCourse(null);
        setFormData(initialFormData);
        cancelSubjectEdit();
        setMessage('');
        setError('');
    };
    
    const confirmDeletion = (courseId, courseName) => {
        setConfirmDelete({ id: courseId, name: courseName });
    };

    const executeDelete = async () => {
        const { id, name } = confirmDelete;
        setConfirmDelete(null); 
        setError('');
        setMessage('');
        
        try {
            await axios.delete(`${API_URL}/${id}`);
            setMessage(`🗑️ Course "${name}" deleted successfully!`);
            fetchCourses();
        } catch (err) {
            console.error('Deletion Error:', err);
            setError(`❌ Failed to delete course: ${name}. Server error.`);
        }
    };

    // Calculate total fees
    const totalFee = Object.values(formData.feeStructure).reduce((sum, fee) => sum + (fee || 0), 0);
    
    // --- NEW: CSV Export Handler ---
    const handleExportToCSV = () => {
        if (courses.length === 0) {
            alert("No courses to export.");
            return;
        }

        // 1. Define CSV Headers
        const headers = [
            "Course Name", "Course Code", "School", "Department", 
            "Registration Fee (₹)", "Admission Fee (₹)", "Tuition Fee (₹)", 
            "Enrollment Fee (₹)", "Total Fee (₹)", "Total Subjects"
        ];
        
        // 2. Format the data rows
        const csvRows = courses.map(course => {
            const fees = course.feeStructure;
            const totalFeeValue = Object.values(fees).reduce((sum, fee) => sum + (fee || 0), 0);
            const subjectCount = course.subjects?.length || 0;

            return [
                `"${course.name.replace(/"/g, '""')}"`, // Escape quotes in strings
                course.value,
                `"${(course.school || '').replace(/"/g, '""')}"`,
                `"${(course.department || '').replace(/"/g, '""')}"`,
                fees.registrationFee,
                fees.admissionFee,
                fees.tuitionFee,
                fees.enrollmentFee,
                totalFeeValue,
                subjectCount
            ].join(','); // Join fields with a comma
        });

        // 3. Combine headers and rows
        const csvContent = [
            headers.join(','),
            ...csvRows
        ].join('\n'); // Join rows with a newline

        // 4. Trigger the download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'Course_Data_Export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMessage('✅ Course data exported successfully!');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    };
    // --- End CSV Export Handler ---
    
    // --- Render ---

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

    return (
        <div className="bg-gray-50 min-h-screen p-6 sm:p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                <h1 className="text-3xl font-extrabold text-teal-800 mb-6 border-b pb-2">
                    Admin: Course & Fee Management
                </h1>

                {/* Feedback Messages (Same as original) */}
                {(message || error) && (
                    <div className={`p-4 rounded-xl mb-6 font-medium shadow-md ${
                        message ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 'bg-red-100 text-red-800 border-l-4 border-red-500'
                    }`}>
                        {message || error}
                    </div>
                )}

                {/* --- 1. NEW/EDIT COURSE FORM (Same as original) --- */}
                <SectionHeader title={editingCourse ? `Editing Course: ${editingCourse.name}` : "Register New Course"} />
                
                <div className="space-y-6 p-6 border border-teal-200 rounded-xl bg-white shadow-inner">
                    
                    <form onSubmit={handleSave} className="space-y-6">
                        {/* Course Details */}
                        <h3 className="text-base font-semibold text-gray-700">Basic Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField label="Course Name (e.g., BCA)" name="name" value={formData.name} onChange={handleChange} required />
                            {/* <InputField 
                                label="Semester" 
                                name="value" 
                                value={formData.semester} 
                                onChange={handleChange} 
                                required 
                            /> */}
                            <SelectField label="Semester" name="semester" value={formData.semester} onChange={handleChange} options={getSession()} required />
                            <InputField 
                                label="Course Code (Unique)" 
                                name="value" 
                                value={formData.value} 
                                onChange={handleChange} 
                                required 
                                disabled={!!editingCourse} 
                            />
                            <InputField 
                                label="School" 
                                name="school" 
                                value={formData.school} 
                                onChange={handleChange} 
                                required 
                            />
                            <InputField 
                                label="Department" 
                                name="department" 
                                value={formData.department} 
                                onChange={handleChange} 
                                required 
                            />
                            
                            <div className="col-span-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Total Course Fee</label>
                                <div className="w-full border border-teal-500 bg-teal-50 text-teal-800 rounded-lg shadow-sm p-3 text-sm font-semibold flex items-center h-full">
                                    <span className="text-lg">₹ {totalFee.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Fee Structure */}
                        <h3 className="text-base font-semibold text-gray-700 pt-4 border-t">Fee Components (Amounts in ₹)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {Object.keys(initialFeeStructure).map(key => (
                                <InputField 
                                    key={key}
                                    label={key.replace(/([A-Z])/g, ' $1').trim() + ' Fee'} 
                                    name={key} 
                                    value={formData.feeStructure[key]} 
                                    onChange={handleChange} 
                                    type="number"
                                    required
                                />
                            ))}
                        </div>
                    
                        {/* Action Buttons */}
                        <div className="pt-6 flex flex-wrap justify-end gap-3 border-t pt-4"> 
                            {editingCourse && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                                >
                                     Cancel Edit
                                </button>
                            )}
                            
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-lg transition-colors 
                                    ${isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                            >
                                {isSubmitting ? 'Processing...' : (
                                    <>
                                        <RiSaveLine className="mr-2 w-5 h-5" />
                                        {editingCourse ? 'Update Course Details' : 'Save New Course'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    
                    {/* --- Subject Management Section (Same as original) --- */}
                    <SectionHeader title="Subject Management" />
                    <div className="space-y-4 p-4 border border-blue-200 rounded-xl bg-blue-50">
                        <h3 className="text-lg font-semibold text-blue-800">
                            {editingSubjectIndex !== null ? 'Edit Subject' : 'Add New Subject'}
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                            <div className="md:col-span-2">
                                <InputField label="Subject Name" name="subjectName" value={newSubject.subjectName} onChange={handleSubjectChange} required />
                            </div>
                            <InputField label="Subject Code" name="subjectCode" value={newSubject.subjectCode} onChange={handleSubjectChange} required />
                            <InputField label="Credit" name="credit" value={newSubject.credit} onChange={handleSubjectChange} type="number" required />
                            <InputField label="Internal Max" name="internalMax" value={newSubject.internalMax} onChange={handleSubjectChange} type="number" required />
                            <InputField label="External Max" name="externalMax" value={newSubject.externalMax} onChange={handleSubjectChange} type="number" required />
                        </div>

                        <div className="flex justify-end space-x-3 pt-2">
                             {editingSubjectIndex !== null && (
                                <button
                                    type="button"
                                    onClick={cancelSubjectEdit}
                                    className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                                >
                                    <RiRotateLockFill className="w-4 h-4 mr-1" /> Cancel
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleAddOrUpdateSubject}
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                {editingSubjectIndex !== null ? (
                                    <> <RiEdit2Fill className="w-4 h-4 mr-1" /> Update Subject</>
                                ) : (
                                    <> <RiAddBoxFill className="w-4 h-4 mr-1" /> Add Subject </>
                                )}
                            </button>
                        </div>

                        {/* Subject List */}
                        <h4 className="text-md font-semibold text-blue-800 pt-4 border-t border-blue-200">
                            Subjects for {formData.name || 'this Course'} ({formData.subjects.length})
                        </h4>
                        
                        {formData.subjects.length === 0 ? (
                            <p className="text-gray-500 italic">No subjects added yet. Use the form above to define them.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-blue-200 border border-blue-200 rounded-lg">
                                    <thead className="bg-blue-100">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-blue-700">Code</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-blue-700">Name</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-blue-700">Credit</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-blue-700">Internal/External</th>
                                            <th className="px-3 py-2 text-center text-xs font-medium text-blue-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-blue-100">
                                        {formData.subjects.map((subject, index) => (
                                            <tr key={subject.subjectCode} className={editingSubjectIndex === index ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                                                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-blue-800">{subject.subjectCode}</td>
                                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{subject.subjectName}</td>
                                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{subject.credit}</td>
                                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{subject.internalMax}/{subject.externalMax}</td>
                                                <td className="px-3 py-2 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => startEditSubject(subject, index)}
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100"
                                                        title="Edit Subject"
                                                    >
                                                        <RiEdit2Fill className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSubject(index)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                                                        title="Remove Subject"
                                                    >
                                                        <RiDeleteBack2Fill className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div> {/* End of form container */}

                {/* --- 2. EXISTING COURSES LIST --- */}
                <div className="flex justify-between items-center mt-8">
                     <SectionHeader title="Existing Courses" />
                     {/* 🚀 NEW: Export Button */}
                     {courses.length > 0 && (
                        <button
                            onClick={handleExportToCSV}
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                            title="Download All Course Data as CSV"
                        >
                            <RiFileExcel2Fill className="w-5 h-5 mr-2" /> Export to CSV
                        </button>
                    )}
                </div>
                
                {isLoading && <p className="text-center text-teal-600 font-semibold py-4">Loading courses...</p>}
                {!isLoading && courses.length === 0 && <p className="text-center text-gray-500 py-4">No courses registered yet. Add one above!</p>}

                {!isLoading && courses.length > 0 && (
                    <div className="overflow-x-auto shadow-xl rounded-xl mt-4 border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-1/4">Course Name (Code)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total Subjects</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Registration</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tuition</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider font-bold">Total Fee</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {courses.map((course) => {
                                    const fees = course.feeStructure;
                                    const total = Object.values(fees).reduce((sum, fee) => sum + (fee || 0), 0);
                                    const isCurrentEdit = editingCourse?._id === course._id;
                                    
                                    return (
                                        <tr key={course._id} className={isCurrentEdit ? 'bg-teal-50 border-y-2 border-teal-500' : 'hover:bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-700">
                                                {course.name} <span className="text-gray-500 text-xs font-normal">({course.value})</span>
                                            </td>
                                            {/* Display subject count */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-bold">
                                                {course.subjects?.length || 0}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{fees.registrationFee.toLocaleString('en-IN')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{fees.tuitionFee.toLocaleString('en-IN')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-600">₹{total.toLocaleString('en-IN')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                <button
                                                    onClick={() => startEdit(course)}
                                                    disabled={isCurrentEdit}
                                                    className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors disabled:text-gray-400 disabled:bg-transparent"
                                                    title="Edit Course Details"
                                                >
                                                    <RiEdit2Fill className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDeletion(course._id, course.name)}
                                                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                    title="Delete Course"
                                                >
                                                    <RiDeleteBack2Fill className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            {/* --- Delete Confirmation Modal (Same as original) --- */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                            <RiDeleteBack2Fill className="w-6 h-6 mr-2" /> Confirm Deletion
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to permanently delete the course <span className="font-semibold text-teal-700">"{confirmDelete.name}"</span>? 
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={executeDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Delete Permanently
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManagement;