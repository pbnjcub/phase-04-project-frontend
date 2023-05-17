import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import AssignmentEditForm from './AssignmentEditForm';

const Assignment = ( { assignments, updateAssignment} ) => {
  const { id } = useParams();

  const selectedAssignment = assignments.find((assignment) => assignment.id === parseInt(id));


  const [errorMessages, setErrorMessages] = useState([]);
  const [formFlag, setFormFlag] = useState(false);

  const handleEditAssignment = (editedAssignment) => {
    fetch(`http://127.0.0.1:9393/courses/${editedAssignment.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(editedAssignment),
    })
        .then((resp) => resp.json())
        .then(data => {
            if (data.errors) {
                setErrorMessages(data.errors);
            } else {
                updateAssignment(data)
                setFormFlag(false)
                setErrorMessages([])
            }
        })
        
    };

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);
  return (
    <div>
      <h1>Assignment: {selectedAssignment.name} </h1>
      <br />
      <br />
      {formFlag ?
        <AssignmentEditForm selectedAssignment={selectedAssignment} handleEditAssignment={handleEditAssignment} /> :
        <button onClick={() => setFormFlag(true)}>Edit Assignment</button>}
      <br />
      {renderErrors}
    </div>
  );
}

export default Assignment;