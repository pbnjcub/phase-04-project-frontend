import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import StudentEditForm from './StudentEditForm';

const Student = () => {
  const [student, setStudent] = useState({})

  const { id } = useParams();
  const [formFlag, setFormFlag] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:9393/students/${id}`)
      .then((resp) => resp.json())
      .then((data) => setStudent(data));
  }, []);

  const handleEditSubmit = (editedStudent) => {
    const updatedStudent = {
        first_name: editedStudent.first_name,
        last_name: editedStudent.last_name,
    }
    fetch(`http://127.0.0.1:9393/students/${editedStudent.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updatedStudent),
    })
        .then((resp) => resp.json())
        .then((data) => setStudent(data))
        .catch((error) => console.log(error));
        setFormFlag(false);

  };

  return (
    <div>
      <h1>Student Report for {student.last_name}, {student.first_name} </h1>
      <br />
      <br />
      {formFlag ?
        <StudentEditForm editedStudent={student} seteditedStudent={setStudent} handleEditSubmit={handleEditSubmit} /> :
        <button onClick={() => setFormFlag(true)}>Edit Student</button>}
      
    </div>
  );
}

export default Student;