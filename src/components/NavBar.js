import React from 'react';
import { NavLink} from 'react-router-dom';


const NavBar = ({loggedIn, logoutCurrentUser}) => {
    if(loggedIn) {
        return (
            <div className="pure-menu pure-menu-horizontal">
                <a href="/" className="pure-menu-heading pure-menu-link">GradeGuru</a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item">
                        <NavLink className="pure-menu-link" to="/">Home</NavLink>
                    </li>
                    <li class="pure-menu-item">
                        <NavLink className="pure-menu-link" to="/students">Students</NavLink>
                    </li>
                    <li class="pure-menu-item">
                        <NavLink className="pure-menu-link" to="/courses">Courses</NavLink>
                    </li>
                    <li class="pure-menu-item">
                        <NavLink className="pure-menu-link" to="/logout">Logout</NavLink>
                    </li>

                </ul>

            </div>
        );
    } else {
        return (
            <div className="pure-menu pure-menu-horizontal">
                <a href="/" className="pure-menu-heading pure-menu-link">GradeGuru</a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="pure-menu-item">
                        <NavLink to="/signup">Create Account</NavLink>
                    </li>
                    <li className="pure-menu-item">
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavBar;