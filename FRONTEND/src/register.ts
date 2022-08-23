
const first_name = document.getElementById("first_name") as HTMLInputElement
const user_name = document.getElementById("user_name") as HTMLInputElement
const email = document.getElementById("email") as HTMLInputElement
const pass = document.getElementById("pass") as HTMLInputElement
const submit_btn = document.getElementById("submit_btn") as HTMLInputElement
const validation_message = document.getElementById("validation_message") as HTMLElement


submit_btn.addEventListener("click",(e)=>{
    e.preventDefault()

    const f_name = first_name.value;
    const u_name = user_name.value;
    const user_email = email.value;
    const user_pass = pass.value

    if(f_name=="" || u_name=="" || user_email=="" ||user_pass==""){
        validation_message.style.display="block"
    }
    
console.log(f_name, u_name, user_email, user_pass);



})