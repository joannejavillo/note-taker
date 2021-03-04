//Dependencies

const fs = require('fs');
const express = require('express');
const path = require('path');
const uniqid = require('uniqid');


//console.log('uniqid');
//Sets up the Express App

const app = express();

//Sets up an initial port, to use this later in our listener

const PORT = process.env.PORT || 8080;

//Set up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = [];
//Router

// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')));

//Read
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
        if (err) {
            throw err;
        }
        const notes = JSON.parse(data.toString());

        res.json(notes)
    })

})

//Post
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uniqid();
    //console.log(newNOte);
    fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => {
        if (err) {
            throw err;
        }
        const notes = JSON.parse(data.toString());
        notes.push(newNote);

        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(notes);
            console.log(notes);
        });
    });

});

app.get('/api/notes/:id', (req,res) => {
    res.json(req.params.id);
});
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

//Read json file



app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public','index.html')));
//Listener

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});




