# CortexAI

Live demo: https://cortex-ai-uqk5.onrender.com

CortexAI is a production-deployed, multi-agent AI workspace for conversation, research, coding, document generation, image generation, and file analysis. It combines a React workspace with an Express service architecture, persistent conversations, authenticated sessions, usage credits, and downloadable artifacts.

## What It Does

- Google sign-in through Firebase Authentication.
- Persistent conversations with titles, message history, and session-aware access.
- Automatic agent routing or explicit agent selection from the chat composer.
- General AI chat with conversation memory and Markdown responses.
- Coding assistance for generation, debugging, review, explanation, optimization, conversion, and documentation.
- Current-information lookup through Tavily web search.
- PDF generation with downloadable S3-backed files.
- PowerPoint generation with downloadable presentation artifacts.
- Image generation with downloadable S3-backed files.
- Vision analysis for uploaded images.
- PDF question answering using text extraction, chunking, embeddings, Qdrant similarity search, and retrieval-augmented generation.
- Code artifacts with file tabs, syntax highlighting, copy support, and an in-app HTML preview.
- Browser speech input where the Web Speech API is available.
- Credit-based usage, per-agent rate limits, Razorpay plan upgrades, and payment signature verification.

## Architecture

```text
React + Vite frontend
          |
          v
Express gateway :8000
  |       |       |       |
 Auth   Chat    Agent   Billing
 :8001  :8002   :8003   :8004
  |       |       |       |
MongoDB  MongoDB MongoDB MongoDB
          Redis sessions, rate limits, and shared state

Agent service integrations:
Firebase Admin | Google Gemini | Groq | OpenRouter/DeepSeek
Tavily | Qdrant | AWS S3 | Pollinations image generation
```

The gateway is the public backend entrypoint. It applies CORS, security headers, request logging, cookie parsing, authentication checks, and service proxying. Authenticated requests carry the user identity to the chat, agent, and billing services through internal headers.

## Repository Layout

```text
.
├── backend/
│   ├── gateway/                 Public API gateway and authentication middleware
│   ├── services/
│   │   ├── auth/                Firebase token verification and user sessions
│   │   ├── chat/                Conversations and message persistence
│   │   ├── agent/               LangGraph router and specialist AI agents
│   │   └── billing/             Razorpay orders, verification, and plans
│   ├── shared/redis/             Shared Redis client
│   └── docker-compose.yml        Local Redis dependency
└── frontend/                     React/Vite client application
```

## Technology Stack

**Frontend:** React 19, Vite, React Router, Tailwind CSS, Framer Motion, Axios, Firebase client SDK, Monaco Editor, React Markdown, Lucide and React Icons.

**Backend:** Node.js, Express, MongoDB/Mongoose, Redis/ioredis, LangChain, LangGraph, Firebase Admin, Multer, PDFKit, PDF parsing, PptxGenJS, AWS SDK for S3, Razorpay, Tavily, and Qdrant.

## Prerequisites

- Node.js 20 or newer.
- npm.
- A MongoDB deployment.
- A Redis deployment.
- Firebase project with Google sign-in enabled.
- API credentials for the AI, search, vector, storage, and payment providers used by the enabled agents.

## Configuration

Environment files are intentionally ignored by Git. Create the variables in the service that consumes them, or provide them through your deployment platform.

### Frontend: `frontend/.env`

```env
VITE_SERVER_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_RAZORPAY_KEY=your_razorpay_public_key
```

The Firebase web configuration also contains the project-specific `authDomain`, `projectId`, storage bucket, messaging sender ID, and app ID in `frontend/firebase.js`.

### Gateway: `backend/gateway/.env`

```env
PORT=8000
FRONTEND_URL=http://localhost:5173
CLIENT_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
AUTH_SERVICE=http://localhost:8001
CHAT_SERVICE=http://localhost:8002
AGENT_SERVICE=http://localhost:8003
BILLING_SERVICE=http://localhost:8004
NODE_ENV=development
```

### Auth service: `backend/services/auth/.env`

```env
PORT=8001
MONGODB_URL=mongodb://localhost:27017/cortex-auth
REDIS_URL=redis://localhost:6379
FIREBASE_SERVICE_ACCOUNT_JSON={...}
NODE_ENV=development
```

`FIREBASE_SERVICE_ACCOUNT_JSON` should contain the Firebase Admin service-account JSON as a single environment value. Do not commit `serviceAccount.json` or any other credential file.

### Chat service: `backend/services/chat/.env`

```env
PORT=8002
MONGODB_URL=mongodb://localhost:27017/cortex-chat
```

### Agent service: `backend/services/agent/.env`

