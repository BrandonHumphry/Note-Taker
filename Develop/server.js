var express = require("express");
var path = require("path");
var notes = require("./db/db.json");
const fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// express server receives request, provides response as object
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// returns db.json file
app.get("/api/notes", (req, res) => {
  res.json(notes);
  console.log(notes);
});

// post method creating a new note
app.post("/api/notes", (req, res) => {
  console.log(req.body); 
// create a constant using req.body for what the user wants to submit to api above
  const note = req.body;
// conditional: if notes are null, set the note.id to 1, else note.id = length of notes array
  if (notes === "") {
    note.id = 1;
  } else {
    note.id = notes.length;
  }
// push the note the user wants to submit
  notes.push(note);
// create a variable to convert notes to a JSON string
  var updateDb = JSON.stringify(notes);
// write the file with additional notes from above
  fs.writeFile("db/db.json", updateDb, function (err) {
    if (err) throw err;
    console.log("Note sent");
// send the updated notes 
    res.send(notes);
  });
});

// delete method for removing a note "id" is just a parameter but is most helpful when matched up with front end
app.delete("/api/notes/:id", (req, res) => {
  // thisNote = all notes with a specific id (req.params.id)
  const thisNote = req.params.id;
  console.log(thisNote);
  // search db and remove thisNote
  const filteredNotes = notes.filter(noted=>{
    //check if item's id does not equal thisNote
    return noted.id != thisNote;
  });
  // create a variable to convert notes to a JSON string
  var updateDb = JSON.stringify(filteredNotes);
  // write the file with additional notes from above
  fs.writeFile("db/db.json", updateDb, function (err) {
    if (err) throw err;
    console.log("Note deleted");
// send the updated notes 
    res.send(notes);
  });
});

// returns index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});