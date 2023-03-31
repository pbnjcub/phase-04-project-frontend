import React, {useState, useEffect } from 'react';
import StudentLink from './StudentLink';
import StudentForm from './StudentForm';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
});

  useEffect(() => {
    fetch("http://127.0.0.1:9393//students")
      .then((resp) => resp.json())
      .then((data) => setStudents(data));
}, []);


// // list of students last names
  const studentList = students.map((student) => <StudentLink key={student.id} student={student} />);
//   // find student by id
//   const student = students.find((student) => student.id === id);

const handleSubmit = (e) => {
  e.preventDefault();
  fetch("http://127.0.0.1:9393/students", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
  })
      .then((resp) => resp.json())
      .then((data) => setStudents([...students, data]))
      .catch((error) => console.log(error));
      
};


  return (
    <div>
      <h1>Teacher View</h1>
      <StudentForm handleSubmit={handleSubmit} student={student} setStudent={setStudent} />
      <div>
        {studentList}
      </div>
    </div>
  );
}

export default Students;