import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import CourseEditForm from './CourseEditForm';
import StudentLink from './StudentLink';
import StudentNewForm from './StudentNewForm';

const Course = ( { courses, updateCourse, removeStudent, addStudent} ) => {
  const { id } = useParams();
  const selectedCourse = courses.find((course) => course.id === parseInt(id));
  
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    course_id: selectedCourse.id,
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [formFlag, setFormFlag] = useState(false);
  const [studentNewFormFlag, setStudentNewFormFlag] = useState(false);

  
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

    const handleNewStudent = (e) => {
      e.preventDefault();
      fetch("http://127.0.0.1:9393/students", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(newStudent),
      })
          .then((resp) => resp.json())
          .then(data => {
              if (data.errors) {
                  setErrorMessages(data.errors);
              } else {
                  addStudent(data);
                  setErrorMessages([]);

                  const updatedCourse = {...selectedCourse};
                  updatedCourse.students.push(data);
                  updateCourse(updatedCourse);
              }
          })
          
      };

    

      const deleteStudent = (deletedStudent) => {
        fetch(`http://127.0.0.1:9393//students/${deletedStudent.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        })
          removeStudent(deletedStudent)
          
          const updatedCourse = {...selectedCourse};
          updatedCourse.students = updatedCourse.students.filter((student) => student.id !== deletedStudent.id);
          updateCourse(updatedCourse);

      };


  const studentList = selectedCourse.students.map((student) => <StudentLink key={student.id} student={student} deleteStudent={deleteStudent} courseId={id}/>);


  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);
  return (
    <div>
      <h1>Course Overview: {selectedCourse.name} </h1>
      <h3>Teacher: {selectedCourse.teacher.last_name}</h3>
      <br />
      <h3>Students:</h3>
      {studentList}
      <br />
      <br />
      {studentNewFormFlag ?
        <StudentNewForm selectedCourse={selectedCourse} newStudent={newStudent} setNewStudent={setNewStudent} handleNewStudent={handleNewStudent} /> :
        <button onClick={() => setStudentNewFormFlag(true)}>Add Student</button>}
      <br />
      {formFlag ?
        <CourseEditForm selectedCourse={selectedCourse} handleEditCourse={handleEditCourse} updateCourse={updateCourse} /> :
        <button onClick={() => setFormFlag(true)}>Edit Course</button>}
      <br />
      {renderErrors}
    </div>
  );
}

export default Course;