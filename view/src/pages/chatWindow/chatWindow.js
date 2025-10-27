const baseUrl = `http://localhost:3000/api`
const sendMessageForm = document.getElementById("send-msg-form");
const searchInput = document.getElementById("chat-search-input");
const socket = io(`http://localhost:3000`, {
    auth: {
        token: localStorage.getItem("jwt")
    }
});

let messages = {};

window.addEventListener("DOMContentLoaded", async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if(!token) {
        window.location.href = "/auth"
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
        
        const newMsg = createMessage.data.newEntry;
        const myChat = localStorage.getItem("chat")
        socket.emit("personal-message", {msgData: newMsg,roomName: myChat});
        sendMessageForm.reset();
    });
};

if(searchInput){
    searchInput.addEventListener("change", (e) => {
            const myChat = e.target.value;
            console.log(myChat);
            
            localStorage.setItem("chat", myChat)
            socket.emit("join-room", myChat);
            alert("Room join:", myChat)
        }
    )
}

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

// Listen for real-time new messages
socket.on("personal", async(msgData) => {
  messages.rows.unshift(msgData);
  renderMessages();
});

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = `toast show ${type}`;

  // Show toast for 5 seconds
  setTimeout(() => {
    toast.className = `toast hidden`;
  }, 3000);
}