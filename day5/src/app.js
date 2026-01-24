const express = require("express");
const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({
    message: "note created successfully✅",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id];
  res.status(204).json({
    message: "note deleted ❌",
  });
});

app.patch("/notes/:id", (req, res) => {
  notes[req.params.id].description = req.body.description;
  res.status(200).json({
    message: "note updated successfully ✏️",
  });
});

app.put("/notes/:id", (req, res) => {
  const id = req.params.id;
  notes[id] = req.body;
  res.status(200).json({
    message: "updated fully",
  });
});

module.exports = app;
