import React, {useState, useEffect } from 'react';
import StudentLink from './StudentLink';
import StudentNewForm from './StudentNewForm';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:9393//students")
      .then((resp) => resp.json())
      .then((data) => setStudents(data));
  }, []);

  const deleteStudent = (deletedStudent) => {
    fetch(`http://127.0.0.1:9393//students/${deletedStudent.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then(() => {
        const updatedStudents = students.filter(
          (student) => student.id !== deletedStudent.id
        );
        setStudents(updatedStudents);
      });
  };


// // list of students last names
  const studentList = students.map((student) => <StudentLink key={student.id} student={student} deleteStudent={deleteStudent}/>);
//   // find student by id
//   const student = students.find((student) => student.id === id);

const handleSubmit = (e) => {
  e.preventDefault();
  fetch("http://127.0.0.1:9393/students", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(newStudent),
  })
      .then((resp) => resp.json())
      .then((data) => setStudents([...students, data]))
      .catch((error) => console.log(error));
      
};


  return (
    <div>
      <h1>Teacher View</h1>
      <StudentNewForm handleSubmit={handleSubmit} newStudent={newStudent} setNewStudent={setNewStudent} />
      <div>
        {studentList}
      </div>
    </div>
  );
}

export default Students;