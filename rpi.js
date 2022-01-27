const Gpio = require('onoff').Gpio;
const Led = require('./models/led');

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

const printTemperature = () => {
    
}

module.exports = {
    setLeds,
    printTemperature
}