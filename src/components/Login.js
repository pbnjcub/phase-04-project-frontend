import React, {useState} from 'react';
import { login } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({handleCurrentUser}) => {
    const [userTeacher, setUserTeacher] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserTeacher({
            ...userTeacher,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userTeacher, handleCurrentUser);
        navigate("/courses");
    }
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={userTeacher.username} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={userTeacher.password} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Login;