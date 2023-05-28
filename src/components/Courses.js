import React, {useState } from 'react';
import CourseLink from './CourseLink';
import CourseNewForm from './CourseNewForm';

const Courses = ({courses, addCourse, removeCourse}) => {
  const [newCourse, setNewCourse] = useState({
    name: "",
    teacher_id: 1,
  });
  const [errorMessages, setErrorMessages] = useState([]);

 const deleteCourse = (deletedCourse) => {
      fetch(`http://127.0.0.1:9393//courses/${deletedCourse.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
        removeCourse(deletedCourse)
    };

// list of courses
  const courseList = courses.map((course) => <CourseLink key={course.id} course={course} deleteCourse={deleteCourse} />);

  const handleNewCourse = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:9393/courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newCourse),
    })
        .then((resp) => resp.json())
        .then(data => {
            if (data.errors) {
                setErrorMessages(data.errors);
            } else {
                addCourse(data);
                setErrorMessages([])
            }
        })
        
    };

    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);


  return (
    <div>
      <h1>Teacher View</h1>
      <CourseNewForm handleNewCourse={handleNewCourse} newCourse={newCourse} setNewCourse={setNewCourse} />
      <br/>
      {renderErrors}
      <div>
        {courseList}
      </div>
    </div>
  );
}

export default Courses;