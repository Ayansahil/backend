const express = require("express");
const app = express();
const noteModel = require("../src/models/note.model");
const cors =require('cors')


app.use(cors());
app.use(express.json());

/**
 * - POST /api/notes
 * - create new note and save data in mongodb
 * - req.body = {title,description}
 */
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note created✅",
    note,
  });
});

/**
 * - GET /api/notes
 * - Fetch all the notes data from mongodb and send them in the response
 */
app.get("/api/notes", async (req, res) => {
  const note = await noteModel.find();
  res.status(200).json({
    message: "note fetched ✅",
    note,
  });
});

/**
 * - DELETE /api/notes/:id
 * - Delete note with the id from req.params
 */
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await noteModel.findByIdAndDelete(id);

  res.status(204).json({
    message: "note deleted successfully✅",
    note,
  });
});

/**
 * - PATCH /api/notes/:id
 * - update the description of the note by id
 * - req.body = {description}
 */
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "note updated ✅",
  });
});

/**
 * - PUT /api/notes/:id
 * - update the title & description of the note by id
 * - req.body = {title,description}
 */
app.put("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  await noteModel.findByIdAndUpdate(id, { title, description });

  res.status(200).json({
    message: "note fully updated ✅",
  });
});

module.exports = app;
