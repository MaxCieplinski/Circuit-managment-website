const leds = document.querySelectorAll('.leds');
const form = document.querySelector('#lcd-text-form');

const get_data = async (led) => {
    const response = await fetch(`/leds/:${led.dataset.id}`, { method: 'GET' });
    var data = await response.text();
    data = (data === 'true');
    return data;
}

const main = async () => {
    for (let led of leds) {
        var status;
        status = await get_data(led);
        if (status) {
            led.style.backgroundColor = 'red';
        } else {
            led.style.backgroundColor = 'white';
        }

        led.addEventListener('click', () => {    
            if (window.getComputedStyle(led).getPropertyValue('background-color') == 'rgb(255, 255, 255)') {
                status = true;
            } else {
                status = false;
            }
            
            if (window.getComputedStyle(led).getPropertyValue('background-color') == 'rgb(255, 255, 255)') {
                led.style.backgroundColor = 'red';
                status = true;
                led.nextElementSibling.children[2].innerHTML = 'STATUS :  <span id="info-status-red">true';
            } else if (window.getComputedStyle(led).getPropertyValue('background-color') == 'rgb(255, 0, 0)') {
                led.style.backgroundColor = 'white';
                status = false;
                led.nextElementSibling.children[2].innerHTML = 'STATUS :  <span id="info-status-blue">false';
            }

            fetch(`/leds/:${led.dataset.id}`, {  method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ number: led.dataset.id, status: status })});
        });
    }
}

main();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.submit();
    form.reset();
});