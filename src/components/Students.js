import React, {useState, useEffect } from 'react';
import StudentLink from './StudentLink';

const Students = () => {
  const [students, setStudents] = useState();

  useEffect(() => {
    console.log("fetching students")
    fetch("http://localhost:9393/students")
      .then((resp) => resp.json())
      .then((data) => setStudents(data));
      console.log(students)
}, []);


// // list of students last names
  const studentList = students.map((student) => <StudentLink key={student.id} student={student} />);
//   // find student by id
//   const student = students.find((student) => student.id === id);

  return (
    <div>
      <h1>Student View</h1>
      <div>
        {studentList}
      </div>
    </div>
  );
}

export default Students;