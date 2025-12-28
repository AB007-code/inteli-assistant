# Document Intelligence & Knowledge Search Hub – Backend

This is the backend service for the Document Intelligence and Knowledge Search Hub application.  
It is built using Node.js, Express, MongoDB, and integrates Google Gemini (2.5 Flash) for AI-powered, document-grounded question answering using a RAG (Retrieval Augmented Generation) approach.

---

## 🚀 Features

- User authentication (Signup & Login with JWT)
- Secure document upload (PDF & TXT)
- Text extraction from documents
- Storage of document content in MongoDB
- High-level RAG implementation (Retrieve → Generate → Cite)
- Conversational AI with chat history memory
- Strict document-only answers (no hallucinations)
- Selective and relevant references for every answer
- Secure document preview in a new browser tab
- Chat history persistence per user

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload)
- pdf-parse (PDF text extraction)
- Google Gemini 2.5 Flash API

---

## 📁 Project Structure

backend/
├── controllers/
│ ├── authController.js
│ ├── documentController.js
│ └── chatController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ ├── Document.js
│ └── QueryHistory.js
├── routes/
│ ├── authRoutes.js
│ ├── documentRoutes.js
│ └── chatRoutes.js
├── utils/
│ └── gemini.js
├── uploads/
├── index.js
└── .env

# .env file

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- GEMINI_API_KEY=your_google_gemini_api_key

# Install dependences and Run the Backend

npm install
node index.js
npm run dev

# 📡 API Routes

# Auth

POST /api/auth/signup
POST /api/auth/login

# Documents

POST /api/documents/upload
GET /api/documents
GET /api/documents/:id/view?token=JWT_TOKEN

# Chat

POST /api/chat/ask
GET /api/chat/history

# 🧠 RAG Implementation (High Level)

- Retrieve relevant documents using keyword-based filtering
- Combine document context with recent chat memory
- Send only relevant context to Gemini
- Force Gemini to declare used documents
- Filter references strictly based on AI-declared sources
- This guarantees grounded answers with accurate references.

# 🔒 Security Notes

- JWT is required for all protected APIs
- Document preview uses token-based secure URLs
- Users can only access their own documents & chats
