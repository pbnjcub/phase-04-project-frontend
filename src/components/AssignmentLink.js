import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const AssignmentLink = ({assignment, deleteAssignment }) => {
    const [deletedAssignment, setDeletedAssignment] = useState({
        id: assignment.id,
        name: assignment.name,
        grade: assignment.grade,
        student_id: assignment.student_id,
        course_id: assignment.course_id,
    });


    const handleDelete = () => {
        deleteAssignment(deletedAssignment);
    }

    return (
        <h3>
            <Link to={`/assignments/${assignment.id}`}>
                {assignment.name}
            </Link>
            -- <button onClick={handleDelete}>Delete Assignment</button>
        </h3>
    );
}

export default AssignmentLink;