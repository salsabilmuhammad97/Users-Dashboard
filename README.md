# User Dashboard Frontend

A React + TypeScript frontend app with mock authentication, user management, and profile editing.

---

## Features

- **Login**

  - Mocked login: Email `q@quantum.io`, Password `qTask123#`
  - Shows loading and error states
  - Stores tokens in `localStorage`

- **Dashboard**

  - Displays 50 users from Random User API
  - Search users by name (case-insensitive)
  - Pagination (10 users per page)
  - Modal per user for detailed info (email, phone, address, picture)
  - Refresh button to reload users

- **Profile**

  - Edit your profile info: name, phone, job title, experience, address, working hours
  - Form validation using **Formik + Yup**
  - Simulated save with loading and success/error feedback

- **State Management**

  - Uses **Redux Toolkit** for auth, users, search/pagination, and profile state

- **Testing**
  - Jest + React Testing Library for unit tests (For Login Page)
  - Persistent auth state

---

## Setup

```bash
npm install
npm run dev   # Starts Vite dev Server
npm test      # runs unit tests
```

## implemented bonus features

- TypeScript support
- Unit tests using Jest / React Testing Library
- Persist authentication state
- Refresh users button
- Use Vite instead of CRA
