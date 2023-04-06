import React, {useState, useEffect } from 'react';
import StudentLink from './StudentLink';
import StudentNewForm from './StudentNewForm';

const Students = ({students, setStudents, handleNewSubmit, errorMessages, newStudent, setNewStudent, deleteStudent}) => {

 


// // list of students last names
  const studentList = students.map((student) => <StudentLink key={student.id} student={student} deleteStudent={deleteStudent}/>);
//   // find student by id
//   const student = students.find((student) => student.id === id);

  // const handleNewSubmit = (e) => {
  //   e.preventDefault();
  //   fetch("http://127.0.0.1:9393/students", {
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json",
  //           "Accept": "application/json"
  //       },
  //       body: JSON.stringify(newStudent),
  //   })
  //       .then((resp) => resp.json())
  //       .then(data => {
  //           if (data.errors) {
  //               setErrorMessages(data.errors);
  //           } else {
  //               setStudents([...students, data]);
  //               setErrorMessages([])
  //           }
  //       })
        
  //   };

    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);


  return (
    <div>
      <h1>Teacher View</h1>
      <StudentNewForm handleNewSubmit={handleNewSubmit} newStudent={newStudent} setNewStudent={setNewStudent} />
      <br/>
      {renderErrors}
      <div>
        {studentList}
      </div>
    </div>
  );
}

export default Students;