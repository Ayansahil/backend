const express = require("express");
const app = express();

app.use(express.json()); //Middleware to open req.body because by default it's undefined

const notes = []; //Array to store notes


//Endpoint to add a new note
app.post("/notes", (req, res) => {
  console.log(req.body); //to see the data sent from client
  notes.push(req.body); //add note to array
  res.send("Note added"); //send response to client
});


//Endpoint to get all notes
app.get("/notes", (req, res) => {
  res.send(notes); //send all notes to client
});


//Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000✅");
});
