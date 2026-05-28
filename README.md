# Dinna Michael — Personal Portfolio (Cloud Computing Assignment)

Personal portfolio website with video backgrounds, animations, frontend on **Vercel**, and backend API on **Render**.

## Sections (assignment requirements)

| Section | Location |
|---------|----------|
| Personal profile | Hero + About |
| Skills | Skills & Expertise |
| Qualifications | Qualifications |
| Projects | Featured Projects |
| Contact | Contact form + API |

## Project structure

```
PORTFOLIO/
├── frontend/          → Deploy to Vercel
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/videos/ → wall1.mp4 … wall7.mp4
├── backend/           → Deploy to Render
│   ├── server.js
│   └── package.json
└── vercel.json
```

## 1. Video backgrounds (done)

Videos are in `frontend/assets/videos/` (wall1.mp4 … wall7.mp4).
Original copies may remain in the project root; only the `frontend/assets/videos/` copies are deployed.

## 2. Run locally

**Frontend** (use Live Server extension, or):

```bash
cd frontend
npx serve .
```

**Backend:**

```bash
cd backend
npm install
npm start
```

Open `http://localhost:3000` (or your serve port). API runs at `http://localhost:5000`.

## 3. Deploy frontend — Vercel

1. Push this repo to **GitHub**.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import repo.
3. Set **Root Directory** to `frontend` OR keep root and use existing `vercel.json` (output: `frontend`).
4. Deploy. Copy your URL (e.g. `https://dinna-portfolio.vercel.app`).

## 4. Deploy backend — Render

1. Go to [render.com](https://render.com) → **New** → **Web Service**.
2. Connect the same GitHub repo.
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** add `FRONTEND_URL` = your Vercel URL
4. Deploy. Copy your Render URL (e.g. `https://dinna-portfolio-api.onrender.com`).

## 5. Connect frontend to backend

Edit `frontend/js/config.js` and replace:

```js
'https://YOUR-RENDER-APP-NAME.onrender.com'
```

with your actual Render URL. Redeploy on Vercel (or push to GitHub for auto-deploy).

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Portfolio profile JSON |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/messages` | List stored messages (demo) |

### POST /api/contact body

```json
{
  "name": "Visitor Name",
  "email": "visitor@email.com",
  "message": "Hello Dinna!"
}
```

## Contact

- **Name:** Dinna Michael
- **Phone:** 0764709993
- **Social handle:** dinna@170

## Assignment checklist

- [x] Frontend built (profile, skills, qualifications, projects, contact)
- [x] Frontend hosting ready (Vercel)
- [x] Simple backend API
- [x] Backend hosting ready (Render)
- [ ] Add wall1–wall7 videos to `frontend/assets/videos/`
- [ ] Deploy to Vercel + Render
- [ ] Update `config.js` with Render URL
