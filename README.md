# PharmaTrack (Stock Manager App)

PharmaTrack is a pharmacy inventory and stock management application built using Next.js, React, MongoDB, and Tailwind CSS.

The application helps pharmacy stores efficiently manage medicine inventory, track stock availability, and handle CRUD operations through a modern and responsive interface.

---

# Core Features

* Pharmacy Inventory Management
* Medicine Stock Tracking
* CRUD Operations
* Google Authentication using NextAuth
* Responsive Dashboard UI
* Server Actions Based Backend
* Secure Authentication System

---

# Main Functionalities

* Add medicine stock
* Update medicine details
* Delete medicine records
* Track inventory availability
* Manage pharmacy stock efficiently
* Secure login system for authorized access

---

# Authentication

Authentication is implemented using:

* NextAuth
* Google OAuth

Secure login functionality is handled through Google authentication.

---

# Tech Stack

## Frontend

* Next.js
* React.js
* JavaScript

## Backend

* Next.js Server Actions

> The project does not use traditional REST APIs.
> Backend operations are handled using Next.js Server Actions.

## Database

* MongoDB

## Authentication

* NextAuth
* Google OAuth

## Styling

* Tailwind CSS

---

# Project Structure

```bash id="6l13m2"
PharmaTrack
│
├── .next/
├── actions/
├── app/
├── components/
├── lib/
├── models/
├── node_modules/
├── public/
│
├── .env.local
├── .gitignore
├── eslint.config.js
├── jsconfig.json
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
└── README.md
```

---

# Architecture Overview

## Frontend Layer

Built using Next.js and React for creating responsive and interactive user interfaces.

## Backend Layer

Server-side logic is handled using Next.js Server Actions instead of REST APIs.

## Database Layer

MongoDB is used for storing:

* Medicine inventory data
* Pharmacy stock details
* User authentication data

## Authentication Layer

NextAuth with Google OAuth is used for secure authentication and access control.

---

# Responsive Design

The application is fully responsive and optimized for:

* Mobile Devices
* Tablets
* Desktop Screens

Tailwind CSS is used for styling and responsiveness.
