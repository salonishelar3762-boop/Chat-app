const socket = io();

function joinRoom() {
  const username = document.getElementById("username").value;
  const room = document.getElementById("room").value;
  console.log(username,room);
  socket.emit("joinRoom", { username, room });
}

function sendMessage() {
  const msg = document.getElementById("message").value;
  socket.emit("chatMessage", msg);
}

socket.on("message", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  document.getElementById("chat-box").appendChild(div);
});