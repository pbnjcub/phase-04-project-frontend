import React from 'react';

const AssignmentNewForm = ({handleNewAssignment, newAssignment, setNewAssignment}) => {

    
    const handleChange = (e) => {
        setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
    };
    

    return (
        <div>
            <h1>New Assignment Form</h1>
            <form onSubmit={handleNewAssignment}>
                <label>Assignment Name</label>
                <input type="text" name="name" value={newAssignment.name} onChange={handleChange} />
                <label>Grade</label>
                <input type="text" name="grade" value={newAssignment.grade} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AssignmentNewForm;