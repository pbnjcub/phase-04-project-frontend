import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Students from './components/Students';
import Student from './components/Student';
import Courses from './components/Courses';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:9393//students")
      .then((resp) => resp.json())
      .then((data) => { 
        setStudents(data)
        console.log(data)
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:9393//courses")
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
    }

    const addCourse = newCourse => {
      const updatedCourses = [...courses, newCourse];
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
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/students" element={<Students students={students} addStudent={addStudent} removeStudent={removeStudent}/>}/>
            <Route exact path="/students/:id" element={<Student updateStudent={updateStudent} students={students} />}/>
            <Route exact path="/courses" element={<Courses courses={courses} addCourse={addCourse} removeCourse={removeCourse}/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;