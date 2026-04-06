# 🧠 Brainly Clone (Full Stack Q&A App)

A full-stack web application inspired by Brainly where users can create, share, and explore content. Built with modern technologies and clean architecture.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS (if used)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt for password hashing

---

## ✨ Features

- 🔐 User Authentication (Signup / Login)
- 📝 Create & manage content
- 🔗 Share content via unique links
- 🛡️ Secure APIs with JWT
- ⚡ Fast frontend with Vite
- 📦 Modular backend structure

---

## 📂 Project Structure
Brainly-App/
│
├── brainly/ # Backend
│ ├── src/
│ │ ├── validations/
│ │ ├── db.ts
│ │ ├── config.ts
│ │ └── index.ts
│
├── brainly-main-fe/ # Frontend
│ ├── src/
│ ├── public/
│ └── index.html
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/brainly-clone.git
cd brainly-clone

2️⃣ Backend Setup
cd brainly
npm install

Create a .env file:

MONGO_URL=your_mongodb_connection_string
JWT_PASSWORD=your_secret_key

Run backend:

npm run dev
3️⃣ Frontend Setup
cd brainly-main-fe
npm install
npm run dev