// Declare dependecies
const express = require('express');
// const uid = require('short-unique-id');
const fs = require('fs');
const path = require('path');
// const { default: ShortUniqueId } = require('short-unique-id');

const app = express();
const PORT = process.env.PORT || 3000;  // ***NECESSARY*** variable value along with PORT specification to run the app in Heroku, avoids error R10

// Set Express to handle data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Define routes for the directory paths to use HTML files

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname +'/public/index.html'))
})

app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname +'/public/notes.html'))
});


// Link to the database file in JSON format to be read to show notes created
let noteList = JSON.parse(fs.readFileSync('./db/db.json','utf8'));

// Link to the notes.html code to be loaded along with the JSON 

app.get('/api/notes', function(req,res){
        res.JSON(noteList)
    });

app.post('/api/notes', function(req,res) {
    const newNote = req.body;
    noteId();

    noteList.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(noteList), 'utf8', function(err){
        if(err)throw err;
        res.json(newNote);
    });
});

const noteId = () => {
    for (i=0; i<noteList.length; i++) {
        noteList[i].id = i+1;
    }
};
// Log the communication link with the server

app.listen(PORT, function(){
    console.log(`Success! Communicating via port ${PORT}`);
})

