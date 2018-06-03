const express = require('express');
const hbs = require('hbs'); //it's a view engine for rendering html pages
const fs = require('fs');
var app = express();

//for herokuapp
const port = process.env.port || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


//middleware example

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.log(err);
        };
    });
    next();
})

//task middleware

/*app.use((req, res, next) => {
    res.render('maintaenance.hbs', {
        pageTitle: 'maintaenance Page',

    });
});*/


app.use(express.static(__dirname + '/public'));


//helper methods for view engine
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (request, response) => { //for home page
    // response.send('<h1>hello express</h1>');
    /* response.send({
         name: "harneet",
         hobbies: "basketball",
         likes: [
             "biking",
             "cs"
         ]
     })*/
    response.render('home.hbs', {

    });
});

app.get('/about', (request, response) => {
    //response.send('about page');
    response.render('about.hbs', {
        pageTitle: 'About Page',

    });
});



app.get('/badRequest', (request, response) => {
    response.send({
        errorMessage: 'bad request Or internal server Error'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});