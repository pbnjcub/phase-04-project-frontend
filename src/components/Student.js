import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import StudentEditForm from './StudentEditForm';

const Student = ( { students, updateStudent} ) => {
  const { id } = useParams();

  const selectedStudent = students.find((student) => student.id === parseInt(id));


  const [errorMessages, setErrorMessages] = useState([]);
  const [formFlag, setFormFlag] = useState(false);

  const handleEditStudent = (editedStudent) => {
    fetch(`http://127.0.0.1:9393/students/${editedStudent.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(editedStudent),
    })
        .then((resp) => resp.json())
        .then(data => {
            if (data.errors) {
                console.log(data.errors)
                setErrorMessages(data.errors);
            } else {
                updateStudent(data)
                setFormFlag(false)
                setErrorMessages([])
            }
        })
        
    };

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);
  return (
    <div>
      <h1>Student Report for {selectedStudent.last_name}, {selectedStudent.first_name} </h1>
      <br />
      <br />
      {formFlag ?
        <StudentEditForm selectedStudent={selectedStudent} handleEditStudent={handleEditStudent} /> :
        <button onClick={() => setFormFlag(true)}>Edit Student</button>}
      <br />
      {renderErrors}
    </div>
  );
}

export default Student;