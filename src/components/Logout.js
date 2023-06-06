import React from 'react';
import { useNavigate} from 'react-router-dom'; 
import { logout } from '../actions/auth';

const Logout = ({ logoutCurrentUser }) => {
    const navigate = useNavigate();
        const handleLogout = () => {
            logout(logoutCurrentUser);
            navigate("/");
        }
    
        return (
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    }

    export default Logout;