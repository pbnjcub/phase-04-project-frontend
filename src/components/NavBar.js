import React from 'react';
import { NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
            <   NavLink to="/students">Students</NavLink>
            </li>
            <li>
                <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
                <NavLink to="/assignments">Assignments</NavLink>
            </li>

        </ul>

    </div>
  );
}

export default NavBar;