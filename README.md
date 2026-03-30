# 🧩 Task Manager – Full Stack Application

## 📌 Overview

This project is a full-stack Task Manager application built using **Spring Boot (backend)** and **React.js (frontend)**. It demonstrates secure API development with **JWT authentication**, **role-based access control**, and a clean UI for interacting with backend services.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration & Login APIs
* JWT-based authentication
* Password hashing using BCrypt
* Stateless session management

### 👥 Role-Based Access Control

* Supports two roles: `ROLE_USER` and `ROLE_ADMIN`
* Admin-only endpoints protected using Spring Security

### 📋 Task Management

* Create, Read, Update, Delete (CRUD) tasks
* Secure endpoints using JWT token
* Task fields: title, description, status

### ✅ Validation & Error Handling

* Input validation using annotations (`@Valid`, `@Email`, `@NotBlank`)
* Global exception handling using `@RestControllerAdvice`

### 📄 API Documentation

* Swagger UI available at:
  http://localhost:8080/swagger-ui/index.html

### 🌐 Frontend

* Built using React.js
* Features:

  * Register & Login
  * JWT token storage (localStorage)
  * Task dashboard
  * Admin access testing
* Communicates with backend via REST APIs

---

## ⚙️ Tech Stack

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* PostgreSQL
* JWT (io.jsonwebtoken)

### Frontend

* React.js
* Fetch / Axios
* Basic CSS / Tailwind (optional)

---

## ▶️ How to Run

### 🔧 Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:8081
```

---

## 🔐 API Endpoints

### Auth APIs

* POST `/api/v1/auth/register`
* POST `/api/v1/auth/login`

### Task APIs

* GET `/api/v1/tasks`
* POST `/api/v1/tasks`

### Admin APIs

* GET `/api/v1/tasks/admin/test`

---

## 📸 Screenshots

### 🔐 Registration Page

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e90ca080-d4fd-413e-aa7a-b9ae943abeb5" />


### 🔑 Login & JWT Token

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/84ec5bd2-836e-49d2-9dc4-242a6fd4d050" />


### 📋 Task Dashboard

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/71e9121c-248e-460c-b77d-30887b4b84c2" />


### 📄 Swagger Documentation

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6b311c86-4cc5-4420-9484-24594af3de29" />


---

## 📈 Scalability Considerations

* Microservices architecture for independent services
* Redis caching for faster API responses
* Load balancing using Nginx or cloud services
* Stateless authentication using JWT
* Database indexing for optimized queries
* Containerization using Docker (optional)

---

## 🧠 Key Learnings

* Implemented secure authentication using JWT
* Designed role-based authorization using Spring Security
* Integrated frontend with protected backend APIs
* Handled CORS and real-world API communication issues
* Built modular and scalable backend architecture

---

## 👨‍💻 Author

Vinytha S V
