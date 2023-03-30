import React from 'react';
import { NavLink} from 'react-router-dom';

const Assignments = (student) => {
    return (
        <li>
            <NavLink to={`/assignments/${student.assignments}`}>View Assignments</NavLink>
        </li>
    );
}