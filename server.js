const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/notes', function(req,res){
    res.sendFile(__dirname+'/public/notes.html')
});


fs.readFile('db/db.json','utf8', (error,data)=>{
    if(error)throw error;

    const notes = JSON.parse(data);

    app.get('/api/notes', function(req,res){
        res.JSON(notes);
    });
});

app.listen(PORT, function(){
    console.log('Success!');
})

