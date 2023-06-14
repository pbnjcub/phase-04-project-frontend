# README

### GRADEGURU
GradeGuru is a web application that allows teachers to manage courses and students. It provides features for creating, updating, and deleting courses, as well as enrolling and unenrolling students from courses. The app is built using React on the frontend and Ruby on Rails on the backend.

### FEATURES
- User authentication: Teachers can sign up, log in, and log out of the app.
- Course management: teachers can create new courses, update course details, and delete courses, and should only see their own courses.
- Student management: Teachers can view a list of students, enroll students in courses, and unenroll students from courses.

### Technologies used
-React
-Ruby on Rails
-HTML and CSS
-JavaScript

Model, View Controller, Rails Generators, RESTful Routing, Full CRUD capabilities, Many-to-Many relationship between Courses and Students, User Authorization

### Setup and Installation

1. Clone the repository: 
    - backend
        git clone https://github.com/pbnjcub/phase-04-project-backend
    - frontend
        git clone https://github.com/pbnjcub/phase-04-project-frontend


2. Navigate to the project directory:

    cd phase-04-project-backend
    cd phase-04-project-frontend

3. Install the front end and back end dependencies

    - frontend
        npm install

    - backend
        bundle install

4. Set up the database

    - rails db:create
    - rails db:migrate

5. Start the backend server on localhost:3000

    rails s

6. Start the frontend development server on localhost:4000

    npm start

7. Browser should automatically open to 'http://localhost:4000'

### Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

### License
GradeGuru is open source.