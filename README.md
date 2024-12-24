# uIzonia

## Overview
Uizonia is a app that is intended to help students writing WAEC, NECO, JAMB to practice using past questions

---

## Features

### Admin Features
- **User Role Management**: Admins, editors, teachers, and users.
- **Subject Management**: Add, edit, and delete subjects.
- **Exam Management**: Create exams by selecting subjects, organizers, and years.
- **Question Management**: Add, edit, assign, and delete questions for specific exams.

### User Features
- **Dashboard**: Personalized dashboard displaying enrolled exams, scores, and statistics.
- **Attempt Exams**: Take exams assigned to the user.
- **Performance Analysis**: View scores, attempts, and progress reports.

### Additional Features
- Full authentication and authorization with role-based access control.
- Intuitive UI/UX for seamless navigation and usage.
- Responsive design for mobile and desktop compatibility.
- Parallax footer with useful links and app download options.

---

## Tech Stack

### Backend
- **Framework**: Laravel (PHP)
- **Database**: MySQL

### Frontend
- **Framework**: React with TypeScript
- **CSS Framework**: Tailwind CSS

### DevOps
- **Environment**: Docker for containerization
- **Version Control**: GitHub

---

## Installation

### Prerequisites
1. PHP (>= 8.0)
2. Composer
3. Node.js (>= 14.x)
4. MySQL
5. Docker (optional for containerization)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/exam-management-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd exam-management-app
   ```
3. Install PHP dependencies:
   ```bash
   composer install
   ```
4. Install JavaScript dependencies:
   ```bash
   npm install
   ```
5. Create a `.env` file by copying `.env.gblessylva`:
   ```bash
   cp .env.gblessylva .env
   ```
6. Configure the `.env` file with database and app details.
7. Generate the application key:
   ```bash
   php artisan key:generate
   ```
8. Run migrations and seed the database:
   ```bash
   php artisan migrate --seed
   ```
9. Build frontend assets:
   ```bash
   npm run dev
   ```
10. Start the development server:
    ```bash
    php artisan serve
    ```
11. Access the app at `http://localhost:8000`.

---

## Usage

### Admin Workflow
1. **Sign In**: Admin logs in with their credentials.
2. **Add Subjects**: Navigate to "Subjects" in the dashboard to add or manage subjects.
3. **Add Exams**: Create new exams by selecting the subject, organizer, and year.
4. **Add Questions**: Add questions to the database and assign them to specific exams.

### User Workflow
1. **Sign In**: Users log in to access their dashboard.
2. **Attempt Exams**: Select an exam and complete it within the allotted time.
3. **View Scores**: Analyze results and track progress on the dashboard.

---

## Directory Structure

```
├── app
│   ├── Http
│   │   ├── Controllers
│   │   ├── Middleware
│   └── Models
├── bootstrap
├── config
├── database
├── public
├── resources
│   ├── js
│   ├── css
│   └── views
├── routes
│   ├── web.php
│   ├── api.php
├── storage
├── tests
└── .env.gblessylva
```


---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For support or inquiries, please reach out to us at:
- **Email**: support@gblessylva.com
- **Website**: [www.gblessylva.com](http://www.gblessylva.com)

