import React, {useState, useEffect } from 'react';
import CourseLink from './CourseLink';
import CourseNewForm from './CourseNewForm';
import UserContext from './UserContext';

const Courses = ({courses, addCourse, removeCourse}) => {
  const {currentUser, setCurrentUser} = React.useContext(UserContext);
  const [newCourse, setNewCourse] = useState({
    name: "",
    teacher_id: currentUser.teacher.id,
  });
  

  const [errorMessages, setErrorMessages] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState([]);
  
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

  const handleNewCourse = (newCourse) => {
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
    <div className="main">
      <h1>Teacher View</h1>
      <h4>Teacher: {currentUser.teacher.last_name}, {currentUser.teacher.first_name}</h4>
      <CourseNewForm handleNewCourse={handleNewCourse} newCourse={newCourse} setNewCourse={setNewCourse} />
      <br/>
      {renderErrors}
      <div>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseList}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courses;