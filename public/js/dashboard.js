var listElement = document.getElementsByClassName('listElement');
const href = window.location.href.split('/');

//TO BE OPTIMIZED
window.onload = () => {
    for (let element of listElement) {
        if (element.textContent.trim().toLowerCase() ==  href[href.length - 1].split('-').at(-1).toLowerCase()) {
            element.children[0].style.backgroundColor = 'red';
            element.style.color = 'red';
        } else {
            element.addEventListener('mouseover', (event) => {
                element.children[0].style.backgroundColor = 'red';
                element.style.color = 'red';
            });

            element.addEventListener('mouseout', (event) => {
                element.children[0].style.backgroundColor = '#F3F7FA';
                element.style.color = 'black';
            });
        }

        element.addEventListener('click', (event) => {
            switch (element.textContent.trim()) {
                case 'Dashboard':
                    window.location.href = '/dashboard';
                    break;
                case 'Settings':
                    window.location.href = '/dashboard-settings';
                    break;
            }
        });
    }
}