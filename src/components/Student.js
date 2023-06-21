import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import StudentEditForm from './StudentEditForm';
import StudentEnrollmentInfo from './StudentEnrollmentInfo';
import UserContext from './UserContext';

const Student = ({ updateStudent, teacherCourses, setTeacherCourses} ) => {
    //state variables
    const { id } = useParams();
    const {currentUser, setCurrentUser} = React.useContext(UserContext);
    const [selectedStudent, setSelectedStudent] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [formFlag, setFormFlag] = useState(false);
    const [teacherId, setTeacherId] = useState(parseInt(currentUser.teacher.id));
    const [studentCourses, setStudentCourses] = useState([])

   //fetch for student data
    useEffect(() => {
      fetch(`http://localhost:3000/students/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setSelectedStudent(data)

          const coursesByTeacher = data.courses.filter((course) => course.teacher_id === teacherId);
          setStudentCourses(coursesByTeacher);
        });
    }, [id]);
    
    //fetch to update student's name
    const handleEditStudent = (editedStudent) => {
      fetch(`http://localhost:3000/students/${editedStudent.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(editedStudent),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors) {
            setErrorMessages(data.errors);
          } else {
            updateStudent(data);
            setSelectedStudent(data);
    
            // Update student name in teacherCourses students object
            const updatedCourses = teacherCourses.map((course) => {
              const updatedStudents = course.students.map((student) => {
                if (student.id === editedStudent.id) {
                  return data;
                } else {
                  return student;
                }
              });
              return { ...course, students: updatedStudents };
            }
            );
            setTeacherCourses(updatedCourses);


          }
        });
    };
      //gets student's grade in each enrolled class.
      const getGrade = (courseId) => {
        const enrolled = selectedStudent.courses_students.find(
          (enrolled) => enrolled.course_id === courseId
        );
        return enrolled.grade;
      };
      //formats student info
      const studentDetail = studentCourses.map((course) => {
        const grade = getGrade(course.id);
        return (<StudentEnrollmentInfo key={course.id} enrolledCourse={course.name} grade={grade}/>
        );
      });
      
  
    const renderErrors = errorMessages.map((message) => <p id="error">{message}</p>);
    return (
      <div className="main">
        <h1>Student Report for {selectedStudent.last_name}, {selectedStudent.first_name} </h1>
        <br />
        <h3>Enrolled Courses</h3>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {studentDetail}
          </tbody>
        </table>
        <br />
        {formFlag ?
          <StudentEditForm selectedStudent={selectedStudent} handleEditStudent={handleEditStudent}/> :
          <button onClick={() => setFormFlag(true)}>Edit Student</button>}
        <br />
        {renderErrors}
      </div>
    );
  }
  
  export default Student;



// const handleEditStudent = (editedStudent) => {
    //   fetch(`http://localhost:3000/students/${editedStudent.id}`, {
    //       method: "PATCH",
    //       headers: {
    //           "Content-Type": "application/json",
    //           "Accept": "application/json"
    //       },
    //       body: JSON.stringify(editedStudent),
    //   })
    //       .then((resp) => resp.json())
    //       .then(data => {
    //         console.log(data)
    //           if (data.errors) {
    //               setErrorMessages(data.errors);
    //           } else {
    //               updateStudent(data)
  
    //               const updatedCourses = courses.map((course) => {
    //                 const updatedStudents = course.students.map((student) => {
    //                   if (student.id === editedStudent.id) {
    //                     return {
    //                       ...student,
    //                       last_name: editedStudent.last_name,
    //                       first_name: editedStudent.first_name,
    //                     };
    //                   } else {
    //                     return student;
    //                   }
    //                 });
          
    //                 return {
    //                   ...course,
    //                   students: updatedStudents,
    //                 };
    //               });
          
    //               setCourses(updatedCourses);
    //               setFormFlag(false);
    //               setErrorMessages([]);
          
    //               // Update the student's name in the associated courses on the backend
    //               Promise.all(
    //                 updatedCourses.map((course) =>
    //                   fetch(`http://localhost:3000/courses/${course.id}/students/${editedStudent.id}`, {
    //                     method: "PATCH",
    //                     headers: {
    //                       "Content-Type": "application/json",
    //                       "Accept": "application/json"
    //                     },
    //                     body: JSON.stringify({
    //                       first_name: editedStudent.first_name,
    //                       last_name: editedStudent.last_name
    //                     }),
    //                   })
    //                 )
    //               ).then(() => {
    //                 console.log("Student name updated in associated courses");
    //               });
    //             }
    //           });
    //       };