import React, {useState, useEffect } from 'react';
import CourseLink from './CourseLink';
import CourseNewForm from './CourseNewForm';

const Courses = ({courses, addCourse, removeCourse, currentUser}) => {
  const [newCourse, setNewCourse] = useState({
    name: "",
    teacher_id: currentUser.teacher.id,
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState([]);

  // const [teacherCourses, setTeacherCourses] = useState(courses.filter((course) => course.teacher_id === currentUser.teacher.id));
  
  useEffect(() => {
    setTeacherCourses(courses.filter((course) => course.teacher_id === currentUser.teacher.id));
  }, [courses, currentUser.teacher.id]);


 const deleteCourse = (deletedCourse) => {
      fetch(`http://localhost:3000/courses/${deletedCourse.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
        removeCourse(deletedCourse)
    };

// list of courses

  const handleNewCourse = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/courses", {
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

    const courseList = teacherCourses.map((course) => <CourseLink key={course.id} course={course} deleteCourse={deleteCourse} />);


    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);


  return (
    <div>
      <h1>Teacher View</h1>
      <h2>Teacher: {currentUser.teacher.last_name}, {currentUser.teacher.first_name}</h2>
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