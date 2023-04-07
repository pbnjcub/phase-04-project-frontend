import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import StudentEditForm from './StudentEditForm';

const Student = ( {handleEditSubmit, formFlag, setFormFlag, students, handleSelectedStudent, errorMessages} ) => {
  const { id } = useParams();
  console.log(students)
  const selectedStudent = students.find((student) => student.id === parseInt(id));
  handleSelectedStudent(selectedStudent)

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);
  return (
    <div>
      <h1>Student Report for {selectedStudent.last_name}, {selectedStudent.first_name} </h1>
      <br />
      <br />
      {formFlag ?
        <StudentEditForm editedStudent={selectedStudent} handleEditSubmit={handleEditSubmit} /> :
        <button onClick={() => setFormFlag(true)}>Edit Student</button>}
      <br />
      {renderErrors}
    </div>
  );
}

export default Student;