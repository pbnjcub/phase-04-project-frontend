import React, {useState} from 'react';
import { createAccount } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const Signup = ({handleCurrentUser}) => {
    const [newUserTeacher, setNewUserTeacher] = useState({
        username: "",
        password: "",
        teacher_attributes: {
          first_name: "",
          last_name: "",
          email: "",
        },
      });
    const navigate = useNavigate();

      const handleChange = (e) => {
        if (e.target.name.includes("teacher")) {
          setNewUserTeacher({
            ...newUserTeacher,
            teacher_attributes: {
              ...newUserTeacher.teacher_attributes,
              [e.target.name.split(".")[1]]: e.target.value,
            },
          });
        } else {
          setNewUserTeacher({
            ...newUserTeacher,
            [e.target.name]: e.target.value,
          });
        }
      };


    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount(newUserTeacher, handleCurrentUser);
        navigate("/courses");
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
                <input type="text" name="teacher_attributes.first_name" value={newUserTeacher.teacher_attributes.first_name} onChange={handleChange} />
                <label>Last Name</label>
                <input type="text" name="teacher_attributes.last_name" value={newUserTeacher.teacher_attributes.last_name} onChange={handleChange} />
                <label>Email</label>
                <input type="text" name="teacher_attributes.email" value={newUserTeacher.teacher_attributes.email} onChange={handleChange} />
                <input type="submit" value="Signup" />
            </form>

        </div>
    );
}

export default Signup;