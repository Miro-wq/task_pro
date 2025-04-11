# TaskPro

TaskPro is a Trello-inspired task management application built with **React.js** and **MongoDB**. It offers user authentication, board creation, and a drag-and-drop-like experience for managing tasks across three default columns: **To Do**, **In Progress**, and **Done**.

---

## **Key Features**
 ### 1. User Authentication

- **Register** new users
- **Login** with short-lived access tokens and refresh tokens
- **Protected routes** for board and task operations

### 2. Board & Columns

- Create new boards with default columns: **To Do**, **In Progress**, **Done**
- Edit board details (name, icon, background)
- Add or remove custom columns if needed

### 3. Tasks

- Create tasks under specific columns
- Edit, move, or delete tasks
- Assign priority levels (low, medium, high, etc.) with color indicators
- Set due dates using a custom calendar component

### 4. Responsive UI

- Built with CSS Modules and Media Queries for various screen sizes
- A hamburger menu hides the sidebar on smaller devices
  
### Help Modal

- A user can send help requests via a SendGrid-integrated form
- Automatically sends an email to the project’s support address
  
## **Technologies Used**

### Frontend

- React.js (functional components, hooks)
- React Router for routing
- Formik and Yup for form handling and validation
- CSS Modules for scoped styling
- Axios or Fetch for HTTP requests
- Swagger UI for API documentation

### Backend

- Node.js with Express
- MongoDB with Mongoose for data persistence
- JSON Web Tokens (JWT) for authentication and refresh tokens
- SendGrid for sending emails
  
### Other

- Framer Motion for small animations
- Swagger for documenting API endpoints

## **Configure environment**

Backend: In the backend/.env file, set up:
```bash
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=verified_email@domain.com
```
Frontend: If using a proxy, add `"proxy": "http://localhost:5000"` in `package.json`.

The backend runs at `http://localhost:5000` and the frontend at `http://localhost:3000`.

## **API Documentation**

Swagger-based API documentation is available at:
```bash
http://localhost:5000/api-docs
```

This includes routes for:

Auth (`/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/me`, etc.)
Boards (`/boards/create`, etc.)
Columns and Tasks
Help (`/help/send` via SendGrid)

## **Project Structure**
```plaintext
taskpro/
 ┣ backend/
 ┃ ┣ controllers/
 ┃ ┣ models/
 ┃ ┣ routes/
 ┃ ┣ .env
 ┃ ┗ server.js
 ┣ frontend/
 ┃ ┣ src/
 ┃ ┃ ┣ components/
 ┃ ┃ ┣ pages/
 ┃ ┃ ┣ context/
 ┃ ┃ ┗ App.js
 ┃ ┗ package.json
 ┗ README.md
```
