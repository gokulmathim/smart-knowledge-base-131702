# Integration & E2E Flow Guide

## 1. Environment Variables
- `MYSQL_URL`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DB`, `MYSQL_PORT`: MySQL credentials for Sequelize ORM.
- `PORT`, `HOST`: Express server listening address.
- `JWT_SECRET`: Secret for JWT authentication in backend.
- `FRONTEND_URL`: The allowed CORS origin. **Set this to your frontend dev or deployed origin (e.g. `http://localhost:4200`).**

## 2. CORS
- CORS is enabled in `src/app.js` using `FRONTEND_URL` (defaults to `*` for development).

## 3. Frontend → Backend API calls
- The Angular frontend should make requests to the backend API using the base URL `${BACKEND_API_URL}` that matches the backend's address (`http://localhost:3001` or deployed version).
- Endpoints: `/faqs`, `/articles`, `/ai-search`, `/auth`, `/profile`, etc.

## 4. Common E2E Test Flow
1. Frontend UI calls (e.g.) `POST /auth/login`, receives JWT and uses JWT in `Authorization` header for authenticated API requests.
2. Authenticated calls create/read/update knowledge base entries (e.g. `POST /faqs`).
3. Backend processes request, interacts with MySQL via Sequelize, and returns data to frontend.
4. **To test full E2E flow:** Register a user, login, submit a question, query AI search, check FAQ CRUD, verify DB reflects changes.

## 5. Frontend Setup
- The frontend (Angular) must be configured with a runtime variable holding the backend API base URL.
- When deploying, ensure the backend `FRONTEND_URL` matches the frontend's deployment origin.

>>>>>>> REPLACE
