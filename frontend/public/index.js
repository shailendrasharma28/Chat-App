const baseUrl = `http://localhost:3000`
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

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    localStorage.clear()
    const email = document.getElementById("mobile-email").value;
    const password = document.getElementById("auth-password").value;

    const data = { email, password };

    try {
      const login = await axios.post(`${baseUrl}/api/user/login`, data);
      const res = login.data.message;
      if (login.data.success === false) {
        showToast(res, "error");
      } else {
        showToast(res, "success");
        localStorage.setItem("user", true);
        localStorage.setItem("user-details", JSON.stringify(login.data.user));
        localStorage.setItem("jwt", login.data.token)
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg =
        error?.response?.data?.message || "Something went wrong!";
      showToast(errorMsg, "error");
    }

    loginForm.reset();
  });
};


if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value;

    const data = { name, email, mobile, password };

    try {
      const createUser = await axios.post(`${baseUrl}/api/user/signup`, data);
      const res = createUser.data.message;
      if (createUser.data.success === false) {
        showToast(res, "error");
        signupForm.reset();
      } else {
        showToast(res, "success");
        setTimeout(() => {
            document.getElementById("login-card").classList.remove("hidden");
            document.getElementById("signup-card").classList.add("hidden");
        }, 3000)
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg =
        error?.response?.data?.message || "Something went wrong!";
      showToast(errorMsg, "error");
    }

    signupForm.reset();
  });
};

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = `toast show ${type}`;

  // Show toast for 5 seconds
  setTimeout(() => {
    toast.className = `toast hidden`;
  }, 3000);
}