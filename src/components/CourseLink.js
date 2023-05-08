import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const CourseLink = ({course, deleteCourse }) => {
    const [deletedCourse, setDeletedCourse] = useState({
        id: course.id,
        name: course.name,
        teacher_id: course.teacher_id,
    });


    const handleDelete = () => {
        deleteCourse(deletedCourse);
    }

    return (
        <h3>
            <Link to={`/courses/${course.id}`}>
                {course.name}
            </Link>
            -- <button onClick={handleDelete}>Delete Course</button>
        </h3>
    );
}

export default CourseLink;