import React from 'react';

const StudentEnrollmentInfo = ({enrolledCourse, grade }) => {

    return (
        <tr>
            <td>
                {enrolledCourse}
            </td>
            <td>
                {grade}
            </td>
        </tr>
    );
}

export default StudentEnrollmentInfo;
