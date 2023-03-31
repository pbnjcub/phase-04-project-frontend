import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';


const StudentEditForm = ({editedStudent, handleEditSubmit}) => {
    const [student, setStudent] = useState({
        id: editedStudent.id,
        first_name: editedStudent.first_name,
        last_name: editedStudent.last_name,
    });


    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditSubmit(student);
        setStudent({
            first_name: "",
            last_name: "",
        })
    };

    return (
        <div>
            <h1>Student Form</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input type="text" name="first_name" value={student.first_name} onChange={handleChange} />
                <label>Last Name</label>
                <input type="text" name="last_name" value={student.last_name} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default StudentEditForm;

