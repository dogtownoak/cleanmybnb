const
    express = require('express'),
    cors = require('cors'),
    parser = require('body-parser'),
    db = require('./models'),
    ctrl = require('./controllers'),
    passport = require('./config/passport')(),
    routes = require('./routes')
    // Calendar = require('tui-calendar')
    // util = require('tui-code-snippet');
    // var moment = require('moment');




const app = express()


// app.use(express.json());
app.use(parser.json())
app.use(cors());
app.use(passport.initialize())
// app.use(moment().format())


//serve static files from public folder
app.use(express.static(__dirname + '/public'));

// HTML Endpoints
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/m', (req, res) => {
    res.sendFile(__dirname + '/views/indexM.html');
});

app.get('/calendar', (req, res) => {
    res.sendFile(__dirname + '/views/calendar.html');
});

app.get('/fullcalendar', (req, res) => {
    res.sendFile(__dirname + '/views/fullcalendar.html');
});

app.get('/googlecalendar', (req, res) => {
    res.sendFile(__dirname + '/views/googlecalendar.html');
});

app.get('/housingunit', (req, res) => {
    res.sendFile(__dirname + '/views/housingunit.html');
});



//Routes: 
app.use('/users', routes.user)
app.use('/verify', routes.verify)


//Server Start
app.listen(process.env.PORT || 3000, () => {
    console.log("HTTP server listening at localhost:3000 for Auth");
});