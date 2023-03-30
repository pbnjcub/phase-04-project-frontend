import React, {useState, useEffect } from 'react';

const Students = () => {
  // const { id } = useParams();
  const [students, setStudents] = useState();

  useEffect(() => {
    const fetchData = async () => {
        const resp = await fetch('http://localhost:9393/students/');
        const data = await resp.json();
        setStudents(data);
    };
    fetchData();
}, []);

  const student = students.find((student) => student.id === 2);

  return (
    <div>
      <h1>Student {student.last_name} </h1>
    </div>
  );
}

export default Students;