const User = require('../models/user');
const Led = require('../models/led');

const index_get = (req, res) => {
    res.redirect('dashboard');
}

const dashboard_get = async (req, res) => {
    const { username } = req.session;
    if (username != undefined)
    {
        var leds_array;
        var leds_count = await Led.estimatedDocumentCount();
        if (leds_count == 0)
        {
            for (let i = 1; i <= 10; i++)
            {
                const led = new Led({
                    number: i,
                    status: false,
                    owner: "None"
                });
                await led.save();
            }

            leds_array = await Led.find({});
        } else {
            leds_array = await Led.find({});
        }

        res.render('dashboard', { username: String(username), site: 'dashboard', leds: leds_array });
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

const leds_get = async (req, res) => {
    const number = req.params.id.substring(1);
    const led = await Led.findOne({ number: number });
    // console.log(led);
    if (led != null) {
        res.send(led.status);
    } else {
        console.log("Led not found");
    }
}

const leds_put = async (req, res) => {
    const led = await Led.findOne({ number: req.body.number });
    if (led != null && req.body.status != null) {
        led.status = req.body.status;
        led.save();
    }
}

module.exports = {
    index_get,
    dashboard_get,
    dashboard_settings_get,
    dashboard_settings_post,
    leds_get,
    leds_put
}