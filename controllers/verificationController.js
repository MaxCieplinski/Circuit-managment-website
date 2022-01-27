const User = require('../models/user');
const cookieName = 'sid';

const verification_signup_get = (req, res) => {
    res.render('sign-up');
}

const verification_signup_post = async (req, res) => {
    const userExists = await User.exists({ username: req.body.username, email: req.body.email });
    if (!userExists) {
        const user = new User(req.body);
        user.save()
            .then(() => {
                res.redirect('/log-in');
                console.log(`New user created | ${req.body.name} ; ${req.body.surname} ; ${req.body.username} ; ${req.body.password}`);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    } else {
        res.send('Username already taken');
    }
}

const verification_login_get = (req, res) => {
    res.render('log-in');
}

const verification_login_post = (req, res) => {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) console.log(err);
        if (user != null) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) console.log(err);
                if (isMatch) {
                    if (req.body.keepLoggedIn === 'on') {
                        req.session.username = req.body.username;
                    }
                    res.redirect('dashboard');
                } else {
                    res.send("Wrong username or password");
                }
            });
        } else {
            res.send("Wrong username or password");
        }
    });
}

const verification_logout_post = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send(err);
        }

        res.clearCookie(cookieName);
        res.redirect('/dashboard');
    });
}

module.exports = {
    verification_signup_get,
    verification_signup_post,
    verification_login_get,
    verification_login_post,
    verification_logout_post
}