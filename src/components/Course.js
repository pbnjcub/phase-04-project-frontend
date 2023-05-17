import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import CourseEditForm from './CourseEditForm';

const Course = ( { courses, updateCourse} ) => {
  const { id } = useParams();

  const selectedCourse = courses.find((course) => course.id === parseInt(id));


  const [errorMessages, setErrorMessages] = useState([]);
  const [formFlag, setFormFlag] = useState(false);

  const handleEditCourse = (editedCourse) => {
    fetch(`http://127.0.0.1:9393/courses/${editedCourse.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(editedCourse),
    })
        .then((resp) => resp.json())
        .then(data => {
            if (data.errors) {
                setErrorMessages(data.errors);
            } else {
                updateCourse(data)
                setFormFlag(false)
                setErrorMessages([])
            }
        })
        
    };

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);
  return (
    <div>
      <h1>Course Overview: {selectedCourse.name} </h1>
      <br />
      <br />
      {formFlag ?
        <CourseEditForm selectedCourse={selectedCourse} handleEditCourse={handleEditCourse} /> :
        <button onClick={() => setFormFlag(true)}>Edit Course</button>}
      <br />
      {renderErrors}
    </div>
  );
}

export default Course;