import React, { useState } from 'react';

const EnrollmentDropdown = ({ unenrolledStudents, handleEnrollment }) => {
  //state variables
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [grade, setGrade] = useState('');

  //sets studentId from dropdown menu
  const handleStudentChange = (e) => {
    setSelectedStudentId(e.target.value);
  };

  //sets the grade change from enroll student form.
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  //enrollment action => handleEnrollment
  const handleEnrollmentClick = () => {
    if (selectedStudentId) {
      handleEnrollment(selectedStudentId, grade);
      setSelectedStudentId(" ");
      setGrade(' ');
    }
  };

  return (
    <div>
      <select
        value={selectedStudentId}
        onChange={handleStudentChange}
      >
        <option value=" ">Select a student</option>
        {unenrolledStudents.map((student) => (
          <option key={student.id} value={student.id}>
            {student.last_name}, {student.first_name}
          </option>
        ))}
      </select>

      {selectedStudentId && (
        <div>
          <input type="text" placeholder="Enter grade" value={grade} onChange={handleGradeChange}/>
          <br />
          <button onClick={handleEnrollmentClick}>
            Enroll
          </button>
        </div>
      )}
    </div>
  );
};

export default EnrollmentDropdown;
