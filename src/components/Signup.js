import React, {useState} from 'react';
import { createAccount } from '../actions/auth';

const Signup = ({handleCurrentUser}) => {
    const [newUserTeacher, setNewUserTeacher] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
    })

    const handleChange = (e) => {
        setNewUserTeacher({
            ...newUserTeacher,
            [e.target.name]: e.target.value,
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount(newUserTeacher, handleCurrentUser);
    }

    return (
        <div>
            <h1>Create Teacher Account</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={newUserTeacher.username} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={newUserTeacher.password} onChange={handleChange} />
                <label>First Name</label>
                <input type="text" name="first_name" value={newUserTeacher.first_name} onChange={handleChange} />
                <label>Last Name</label>
                <input type="text" name="last_name" value={newUserTeacher.last_name} onChange={handleChange} />
                <label>Email</label>
                <input type="text" name="email" value={newUserTeacher.email} onChange={handleChange} />
                <input type="submit" value="Signup" />
            </form>

        </div>
    );
}

export default Signup;