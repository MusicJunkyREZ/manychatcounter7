const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const db = require('./DB/User')

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => console.log('Good to go'))

const connectDB = require('./DB/connection')

// const route = express.Router();
// const index = require('./views/index')
const path = require('path');


// Necessary to see front end
app.use(express.static('views'));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
app.use(express.json({extended:false}));
app.use('/api/userModel', require('./Api/User'));
app.use('/', require('./Api/User'))


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

const Port = process.env.port || 8080;

app.listen(Port, () => console.log(`Server started, listening on port ${Port}`));