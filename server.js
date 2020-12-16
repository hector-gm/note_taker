// Declare dependecies
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;  // ***NECESSARY*** variable value along with PORT specification to run the app in Heroku, avoids error R10

// Set Express to handle data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Define routes for the directory paths

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname+'/public/notes.html'))
});


// Link to the database file in JSON format to be read to show notes created
fs.readFile('db/db.json','utf8', (error,data)=>{
    if(error)throw error;

    const notes = JSON.parse(data);

// Link to the notes.html code to be loaded along with the JSON 

    app.get('/api/notes', function(req,res){
        res.JSON(notes);
    });
});

// Log the communication link with the server

app.listen(PORT, function(){
    console.log(`Success! Communicating via port ${PORT}`);
})

