import React from 'react';

const CourseNewForm = ({handleNewCourse, newCourse, setNewCourse}) => {

    
    const handleChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });

    };
    

    return (
        <div>
            <h1>New Course Form</h1>
            <form onSubmit={handleNewCourse}>
                <label>Name of Course</label>
                <input type="text" name="name" value={newCourse.name} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CourseNewForm;