import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseEditForm from './CourseEditForm';
import StudentLink from './StudentLink';
import StudentNewForm from './StudentNewForm';
import EnrollmentDropdown from './EnrollmentDropdown';

const Course = ({ courses, updateCourse, removeStudent, addStudent, students }) => {
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
    // Update the course on the server
    fetch(`http://localhost:3000/courses/${editedCourse.id}`, {
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
          setFormFlag(false);
          setErrorMessages([]);
        }
      });
  };

  const handleNewStudent = (e) => {
    e.preventDefault();
    // Create a new student on the server
    fetch("http://localhost:3000/students", {
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

          const updatedCourse = { ...selectedCourse };
          updatedCourse.students.push(data);
          updateCourse(updatedCourse);
        }
      });
  };

  // const deleteStudent = (deletedStudent) => {
  //   // Delete the student on the server
  //   fetch(`http://localhost:3000/students/${deletedStudent.id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //     },
  //   })
  //     .then(() => {
  //       removeStudent(deletedStudent);

  //       const updatedCourse = { ...selectedCourse };
  //       updatedCourse.students = updatedCourse.students.filter((student) => student.id !== deletedStudent.id);
  //       updateCourse(updatedCourse);
  //     });
  // };

  const handleEnrollment = (studentId, grade) => {
    fetch(`http://localhost:3000/enroll/`, {
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
        const enrolledStudent = students.find((student) => student.id === parseInt(data.student_id));
        const updatedCourse = { ...selectedCourse };
        updatedCourse.students.push(enrolledStudent);
        updateCourse(updatedCourse);
      });
  };

  const unenrollStudent = (student) => {
    fetch(`http://localhost:3000/unenroll/${student.id}/${selectedCourse.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        const updatedCourse = { ...selectedCourse };
        updatedCourse.students = updatedCourse.students.filter((enrolledStudent) => enrolledStudent.id !== student.id);
        updateCourse(updatedCourse);
      });
  };
  

  const enrolledStudents = selectedCourse.students.map((student) => (
    <StudentLink key={student.id} student={student} unenrollStudent={unenrollStudent} courseId={id} />
  ));

  const unenrolledStudents = students.filter((student) => {
    return !selectedCourse.students.some((enrolledStudent) => enrolledStudent.id === student.id);
  });

  const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);

  return (
    <div>
      <h1>Course Overview: {selectedCourse.name}</h1>
      <h3>
        Teacher: {selectedCourse.teacher.last_name}, {selectedCourse.teacher.first_name}
      </h3>
      <br />
      <h3>Enrolled Students:</h3>
      {enrolledStudents}
      <br />
      <br />
      <h3>Enroll New Student:</h3>
      <EnrollmentDropdown
        unenrolledStudents={unenrolledStudents}
        handleEnrollment={handleEnrollment}
      />
      {studentNewFormFlag ? (
        <StudentNewForm
          selectedCourse={selectedCourse}
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          handleNewStudent={handleNewStudent}
        />
      ) : (
        <button onClick={() => setStudentNewFormFlag(true)}>Add Student</button>
      )}
      <br />
      {formFlag ? (
        <CourseEditForm
          selectedCourse={selectedCourse}
          handleEditCourse={handleEditCourse}
          updateCourse={updateCourse}
        />
      ) : (
        <button onClick={() => setFormFlag(true)}>Edit Course</button>
      )}
      <br />
      {renderErrors}
    </div>
  );
};

export default Course;
