const User = require('../models/user');

const index_get = (req, res) => {
    res.redirect('dashboard');
}

const dashboard_get = (req, res) => {
    const { username } = req.session;
    if (username != undefined)
    {
        res.render('dashboard', { username: String(username), site: 'dashboard' });
    } else {
        res.redirect('/log-in');
    }
}

const dashboard_settings_get = (req, res) => {
    const { username } = req.session;
    if (username != undefined)
    {
        User.findOne({ username: username }, (err, user) => {
            if (err) throw err;
            if (user != null && username != undefined)
            {
                res.render('dashboard', { site: 'dashboard-settings', name: String(user.name), surname: String(user.surname), username: String(username), email: String(user.email) });
            } else {
                res.redirect('/log-in');
            }
        });
    } else {
        res.redirect('/log-in');
    }
}

const dashboard_settings_post = (req, res) => {
    const { username } = req.session;
    if (username != undefined)
    {
        User.findOne({ username: username }, (err, user) => {
            if (err) throw err;
            if (user != null && username != undefined)
            {
                user.name = req.body.name || user.name;
                user.surname = req.body.surname || user.surname;
                user.email = req.body.email || user.email;
                user.username = req.body.username || user.username;
                user.password = req.body.password || user.password;
                req.session.username = user.username;
                user.save().then(() => {
                    res.render('dashboard', { site: 'dashboard-settings', name: String(user.name), surname: String(user.surname), username: String(user.username), email: String(user.email) });
                });
            } else {
                res.redirect('/log-in');
            }
        });
    } else {
        res.redirect('/log-in');
    }
}

module.exports = {
    index_get,
    dashboard_get,
    dashboard_settings_get,
    dashboard_settings_post
}