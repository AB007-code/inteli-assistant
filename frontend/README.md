# Document Intelligence & Knowledge Search Hub – Frontend

This is the frontend application for the Document Intelligence and Knowledge Search Hub.  
It allows users to upload documents, view uploaded files, and interact with an AI chat interface that answers questions strictly based on uploaded documents.

---

## 🚀 Features

- User Signup & Login
- Clean navigation with conditional auth buttons
- Document upload with clear visual upload area
- Dashboard with clickable document list
- Secure document preview in a new tab
- ChatGPT-style conversational UI
- Inline chat history (no separate history page)
- AI response loading state (Thinking…)
- Document-backed answers with selective references
- Responsive and clean Tailwind CSS design

---

## 🛠 Tech Stack

- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

---

## 📁 Project Structure

---

# 📘 Frontend README (`frontend/README.md`)

```md
# Document Intelligence & Knowledge Search Hub – Frontend

This is the frontend application for the Document Intelligence and Knowledge Search Hub.  
It allows users to upload documents, view uploaded files, and interact with an AI chat interface that answers questions strictly based on uploaded documents.

---

## 🚀 Features

- User Signup & Login
- Clean navigation with conditional auth buttons
- Document upload with clear visual upload area
- Dashboard with clickable document list
- Secure document preview in a new tab
- ChatGPT-style conversational UI
- Inline chat history (no separate history page)
- AI response loading state (Thinking…)
- Document-backed answers with selective references
- Responsive and clean Tailwind CSS design

---

## 🛠 Tech Stack

- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

---

## 📁 Project Structure

frontend/
├── src/
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Dashboard.jsx
│ │ ├── Chat.jsx
│ │ ├── History.jsx  
│ │ ├── Login.jsx
│ │ └── Signup.jsx
│ ├── components/
│ │ ├── Navbar.jsx
│ │ └── ProtectedRoute.jsx
│ ├── services/
│ │ └── api.js
│ ├── utils/
│ │ └── auth.js  
│ ├── App.jsx
│ └── main.jsx
├── index.html
└── vite.config.js

# ▶️ Run the Frontend

npm install
npm run dev

# Run in browser

http://localhost:5173/

# API Configuration

baseURL: "http://localhost:5000/api"
JWT token is stored in localStorage and attached to each request automatically.

# 💬 Chat Behavior

- User input is disabled while AI is responding
- A temporary “Thinking…” message is shown
- Previous chats are loaded on page revisit
- Follow-up questions work using conversation memory
- References are displayed only for relevant documents

# 🧪 Sample User Flow

- Signup / Login
- Upload PDF or TXT document
- View uploaded documents in Dashboard
- Click document to open in a new tab
- Ask questions in Chat page
- Receive AI answers with document references
```
