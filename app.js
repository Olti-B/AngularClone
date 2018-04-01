const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connection ' + config.database);
});

const app = express();

const port = 3300;

app.use(bodyParser.json());

app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.send("Invalid endpoint");
});

app.listen(port, () => {
    console.log('App Listening');
});