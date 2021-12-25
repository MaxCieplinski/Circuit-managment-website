const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(session);
const socketio = require('socket.io');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');

const host = process.env.HOST;
const port = process.env.PORT;
const db = process.env.DB;
const secret = process.env.SECRET;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const sessionTime = 1000 * 60 * 60 * 24 * 7;
const cookieName = 'sid';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, host, () => {console.log(`Server is running on ${host}:${port} | MongoDB connected`)}))
    .catch((err) => console.log(err))

//Sessions
// const sessionStore = new MongoStore({
//     url: dbURL,
//     ttl: sessionTime,
//     autoRemove: 'native',
// });

app.use(session({
    name: cookieName,
    resave: false,
    saveUninitialized: false,
    secret: secret,
    cookie: {
        maxAge: sessionTime,
        sameSite: true
    }
}));

app.use((req, res, next) => {
    console.log(`Request made from ${req.ip} to ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.redirect('dashboard');
});

app.get('/dashboard', (req, res) => {
    const { username } = req.session;
    if (username != undefined)
    {
        res.render('dashboard', { username: String(username) });
    } else {
        res.redirect('/log-in');
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/log-in', (req, res) => {
    res.render('log-in');
});

app.post('/log-in', async function (req, res) {
    const userExists = await User.findOne({ username: req.body.username, password: req.body.password });
    if (userExists) {
        if (req.body.keepLoggedIn === 'on') {
            req.session.username = req.body.username;
        } 
        res.redirect('dashboard');
    } else {
        res.send("User not found")
    }
});

app.post('/log-out', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(err);
        }

        res.clearCookie(cookieName);
        res.redirect('/dashboard');
    });
});

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

app.post('/sign-up', async function (req, res) {
    const userExists = await User.exists({ username: req.body.username }); 
    if (!userExists) {
        const user = new User(req.body);
        user.save()
            .then(() => {
                res.redirect('/log-in');
                console.log(`New user created | ${req.body.name} ; ${req.body.surname} ; ${req.body.username} ; ${req.body.password}`);
            })
            .catch((err) => res.send(err));
    } else {
        res.send('Username already taken');
    }
});

app.use((req, res) => {
    console.log("404");
    res.status(404).render('404');
});