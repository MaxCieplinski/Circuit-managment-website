var listElement = document.getElementsByClassName('listElement');

for (let element of listElement) {
    element.addEventListener('mouseover', (event) => {
        element.children[0].style.backgroundColor = 'red';
        element.style.color = 'red';
    });

    element.addEventListener('mouseout', (event) => {
        element.children[0].style.backgroundColor = '#F3F7FA';
        element.style.color = 'black';
    });

    element.addEventListener('click', (event) => {
        switch (element.textContent) {
            case 'Dashboard':
                //
                break;
            case 'Settings':
                //
                break;
        }
    });
}