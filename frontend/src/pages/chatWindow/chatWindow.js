const baseUrl = `http://localhost:3000/api`
const sendMessageForm = document.getElementById("send-msg-form");

let messages = {};

window.addEventListener("DOMContentLoaded", async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if(!token) {
        window.location.href = "/frontend/index.html"
        showToast("Not authorized, please login again", 'error');
    }
    const res = await axios.get(`${baseUrl}/chat/message/all`);
    messages = res.data.data;
    renderMessages();
})

if(sendMessageForm){
    sendMessageForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const sender_id = JSON.parse(localStorage.getItem("user-details")).id;
        const content = document.getElementById("msg-input").value;

        const createMessage = await axios.post(`${baseUrl}/chat/message/new`,
            {content, sender_id}
        )
        const res = await axios.get(`${baseUrl}/chat/message/all`);
        messages = res.data.data;
        renderMessages();
        sendMessageForm.reset();
    });
};

function renderMessages() {
    const chatbox = document.querySelector(".chatbox-main");
    chatbox.innerHTML = "";
    messages.rows.forEach((msg) => {
        const user = localStorage.getItem("user-details");
        const userType = msg.sender_id === JSON.parse(user).id
        const divClass = userType == true ? "sent" : "received"
        const msgDiv = document.createElement("div");
        msgDiv.innerText = msg.content;
        msgDiv.classList.add(divClass, "message")
        chatbox.appendChild(msgDiv)
    })
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = `toast show ${type}`;

  // Show toast for 5 seconds
  setTimeout(() => {
    toast.className = `toast hidden`;
  }, 3000);
}