<div align="center">

# PARKEA — Smart Parking Reservation System

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-Academic-blue)

</div>

---

## 🚀 Description

**PARKEA** is a web and mobile platform for regulated urban parking management, featuring spot reservations, simulated payments, and zone administration.

The system allows:
- User registration and JWT authentication
- Vehicle management per user account
- Parking zone browsing and spot reservation
- Simulated payment processing
- Administrative panel with dashboard and user management

Does **NOT** include:
- Real banking payment gateway
- Real-time GPS geolocation
- Native mobile application (responsive web only)

---

## 🏗️ Architecture

Client-Server N-Tier Architecture:

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript |
| Backend | Node.js — REST API |
| Database | PostgreSQL |
| Authentication | JWT |

---

## 🌱 Branch Strategy

- main       → Final delivery
- release    → Stable pre-delivery versions
- develop    → Team integration branch
- feature/*  → One branch per User Story

---

## 📂 Project Structure

```
PARKEA/
├── backend/src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middlewares/
├── frontend/
│   ├── css/global.css
│   ├── js/utils/
│   └── pages/
│       ├── HU01-Homepage/
│       └── ... (one folder per HU)
├── database/schema.sql
├── docs/mockups/
└── README.md
```

---

## 🎨 Design — Figma

[View mockups in Figma](https://www.figma.com/design/SD51rDFRFIsGMBIgsyi4Pc/mockups?node-id=2-39&p=f&t=wxPCu28dAiXRWzSL-0)

---

## 👥 Development Team

| Name | Role | GitHub |
|------|------|--------|
| Michael Isaza | Scrum Master | [@MichaelIsaza](https://github.com/MichaelIsaza) |
| Jhoan Marín | Full Stack Developer | [@jhoanmarin227](https://github.com/jhoanmarin227) |
| Stiven Sánchez | Backend Developer | [@Stiven5-ctrl](https://github.com/Stiven5-ctrl) |
| David León | Frontend Developer | [@David-Leon1089](https://github.com/David-Leon1089) |
| Jhoan Almario | Analyst | [@centinel117](https://github.com/centinel117) |

---

## 🛠️ Installation

```bash
git clone https://github.com/ADSO-003/ADSO_3231252_003.git
cd ADSO_3231252_003

# Open any page directly in browser:
# frontend/pages/HU01-Homepage/index.html
```

---

## 📚 Documentation

Full documentation available on the project **[Wiki](../../wiki)**.

---

## 🎓 Academic Context

**Program:** ADSO – SENA · **Ficha:** 3231252 · **Group:** 003 · **Year:** 2026
