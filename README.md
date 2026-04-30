# User Authentication System

A simple full stack auth system I built to learn backend development with Node.js and MongoDB.

## What it does

Users can sign up, log in, and access a protected dashboard. Passwords are hashed and sessions are managed with JWT cookies. If you try to access the dashboard without logging in, it redirects you to login.

## Screenshots

<img width="1413" height="533" alt="Screenshot 2026-04-30 201630" src="https://github.com/user-attachments/assets/375782cc-41b6-4107-a1ec-f6a9e72c1cf6" />
<img width="1621" height="433" alt="Screenshot 2026-04-30 201626" src="https://github.com/user-attachments/assets/3f769a8c-0b12-40e1-b66b-e5887f23d96c" />
<img width="1893" height="714" alt="Screenshot 2026-04-30 201619" src="https://github.com/user-attachments/assets/905df201-ef56-48ac-8d09-003dbf25a2ab" />
<img width="1621" height="433" alt="Screenshot 2026-04-30 201626" src="https://github.com/user-attachments/assets/58bdd381-df08-484d-9bc5-f1155f553109" />
<img width="631" height="694" alt="Screenshot 2026-04-30 201524" src="https://github.com/user-attachments/assets/5e748978-60b4-479b-861d-d6c0325d318f" />
<img width="567" height="477" alt="Screenshot 2026-04-30 201455" src="https://github.com/user-attachments/assets/10910363-9b74-4fc2-af1d-fbee3b95ce53" />
<img width="679" height="626" alt="Screenshot 2026-04-30 201445" src="https://github.com/user-attachments/assets/d3a3b6f7-1de3-42ae-9d5b-1dc3d50a2e47" />
<img width="1312" height="228" alt="Screenshot 2026-04-30 201641" src="https://github.com/user-attachments/assets/c86f13f3-39d2-458f-844b-29438d8357ea" />



## Tech used

- Node.js + Express
- MongoDB Atlas + Mongoose
- bcrypt for password hashing
- JWT + cookie-parser for sessions
- validator.js for email validation
- HTML + CSS for frontend

## Project Structure

```
user-authentication-system/
├── backend/
│   ├── index.js
│   ├── User.js
│   ├── dashboard.html
│   ├── public/
│   │   ├── signup.html
│   │   └── login.html
│   └── .env
```

## Run locally

1. Clone the repo and go to backend folder
```
git clone https://github.com/payalrolan8/user-authentication-system.git
cd backend
```

2. Install packages
```
npm install
```

3. Create `.env` file
```
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret
```

4. Start the server
```
nodemon index.js
```

5. Open `http://localhost:3000`

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /signup | Register new user |
| POST | /login | Login user |
| GET | /dashboard | Protected — needs login |
| POST | /logout | Logout and clear cookie |

## Packages

```
npm install express mongoose bcrypt jsonwebtoken validator cors dotenv cookie-parser
```
