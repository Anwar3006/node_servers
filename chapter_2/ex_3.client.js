//Client to connect to our server
const net = require("net");

var client = new net.Socket();
client.connect({
  port: 4040,
});

client.on("connect", function () {
  console.log("Client: connection established with server");
});

client.on("data", (data) => {
  console.log("Message from server: " + data.toString());
});
