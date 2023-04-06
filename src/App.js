import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Students from './components/Students';
import Student from './components/Student';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:9393//students")
      .then((resp) => resp.json())
      .then((data) => setStudents(data));
  }, []);

  const handleNewSubmit = (e) => {
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
                setStudents([...students, data]);
                setErrorMessages([])
                setNewStudent({
                  first_name: "",
                  last_name: "",
                })
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
        .then(() => {
          const updatedStudents = students.filter(
            (student) => student.id !== deletedStudent.id
          );
          setStudents(updatedStudents);
        });
    };
  
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/students" element={<Students students={students} errorMessages={errorMessages} newStudent={newStudent} setNewStudent={setNewStudent} handleNewSubmit={handleNewSubmit} deleteStudent={deleteStudent}/>}/>
            <Route exact path="/students/:id" element={<Student />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;