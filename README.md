<div align="center">

# SIGMUI
### Intelligent Urban Mobility Management System
### *Sistema Integral de Gestión de Movilidad Urbana Inteligente*

</div>

---

## 📋 Description

SIGMUI is a web/mobile platform integrated with WhatsApp for the management of regulated urban parking. It allows users to make reservations, process simulated payments, and manage parking zones through an intuitive interface.

This project is developed as the final project for the **Software Analysis and Development (ADSO)** program at SENA, Group 003 – File 3231252.

---

## 🎯 Scope

- ✅ Web and mobile application
- ✅ WhatsApp integration
- ✅ Parking zone management
- ✅ Slot reservations
- ✅ Simulated payment processing
- ✅ Administrative dashboard

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React / Angular |
| Backend | Node.js / Python |
| Database | PostgreSQL / MySQL |
| Authentication | JWT (JSON Web Tokens) |
| Security | bcrypt |
| Containers | Docker |
| External APIs | Google Maps API, Payment Gateway Simulator |

---

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| Michael Isaza | Scrum Master | [@MichaellIsaza](https://github.com/MichaellIsaza) |
| Jhoan Marín | Full Stack Developer | [@jhoanmarin227](https://github.com/jhoanmarin227) |
| Stiven Sánchez | Backend Developer | [@Stiven5-ctrl](https://github.com/Stiven5-ctrl) |
| David León | Frontend Developer | [@David-Leon1089](https://github.com/David-Leon1089) |
| Jhoan Almario | Analyst | [@johan_almario](https://github.com/johan_almario) |

---

## 🏗️ Architecture

SIGMUI is built on a **3-layer N-Tier architecture**:
```
┌─────────────────────────────────┐
│     Presentation Layer          │  React / Angular (Web & Mobile)
├─────────────────────────────────┤
│     Business Logic Layer        │  REST API · Controllers · JWT · Services
├─────────────────────────────────┤
│     Persistence Layer           │  Relational DB · ORM · Transactions
└─────────────────────────────────┘
```

For detailed diagrams, visit the [Wiki](../../wiki).

---

## 📁 Repository Structure

>  The codebase will be added in upcoming sprints. 
> Current repository contains project documentation and planning materials.

---

## 📋 Functional Requirements

| ID | Requirement |
|----|-------------|
| RF-01 | User Registration |
| RF-02 | JWT Authentication |
| RF-03 | Zone Management |
| RF-04 | Slot Reservation |
| RF-05 | Simulated Payment |
| RF-06 | Administrative Panel |

---

## 🔄 Git Flow

This project follows the **Git Flow** branching strategy:

| Branch | Purpose |
|--------|---------|
| `main` | Stable production version |
| `develop` | Active development branch |
| `release` | Release preparation |
| `feature/*` | Individual feature development |

---

## 📖 Documentation

All diagrams, user stories, mockups, and technical documentation are available in the **[Wiki](../../wiki)**.

| Section | Link |
|---------|------|
|  Home | [Wiki Home](../../wiki/Home) |
|  Team Members | [Members](../../wiki/Members) |
|  Architecture | [Architecture Diagram](../../wiki/Architecture) |
|  Components | [Component Diagram](../../wiki/Diagrama-Componentes) |
|  Deployment | [Deployment Diagram](../../wiki/Diagrama-Despliegue) |
|  Class Diagram | [Class Diagram](../../wiki/Diagrama-Clases) |
|  Entity-Relationship | [ER Model](../../wiki/Modelo-ER) |
|  Context Diagram | [C4 Context](../../wiki/Diagrama-Contexto) |
|  Sequence Diagrams | [Sequence Diagrams](../../wiki/Diagramas-Secuencia) |
|  User Stories | [User Stories](../../wiki/Historias-de-Usuario) |

---

## ⚙️ Non-Functional Requirements

| Category | Specification |
|----------|--------------|
| **Security** | bcrypt password encryption · JWT (1h expiration) · Role-based access control |
| **Performance** | Response time < 3 seconds under 50 concurrent users |
| **Availability** | 95% uptime in local environment · Structured HTTP error handling |
| **Usability** | Responsive interface · Visual status indicators |

---

## ⚠️ Assumptions & Limitations

- System operates in an **academic environment**
- No integration with a real banking gateway
- No real-time geolocation
- No native mobile application

---

## 📅 Project Management

- **Methodology:** Scrum with defined sprints
- **Version Control:** Git Flow (mandatory)
- **Instructors:** Yuely (Lead) · Sebastián

---

<div align="center">

 **ADSO Group 003 – SENA** · File 3231252 · 2026

</div>
