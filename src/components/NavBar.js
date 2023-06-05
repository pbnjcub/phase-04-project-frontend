import React from 'react';
import { NavLink} from 'react-router-dom';
import { logout } from '../actions/auth';

const NavBar = ({loggedIn, logoutCurrentUser}) => {
    if(loggedIn) {
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
                        <NavLink to="/logout" onClick={ (e) => logout(e, logoutCurrentUser)}>Logout</NavLink>
                    </li>

                </ul>

            </div>
        );
    } else {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup">Create Account</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavBar;