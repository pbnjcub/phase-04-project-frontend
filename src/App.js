import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Students from './components/Students';
import Student from './components/Student';

function App() {
  const [students, setStudents] = useState([]);
  const [formFlag, setFormFlag] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([])
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:9393//students")
      .then((resp) => resp.json())
      .then((data) => { 
        setStudents(data)
      });
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

    const handleSelectedStudent = (student) => {
      setSelectedStudent(student)
    }



    const handleEditSubmit = (editedStudent) => {
      const updatedStudent = {
          first_name: editedStudent.first_name,
          last_name: editedStudent.last_name,
      }

      fetch(`http://127.0.0.1:9393/students/${editedStudent.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(updatedStudent),
      })
          .then((resp) => resp.json())
          .then((data) => {
            if(data.errors) {
              setErrorMessages(data.errors)
            } else {
              setSelectedStudent(updatedStudent)
              setStudents([...students, data]);
              setFormFlag(false)
              setErrorMessages([])
            }
          })
        };

        
  
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/students" element={<Students students={students} errorMessages={errorMessages} newStudent={newStudent} setNewStudent={setNewStudent} handleNewSubmit={handleNewSubmit} deleteStudent={deleteStudent}/>}/>
            <Route exact path="/students/:id" element={<Student handleEditSubmit={handleEditSubmit} formFlag={formFlag} setFormFlag={setFormFlag} errorMessages={errorMessages} students={students} selectedStudent={selectedStudent} handleSelectedStudent={handleSelectedStudent} />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;