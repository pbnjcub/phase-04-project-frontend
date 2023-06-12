import React, {useState } from 'react';
import StudentLinkDelete from './StudentLinkDelete';
import StudentNewForm from './StudentNewForm';

const Students = ({students, addStudent, removeStudent}) => {
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  
 const deleteStudent = (deletedStudent) => {
      fetch(`http://127.0.0.1:9393//students/${deletedStudent.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
        removeStudent(deletedStudent)
    };
  
    


// // list of students last names
const studentList = students.map((student) => (
    <StudentLinkDelete key={student.id} student={student} deleteStudent={deleteStudent} />
  ));




//   // find student by id
//   const student = students.find((student) => student.id === id);

  const handleNewStudent = (newStudent) => {
    fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newStudent),
    })
        .then((resp) => resp.json())
        .then(data => {
            if (data.errors) {
                setErrorMessages(data.errors);
            } else {
                addStudent(data);
                setErrorMessages([])
            }
        })
        
    };

    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);


  return (
    <div className="main">
      <h1>All Students</h1>
      <StudentNewForm handleNewStudent={handleNewStudent} newStudent={newStudent} setNewStudent={setNewStudent} />
      <br/>
      {renderErrors}
      <div>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentList}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Students