import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const CourseLink = ({course, deleteCourse, teacherId }) => {
    const [deletedCourse, setDeletedCourse] = useState({
        id: course.id,
        name: course.name,
        teacher_id: teacherId,
    });


    const handleDelete = () => {
        deleteCourse(deletedCourse);
    }

    return (
        <tr>
            <td>
                <Link to={`/teachers/:teacher_id/courses/${course.id}`}>
                    {course.name}
                </Link>
            </td>
            <td>
                <button className="pure-button" onClick={handleDelete}>Delete</button>
            </td>

        </tr>
        
    );
}

export default CourseLink;