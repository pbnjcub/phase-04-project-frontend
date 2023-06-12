import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentLinkDelete = ({student, deleteStudent}) => {

    const [deletedStudent, setDeletedStudent] = useState({
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
    });

    const handleDelete = () => {
        deleteStudent(deletedStudent);
    }

    return (
        <tr>
            <td>
                <Link to={`/students/${student.id}`}>
                    {student.first_name} {student.last_name}
                </Link>
            </td>
            <td>
                <button className="pure-button" onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    
    );
}

export default StudentLinkDelete;