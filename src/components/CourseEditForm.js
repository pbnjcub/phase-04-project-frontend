import React, {useState} from 'react';
// import { useParams } from 'react-router-dom';


const CourseEditForm = ({selectedCourse, handleEditCourse}) => {
    const [updatedCourse, setUpdatedCourse] = useState({
        id: selectedCourse.id,
        fname: selectedCourse.name,
    });


    const handleChange = (e) => {
        setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        handleEditCourse(updatedCourse);
    }



    return (
        <div>
            <h1>Course Edit Form</h1>
            <form onSubmit={handleEditSubmit}>
                <label>First Name</label>
                <input type="text" name="first_name" value={updatedCourse.name} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CourseEditForm;

