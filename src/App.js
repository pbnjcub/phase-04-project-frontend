import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './components/UserContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Students from './components/Students';
import Student from './components/Student';
import Courses from './components/Courses';
import Course from './components/Course';
import { getCurrentUser } from './actions/auth';
import './styles.css';

function App() {
  //state variables
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([])

//function to handle current user data
  const handleCurrentUser = (user) => {
    if (user.username) {
      setCurrentUser(user);
      setLoggedIn(true);
  
    }
  };

  //function to log out the current user
  const logoutCurrentUser = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  };

  
//useEffect to get current user
  useEffect(() => {
    getCurrentUser(handleCurrentUser);
  }, []);

//useEffect to get all students
  useEffect(() => {
    fetch("http://localhost:3000/students/all_students")
      .then((resp) => resp.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  //function to delete a student
  const removeStudent = (deletedStudent) => {
    const updatedStudents = students.filter((student) => student.id !== deletedStudent.id);
    setStudents(updatedStudents);
  };

  //function to add a student
  const addStudent = (newStudent) => {
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
  };

  //function to update a student
  const updateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
  };

  //function to add a course to the state variable teacherCourses
  const addCourse = (newCourse) => {
    const updatedCourses = [...teacherCourses, newCourse];
    setTeacherCourses(updatedCourses);
  };

  //function to update a course in the state variable teacherCourses
  const updateCourse = (updatedCourse) => {
    const updatedCourses = teacherCourses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    setTeacherCourses(updatedCourses);
  };

  //function to handle the courses for the current user
  const handleTeacherCourses = (teacherCourses) => {
    setTeacherCourses(teacherCourses);
  };

  //function to remove a course from the state variable teacherCourses
  const removeCourse = (deletedCourse) => {
    const updatedCourses = teacherCourses.filter((course) => course.id !== deletedCourse.id);
    setTeacherCourses(updatedCourses);
  };

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div>
          <NavBar loggedIn={loggedIn} logoutCurrentUser={logoutCurrentUser} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Signup setCurrentUser={setCurrentUser} handleCurrentUser={handleCurrentUser} setLoggedIn={setLoggedIn} handleTeacherCourses={handleTeacherCourses}/>}/>
            <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} handleCurrentUser={handleCurrentUser} handleTeacherCourses={handleTeacherCourses} />}/>
            <Route exact path="/logout" element={<Logout logoutCurrentUser={logoutCurrentUser} />} />
            <Route exact path="/students" element={<Students students={students} addStudent={addStudent} removeStudent={removeStudent} currentUser={currentUser} />}/>
            <Route exact path="/students/:id" element={<Student updateStudent={updateStudent} updateCourse={updateCourse} setCourses={setCourses} teacherCourses={teacherCourses} setTeacherCourses={setTeacherCourses} studentCourses={studentCourses} />}/>
            {loggedIn && (
              <Route exact path="/teachers/:teacher_id/courses" element={<Courses addCourse={addCourse} removeCourse={removeCourse} teacherCourses={teacherCourses}/>}/>
            )}
            <Route exact path="/teachers/:teacher_id/courses/:id" element={<Course updateCourse={updateCourse} teacherCourses={teacherCourses} students={students} setStudents={setStudents} updateStudent={updateStudent} removeStudent={removeStudent} addStudent={addStudent}/>}/>
            </Routes>
        </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
