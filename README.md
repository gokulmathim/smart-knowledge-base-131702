# Project Repository

This is the initial README file for the project.

## Integration Notes

- To enable correct CORS for Angular frontend, set `FRONTEND_URL=http://localhost:4200` (or deployed URL) in the backend `.env` file.
- All MySQL connection parameters are configured via environment variables. See `.env.example` in `knowledge_base_backend`.

## E2E API Access

The backend exposes `/docs` for Swagger. Update `FRONTEND_URL` to the frontend's dev or deployed URL for secure cross-origin requests.