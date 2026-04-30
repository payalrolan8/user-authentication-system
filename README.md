# User Authentication System

A full stack authentication system built with Node.js, Express, MongoDB Atlas, and deployed on Netlify using serverless functions. Built as part of an internship assignment.

## Live Demo
https://user-authentication-system-02.netlify.app/signup.html

## Screenshots

<img width="679" height="626" alt="Screenshot 2026-04-30 201445" src="https://github.com/user-attachments/assets/d3a3b6f7-1de3-42ae-9d5b-1dc3d50a2e47" />

<img width="567" height="477" alt="Screenshot 2026-04-30 201455" src="https://github.com/user-attachments/assets/10910363-9b74-4fc2-af1d-fbee3b95ce53" />

<img width="1893" height="714" alt="Screenshot 2026-04-30 201619" src="https://github.com/user-attachments/assets/905df201-ef56-48ac-8d09-003dbf25a2ab" />

<img width="1621" height="433" alt="Screenshot 2026-04-30 201626" src="https://github.com/user-attachments/assets/3f769a8c-0b12-40e1-b66b-e5887f23d96c" />

<img width="1413" height="533" alt="Screenshot 2026-04-30 201630" src="https://github.com/user-attachments/assets/375782cc-41b6-4107-a1ec-f6a9e72c1cf6" />

<img width="1312" height="228" alt="Screenshot 2026-04-30 201641" src="https://github.com/user-attachments/assets/c86f13f3-39d2-458f-844b-29438d8357ea" />


## What I built

A complete login/signup system where users can create an account, log in, and access a protected dashboard. Sessions are managed with JWT tokens stored in HTTP-only cookies. The backend runs as a Netlify serverless function.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT, bcrypt, cookie-parser |
| Validation | validator.js |
| Frontend | HTML, CSS |
| Deployment | Netlify (serverless functions) |

## Project Structure

```
user-authentication-system/
├── backend/
│   ├── netlify/
│   │   └── functions/
│   │       └── api.js        ← serverless backend
│   ├── public/
│   │   ├── signup.html
│   │   ├── login.html
│   │   └── dashboard.html
│   ├── User.js
│   └── .env
├── netlify.toml               ← routing config
└── package.json
```

## Features

- Signup with name, email, password
- Login with email and password
- Password hashing with bcrypt
- JWT stored in HTTP-only cookie
- Email format validation
- Password length validation
- Duplicate email check
- Protected dashboard with auth guard
- Logout clears cookie and redirects
- Serverless deployment on Netlify

## Environment Variables

| Variable | Description |
|----------|-------------|
| MONGO_URL | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for signing JWT |
| FRONTEND_URL | Your Netlify site URL |

## Run Locally

1. Clone the repo
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
FRONTEND_URL=http://localhost:3000
```

4. Start server
```
nodemon index.js
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /signup | Register new user |
| POST | /login | Login user |
| GET | /me | Check auth status |
| POST | /logout | Logout user |

