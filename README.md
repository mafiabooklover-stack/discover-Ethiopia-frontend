<<<<<<< HEAD
# Discover Ethiopia

**Name:** Melat Akalewerk

**What this website does:** A full-stack travel guide website where users can browse, search, and view detailed information about Ethiopian tourist destinations — including historical sites, natural wonders, and cultural experiences — with an interactive map for each place, user authentication, and an admin panel to add new destinations.

**Backend language:** Node.js (Express.js) with MongoDB

**How to run it:**

```bash
# 1. Start MongoDB (if not already running)
brew services start mongodb-community

# 2. Install backend dependencies
cd backend
npm install

# 3. Seed the database with the 18 starter destinations
node seed.js

# 4. Start the backend server
node server.js
```

Then open `index.html` in your browser (or use a local server like VS Code Live Server).

The backend runs on **http://localhost:5001**

---

## Project Structure

```
Discover Ethiopia/
├── index.html          ← Home page with hero slideshow + featured destinations
├── destinations.html   ← All 18+ destinations, organized by category
├── place.html          ← Detail page for each destination with map
├── admin.html          ← Admin panel: add and delete destinations (login required)
├── login.html          ← User login page
├── register.html       ← User registration page
├── contact.html        ← Contact page with demo form
│
├── css/
│   └── style.css       ← All styles and layouts
│
├── js/
│   ├── script.js       ← Frontend JS: loads destinations from API, renders cards
│   └── auth.js         ← Shared auth helpers: login, logout, nav rendering
│
├── assets/             ← All destination images (19 photos)
│
└── backend/
    ├── server.js       ← Express server (port 5001)
    ├── seed.js         ← Seeds the database with 18 destinations
    ├── models/
    │   ├── User.js         ← Mongoose user model (bcrypt password hashing)
    │   └── Destination.js  ← Mongoose destination model
    ├── routes/
    │   ├── auth.js         ← POST /api/auth/register, POST /api/auth/login
    │   └── destinations.js ← GET /api/destinations, GET /api/destinations/featured,
    │                          GET /api/destinations/:id, POST /api/destinations,
    │                          DELETE /api/destinations/:id
    └── middleware/
        └── auth.js         ← JWT verification middleware
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/destinations | No | Get all destinations |
| GET | /api/destinations/featured | No | Get 1 from each category |
| GET | /api/destinations/:id | No | Get single destination |
| POST | /api/destinations | Yes | Add new destination |
| DELETE | /api/destinations/:id | Yes | Delete destination |
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login, returns JWT token |
| GET | /api/auth/me | Yes | Get current user info |

## Features

- Hero section with auto-playing slideshow of all destination images
- Browse all 18 destinations organized by Historical, Natural, and Cultural categories
- Click any destination card to see a full detail page with description and OpenStreetMap map
- Register and login with JWT authentication
- Admin panel (login required): add new destinations, delete existing ones — list updates instantly without page refresh
- Data persists in MongoDB (survives server restarts)
- Responsive design for mobile and desktop
=======
# discover-Ethiopia-frontend
>>>>>>> cac6a8d1155432cb62c1b636292f8cc7db20b528
