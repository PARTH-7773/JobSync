# 🔄 JobSync

> A modern, full-stack recruitment platform connecting job seekers and employers through secure authentication and smart job matching.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Environment Setup](#-environment-setup)
- [Running the Project](#-running-the-project)
- [Frontend Routes](#-frontend-routes)
- [API Documentation](#-api-documentation)
  - [Base URL](#base-url)
  - [Authentication](#authentication-endpoints)
  - [User Profile](#user-profile-endpoints)
  - [Jobs](#job-endpoints)
  - [Applications](#application-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Data Models](#-data-models)
- [Error Response Format](#-error-response-format)

---

## 🌟 Overview

JobSync is a full-stack recruitment platform built with the MERN stack. It enables:

- **Job Seekers** — Register, browse & filter jobs, apply with a cover letter, manage their profile & resume
- **Employers** — Post jobs, manage listings, view applications, and connect with candidates
- **Real-time features** — Powered by **Socket.IO** for live notifications and messaging

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Stateless authentication (cookie-based) |
| **bcrypt** | Password hashing |
| **Socket.IO** | Real-time WebSocket communication |
| **Cloudinary** | Cloud image / resume file storage |
| **ioredis** | Redis-based caching / session store |
| **express-validator** | Request validation middleware |
| **cookie-parser** | HTTP cookie management |
| **dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19 + Vite** | UI framework & dev tooling |
| **React Router DOM v7** | Client-side routing |
| **Axios** | HTTP client with cookie support |
| **Tailwind CSS v4** | Utility-first styling |
| **Lucide React** | Icon library |
| **Socket.IO Client** | Real-time connection |
| **GSAP** | Animations |
| **react-hot-toast** | Toast notifications |

---

## 📁 Project Structure

```
JobSync/
├── backend/
│   ├── server.js              # Express app entry point
│   ├── package.json
│   └── .env                   # Environment variables
│
└── frontend/
    ├── src/
    │   ├── lib/
    │   │   └── api.js          # Axios instance (base URL: http://localhost:3000)
    │   ├── hooks/
    │   │   └── useAuth.jsx      # login() and register() API calls
    │   ├── context/
    │   │   ├── UserContext.jsx  # Global user state + session check (/api/user/profile)
    │   │   └── JobContext.jsx   # Global job listings state
    │   ├── pages/
    │   │   ├── Home.jsx         # Landing page — featured jobs
    │   │   ├── Jobs.jsx         # Browse & filter all jobs
    │   │   ├── JobDetails.jsx   # Single job + application form
    │   │   ├── PostJob.jsx      # Employer: post a new job
    │   │   ├── Profile.jsx      # User profile management
    │   │   ├── Login.jsx        # Sign in page
    │   │   ├── Register.jsx     # Sign up page
    │   │   └── UserProfileWrapper.jsx  # Auth guard HOC
    │   └── components/
    │       ├── Hearder.jsx      # Navigation bar
    │       └── Footer.jsx       # Site footer
    ├── index.html
    └── vite.config.js
```

---

## ⚙️ Environment Setup

### Backend `.env`

```env
MONGO_URI=mongodb://127.0.0.1:27018/JobSync-DB?directConnection=true
JWT_SECRET=your_jwt_secret_here
NODE_ENV=production
PORT=3000
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## 🚀 Running the Project

### Backend

```bash
cd backend
npm install
npm run dev        # development (nodemon)
# or
npm start          # production
```

### Frontend

```bash
cd frontend
npm install
npm run dev        # Vite dev server (default: http://localhost:5173)
```

---

## 🧭 Frontend Routes

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | `Home.jsx` | Public | Landing page with featured job listings |
| `/signIn` | `Login.jsx` | Public | User login |
| `/signUp` | `Register.jsx` | Public | User registration |
| `/browse-job` | `Jobs.jsx` | Public | Browse & filter all active jobs |
| `/job-details/:id` | `JobDetails.jsx` | Public / Auth | View job details; apply (requires login) |
| `/profile` | `Profile.jsx` | 🔒 Protected | User profile & resume management |
| `/post-job` | `PostJob.jsx` | 🔒 Protected (Employer) | Create a new job listing |

---

## 📡 API Documentation

### Base URL

```
http://localhost:3000
```

All API responses follow a consistent JSON envelope:

```json
{
  "success": true | false,
  "message": "Human-readable message",
  "data": { ... } | [ ... ] | null,
  "errors": [ ... ]   // only on validation failures
}
```

---

## 🔐 Authentication Endpoints

Authentication is **cookie-based**. The JWT token is set as an `HttpOnly` cookie on login/register and is automatically sent with every subsequent request via `withCredentials: true` in Axios.

---

### `POST /api/user/register`

Register a new user account.

**Request Body**

```json
{
  "fullname": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "mySecurePass123",
  "role": "seeker"
}
```

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `fullname` | `string` | ✅ | Min 2 characters |
| `username` | `string` | ✅ | Unique, alphanumeric |
| `email` | `string` | ✅ | Valid email format, unique |
| `password` | `string` | ✅ | Min 6 characters |
| `role` | `string` | ✅ | `"seeker"` or `"employer"` |

**Success Response** — `201 Created`

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullname": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "seeker",
    "createdAt": "2025-07-16T18:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Scenario | Response |
|--------|----------|----------|
| `400` | Validation failed | `{ "success": false, "errors": [{ "msg": "Email is required", "path": "email" }] }` |
| `409` | Email already exists | `{ "success": false, "message": "User with this email already exists" }` |
| `500` | Server error | `{ "success": false, "message": "Internal server error" }` |

---

### `POST /api/user/login`

Authenticate an existing user.

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "mySecurePass123"
}
```

| Field | Type | Required |
|-------|------|----------|
| `email` | `string` | ✅ |
| `password` | `string` | ✅ |

**Success Response** — `200 OK`

Sets `HttpOnly` JWT cookie on the client.

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullname": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "seeker"
  }
}
```

**Error Responses**

| Status | Scenario | Response |
|--------|----------|----------|
| `400` | Validation failed | `{ "success": false, "errors": [{ "msg": "Invalid email format" }] }` |
| `401` | Invalid credentials | `{ "success": false, "message": "Invalid email or password" }` |
| `500` | Server error | `{ "success": false, "message": "Internal server error" }` |

---

### `POST /api/user/logout`

Log out the current user. Clears the auth cookie.

**Request Body** — None

**Success Response** — `200 OK`

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 👤 User Profile Endpoints

> All endpoints in this section require an authenticated session (valid JWT cookie).

---

### `GET /api/user/profile`

Fetch the currently authenticated user's profile. Called automatically on every page load via `UserContext.jsx` to restore session.

**Request** — No body. Cookie is sent automatically.

**Success Response** — `200 OK`

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullname": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "seeker",
    "phone": "+91 98765 43210",
    "skills": "React, Node.js, MongoDB",
    "education": "B.Tech, XYZ University, 2022",
    "experience": "Junior Developer, ABC Corp, 2022–2024",
    "resume": "resume_johndoe_1720000000.pdf",
    "profileScore": 80,
    "createdAt": "2025-07-16T18:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Scenario | Response |
|--------|----------|----------|
| `401` | Not authenticated / expired token | `{ "success": false, "message": "Unauthorized" }` |
| `404` | User not found | `{ "success": false, "message": "User not found" }` |

---

### `PUT /api/user/profile`

Update the user's profile information. Supports resume file upload via `multipart/form-data`.

**Content-Type:** `multipart/form-data`

**Request Body (form fields)**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `full_name` | `string` | ✅ | Full display name |
| `phone` | `string` | ❌ | Contact phone number |
| `skills` | `string` | ❌ | Comma-separated skills list |
| `education` | `string` | ❌ | Education history |
| `experience` | `string` | ❌ | Work experience |
| `resume` | `file` | ❌ | PDF or DOCX resume file (uploaded to Cloudinary) |

**Success Response** — `200 OK`

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullname": "John Doe",
    "phone": "+91 98765 43210",
    "skills": "React, Node.js, Python",
    "education": "B.Tech Computer Science",
    "experience": "2 years at ABC Corp",
    "resume": "https://res.cloudinary.com/.../resume.pdf",
    "profileScore": 100
  }
}
```

**Error Responses**

| Status | Scenario | Response |
|--------|----------|----------|
| `400` | Validation error | `{ "success": false, "errors": [...] }` |
| `401` | Unauthorized | `{ "success": false, "message": "Unauthorized" }` |
| `413` | File too large | `{ "success": false, "message": "File size exceeds limit" }` |

---

## 💼 Job Endpoints

---

### `GET /api/jobs`

Fetch all active job listings. Supports query parameters for filtering.

**Query Parameters**

| Param | Type | Description | Example |
|-------|------|-------------|---------|
| `search` | `string` | Search by title or keywords | `?search=developer` |
| `category` | `string` | Filter by category | `?category=Technology` |
| `job_type` | `string` | Filter by type | `?job_type=full-time` |
| `location` | `string` | Filter by city/region | `?location=Ahmedabad` |
| `sort` | `string` | Sort order: `newest`, `oldest`, `title` | `?sort=newest` |

**Success Response** — `200 OK`

```json
{
  "success": true,
  "message": "Jobs fetched successfully",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "title": "Full Stack Developer",
      "company_name": "Genius Tech",
      "description": "Well knowledged of full stack and modern development",
      "requirements": "MERN stack, APIs and responsive design",
      "location": "Ahmedabad",
      "salary_range": "3.5 to 4.5 LPA",
      "job_type": "Full Time",
      "category": "Technology",
      "status": "active",
      "posted_date": "2025-07-16T18:00:00.000Z",
      "company_details": {
        "industry": "Technology",
        "website": "https://geniustech.com",
        "about": "Leading MNC providing software services"
      }
    }
  ],
  "total": 25,
  "page": 1,
  "perPage": 10
}
```

---

### `GET /api/jobs/:id`

Fetch details of a single job listing by its ID.

**URL Parameter**

| Param | Type | Description |
|-------|------|-------------|
| `id` | `string` | MongoDB ObjectId of the job |

**Success Response** — `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "title": "Full Stack Developer",
    "company_name": "Genius Tech",
    "description": "...",
    "requirements": "...",
    "location": "Ahmedabad",
    "salary_range": "3.5 to 4.5 LPA",
    "job_type": "Full Time",
    "category": "Technology",
    "status": "active",
    "posted_date": "2025-07-16T18:00:00.000Z",
    "company_details": {
      "industry": "Technology",
      "website": "https://geniustech.com",
      "about": "..."
    }
  }
}
```

**Error Responses**

| Status | Scenario | Response |
|--------|----------|----------|
| `404` | Job not found | `{ "success": false, "message": "Job not found" }` |
| `400` | Invalid ID format | `{ "success": false, "message": "Invalid job ID" }` |

---

### `POST /api/jobs`

> 🔒 **Employer only** — Requires authentication + `role: "employer"`

Create a new job listing.

**Request Body**

```json
{
  "title": "Senior Backend Engineer",
  "job_type": "full-time",
  "category": "Technology",
  "location": "Remote",
  "salary_range": "8 to 12 LPA",
  "description": "We are looking for a senior backend engineer...",
  "requirements": "5+ years Node.js, PostgreSQL, AWS experience..."
}
```

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `title` | `string` | ✅ | Min 3 chars |
| `job_type` | `string` | ✅ | `full-time`, `part-time`, `contract`, `internship` |
| `category` | `string` | ✅ | One of allowed categories |
| `location` | `string` | ✅ | City or "Remote" |
| `salary_range` | `string` | ❌ | Optional salary info |
| `description` | `string` | ✅ | Min 20 chars |
| `requirements` | `string` | ❌ | Skills and qualifications |

**Success Response** — `201 Created`

```json
{
  "success": true,
  "message": "Job posted successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
    "title": "Senior Backend Engineer",
    "employer_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "status": "active",
    "posted_date": "2025-07-16T18:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Scenario | Response |
|--------|----------|----------|
| `400` | Validation failed | `{ "success": false, "errors": [...] }` |
| `401` | Not authenticated | `{ "success": false, "message": "Unauthorized" }` |
| `403` | Not an employer | `{ "success": false, "message": "Access denied. Employer account required." }` |

---

### `PUT /api/jobs/:id`

> 🔒 **Employer only** — Update an existing job listing (must be owner).

**URL Parameter:** `id` — MongoDB ObjectId of the job

**Request Body** — Same fields as `POST /api/jobs` (all optional for partial update)

**Success Response** — `200 OK`

```json
{
  "success": true,
  "message": "Job updated successfully",
  "data": { ...updatedJobObject }
}
```

---

### `DELETE /api/jobs/:id`

> 🔒 **Employer only** — Delete a job listing (must be owner).

**Success Response** — `200 OK`

```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

## 📝 Application Endpoints

---

### `POST /api/jobs/:id/apply`

> 🔒 **Job Seeker only** — Submit an application for a job.

**URL Parameter:** `id` — MongoDB ObjectId of the job

**Request Body**

```json
{
  "cover_letter": "I am excited to apply for this position because..."
}
```

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `cover_letter` | `string` | ✅ | Min 50 characters |

**Success Response** — `201 Created`

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
    "job_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "applicant_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "cover_letter": "...",
    "status": "pending",
    "applied_at": "2025-07-16T18:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Scenario | Response |
|--------|----------|----------|
| `400` | Already applied | `{ "success": false, "message": "You have already applied to this job" }` |
| `401` | Not authenticated | `{ "success": false, "message": "Unauthorized" }` |
| `403` | Employer account | `{ "success": false, "message": "Employers cannot apply to jobs" }` |
| `404` | Job not found | `{ "success": false, "message": "Job not found" }` |

---

### `GET /api/user/applications`

> 🔒 **Job Seeker** — Get all applications submitted by the logged-in user.

**Success Response** — `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
      "job": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
        "title": "Full Stack Developer",
        "company_name": "Genius Tech",
        "location": "Ahmedabad"
      },
      "status": "pending",
      "applied_at": "2025-07-16T18:00:00.000Z"
    }
  ]
}
```

---

### `GET /api/employer/applications`

> 🔒 **Employer only** — Get all applications received for the employer's job listings.

**Success Response** — `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
      "job": {
        "title": "Full Stack Developer"
      },
      "applicant": {
        "fullname": "John Doe",
        "email": "john@example.com",
        "skills": "React, Node.js",
        "resume": "https://res.cloudinary.com/.../resume.pdf"
      },
      "cover_letter": "...",
      "status": "pending",
      "applied_at": "2025-07-16T18:00:00.000Z"
    }
  ]
}
```

---

## 🔑 Authentication Flow

```
1. User submits login/register form
         │
         ▼
2. Backend validates input with express-validator
         │
         ▼
3. Password hashed with bcrypt (register) or compared (login)
         │
         ▼
4. JWT token generated and set as HttpOnly cookie
         │
         ▼
5. Frontend Axios (withCredentials: true) sends cookie on all requests
         │
         ▼
6. On every page load, UserContext calls GET /api/user/profile
   to rehydrate user state from cookie session
         │
         ▼
7. Protected routes check user state; redirect to /signIn if null
```

---

## 🗂 Data Models

### User

```js
{
  _id: ObjectId,
  fullname: String,          // required
  username: String,          // required, unique
  email: String,             // required, unique
  password: String,          // hashed with bcrypt
  role: "seeker" | "employer",
  phone: String,
  skills: String,            // comma-separated
  education: String,
  experience: String,
  resume: String,            // Cloudinary URL
  profileScore: Number,      // 0–100 based on profile completeness
  createdAt: Date,
  updatedAt: Date
}
```

### Job

```js
{
  _id: ObjectId,
  employer_id: ObjectId,     // ref: User
  company_name: String,
  title: String,             // required
  description: String,       // required
  requirements: String,
  location: String,          // required
  salary_range: String,
  job_type: "full-time" | "part-time" | "contract" | "internship",
  category: String,          // Technology | Healthcare | Finance | etc.
  status: "active" | "closed",
  company_details: {
    industry: String,
    website: String,
    about: String
  },
  posted_date: Date,
  updatedAt: Date
}
```

### Application

```js
{
  _id: ObjectId,
  job_id: ObjectId,          // ref: Job
  applicant_id: ObjectId,    // ref: User (seeker)
  cover_letter: String,      // required
  status: "pending" | "reviewed" | "shortlisted" | "rejected",
  applied_at: Date
}
```

---

## ❌ Error Response Format

All errors follow this consistent structure:

```json
{
  "success": false,
  "message": "A human-readable error description",
  "errors": [
    {
      "msg": "Email is required",
      "path": "email",
      "location": "body"
    }
  ]
}
```

| HTTP Status | Meaning |
|-------------|---------|
| `200` | OK — Request successful |
| `201` | Created — Resource created successfully |
| `400` | Bad Request — Validation failed or malformed input |
| `401` | Unauthorized — Missing or invalid JWT token |
| `403` | Forbidden — Authenticated but insufficient role/permissions |
| `404` | Not Found — Resource does not exist |
| `409` | Conflict — Duplicate entry (email, username) |
| `500` | Internal Server Error — Unexpected server error |

---

## 🔌 Real-time Events (Socket.IO)

The backend uses **Socket.IO** for real-time features. The client connects via `socket.io-client`.

| Event | Direction | Description |
|-------|-----------|-------------|
| `connection` | Client → Server | Establish WebSocket connection |
| `new_application` | Server → Employer | Notify employer when someone applies |
| `application_status_update` | Server → Seeker | Notify seeker when application status changes |
| `disconnect` | Client → Server | Socket disconnected |

---

## 📦 Job Categories

The platform supports the following job categories:

- `Technology`
- `Healthcare`
- `Finance`
- `Marketing`
- `Sales`
- `Education`
- `Engineering`

---

## 🧑‍💻 Developer Notes

- **CORS** is configured with `withCredentials: true` — ensure the backend allows the frontend origin explicitly (not `*`) when using cookies.
- **Profile completeness score** increases by `+20` for each of: `phone`, `skills`, `resume`, `education`, `experience`.
- **Redis (ioredis)** is available for caching frequent queries (e.g., job listings).
- **Cloudinary** handles file uploads for resume PDFs and company logos.

---

*Built with ❤️ by the JobSync team*
