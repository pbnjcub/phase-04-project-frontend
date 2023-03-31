import React from 'react';
import { Link } from 'react-router-dom';

const StudentLink = ({student, deleteStudent}) => {
    return (
        <h3>
            <Link to={`/students/${student.id}`}>
                {student.first_name} {student.last_name}
            </Link>
            -- <button onClick={() => deleteStudent(student)}>Delete Student</button>
        </h3>
    );
}

export default StudentLink;