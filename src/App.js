import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Students from './components/Students';
import Student from './components/Student';
import Courses from './components/Courses';
import Course from './components/Course';
import Assignments from './components/Assignments';
import Assignment from './components/Assignment';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [courseRoster, setCourseRoster] = useState([]);

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

    const handleEditStudent = (editedStudent) => {
      const updatedStudents = courseRoster.map((student) => {
        if (student.id === editedStudent.id) {
          return editedStudent
        } else {
          return student
        }
      })
      setCourseRoster({updatedStudents})
    };
    

    const updateStudent = updatedStudent => {
      const updatedStudents = students.map(student => {
        if (student.id === updatedStudent.id) {
          return updatedStudent;
        } else {
          return student;
        }
      });
      console.log(updatedStudents)
      setStudents(updatedStudents);
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

    const addAssignment = newAssignment => {
      const updatedAssignments = [...assignments, newAssignment];
      setAssignments(updatedAssignments);
    }

    const removeAssignment = deletedAssignment => {
      const updatedAssignments = assignments.filter(assignment => assignment.id !== deletedAssignment.id);
      setAssignments(updatedAssignments);
    }

  
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/students" element={<Students students={students} addStudent={addStudent} removeStudent={removeStudent} handleEditStudent={handleEditStudent}/>}/>
            <Route exact path="/students/:id" element={<Student updateStudent={updateStudent} students={students} courses={courses} courseRoster={courseRoster} setCourseRoster={setCourseRoster}/>}/>
            <Route exact path="/courses" element={<Courses courses={courses} addCourse={addCourse} removeCourse={removeCourse}/>}/>
            <Route exact path="/courses/:id" element={<Course updateCourse={updateCourse} courses={courses} addAssignment={addAssignment} removeStudent={removeStudent} courseRoster={courseRoster} setCourseRoster={setCourseRoster} />}/>
            <Route exact path="/assignments" element={<Assignments assignments={assignments} addAssignment={addAssignment} removeAssignment={removeAssignment}/>}/>
            <Route exact path="/assignments/:id" element={<Assignment assignments={assignments} />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;