🎓 LMS Web Application

A full-stack Learning Management System (LMS) built using React, Node.js, Express, and MongoDB.
This platform supports institutions, administrators, instructors, and students, providing complete tools for course management, learning delivery, assessments, payments, and analytics.

📌 Project Overview

The LMS Web Application is designed to manage the entire online learning lifecycle:

Course creation and publishing

Student enrollment and learning

Instructor content and assessment management

Admin-level monitoring, analytics, and control

The system is split into three major applications:

Admin Dashboard

User LMS Website

Backend Server (API)

🏗️ System Architecture
Client (React - LMS Website)
        ↓
Admin Panel (React Dashboard)
        ↓
Backend API (Node.js + Express)
        ↓
Database (MongoDB)

📁 Repository Structure
reluctant-king-lms_web_application/
│
├── admin_dash_board/        # Admin dashboard (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── website/
│   └── lms/                # User-facing LMS website (React + Vite)
│       ├── src/
│       ├── public/
│       └── package.json
│
├── server/                 # Backend server (Node.js + Express)
│   ├── Controllers/
│   ├── Routes/
│   ├── Models/
│   ├── Middleware/
│   └── Utils/
│
└── README.md

🧩 Core Features
👨‍💼 Admin Dashboard

Manage institutions, instructors, and students

Create and manage courses and categories

Batch scheduling and attendance tracking

Fee structure and payment monitoring

Notifications and announcements

Support tickets management

Dashboard analytics and reports

👩‍🏫 Instructor Module

Create and manage courses

Upload lessons and recorded videos

Create quizzes and assignments

Track student performance

Manage enrolled students

👨‍🎓 Student Module

Browse and purchase courses

Access lessons and learning materials

Submit assignments

Attempt quizzes

Track progress and certifications

🔐 Authentication & Authorization

JWT-based authentication

Role-based access control

Protected routes for Admin, Instructor, Institution, and Student

Secure login and password recovery

🛠️ Technology Stack
Frontend

React (Vite)

React Router

Redux Toolkit

Axios

Tailwind CSS / Custom CSS

Backend

Node.js

Express.js

MongoDB & Mongoose

JWT & Passport.js

Multer (file uploads)

Nodemailer (email services)

Razorpay (payment gateway)

📦 Backend API Modules

Authentication & Authorization

Institutions Management

Courses & Categories

Lessons & Recorded Videos

Quizzes & Submissions

Assignments

Attendance Management

Fee Structure & Payments

Notifications & Announcements

Support Tickets

🗄️ Database Models

Users

Institutions

Courses

Lessons

Quizzes

Assignments

Payments

Attendance

Notifications

Tickets

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/reluctant-king/lms_web_application_.git
cd lms_web_application_

2️⃣ Backend Setup
cd server
npm install
npm start


Create a .env file inside server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

3️⃣ Admin Dashboard Setup
cd admin_dash_board
npm install
npm run dev

4️⃣ LMS Website Setup
cd website/lms
npm install
npm run dev

🌐 Local Development URLs
Service	URL
Backend API	http://localhost:5000

Admin Dashboard	http://localhost:5173

LMS Website	http://localhost:5174
🔒 Security Features

JWT token validation

Role-based authorization

Secure payment verification

Protected API endpoints

File upload validation

📈 Future Improvements

Mobile application support

Advanced analytics dashboard

AI-powered course recommendations

Multi-language support

Certificate automation

🤝 Contribution Guidelines

Fork the repository

Create a feature branch

Commit your changes

Submit a pull request

📄 License

This project is licensed under the MIT License.

👤 Author

Ambady Unnikrishnan
GitHub: https://github.com/reluctant-king


Yadhukrishna
GitHub : https://github.com/Yadhukrishna123
