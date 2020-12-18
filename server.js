// Refactored the project using the HotRestaurant example from week 11 
// Splitting the html and api routes into different files

// Declare express dependency, other node dependecies listed in the apiRoutes and htmlRoutes js files in Assets folder

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;  // ***NECESSARY*** variable value along with PORT specification to run the app in Heroku, avoids error R10

// Set Express to handle data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

// Call on the js files to handle the other files
require('./public/assets/js/apiRoutes')(app);
require('./public/assets/js/htmlRoutes')(app);

// Log the communication link with the server
app.listen(PORT, function(){
    console.log(`Success! Communicating via port ${PORT}`);
});

