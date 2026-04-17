# Waste Management System

A PHP + MySQL Waste Management System for handling user authentication and waste pickup workflows, with a static HTML/CSS/JS frontend.

## Technologies Used

- PHP
- MySQL
- HTML
- CSS
- JavaScript

## Features

- User signup and login
- Password reset via OTP flow
- Waste request interface (frontend)
- Styled dashboard/pages for waste management workflow

## Project Structure

- `connection.php`: Database connection
- `controllerUserData.php`: Auth and user-related request handling
- `login-user.php`, `signup-user.php`: Authentication pages
- `forgot-password.php`, `reset-code.php`, `new-password.php`, `password-changed.php`, `user-otp.php`: Password recovery flow
- `wms.sql`: Database schema/data
- `waste-management.html`, `waste-management.css`, `waste-management.js`: Frontend page and assets

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/JatinDuttt/waste-management-system.git
cd waste-management-system
```

2. Create a MySQL database (for example `wms`).

3. Import [`wms.sql`](./wms.sql) into your MySQL server.

4. Update database credentials in [`connection.php`](./connection.php).

5. Serve the project with any PHP server:
- XAMPP/WAMP (place project in `htdocs`/`www`)
- or PHP built-in server:

```bash
php -S localhost:8000
```

6. Open the app in your browser:
- `http://localhost:8000/login-user.php`
- or your local server path (for example via XAMPP)

## Notes

- This repository currently does **not** include a Node.js backend (`package.json` is not present), so `npm install` is not required.
- If you later add a Node service, keep it in a separate folder with its own `package.json`.

## Future Improvements

- Role-based access control for admin/user views
- Email notifications for pickup status updates
- Real-time request status updates
- Route visualization for pickup planning

## Acknowledgements

- PHP: https://www.php.net
- MySQL: https://www.mysql.com
