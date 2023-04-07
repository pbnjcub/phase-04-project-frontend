import React from 'react';

const StudentNewForm = ({handleNewStudent, newStudent, setNewStudent}) => {

    
    const handleChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };
    

    return (
        <div>
            <h1>New Student Form</h1>
            <form onSubmit={handleNewStudent}>
                <label>First Name</label>
                <input type="text" name="first_name" value={newStudent.first_name} onChange={handleChange} />
                <label>Last Name</label>
                <input type="text" name="last_name" value={newStudent.last_name} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default StudentNewForm;