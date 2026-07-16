# JobSync 🚀

A comprehensive, full-stack recruitment platform designed to connect job seekers with employers through secure authentication and intelligent job matching.

## Features

### For Job Seekers
- **Secure Authentication**: Email/Password registration and login.
- **Profile Management**: Create and update detailed profiles with skills and experience.
- **Job Discovery**: Browse and search through available job listings.
- **Application Tracking**: Apply for jobs and track your application status.
- **Dashboard**: View personalized job recommendations and recent activities.

### For Employers
- **Company Management**: Create and manage company profiles.
- **Job Management**: Post, edit, and archive job listings.
- **Candidate Screening**: Review applications and shortlist candidates.
- **Dashboard**: Track job performance and manage hiring pipelines.

## Tech Stack

### Frontend
- **Framework**: React.js
- **Language**: JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles

### Backend
- **Language**: PHP (Laravel framework)
- **Database**: MySQL
- **API**: RESTful API for seamless frontend-backend communication

## Getting Started

### Prerequisites
- A working PHP environment (e.g., XAMPP, WAMP, or Docker).
- MySQL database server.
- Node.js and npm (for frontend development).

### Installation

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install PHP dependencies (if any):
   ```bash
   composer install
   ```
3. Configure your database:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with your database credentials:
     ```ini
     DB_CONNECTION=mysql
     DB_HOST=localhost
     DB_PORT=3306
     DB_DATABASE=jobsync_db
     DB_USERNAME=root
     DB_PASSWORD=
     ```
4. Run database migrations:
   ```bash
   php artisan migrate
   ```
5. Start the development server:
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`.

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Configure the backend API URL:
   - Edit `src/api/axios.js` or relevant configuration files to point to your backend URL (e.g., `http://localhost:8000`).

4. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:5173`.

## Project Structure

```
JobSync/
├── backend/            # PHP/Laravel backend
│   ├── app/            # Application logic
│   ├── database/       # Migrations and seeders
│   ├── public/         # Publicly accessible files
│   └── .env            # Environment configuration
├── frontend/           # React.js frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── api/        # API integration
│   │   └── assets/     # Images, styles, etc.
│   └── package.json    # Frontend dependencies
└── README.md           # Project documentation
```

## Usage

### Job Seeker Flow
1. Register for a new account.
2. Log in using your credentials.
3. Complete your profile with skills and experience.
4. Browse job listings and apply.
5. Track your application status.

### Employer Flow
1. Register a company account.
2. Log in and complete company profile.
3. Create and manage job postings.
4. Review candidate applications.
5. Shortlist and communicate with candidates.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please refer to the project documentation or contact the development team.
