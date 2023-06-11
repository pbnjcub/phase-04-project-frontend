import React, { useState } from 'react';

const EnrollmentDropdown = ({ unenrolledStudents, handleEnrollment }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [grade, setGrade] = useState('');

  const handleStudentChange = (event) => {
    setSelectedStudentId(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleEnrollmentClick = () => {
    if (selectedStudentId) {
      handleEnrollment(selectedStudentId, grade);
      setSelectedStudentId(null);
      setGrade('');
    }
  };

  return (
    <div>
      <select
        value={selectedStudentId}
        onChange={handleStudentChange}
      >
        <option value="">Select a student</option>
        {unenrolledStudents.map((student) => (
          <option key={student.id} value={student.id}>
            {student.last_name}, {student.first_name}
          </option>
        ))}
      </select>

      {selectedStudentId && (
        <div>
          <input
            type="text"
            placeholder="Enter grade"
            value={grade}
            onChange={handleGradeChange}
          />
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
