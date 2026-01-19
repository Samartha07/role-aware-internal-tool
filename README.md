 Role-Aware Internal Tool Platform

A **production-style internal tool** built from scratch with **authentication, role-based access control, audit logging, a real UI, and Dockerized deployment**.

This project simulates how **real companies build internal dashboards**, not tutorial CRUD apps.

---
** Features

Authentication & Security**

* Secure user signup with **hashed passwords**
* **JWT-based authentication**
* Protected API routes
* Environment-based secrets management

 **Role-Based Access Control (RBAC)**

* Roles: **Admin, Manager, User**
* Fine-grained access control
* Middleware-driven authorization
* Proper HTTP status handling (`401`, `403`)

** Audit Logging**

* Automatic logging of sensitive actions
* Tracks:

  * Who performed the action
  * Role at the time
  * Action type
  * Timestamp
* Admin-only audit log access
* Fully visible in UI

**Real, Proper UI, Entry level**

* Plain **HTML, CSS, Vanilla JavaScript**
* Clean internal-dashboard style
* Frontend ↔ Backend via Fetch API
* JWT stored in browser securely
* Role-aware UI behavior

**DevOps Ready**

* Fully **Dockerized**
* One-command startup
* Environment-agnostic deployment
* Clean `.dockerignore` and env handling

---

** Tech Stack**

### Backend

* **Node.js**
* **Express.js**
* **Sequelize ORM**
* **SQLite** (for demo & interviews)
* **JWT (jsonwebtoken)**
* **bcrypt**

### Frontend

* HTML
* CSS
* Vanilla JavaScript
* Fetch API

### DevOps

* Docker
* Dockerfile + .dockerignore
* Environment variables

---

##  Project Structure

```
src/
 ├── app.js
 ├── models/
 │    ├── User.js
 │    └── AuditLog.js
 ├── middleware/
 │    ├── auth.js
 │    ├── role.js
 │    └── audit.js
 ├── database/
 │    └── sequelize.js
 └── public/
      ├── index.html        (Login)
      ├── dashboard.html
      ├── admin.html
      ├── manager.html
      ├── audit.html
      ├── css/
      │    └── style.css
      └── js/
           ├── login.js
           ├── auth.js
           ├── dashboard.js
           └── audit.js
```

---

##  Setup & Installation (Local)

### 1️ Clone the repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2️ Install dependencies

```bash
npm install
```

### 3️ Create `.env`

```env
JWT_SECRET=your_super_secret_key
```

### 4️ Run the app

```bash
node src/app.js
```

Open:

```
http://localhost:3000
```

---

##  Run with Docker (Recommended)

### 1️ Build image

```bash
docker build -t internal-tool-app .
```

### 2️ Run container

```bash
docker run -p 3000:3000 --env-file .env internal-tool-app
```

Open:

```
http://localhost:3000
```

⚠️ **Note:** SQLite database is container-local.
Create users again when switching environments (expected behavior).

---

## 🔑 API Endpoints Overview

| Method | Endpoint       | Access          |
| ------ | -------------- | --------------- |
| POST   | `/create-user` | Public          |
| POST   | `/login`       | Public          |
| GET    | `/dashboard`   | Authenticated   |
| GET    | `/admin`       | Admin only      |
| GET    | `/manager`     | Admin / Manager |
| GET    | `/audit-logs`  | Admin only      |

---

##  What I Learned

* Designing secure backend systems
* Middleware-based authorization
* Debugging real frontend ↔ backend issues
* DevOps fundamentals with Docker
* Building *usable* internal tools, not demos

---

##  Future Enhancements

* External database (PostgreSQL)
* Token refresh & session management
* UI role-based rendering
* CI/CD with GitHub Actions
* Deployment to cloud (AWS / Render)

---

##  Author

**Samartha**
AI & ML Engineering student 
