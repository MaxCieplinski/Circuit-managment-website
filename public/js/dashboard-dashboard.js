const leds = document.querySelectorAll('.leds');
for (let led of leds) {
    led.addEventListener('click', () => {
        if (window.getComputedStyle(led).getPropertyValue('background-color') == 'rgb(255, 255, 255)') {
            led.style.backgroundColor = 'red';
        } else if (window.getComputedStyle(led).getPropertyValue('background-color') == 'rgb(255, 0, 0)') {
            led.style.backgroundColor = 'white';
        }
    });
}