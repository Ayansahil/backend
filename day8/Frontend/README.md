# Frontend – Notes App (React)

This frontend is built to **consume backend APIs** and display notes stored in **MongoDB**. Initially dummy data was used, later replaced with **real backend data** using Axios.

---

## 🚀 What This Application Does

* Displays notes fetched from backend API
* Sends HTTP requests using **Axios**
* Renders dynamic data in React UI
* Works with backend CRUD APIs
- Displays notes stored in MongoDB
- Creates new notes from frontend form
- Updates existing notes
- Deletes notes
- Syncs UI automatically after each operation
- Uses real backend APIs (no static data)

---

## 🔗 Backend Integration

The frontend connects to a Node.js + Express backend running on:

```
http://localhost:3000
```

To allow frontend-backend communication, **CORS** is enabled in the backend.

### Backend CORS setup (required)

```js
const cors = require("cors");
app.use(cors());
```

---

## 📡 Data Fetching with Axios

Axios is used to fetch notes from the backend:

```js
axios.get("http://localhost:3000/api/notes")
```

Axios is used to create ,update & delete notes from the backend:

```js
axios.post("http://localhost:3000/api/notes", {
  title,
  description,
});

axios.put("http://localhost:3000/api/notes/:id", {
  title,
  description,
});

axios.delete("http://localhost:3000/api/notes/:id");
```



---

## ⚛️ React Hooks Usage

* `useState` is used to store notes
* `useEffect` is used to fetch data **once on component mount**
* Prevents infinite API calls during re-renders

---

## 🧪 Tested Flow

1. Notes created via **Postman** (backend)
2. Data saved in **MongoDB Atlas / Compass**
3. Frontend fetches notes using API
4. Notes rendered dynamically in UI

---

## 🛠️ Tech Stack

* React (Vite)
* Axios
* Node.js / Express (Backend)
* MongoDB

---

## 📌 Project Status

🎯 What I Learned from This Project

* Real frontend–backend communication
* REST API integration in React
* Managing CRUD state properly
* Handling edit/update workflows
* Building production-style full stack apps

This frontend focuses on understanding **real-world API integration** and replacing static data with live backend data.

---

