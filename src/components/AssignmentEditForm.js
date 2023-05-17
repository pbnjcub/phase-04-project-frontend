import React, {useState} from 'react';
// import { useParams } from 'react-router-dom';


const AssignmentEditForm = ({selectedAssignment, handleEditAssignment}) => {
    const [updatedAssignment, setUpdatedAssignment] = useState({
        id: selectedAssignment.id,
        name: selectedAssignment.name,
        grade: selectedAssignment.grade,
        course_id: selectedAssignment.course_id,
        student_id: selectedAssignment.student_id,
    });


    const handleChange = (e) => {
        setUpdatedAssignment({ ...updatedAssignment, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        handleEditAssignment(updatedAssignment);
    }



    return (
        <div>
            <h1>Assignment Edit Form</h1>
            <form onSubmit={handleEditSubmit}>
                <label>Assignment Name</label>
                <input type="text" name="name" value={updatedAssignment.name} onChange={handleChange} />
                <label>Assignment Grade</label>
                <input type="text" name="grade" value={updatedAssignment.grade} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AssignmentEditForm;

