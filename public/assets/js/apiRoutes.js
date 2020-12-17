// Declare dependencies for this file to write files and use the set directory path
const fs = require('fs');
const path = require ('path');
// The ShortUniqueID npm module is called on to create an id for each note, this will enable the delete function to work properly
const { default: ShortUniqueId } = require('short-unique-id');

//These functions will be available to the other js files
module.exports = (app) => {
    // Access defined to read the db.json file's content
    const readDB = () => {
        const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
        return JSON.parse(data);
    }

    // Access set to write into the db.json file
    const writeDB = (notes) => {
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes)); 
    }

    app.get('/api/notes', (req,res) => {
        res.JSON(readDB());
    });

    app.post('/api/notes', (req,res) => {
        const newNote = req.body;
        newNote.id = new ShortUniqueId();
        const notes = readDB();
        notes.push(newNote);
        writeDB(notes);
        res.JSON();
    });

    app.delete('/api/notes/:id', (req,res) => {
    notes = noteList.filter(n => n.id != req.params.id);
    fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if(err)throw err;
        res.JSON(notes)
    });
});

}