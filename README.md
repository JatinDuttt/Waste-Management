# ♻️ Waste Management System
A full-stack Waste Management System designed to streamline and digitize the process of waste tracking, collection, and disposal. This project utilizes **Node.js**, **PHP**, and **CSS** to provide both backend and frontend functionality for users and administrators.

## 🛠️ Technologies Used

- **Node.js** – Backend logic, API development
- **PHP** – Server-side scripting, database integration
- **CSS** – Frontend styling and layout
- **MySQL** – (Assumed) Database for storing data
- **HTML/JavaScript** – (Assumed) Used in frontend alongside CSS

## 🚀 Features

- 📄 User registration and login
- 🗑️ Request waste pickup
- 📍 Track pickup status
- 🧹 Admin dashboard to manage requests and schedule pickups
- 🧾 View pickup history and generate reports
- 📊 Clean UI for users and administrators

Installation

Clone the Repository:-
git clone https://github.com/JatinDuttt/waste-management-system.git
cd waste-management-system

Install Node.js Dependencies
cd backend
npm install


Set Up Database
Import the SQL file in /database/waste_mgmt.sql into your MySQL server.
Update DB credentials in the PHP config file (e.g., config.php).
Run Node.js Server
node server.js


Run PHP Server
Use XAMPP, WAMP, or any PHP server.
Place PHP files in your htdocs or server root directory.

Access the App
Node.js API: http://localhost:3000
Frontend: http://localhost/project-folder/index.html (or wherever hosted)
🧩 Database Schema (Simplified)
TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('user', 'admin')
);

TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  waste_type VARCHAR(50),
  address TEXT,
  status ENUM('pending', 'in_progress', 'completed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🛠️ Future Improvements

✅ Email notifications for request updates

✅ Role-based access control

🔄 Real-time request updates using WebSockets

📍 Google Maps integration for pickup routes

📱 PWA / Mobile App version


🙌 Acknowledgements

Node.js Docs – https://nodejs.org

PHP Manual – https://www.php.net

Free UI resources from Bootstrap
 and Font Awesome

Icons & images from Unsplash
 and Flaticon

🔐 JWT or OAuth-based secure login
