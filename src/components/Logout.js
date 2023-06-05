import React from 'react';
import { logout } from '../actions/auth';

const Logout = ({ logoutCurrentUser }) => {
        const handleLogout = () => {
            logout(logoutCurrentUser);
        }
    
        return (
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    }

    export default Logout;