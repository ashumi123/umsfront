import React from 'react';

// NOTE: This component is updated to match the exact format of the user's uploaded document (T3515210198 ASHUTOSH SHARMA- B.COM.docx).
const CertificateTemplate = ({ studentData }) => {
  console.log('studentData',studentData);
  if (!studentData || !studentData.subjects ) {
    return (
      <div className="text-center p-8 bg-white shadow-lg rounded-xl">
        <p className="text-xl font-semibold text-red-500">No Marks Data Available</p>
        <p className="text-gray-600">Please ensure marks have been entered for this student.</p>
      </div>
    );
  }

  // Helper to safely access and format data, using mock values if real studentData is incomplete.
  const getStudentInfo = (key, fallback = 'N/A') => studentData[key] || fallback;

  // Calculate totals
  const totalCredits = studentData.subjects.reduce((sum, s) => sum + (s.credit || 0), 0);
  const totalGrade = studentData.subjects.reduce((sum, s) => {
   return sum + (calculateGrade(s) || 1)}, 0);
  
  // Calculate total marks obtained (assuming required fields are present in data structure)
  const totalInternalMarksObtained = studentData.subjects.reduce((sum, s) => sum + (s.internalMarks || 0), 0);
  const totalExternalMarksObtained = studentData.subjects.reduce((sum, s) => sum + (s.externalMarks || 0), 0);
  const totalMarksObtained = totalInternalMarksObtained + totalExternalMarksObtained;

  // Calculate total min/max marks (using fixed values from the document for demonstration/mocking)
  // Internal Max is 40, Min is 16. External Max is 60, Min is 24.
  const totalInternalMax = studentData.subjects.length * 40;
  const totalInternalMin = studentData.subjects.length * 16;
  const totalExternalMax = studentData.subjects.length * 60;
  const totalExternalMin = studentData.subjects.length * 24;
  const grandTotalMin = totalInternalMin + totalExternalMin;
  const grandTotalMax = totalInternalMax + totalExternalMax;

  function calculateGrade(subject) {
    const totalMarks = subject.internalMarks + subject.externalMarks;
    
    // Grade = floor(totalMarks / 10) + 1
    // Example: 0-9 -> 1, 10-19 -> 2, ..., 90-99 -> 10, 100 -> 11
    let grade = Math.floor(totalMarks / 10) + 1;
  
    // Cap the maximum grade to 11 (for 100 marks)
    if (grade > 10) grade = 10;
  
    return grade;
  }
  return (
    <div className="max-w-6xl mx-auto p-8 bg-white border-4 border-double border-gray-900 shadow-2xl font-serif">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-wider">STATEMENT OF MARKS</h1>
      </div>

      {/* Student/Program Header Info */}
      <div className="text-sm space-y-1 mb-6 text-gray-700">
        <div className="grid grid-cols-2">
            <p><strong>School:</strong> {getStudentInfo('school', 'Commerce & Business Management')}</p>
            <p><strong>Department:</strong> {getStudentInfo('department', 'Commerce')}</p>
        </div>
        <div className="grid grid-cols-2">
            <p><strong>Program:</strong> {getStudentInfo('program', `${studentData.programCode}`)}</p>
            <p><strong>Batch:</strong> {getStudentInfo('batch', '2021–2024')}</p>
        </div>
        <div className="grid grid-cols-2">
            <p><strong>Name:</strong> <span className="uppercase font-semibold text-gray-900">{getStudentInfo('nameCandidate')}</span></p>
            <p><strong>Semester:</strong> {getStudentInfo('semester', 'I')}</p>
        </div>
        <div className="grid grid-cols-2">
            <p><strong>Enrollment No:</strong> {getStudentInfo('enrollmentNo')}</p>
            <p><strong>Examination held:</strong> {new Date(getStudentInfo('examDate', Date.now())).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Marks Table */}
      <div className="overflow-x-auto mb-6 border border-gray-400">
        <table className="min-w-full divide-y divide-gray-400 text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th rowSpan="2" className="w-1/12 px-2 py-2 text-left font-bold text-gray-800 uppercase border-r border-gray-400">Subject Code</th>
              <th rowSpan="2" className="w-4/12 px-2 py-2 text-left font-bold text-gray-800 uppercase border-r border-gray-400">Subject Name</th>
              <th rowSpan="2" className="w-1/12 px-2 py-2 text-center font-bold text-gray-800 uppercase border-r border-gray-400">Credit</th>
              <th colSpan="2" className="w-2/12 px-2 py-1 text-center font-bold text-gray-800 uppercase border-b border-r border-gray-400">Internal</th>
              <th colSpan="2" className="w-2/12 px-2 py-1 text-center font-bold text-gray-800 uppercase border-b border-r border-gray-400">External</th>
              <th rowSpan="2" className="w-1/12 px-2 py-2 text-center font-bold text-gray-800 uppercase border-r border-gray-400">Total Marks</th>
              <th colSpan="2" className="w-2/12 px-2 py-1 text-center font-bold text-gray-800 uppercase border-b border-gray-400">Grade Point (GP)</th>
            </tr>
            <tr>
                <th className="px-2 py-1 text-center font-medium text-gray-700 border-r border-gray-400">Min/Max</th>
                <th className="px-2 py-1 text-center font-medium text-gray-700 border-r border-gray-400">Marks Obtained</th>
                <th className="px-2 py-1 text-center font-medium text-gray-700 border-r border-gray-400">Min/Max</th>
                <th className="px-2 py-1 text-center font-medium text-gray-700 border-r border-gray-400">Marks Obtained</th>
                <th className="px-2 py-1 text-center font-medium text-gray-700 border-r border-gray-400">(out of 10)</th>
                <th className="px-2 py-1 text-center font-medium text-gray-700">Earned Credit (EC)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studentData.subjects.map((subject, index) => {

              console.log('subjectsubjectsubject',subject);
              // Using mock min/max marks based on document structure (e.g., 16/40 internal, 24/60 external)
              const internalMinMax = `${subject.internalMin || 16}/${subject.internalMax || 40}`;
              const externalMinMax = `${subject.externalMin || 24}/${subject.externalMax || 60}`;
              const totalObtained = subject.internalMarks + subject.externalMarks;
              const grade=calculateGrade(subject)
              return (
                <tr key={index}>
                  <td className="px-2 py-1 text-left text-gray-800 border-r border-gray-400">{subject.subjectCode}</td>
                  <td className="px-2 py-1 text-left text-gray-800 border-r border-gray-400">{subject.subjectName}</td>
                  <td className="px-2 py-1 text-center text-gray-800 border-r border-gray-400">{subject.credit}</td>
                  <td className="px-2 py-1 text-center text-gray-800 border-r border-gray-400">{internalMinMax}</td>
                  <td className="px-2 py-1 text-center text-gray-800 border-r border-gray-400">{subject.internalMarks}</td>
                  <td className="px-2 py-1 text-center text-gray-800 border-r border-gray-400">{externalMinMax}</td>
                  <td className="px-2 py-1 text-center text-gray-800 border-r border-gray-400">{subject.externalMarks}</td>
                  <td className="px-2 py-1 text-center text-gray-800 border-r border-gray-400 font-medium">{totalObtained}</td>
                  <td className="px-2 py-1 text-center text-gray-800 border-r border-gray-400">{grade}</td>
                  <td className="px-2 py-1 text-center text-gray-800">{subject.credit}</td>
                </tr>
              );
            })}
            {/* Totals Row */}
            <tr className="bg-gray-100 font-bold">
              <td colSpan="2" className="px-2 py-1 text-right uppercase border-r border-t border-gray-400">Total</td>
              <td className="px-2 py-1 text-center border-r border-t border-gray-400">{totalCredits}</td>
              <td className="px-2 py-1 text-center border-r border-t border-gray-400">{totalInternalMin}/{totalInternalMax}</td>
              <td className="px-2 py-1 text-center border-r border-t border-gray-400">{totalInternalMarksObtained}</td>
              <td className="px-2 py-1 text-center border-r border-t border-gray-400">{totalExternalMin}/{totalExternalMax}</td>
              <td className="px-2 py-1 text-center border-r border-t border-gray-400">{totalExternalMarksObtained}</td>
              <td className="px-2 py-1 text-center border-r border-t border-gray-400">{totalMarksObtained}</td>
              <td className="px-2 py-1 text-center border-r border-t border-gray-400">{getStudentInfo('overallGradePoint', Math.round(totalGrade/studentData.subjects?.length))}</td>
              <td className="px-2 py-1 text-center border-t border-gray-400">{getStudentInfo('totalEarnedCredit', totalCredits)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SGPA / CGPA / Result */}
      <div className="text-sm font-semibold mb-6 space-y-1">
        <div className="flex justify-between max-w-lg">
            <p><strong>SGPA</strong> &ndash;{totalGrade ? (totalGrade/studentData.subjects?.length)?.toFixed?.(2) : 'NA'}</p>
            <p><strong>CGPA</strong> &ndash;{studentData.cgpa ? studentData.cgpa?.toFixed?.(2) : 'NA'}</p>
        </div>
        <p><strong>Result:</strong> {getStudentInfo('finalResult', 'Passed and Promoted to Next Semester')}</p>
      </div>


      {/* Footer Signatures */}
      <div className="flex justify-between text-xs text-gray-700 pt-8 border-t border-gray-300">
        <div className="flex flex-col space-y-4">
            <p>Date of Issue: {new Date(getStudentInfo('dateOfIssue', Date.now())).toLocaleDateString()}</p>
        </div>
        <div className="text-center">
            {/* Placeholder for Signature */}
            <div className="h-10 w-32 mb-1 border-b border-gray-900 mx-auto"></div> 
            <p className="font-medium text-gray-800">Controller of Examinations</p>
        </div>
      </div>
      <p className="text-center text-xs pt-4 text-gray-500">Note: This is an electronically generated statement of marks.</p>
    </div>
  );
};

export default CertificateTemplate;
