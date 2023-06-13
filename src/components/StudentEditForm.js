import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'


const StudentEditForm = ({selectedStudent, handleEditStudent}) => {

    const [updatedStudent, setUpdatedStudent] = useState({
        id: selectedStudent.id,
        first_name: selectedStudent.first_name,
        last_name: selectedStudent.last_name,
    });
    const navigate = useNavigate();



    const handleChange = (e) => {
        setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        handleEditStudent(updatedStudent);
        
        navigate(`/students/${selectedStudent.id}`);
    }



    return (
        <div>
            <h1>Student Form</h1>
            <form onSubmit={handleEditSubmit}>
                <label>First Name</label>
                <input type="text" name="first_name" value={updatedStudent.first_name} onChange={handleChange} />
                <label>Last Name</label>
                <input type="text" name="last_name" value={updatedStudent.last_name} onChange={handleChange} />
                <button type="submit" value="Submit" className="pure-button">Submit</button>
            </form>
        </div>
    );
}

export default StudentEditForm;

