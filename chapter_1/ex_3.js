//Apart from Http servers, Node supports othe standard protocols like TLS/SSL and UDP
// Let's build a server and client and make them communicate over UDP
const dgram = require("dgram");

//Setting up the server
const server = dgram.createSocket("udp4");
server.bind("40404"); //assign a port number to server

server.on("message", () => {
  process.stdout.write(`Message received from client: ${message}\n`);
  process.exit();
});

//Setting up the client
const client = dgram.createSocket("udp4");
var message = process.argv[2] || "hello";
//convert message to binary format so it can be transmitted over UDP, UDP works with data only in binary format
message = Buffer.from(message);

//send the message
client.send(message, 0, message.length, 40404, "localhost");
