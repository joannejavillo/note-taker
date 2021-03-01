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

//Router

// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));


//Listener

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});




