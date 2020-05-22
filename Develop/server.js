var express = require("express");
var path = require("path");
const db = require('./db/db.json')
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get('/api/notes', (req,res)=>{
    res.json(db)
})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
