const express = require("express");
const noteModel = require("./models/note.model");

const app = express();
app.use(express.json()); //middleware

/**
 * - POST /notes
 * - req.body => {title,description}
 */

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

/**
 * - GET /notes
 * - fetch all the notes Data
 */

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched ✅",
    notes,
  });
});

module.exports = app;
