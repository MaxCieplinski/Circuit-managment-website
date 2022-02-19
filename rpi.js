const Gpio = require('onoff').Gpio;
const Led = require('./models/led');
const Lcd = require('lcd');
const fs = require("fs");

const lcd = new Lcd({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 });

const dataPin = new Gpio(21, 'out');
const latchPin = new Gpio(20, 'out');
const clockPin = new Gpio(16, 'out');

const setLeds = async () => {
    const leds = await Led.find({});
    leds.reverse();
    latchPin.writeSync(0);
    for (led of leds) {
        dataPin.writeSync(led.status ? 0 : 1);
        clockPin.writeSync(1);
        clockPin.writeSync(0);
    }

    latchPin.writeSync(1);
}

const printInfo = () => {
    lcd.on('ready', _ => {
		setInterval(_ => {
			var temp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp"); 
			temp = temp / 1000; 
			temp = temp.toFixed(1);
			temp = temp + ' C';
			var content = new Date().toISOString().substring(11, 19) + '  ' + temp;
			var text = fs.readFileSync('./text.txt', 'utf8');

			lcd.clear();
		  	lcd.setCursor(0, 0);
			lcd.print(content, err => {
				if (err) {
					console.log(err);
				}

				lcd.setCursor(0, 1);
				lcd.print(text, err => {
					if (err) {
						console.log(err);
					}
				});
			});
		}, 1000);
	});
}

module.exports = {
    setLeds,
    printInfo
}