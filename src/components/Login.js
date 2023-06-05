import React, {useState} from 'react';
import { login } from '../actions/auth';

const Login = ({handleCurrentUser}) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(state, handleCurrentUser);
    }
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={state.username} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={state.password} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Login;