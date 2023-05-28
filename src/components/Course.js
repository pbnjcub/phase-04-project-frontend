import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CourseEditForm from './CourseEditForm';
import AssignmentNewForm from './AssignmentNewForm';
import StudentLink from './StudentLink';

const Course = ( { courses, updateCourse, addAssignment, removeStudent, courseRoster, setCourseRoster} ) => {
  const { id } = useParams();
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    grade: "",
    student_id: 1,
    course_id: 1,
  });

  const selectedCourse = courses.find((course) => course.id === parseInt(id));

  useEffect(() => {
    fetch(`http://127.0.0.1:9393//courses/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setCourseRoster(data.students)
      });
  }, []);
 

    
  


  const [errorMessages, setErrorMessages] = useState([]);
  const [formFlag, setFormFlag] = useState(false);
  const [assignmentFormFlag, setAssignmentFormFlag] = useState(false);

  
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

    // const handleEditStudent = (editedStudent) => {
    //   const updatedStudents = selectedCourse.students.map((student) => {
    //     if (student.id === editedStudent.id) {
    //       return editedStudent
    //     } else {
    //       return student
    //     }
    //   })
    //   setCourseRoster({updatedStudents})
    // };

    const handleNewAssignment = (e) => {
      e.preventDefault();
      fetch(`http://127.0.0.1:9393/assignments/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(newAssignment),
      })
          .then((resp) => resp.json())
          .then(data => {
              if (data.errors) {
                  setErrorMessages(data.errors);
              } else {
                  addAssignment(data);
                  setErrorMessages([])
              }
          } )
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
      };


  const studentList = courseRoster.map((student) => <StudentLink key={student.id} student={student} deleteStudent={deleteStudent} />);


  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);
  return (
    <div>
      <h1>Course Overview: {selectedCourse.name} </h1>
      <h3>Teacher: {selectedCourse.teacher.last_name}</h3>
      <br />
      <h3>Students:</h3>
      {studentList}
      <br />
      {assignmentFormFlag ?
        <AssignmentNewForm newAssignment={newAssignment} handleNewAssignment={handleNewAssignment}/> :
        <button onClick={() => setAssignmentFormFlag(true)}>Add Assignment</button>}
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