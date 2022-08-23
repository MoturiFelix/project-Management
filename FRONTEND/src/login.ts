

const luname = document.getElementById ("user_name") as HTMLInputElement
const lpass = document.getElementById ("pass") as HTMLInputElement
const lsbtn = document.getElementById ("submit_btn") as HTMLInputElement
const lvalidation_message = document.getElementById("validation_message") as HTMLElement



lsbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    
    const luname = user_name.value;
    const user_pass = lpass.value;

    if(luname==""||user_pass==""){
        validation_message.style.display="block"
    }
    

})




