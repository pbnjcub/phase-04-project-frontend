import React from 'react';
import { Link } from 'react-router-dom';

const StudentLink = ({ student, unenrollStudent, grade }) => {
  const handleUnenrollClick = () => {
    unenrollStudent(student);
  };

  return (
    <tr>
      <td>
        <Link to={`/students/${student.id}`}>
          {student.first_name} {student.last_name}
        </Link>
      </td>
      <td>{grade}</td>
      <td>
        <button className="pure-button pure-button-primary" onClick={handleUnenrollClick}>Unenroll</button>
      </td>
    </tr>
  );
};

export default StudentLink;
