import React from 'react';
import { Link } from 'react-router-dom';

const StudentLink = ({student, unenrollStudent, handleEditStudent }) => {
    const handleUnenrollClick = () => {
        unenrollStudent(student)
    }

    // const [deletedStudent, setDeletedStudent] = useState({
    //     id: student.id,
    //     first_name: student.first_name,
    //     last_name: student.last_name,
    // });


    // const handleDelete = () => {
    //     deleteStudent(deletedStudent);
    // }

    return (
        <h3>
            <Link to={`/students/${student.id}`}>
                {student.first_name} {student.last_name}
            </Link>
            -- <button onClick={handleUnenrollClick}>Unenroll</button>
        </h3>
    );
}

export default StudentLink;