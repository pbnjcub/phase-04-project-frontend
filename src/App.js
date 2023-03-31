import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Students from './components/Students';
import Student from './components/Student';

function App() {
  
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/students" element={<Students />}/>
            <Route exact path="/students/:id" element={<Student />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;