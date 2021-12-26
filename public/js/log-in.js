var password = document.getElementById("password");
var checkbox = document.getElementById("showPassword");

checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
        password.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
    }
});