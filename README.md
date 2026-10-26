# StudySync — Task 6: Database + Authentication

A complete, production-ready, full-stack student task & study planner web application built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **MongoDB (Mongoose)**.

---

## 🌟 Key Features

### 1. Robust Authentication & Session Management
- **User Registration (`/signup`)**: Form validation (Name, Email, Password), checks for existing accounts, hashes passwords with `bcryptjs` (12 salt rounds), and creates records in the MongoDB `users` collection.
- **User Login (`/login`)**: Verifies credentials securely, issues cryptographically signed JSON Web Tokens (JWT), and attaches an `httpOnly`, `secure`, `sameSite: 'lax'` session cookie.
- **Session Verification (`/api/auth/me`)**: Validates current session status on client mounts to hydrate user profiles.
- **User Logout (`/api/auth/logout`)**: Safely invalidates the cookie session and redirects the user to `/login`.
- **Protected Routing (`middleware.js`)**: Server-side Edge middleware intercepts unauthorized requests to `/dashboard` and redirects unauthenticated users to `/login?from=/dashboard`. Authenticated users visiting `/login` or `/signup` are automatically forwarded to `/dashboard`.

### 2. Complete CRUD Operations (MongoDB Persistence)
- **Collection: `tasks`** with user reference (`userId` indexed for fast, isolated queries).
- **Create (C)**: Add new study tasks with title, description, category, priority, status, and due date.
- **Read (R)**: Real-time retrieval of tasks strictly isolated to the authenticated student (`{ userId: authUser.userId }`).
- **Update (U)**: In-place modal editor for full updates and one-click instant toggling between completed and pending states.
- **Delete (D)**: Safe delete workflow triggered via `DeleteConfirmModal` with deletion confirmation before permanent removal from MongoDB.

### 3. Modern Academic SaaS Dashboard & Asynchronous States
- **Real-Time Metrics Summary**:
  - Total Tasks counter
  - Completed Tasks with visual completion percentage progress bar
  - Pending & In-Progress workload tracker
  - Urgent & High Priority alert count
- **Multi-Filter & Instant Search**:
  - Live query search across task title, description, and academic subject
  - Status tabs: *All Tasks*, *Pending*, *In Progress*, *Completed*
  - Category filter dropdown (*Coursework*, *Assignment*, *Exam Prep*, *Project*, *Reading*, *Personal*)
  - Priority filter dropdown (*Low*, *Medium*, *High*, *Urgent*)
- **Asynchronous States**:
  - Animated skeleton pulse placeholders while loading data
  - Error alert banners with one-click "Retry Connection" buttons
  - Clean empty-state illustrations with quick-action creation prompts
  - Overdue date indicators for overdue incomplete assignments

---

## 📁 Project Structure

```
task-6-auth-crud/
├── lib/
│   ├── mongodb.js             # Cached MongoDB connection utility (Mongoose)
│   └── auth.js                # JWT sign, verify, and auth helper utilities
├── models/
│   ├── User.js                # User Mongoose Schema
│   └── Task.js                # Task Mongoose Schema (with userId reference)
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.js # Validates, hashes, stores user & sets cookie
│   │   │   ├── login/route.js  # Verifies credentials & sets JWT cookie
│   │   │   ├── logout/route.js # Clears session cookie
│   │   │   └── me/route.js     # Returns authenticated user profile
│   │   └── tasks/
│   │       ├── route.js       # GET (user tasks) & POST (create task)
│   │       └── [id]/route.js  # PUT (update) & DELETE (remove task)
│   ├── (auth)/
│   │   ├── login/page.jsx     # Login form page
│   │   └── signup/page.jsx    # Signup registration page
│   ├── dashboard/
│   │   └── page.jsx           # Protected interactive CRUD dashboard
│   ├── layout.jsx             # Global HTML shell & metadata
│   ├── page.jsx               # Landing page with navigation & overview
│   └── globals.css            # Tailwind directives & dark-slate theme styles
├── components/
│   ├── Navbar.jsx             # Brand logo, profile indicator, & logout button
│   ├── TaskCard.jsx           # Interactive task card with badges & actions
│   ├── TaskModal.jsx          # Accessible Create / Edit task modal
│   ├── LoadingSkeleton.jsx    # Pulse skeletons for dashboard loading states
│   └── DeleteConfirmModal.jsx # Confirmation dialog before deleting from DB
├── middleware.js              # Next.js route protection & redirect middleware
├── .env.example               # Environment variables template
├── .env.local                 # Local environment configuration
├── package.json               # Project dependencies and npm scripts
└── README.md                  # Comprehensive setup and API documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.0+ (Tested on Node v22.x)
- **MongoDB**: Either a local MongoDB instance running on `mongodb://127.0.0.1:27017` or a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string.

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Environment Configuration
Verify or create your `.env.local` file in the project root:
```env
# MongoDB Connection String (Local instance or MongoDB Atlas URI)
MONGODB_URI=mongodb://127.0.0.1:27017/student_planner

# Secure JWT Secret for token signing
JWT_SECRET=super_secret_jwt_key_student_planner_2026_secure_key

# Node Environment
NODE_ENV=development
```

> **Note for MongoDB Atlas:** Replace the `MONGODB_URI` with your connection string:
> `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/student_planner?retryWrites=true&w=majority`

### 3. Run Development Server
Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📡 API Reference

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Registers new user, hashes password, sets auth cookie | No |
| `POST` | `/api/auth/login` | Validates credentials, issues JWT token in cookie | No |
| `POST` | `/api/auth/logout` | Clears `auth_token` cookie | Yes |
| `GET` | `/api/auth/me` | Returns logged-in user profile (`id`, `name`, `email`) | Yes |

### Task Endpoints (Strict User-Isolated)

| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| `GET` | `/api/tasks` | `search`, `status`, `priority` | Returns only the authenticated user's tasks |
| `POST` | `/api/tasks` | - | Creates a new task linked to current `userId` |
| `PUT` | `/api/tasks/[id]` | - | Updates a specific task (verifies ownership) |
| `DELETE` | `/api/tasks/[id]` | - | Deletes task permanently from MongoDB |

---

## 🔒 Security Architecture

1. **Password Safety**: Passwords are never stored in plain text. Hashed using `bcryptjs` with salt round factor 12.
2. **Token Security**: Tokens are signed with `jose` using HS256 and stored in an `httpOnly`, `sameSite: 'lax'` cookie that cannot be accessed by client-side JavaScript (mitigating XSS session theft).
3. **Data Isolation**: All MongoDB queries for tasks enforce `{ userId: authUser.userId }`, preventing any user from reading or modifying another student's coursework.
4. **Edge Route Protection**: Unauthenticated users navigating to `/dashboard` are redirected before page render occurs.
