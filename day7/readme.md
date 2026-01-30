# Backend Notes API (MongoDB + Express)

This is a **learning-focused backend project** where I practiced connecting **Node.js + Express** with **MongoDB (Atlas & Compass)** and understood how a **clean backend folder structure** works in real projects.

The goal of this project was to:

* Learn **MongoDB connection** using Mongoose
* Understand **src-based folder structure**
* Create **CRUD APIs** using models
* Test APIs using **Postman**

---

## 📁 Folder Structure

```
day7/
├── node_modules/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── note.model.js
│   └── app.js
├── .env
├── package.json
├── package-lock.json
├── server.js
└── .gitignore
```

---

## 🧠 What I Learned (Concepts)

### 1️⃣ Why `src/` Folder?

* Keeps the project **clean and scalable**
* Separates **server start logic** from **application logic**
* Easy to maintain when project grows

---

### 2️⃣ `config/database.js` – Database Connection

This folder handles **MongoDB connection logic**.

**Role:**

* Connects server to MongoDB using **Mongoose**
* Uses `.env` for secure credentials
* Handles success & error states

```js
const mongoose = require("mongoose");

function connectTodb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected ✅");
    })
    .catch((err) => {
      console.log("DB error ❌", err.message);
    });
}

module.exports = connectTodb;
```

---

### 3️⃣ `models/` – Schema & Model

#### What is a Schema?

* Defines **data structure / format**
* Decides what type of data is stored in DB

#### What is a Model?

* Used to **perform operations** on MongoDB
* Acts as a bridge between **server & database**

```js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", noteSchema);
module.exports = noteModel;
```

---

### 4️⃣ `app.js` – Express App & Routes

This file contains:

* Express setup
* Middleware
* API routes

```js
const express = require("express");
const noteModel = require("./models/note.model");

const app = express();
app.use(express.json());
```

---

## 🚀 API Endpoints (CRUD)

### ➕ Create Note

**POST /notes**

```js
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Notes Created ✅",
    notes,
  });
});
```

---

### 📥 Get All Notes

**GET /notes**

```js
app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched ✅",
    notes,
  });
});
```

---

### 🧪 Testing with Postman

I tested APIs using **Postman**:

* Sent data using **POST** request
* Retrieved data using **GET** request
* Verified data saved in **MongoDB Compass**

Used model methods like:

* `noteModel.create()`
* `noteModel.find()`

---

## ⚙️ Server Entry Point (`server.js`)

```js
require("dotenv").config();
const app = require("./src/app");
const connectTodb = require("./src/config/database");

connectTodb();

app.listen(3000, () => {
  console.log("Server day7 is running on port 3000✅");
});
```

---

## 🛠️ Tools & Tech Used

* Node.js
* Express.js
* MongoDB Atlas
* MongoDB Compass
* Mongoose
* Postman
* dotenv

---

## 📌 Project Purpose

This project was built **for learning backend fundamentals**, especially:

* How server talks to database
* Why models are important
* How CRUD works end-to-end
* How professional backend folder structure looks

---

✅ **Status:** Learning / Development Phase

---

Feel free to clone, explore, and build on top of this 🚀
