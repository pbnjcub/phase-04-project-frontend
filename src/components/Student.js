import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Student = () => {
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    fetch(`http://127.0.0.1:9393/students/${id}`)
      .then((resp) => resp.json())
      .then((data) => setStudent(data));
  }, []);


  return (
    <div>
      <h1>Student Report for {student.last_name}, {student.first_name} </h1>
    </div>
  );
}

export default Student;