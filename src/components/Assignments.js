import React, {useState } from 'react';
import AssignmentLink from './AssignmentLink';
import AssignmentNewForm from './AssignmentNewForm';

const Assignments = ({assignments, addAssignment, removeAssignment}) => {
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    grade: "",
    student_id: "",
    course_id: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);

 const deleteAssignment = (deletedAssignment) => {
      fetch(`http://127.0.0.1:9393/assignments/${deletedAssignment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
        removeAssignment(deletedAssignment)
    };


// list of assignments
  const assignmentList = assignments.map((assignment) => <AssignmentLink key={assignment.id} assignment={assignment} deleteAssignment={deleteAssignment} />);

  const handleNewAssignment = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:9393/assignments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newAssignment),
    })
        .then((resp) => resp.json())
        .then(data => {
            if (data.errors) {
                setErrorMessages(data.errors);
            } else {
                addAssignment(data);
                setErrorMessages([])
            }
        })
        
    };

    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);


  return (
    <div>
      <h1>Teacher View</h1>
      <AssignmentNewForm handleNewAssignment={handleNewAssignment} newAssignment={newAssignment} setNewAssignment={setNewAssignment} />
      <br/>
      {renderErrors}
      <div>
        {assignmentList}
      </div>
    </div>
  );
}

export default Assignments;