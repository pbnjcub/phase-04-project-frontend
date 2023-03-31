import React from 'react';

const StudentForm = ({handleSubmit, student, setStudent}) => {

    
    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
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
};

export default StudentForm;