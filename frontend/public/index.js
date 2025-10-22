const loginForm = document.getElementById("login-form"); 
const signupForm = document.getElementById("signup-form"); 
const goToSignup = document.getElementById("go-to-signup");
const goToLogin = document.getElementById("go-to-login");
const goToForgetPass = document.getElementById("go-to-forget-pass");
const goToLogin1 = document.getElementById("go-to-login-1");

if(goToSignup){
    goToSignup.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("login-card").classList.add("hidden");
        document.getElementById("signup-card").classList.remove("hidden");
    })
}

if(goToLogin){
    goToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("login-card").classList.remove("hidden");
        document.getElementById("signup-card").classList.add("hidden");
    })
}

if(goToForgetPass){
    goToForgetPass.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("login-card").classList.add("hidden");
        document.getElementById("forget-pass-card").classList.remove("hidden");
    })
}

if(goToLogin1){
    goToLogin1.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("login-card").classList.remove("hidden");
        document.getElementById("forget-pass-card").classList.add("hidden");
    })
}