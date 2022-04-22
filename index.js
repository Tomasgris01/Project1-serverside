const express = require('express');
const mongoose = require('mongoose')
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


const connectionString = 'mongodb://127.0.0.1:27017/SS2022'

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
  }).
  catch ( error => {
    console.log('Database connection refused' + error);
    process.exit(2);
  })
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));
  
  db.once('open', () => {
    console.log("DB connected")
  });
  


app.use(cookieParser("Tomas cookie"));


app.use('/', home)
app.use('/book', book)

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
