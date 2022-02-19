const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rpi = require('./rpi');
// const MongoStore = require('connect-mongo')(session);
require('dotenv').config();
const mongoose = require('mongoose');
const verificationRoutes = require('./routes/verificationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const host = process.env.HOST;
const port = process.env.PORT;
const db = process.env.DB;
const secret = process.env.SECRET;

const sessionTime = 1000 * 60 * 60 * 24 * 7;
const cookieName = 'sid';

rpi.printInfo();
rpi.setLeds();

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

app.use(dashboardRoutes);
app.use(verificationRoutes);

app.use((req, res) => {
    console.log("404");
    res.status(404).render('404');
});