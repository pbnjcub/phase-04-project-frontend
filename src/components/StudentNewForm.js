import React, { useState } from 'react';

const StudentNewForm = ({ handleNewStudent }) => {
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewStudent(newStudent);
    setNewStudent({
        first_name: "",
        last_name: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
            <h3>Add New Student</h3>
            <label>First Name</label>
            <input type="text" name="first_name" value={newStudent.first_name} onChange={handleChange} />
            <label>Last Name</label>
            <input type="text" name="last_name" value={newStudent.last_name} onChange={handleChange} />
            <button type="submit" className="pure-button pure-button-primary">Submit</button>
       
      </form>
    </div>
  );
};

export default StudentNewForm;
