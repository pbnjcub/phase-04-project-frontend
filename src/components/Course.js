import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseEditForm from './CourseEditForm';
import StudentLink from './StudentLink';
import EnrollmentDropdown from './EnrollmentDropdown';
import UserContext from './UserContext';


const Course = ({ teacherCourses, updateCourse, updateStudent, students, setStudents }) => {
  //state variables
  const { id } = useParams();
  const {currentUser, setCurrentUser} = React.useContext(UserContext);
  const [selectedCourse, setSelectedCourse] = useState(teacherCourses.find((course) => course.id === parseInt(id)));
  const [errorMessages, setErrorMessages] = useState([]);
  const [formFlag, setFormFlag] = useState(false);
  const [teacherId, setTeacherId] = useState(parseInt(currentUser.teacher.id));

  console.log(students)
  //fetch post request to enroll student
  const handleEnrollment = (studentId, grade) => {
    fetch(`http://localhost:3000/teachers/${teacherId}/courses/${selectedCourse.id}/enroll/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        student_id: studentId,
        course_id: selectedCourse.id,
        grade: grade,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Add the enrollment data to students_courses
        const enrolledStudent = students.find((student) => student.id === parseInt(data.student_id));
        const updatedStudent = { ...enrolledStudent };
        updatedStudent.courses.push(selectedCourse);
        updatedStudent.courses_students.push(data); 
        const updatedCourse = { ...selectedCourse };
        updatedCourse.students.push(enrolledStudent);
        updatedCourse.courses_students.push(data);
        updateCourse(updatedCourse);
        updateStudent(updatedStudent)
      });
  };
  
  //fetch delete request to unenroll student
  const unenrollStudent = (student) => {
    fetch(`http://localhost:3000/teachers/${teacherId}/courses/${selectedCourse.id}/unenroll/${student.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then(() => {
      // Remove the enrollment data from students_courses
      const updatedCourse = { ...selectedCourse };
      updatedCourse.students = updatedCourse.students.filter((enrolledStudent) => enrolledStudent.id !== student.id);
      updateCourse(updatedCourse);
      setSelectedCourse(updatedCourse)
    });

  };
  const enrolledStudents = selectedCourse.students.map((student) => {
    const enrolled = selectedCourse.courses_students.find(
      (enrolled) => enrolled.student_id === student.id
    );
    const grade = enrolled.grade;
  
    return (
      <StudentLink key={student.id} student={student} unenrollStudent={unenrollStudent} courseId={selectedCourse.id} grade={grade}/>
    );
  });
  
  const unenrolledStudents = students.filter((student) => {
    return !selectedCourse.students.some((enrolledStudent) => enrolledStudent.id === student.id);
  });

  const handleEditCourse = (editedCourse) => {
    fetch(`http://localhost:3000/teachers/${teacherId}/courses/${editedCourse.id}`, {
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
          updateCourse(data);
          setSelectedCourse(data);   
          const updatedStudents = students.map((student) => {
            const updatedCourses = student.courses.map((course) => {
              if (course.id === editedCourse.id) {
                return {
                  ...course,
                  name: editedCourse.name,
                };
              } else {
                return course;
              }
            });
            return {
              ...student,
              courses: updatedCourses,
            };

          });
          setStudents(updatedStudents)
          setFormFlag(false);
          setErrorMessages([]);
        }
      });
  };

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);

  return (
    <div className="main">
      <h1>Course Overview: {selectedCourse.name}</h1>
      <h3>
        Teacher: {selectedCourse.teacher.last_name}, {selectedCourse.teacher.first_name}
      </h3>
      <br />
      <h3>Enrolled Students:</h3>
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrolledStudents.length > 0 ? (
            enrolledStudents
          ) : (
            <tr>
              <td colSpan="3">No enrolled students</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <br />
      <h3>Enroll New Student:</h3>
      <EnrollmentDropdown unenrolledStudents={unenrolledStudents} handleEnrollment={handleEnrollment} />
      
      <br />
      {formFlag ? (
        <CourseEditForm selectedCourse={selectedCourse} handleEditCourse={handleEditCourse} updateCourse={updateCourse} />
      ) : (
        <button className="pure-button" onClick={() => setFormFlag(true)}>Edit Course</button>
      )}
      <br />
      {renderErrors}
    </div>
  );
  
};

export default Course;
