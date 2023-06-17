import React, {useState} from 'react';
import CourseLink from './CourseLink';
import CourseNewForm from './CourseNewForm';
import UserContext from './UserContext';

const Courses = ({teacherCourses, addCourse, removeCourse}) => {
  const {currentUser, setCurrentUser} = React.useContext(UserContext);
  const [newCourse, setNewCourse] = useState({
    name: "",
    teacher_id: currentUser.teacher.id,
  });


  const [errorMessages, setErrorMessages] = useState([]);
  const [teacherId, setTeacherId] = useState(parseInt(currentUser.teacher.id));

 const deleteCourse = (deletedCourse) => {
    const courseId = deletedCourse.id;
      fetch(`http://localhost:3000/teachers/${teacherId}/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
        removeCourse(deletedCourse)
    };


  const handleNewCourse = (newCourse, teacherId) => {
    fetch(`http://localhost:3000/teachers/${teacherId}/courses`, {
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

    const courseList = teacherCourses.map((course) => <CourseLink key={course.id} course={course} teacherid={teacherId} deleteCourse={deleteCourse} />);


    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);


  return (
    <div className="main">
      <h1>Teacher View</h1>
      <h4>Teacher: {currentUser.teacher.last_name}, {currentUser.teacher.first_name}</h4>
      <CourseNewForm handleNewCourse={handleNewCourse} newCourse={newCourse} setNewCourse={setNewCourse} teacherId={teacherId}/>
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