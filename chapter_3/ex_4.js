// Now let us work with Duplex Streams
// These streams allow for writeable and readable streams
//let us create a tcp server and connect to it using telnet. Withint the server we instantiate a duplex object
const net = require("net");

const server = net
  .createServer((socket) => {
    socket.write("Type something");
    socket.on("data", (data) => {
      process.stdout.write(data.toString());
    });
  })
  .listen(4040);
