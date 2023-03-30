import React from 'react';
import { Link } from 'react-router-dom';

const StudentLink = ({student}) => {
    console.log(student)
    return (
        <h3>
            <Link to={`/students/${student.id}`}>
                {student.first_name}
            </Link>
        </h3>
    );
}

export default StudentLink;