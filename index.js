const express = require('express');
const app = express();
const port = 3000

const req = require('express/lib/request');
const cookieParser = require('cookie-parser');
const home = require('./routes/home')
const staff = require('./routes/about')



//this will allow for static files
app.use(express.static('public'));


// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'index' }); //Default page layout
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



app.use(cookieParser("Tomas cookie"));


app.use('/', home)

var foil = {
    "name": "Tomas",
    "dob": "11/03/2001",
    "imageurl": "/images/face.jpg"
}

app.get('/foil', (req, res) =>
    res.render('person', { person: foil }))

// custom 404 page
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
