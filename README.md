# PARKEA — Smart Urban Parking Reservation System

### *Sistema Integral de Gestión de Movilidad Urbana Inteligente (SIGMUI)*

---

## Description

PARKEA is a web platform for regulated urban parking management. It allows users to browse parking zones, register their vehicles, make spot reservations and process simulated payments. Administrators can manage zones, users and view a metrics dashboard.

This project is developed as the final project for the **Software Analysis and Development (ADSO)** program at SENA, Group 003 – File 3231252.

---

## Scope

- Web and mobile responsive application
- Parking zone browsing with real-time availability
- Vehicle registration and management per user
- Spot reservation with date and time selection
- Simulated payment processing
- Administrative dashboard with zone and user management

**Out of scope:** Real banking gateway integration · Real-time GPS geolocation · Native mobile application

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Web Server | Nginx |
| Backend | Node.js + Express |
| Database | MySQL |
| Authentication | JWT — 1 hour expiration |
| Security | bcrypt password hashing |
| External APIs | Google Maps JavaScript API · Payment Gateway Simulator |

---

## Architecture

PARKEA is built on a **3-layer N-Tier architecture**:

```
┌─────────────────────────────────┐
│     Presentation Layer          │  React — Web & Mobile responsive
├─────────────────────────────────┤
│     Business Logic Layer        │  Node.js + Express · REST API · JWT · bcrypt
├─────────────────────────────────┤
│     Persistence Layer           │  MySQL · InnoDB · Foreign key constraints
└─────────────────────────────────┘
```

For full diagrams visit the [Wiki](https://github.com/ADSO-003/ADSO_3231252_003/wiki).

---

## Team

| Name | Role | GitHub |
|---|---|---|
| Michael Isaza | Scrum Master | [@MichaellIsaza](https://github.com/MichaellIsaza) |
| Jhoan Marín | Full Stack Developer | [@jhoanmarin227](https://github.com/jhoanmarin227) |
| Stiven Sánchez | Backend Developer | [@Stiven5-ctrl](https://github.com/Stiven5-ctrl) |
| David León | Frontend Developer | [@David-Leon1089](https://github.com/David-Leon1089) |
| Jhoan Almario | Analyst | [@johan_almario](https://github.com/johan_almario) |

---

## User Stories — Backlog

| ID | Name | Responsible | Branch |
|---|---|---|---|
| HU-01 | User Registration | Stiven | `feature/HU-01-user-registration` |
| HU-02 | Homepage | Stiven | `feature/HU-02-homepage` |
| HU-03 | Homepage — Citizen View | Stiven | `feature/HU-03-homepage-citizen` |
| HU-04 | Homepage — Admin View | Stiven | `feature/HU-04-homepage-admin` |
| HU-05 | User Login | Almario | `feature/HU-05-user-login` |
| HU-06 | Administrator Login | Almario | `feature/HU-06-admin-login` |
| HU-07 | Password Recovery | Almario | `feature/HU-07-password-recovery` |
| HU-08 | User Profile Management | Marín | `feature/HU-08-profile-management` |
| HU-09 | Browse Parking Zones | Marín | `feature/HU-09-browse-zones` |
| HU-10 | Register Vehicle | Isaza | `feature/HU-10-register-vehicle` |
| HU-11 | View My Registered Vehicles | Isaza | `feature/HU-11-view-vehicles` |
| HU-12 | Edit Vehicle Information | Isaza | `feature/HU-12-edit-vehicle` |
| HU-13 | Delete a Vehicle | Isaza | `feature/HU-13-delete-vehicle` |
| HU-14 | Reserve a Spot | Isaza | `feature/HU-14-reserve-spot` |
| HU-15 | View Reservation Confirmation | Isaza | `feature/HU-15-reservation-confirmation` |
| HU-16 | Cancel a Reservation | Marín | `feature/HU-16-cancel-reservation` |
| HU-17 | Simulated Payment | Almario | `feature/HU-17-simulated-payment` |
| HU-18 | View Booking History | Stiven | `feature/HU-18-booking-history` |
| HU-19 | Parking Zone Management | Stiven | `feature/HU-19-zone-management` |
| HU-20 | Create Zone | Stiven | `feature/HU-20-create-zone` |
| HU-21 | Edit Zone | Stiven | `feature/HU-21-edit-zone` |
| HU-22 | Administrative Dashboard | León | `feature/HU-22-admin-dashboard` |
| HU-23 | User Management (Admin) | León | `feature/HU-23-user-management` |

---

## Functional Requirements

| ID | Requirement |
|---|---|
| RF-01 | User registration and profile management |
| RF-02 | JWT authentication with role-based access control |
| RF-03 | Parking zone browsing and availability |
| RF-04 | Vehicle registration and management per user |
| RF-05 | Spot reservation with date, time and vehicle selection |
| RF-06 | Simulated payment processing |
| RF-07 | Reservation history and cancellation |
| RF-08 | Administrative panel — zones, users and dashboard |

---

## Non-Functional Requirements

| Category | Specification |
|---|---|
| **Security** | bcrypt password hashing · JWT 1h expiration · Role-based access |
| **Performance** | Response time under 3 seconds for 50 concurrent users |
| **Availability** | 95% uptime in local environment · Structured HTTP error handling |
| **Usability** | Fully responsive interface · WCAG 2.1 Level AA accessibility |

---

## Git Flow

| Branch | Purpose |
|---|---|
| `main` | Stable production version |
| `release` | Release preparation and testing |
| `develop` | Active team integration branch |
| `feature/*` | One branch per User Story |


---

## Documentation

Full documentation, UML diagrams, mockups and technical manual available in the **[Wiki](https://github.com/ADSO-003/ADSO_3231252_003/wiki)**.

---

## Project Management

- **Methodology:** Scrum with defined sprints
- **Version Control:** Git Flow
- **Instructors:** Yuely (Lead) · Sebastián
- **Program:** ADSO — SENA · File 3231252 · 2026
