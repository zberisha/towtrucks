# Client (React + Vite)

## How to run the project

From the 'client' folder:

npm install
npm run dev

The app usually opens at 'http://localhost:5173' (Vite prints the URL in the terminal).

Other commands:

- 'npm run build' — production build
- 'npm run preview' — serve the production build locally for testing

---

## Routes

| Path | What it does |
|------|----------------|
| '/' and any other unmatched path (`*`) | Home page with map (Leaflet) — shows tow trucks. |
| '/register' | User registration (only when logged out). |
| '/login' | Login (only when logged out). |
| '/logout' | Log out. |
| '/add' | Add a tow truck (requires a logged-in user). |
| '/list/:id' | Tow trucks list for a user (`:id` = user id); requires login. |
| '/admin' | Admin dashboard (requires admin role). |
