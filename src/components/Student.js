import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import StudentEditForm from './StudentEditForm';
import StudentEnrollmentInfo from './StudentEnrollmentInfo';

const Student = ( { students, updateStudent, updateCourse, studentCourses, updateStudentCourses} ) => {
    const { id } = useParams();
  
    const selectedStudent = students.find((student) => student.id === parseInt(id));
    const [errorMessages, setErrorMessages] = useState([]);
    const [formFlag, setFormFlag] = useState(false);

    const [courses, setCourses] = useState(selectedStudent.courses)
    console.log(courses)
                   
    const handleEditStudent = (editedStudent) => {
      fetch(`http://localhost:3000/students/${editedStudent.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(editedStudent),
      })
          .then((resp) => resp.json())
          .then(data => {
              if (data.errors) {
                  setErrorMessages(data.errors);
              } else {
                  updateStudent(data)
  
                  const updatedCourses = courses.map((course) => {
                    const updatedStudents = course.students.map((student) => {
                      if (student.id === editedStudent.id) {
                        return {
                          ...student,
                          last_name: editedStudent.last_name,
                          first_name: editedStudent.first_name,
                        };
                      } else {
                        return student;
                      }
                    });
                    console.log(updatedStudents)
                    return {
                      ...course,
                      students: updatedStudents,
                    };
                  });
                  console.log(updatedCourses)
                  
  
                    setCourses(updatedCourses);
                    setFormFlag(false)
                    setErrorMessages([])
                  }
  
              })
          
      };
  
      const getGrade = (courseId) => {
        const enrolled = selectedStudent.courses_students.find(
          (enrolled) => enrolled.course_id === courseId
        );
        return enrolled.grade;
      };
  
      const studentDetail = selectedStudent.courses.map((course) => {
        const grade = getGrade(course.id);
        return (<StudentEnrollmentInfo key={course.id} enrolledCourse={course.name} grade={grade}/>
        );
      });
      
  
    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);
    return (
      <div className="main">
        <h1>Student Report for {selectedStudent.last_name}, {selectedStudent.first_name} </h1>
        <br />
        <h3>Enrolled Courses</h3>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {studentDetail}
          </tbody>
        </table>
        <br />
        {formFlag ?
          <StudentEditForm selectedStudent={selectedStudent} handleEditStudent={handleEditStudent} courses={courses}/> :
          <button onClick={() => setFormFlag(true)}>Edit Student</button>}
        <br />
        {renderErrors}
      </div>
    );
  }
  
  export default Student;



