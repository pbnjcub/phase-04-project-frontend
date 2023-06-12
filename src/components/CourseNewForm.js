import React from 'react';

const CourseNewForm = ({handleNewCourse, newCourse, setNewCourse}) => {

    
    const handleChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNewCourse(newCourse);
        setNewCourse({
            name: "",
        });
    };
    

    return (
        <div>
            <h3>New Course Form</h3>
            <form onSubmit={handleSubmit}>
                <label>Name of Course</label>
                <input type="text" name="name" value={newCourse.name} onChange={handleChange} />
                <button type="submit" value="Submit" className="pure-button">Add Course</button>
            </form>
        </div>
    );
};

export default CourseNewForm;