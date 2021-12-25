var menuPages = document.getElementsByClassName('menuPages');

for (let page of menuPages) {
    page.addEventListener('click', (event) => {
        event.preventDefault();
        switch (page.textContent) {
            case 'Dashboard':
                window.location.href = "dashboard";
                break;
            case 'Sign up':
                window.location.href = "sign-up";
                break;
            case 'Log in':
                window.location.href = "log-in";
                break;
        }
    });
}