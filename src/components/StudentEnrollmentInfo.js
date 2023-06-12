import React from 'react';

const StudentEnrollmentInfo = ({enrolledCourse, grade }) => {

    return (
        <div>
            <h3>{enrolledCourse} | GRADE: {grade}</h3>
        </div>
    );
}

export default StudentEnrollmentInfo;