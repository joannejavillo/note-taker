//Dependencies

const fs = require('fs');
const express = require('express');
const path = require('path');

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

app.get('/', (req, res) => res.sendFile(path.join(__dirname,'public', 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'public', 'notes.html')));

//Post
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,'db', 'db.json'))
    
})


app.post('/api/notes', (req, res) => {

})





//Listener

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});




