# Debt Service Inc. — MERN Stack Website

Full-stack website with public frontend + admin panel.

---

## Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (mongoose)
- **Auth**: JWT (jsonwebtoken)
- **File Upload**: Multer
- **Email Notifications**: Nodemailer (Gmail)

---

## Quick Setup

### 1. MongoDB
Install MongoDB locally or use MongoDB Atlas (free cloud DB).
- Local: `mongodb://localhost:27017/debtservice`
- Atlas: Create account at mongodb.com/atlas

### 2. Server Setup
```bash
cd server
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Edit .env with your values

npm run dev
# Server runs on http://localhost:5000
```

### 3. Client Setup
```bash
cd client
npm install
npm run dev
# Website runs on http://localhost:5173
```

---

## Environment Variables (server/.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/debtservice
JWT_SECRET=any_random_long_string_here

CLIENT_URL=http://localhost:5173

# Gmail SMTP for email notifications
GMAIL_USER=yourname@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=navjot@youremail.com

# Admin login credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChangeThisPassword123!
```

### How to get Gmail App Password:
1. Go to myaccount.google.com
2. Security → 2-Step Verification → Enable
3. Search "App Passwords" → Create one for "Mail"
4. Copy the 16-character password into GMAIL_APP_PASSWORD

---

## Pages

### Public Website
| URL | Page |
|-----|------|
| / | Home (hero, stats, services, testimonials, blog preview) |
| /about | About Us |
| /services | All Services |
| /how-it-works | Process (4 steps) |
| /testimonials | Client Stories |
| /gallery | Photo Gallery (lightbox) |
| /blog | Blog Posts |
| /our-team | Team Members |
| /faq | FAQ (accordion) |
| /contact | Contact + Lead Form |

### Admin Panel
| URL | Section |
|-----|---------|
| /admin/login | Login |
| /admin | Dashboard (stats + recent leads) |
| /admin/leads | Manage leads (filter by status, edit, delete) |
| /admin/messages | Contact messages (inbox view) |
| /admin/gallery | Upload/manage gallery images |
| /admin/testimonials | Add/edit/delete testimonials |
| /admin/blog | Create/publish blog posts |
| /admin/team | Manage team members |
| /admin/services | Edit services |
| /admin/settings | Business info + Gmail config |

---

## Lead Status Flow
```
new → contacted → qualified → closed
```
Change from admin leads panel. Email notification sent on every new lead.

---

## Deployment (Production)

### Option 1: VPS (DigitalOcean/Hostinger)
```bash
# Server
pm2 start server/index.js --name debtservice-api

# Client — build and serve
cd client && npm run build
# Deploy dist/ folder to nginx or serve via express static
```

### Option 2: Separate hosting
- Frontend: Vercel or Netlify (connect /client folder)
- Backend: Railway, Render, or VPS
- Database: MongoDB Atlas

### Update vite.config.js for production:
```js
// Change proxy to point to your live server URL
proxy: {
  '/api': 'https://your-api-domain.com',
  '/uploads': 'https://your-api-domain.com',
}
```

---

## Theme Colors
- Navy Dark: `#0a1628`
- Crimson: `#c0392b`
- Gold: `#f0a500`
- All SVG icons — no emojis

## Design Inspiration
- www.farber.ca
- www.creditcanada.com
- Canada Consumer Credit Assistance Inc.
