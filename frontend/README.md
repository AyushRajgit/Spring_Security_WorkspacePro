# FreshHire frontend

React and Vite frontend for the FreshHire Spring Boot API.

## Start the frontend

```sh
npm install
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:8080`. Set `VITE_BACKEND_URL` if the backend uses a different host or port. Set `VITE_API_BASE_URL` when the frontend should call a deployed API directly.

## Project structure

- `src/api/` — HTTP client and API calls for authentication and Fresh Hire records
- `src/components/` — shared UI such as icons, form fields, dialogs, and notifications
- `src/features/auth/` — sign-in and account registration screen
- `src/features/fresh-hires/` — directory dashboard, summary, hire dialogs, and display helpers
- `src/hooks/` — Fresh Hire data loading, filtering, and mutations
- `src/styles/` — dashboard, authentication, overlay, loading, and responsive styles
- `src/App.jsx` — application state and feature composition

Run `npm run build` to create the production bundle in `dist/`.
