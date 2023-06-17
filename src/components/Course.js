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
        // Variable enrolledStudent is the student object that was enrolled
        const enrolledStudent = students.find((student) => student.id === parseInt(data.student_id));
        //crate a shallow copy of enrolledStudent
        const updatedStudent = { ...enrolledStudent };
        //push the selected course into the updatedStudent's courses array
        updatedStudent.courses.push(selectedCourse);
        //push the enrollment data into the updatedStudent's courses_students array
        updatedStudent.courses_students.push(data); 
        //create a shallow copy of selectedCourse
        const updatedCourse = { ...selectedCourse };
        //push the enrolledStudent into the updatedCourse's students array
        updatedCourse.students.push(enrolledStudent);
        //push the enrollment data into the updatedCourse's courses_students array
        updatedCourse.courses_students.push(data);
        //update the selectedCourse state variable
        updateCourse(updatedCourse);
        //update the selectedStudent state variable
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
      //create a shallow copy of selectedCourse
      const updatedCourse = { ...selectedCourse };
      //filter out the enrollment data from the updatedCourse's courses_students array
      updatedCourse.students = updatedCourse.students.filter((enrolledStudent) => enrolledStudent.id !== student.id);
      //update the courses state variable
      updateCourse(updatedCourse);
      //update the selectedCourse state variable
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
