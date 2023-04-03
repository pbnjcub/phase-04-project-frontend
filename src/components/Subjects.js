import React from 'react';
import { NavLink} from 'react-router-dom';

const Classes = (student) => {
    return (
        <li>
            <NavLink to={`/classes/${student.classes}`}>View By Class</NavLink>
        </li>
    );
}

export default Classes;