```env
PORT=8003
MONGODB_URL=mongodb://localhost:27017/cortex-agent
REDIS_URL=redis://localhost:6379
CHAT_SERVICE=http://localhost:8002
AUTH_SERVICE=http://localhost:8001
GOOGLE_API_KEY=your_google_ai_key
GROQ_API_KEY=your_groq_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
TAVILY_API_KEY=your_tavily_api_key
QDRANT_URL=https://your-qdrant-endpoint
QDRANT_API_KEY=your_qdrant_api_key
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket
```

The agent service uses Gemini for vision, Groq for chat/search/image prompt work, and OpenRouter with DeepSeek for coding and PDF RAG. Generated files are uploaded to S3 and returned as presigned URLs.

### Billing service: `backend/services/billing/.env`

```env
PORT=8004
MONGODB_URL=mongodb://localhost:27017/cortex-billing
AUTH_SERVICE=http://localhost:8001
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Local Development

### 1. Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install

cd gateway
npm install

cd ../services/auth
npm install

cd ../chat
npm install

cd ../agent
npm install

cd ../billing
npm install
```

### 2. Start Redis

From `backend/`:

```bash
npm run docker:up
```

This starts the Redis dependency on port `6379`. MongoDB and the external integrations must be reachable using the configured environment values.

### 3. Start the backend services

Run each service in its own terminal:

```bash
cd backend/gateway && npm run dev
cd backend/services/auth && npm run dev
cd backend/services/chat && npm run dev
cd backend/services/agent && npm run dev
cd backend/services/billing && npm run dev
```

The gateway is available at `http://localhost:8000`.

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

The Vite development server is normally available at `http://localhost:5173`.

## Production Commands

Frontend:

```bash
cd frontend
npm run build
npm run preview
```

Backend services:

```bash
npm start
```

Each backend service has its own `start` script. The gateway listens on port `8000` by default; auth, chat, agent, and billing default to `8001`, `8002`, `8003`, and `8004` respectively when deployed with those values.

## Docker Deployment

Dockerfiles are provided for the gateway and each backend service:

- `backend/gateway/Dockerfile`
- `backend/services/auth/Dockerfile`
- `backend/services/chat/Dockerfile`
- `backend/services/agent/Dockerfile`
- `backend/services/billing/Dockerfile`

Build and run each image with the appropriate service environment variables injected by the deployment platform. Redis is defined in `backend/docker-compose.yml` for local development; production deployments should use a managed Redis service or an equivalent durable, network-reachable Redis instance.

For a hosted deployment, expose only the gateway publicly, deploy the frontend separately as a static application, and configure `VITE_SERVER_URL` and the gateway CORS origins to use the deployed URLs. Keep MongoDB, Redis, internal service URLs, provider secrets, and Firebase Admin credentials private.

## HTTP API Surface

All routes below are reached through the gateway. Chat, agent, billing, and `/api/me` routes require the HTTP-only `session` cookie created at login.

| Route | Method | Purpose |
| --- | --- | --- |
| `/` | GET | Gateway health check |
| `/api/auth/login` | POST | Verify a Firebase ID token and create a Redis-backed session |
| `/api/auth/logout` | GET | Destroy the current session |
| `/api/me` | GET | Read the current authenticated user |
| `/api/chat/create-conversation` | POST | Create a conversation |
| `/api/chat/get-conversations` | GET | List the user’s conversations |
| `/api/chat/update-conversation` | POST | Rename a conversation |
| `/api/chat/get-messages/:id` | GET | Read conversation messages |
| `/api/agent/chat` | POST | Run an agent request, optionally with a PDF or image upload |
| `/api/billing/create-order` | POST | Create a Razorpay order for a plan |
| `/api/billing/verify-payment` | POST | Verify payment and grant plan credits |

## Plans and Usage

| Plan | Price | Credits | Validity |
| --- | ---: | ---: | ---: |
| Free | ₹0 | 100 | 30 days |
| Starter | ₹199 | 500 | 30 days |
| Pro | ₹499 | 1,000 | 30 days |

Default credit costs are 1 for chat, 5 for web search, and 10 for coding, PDF, PPT, and image generation. Agent rate limits are enforced through Redis and are scoped per user and agent.

## Security and Operational Notes

- Authentication begins with Firebase ID-token verification and continues through a Redis-backed, HTTP-only session cookie.
- Gateway-protected routes reject missing or expired sessions.
- CORS is restricted to configured frontend origins.
- Helmet and request logging are enabled on the gateway and billing service.
- Provider secrets and service-account credentials must be injected through environment variables or a secrets manager.
- S3 download links are presigned and temporary.
- Uploaded PDF and image files are removed from temporary storage after processing.
- Run `npm run lint` and `npm run build` from `frontend/` before publishing a frontend release.

## Frontend Quality Checks

```bash
cd frontend
npm run lint
npm run build
```