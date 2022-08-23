"use strict";
const luname = document.getElementById("user_name");
const lpass = document.getElementById("pass");
const lsbtn = document.getElementById("submit_btn");
const lvalidation_message = document.getElementById("validation_message");
lsbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const luname = user_name.value;
    const user_pass = lpass.value;
    if (luname == "" || user_pass == "") {
        validation_message.style.display = "block";
    }
});
