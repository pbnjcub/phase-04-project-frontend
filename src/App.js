import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import './styles.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);


  const handleCurrentUser = (user) => {
    if(user.username) {
      setCurrentUser(user);
      setLoggedIn(true);
      }
    }

  const logoutCurrentUser = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  }

  useEffect(() => {
    getCurrentUser(handleCurrentUser)
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:3000/students")
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log(data)
  //       const studentObjectWithGrade = data.map((student) => {
  //         student.map((course) => {
  //         return {
  //           ...student,
  //           grade: student.courses.[0]?.grade || null,
  //         };
  //       });
  //       setStudents(updatedStudents);
  //     });
  // }, []);
  

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((resp) => resp.json())
      .then((data) => { 
        setStudents(data)
      });
  }, []);


  useEffect(() => {
    fetch("http://localhost:3000/courses")
      .then((resp) => resp.json())
      .then((data) => {
        setCourses(data)
      });
  }, []);



    const removeStudent = deletedStudent => {
      const updatedStudents = students.filter(student => student.id !== deletedStudent.id);
      setStudents(updatedStudents);
    }


    const addStudent = newStudent => {
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
    }
    

    const updateStudent = updatedStudent => {
      const updatedStudents = students.map(student => {
        if (student.id === updatedStudent.id) {
          return updatedStudent;
        } else {
          return student;
        }
      });
      setStudents(updatedStudents);

      const updatedCourses = courses.map(course => {
        const updatedStudents = course.students.map(student => {
          if (student.id === updatedStudent.id) {
            return updatedStudent;
          } else {
            return student;
          }
        })
        return {...course, students: updatedStudents}
      })
      setCourses(updatedCourses);
    }

    const addCourse = newCourse => {
      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
    }

    const updateCourse = updatedCourse => {
      const updatedCourses = courses.map(course => {
        if (course.id === updatedCourse.id) {
          return updatedCourse;
        } else {
          return course;
        }
      });
      setCourses(updatedCourses);
    }

    const removeCourse = deletedCourse => {
      const updatedCourses = courses.filter(course => course.id !== deletedCourse.id);
      setCourses(updatedCourses);
    }
  
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar loggedIn={ loggedIn } logoutCurrentUser={logoutCurrentUser} />
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/signup" element={<Signup setCurrentUser={setCurrentUser} handleCurrentUser={handleCurrentUser} setLoggedIn={setLoggedIn} />}/>
            <Route exact path="/login" element={<Login setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} handleCurrentUser={handleCurrentUser} />}/>
            <Route exact path="/logout" element={<Logout logoutCurrentUser={logoutCurrentUser} />}/>
            <Route exact path="/students" element={<Students students={students} addStudent={addStudent} removeStudent={removeStudent} currentUser={currentUser} />}/>
            <Route exact path="/students/:id" element={<Student updateStudent={updateStudent} updateCourse={updateCourse} students={students} courses={courses}  />}/>
            {loggedIn && (
              <Route exact path="/courses" element={<Courses courses={courses} addCourse={addCourse} removeCourse={removeCourse} currentUser={currentUser} />} />
              )}
            <Route exact path="/courses/:id" element={<Course updateCourse={updateCourse} courses={courses} students={students} removeStudent={removeStudent} addStudent={addStudent} />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;