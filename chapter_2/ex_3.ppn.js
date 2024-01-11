// We can spin up a child process to handle network requests received b the parent
/**
 * What Happens When a Client Connects:
The server (parent process) is mainly responsible for receiving requests then forks a child process to handle the request.
The server reference is passed to the child process.
The child process receives the message from the parent process and sets up an event listener on the server to handle connections.
The child process handles the connection, logs a message, and sends a response back to the parent process.
The parent process logs the message received from the child process.
 */
const net = require("net");
const cp = require("child_process");

//fork child process
const child = cp.fork(__dirname + "/ex_3.cpn.js");

//create the server
const server = net.createServer();
server.on("connection", function (socket) {
  socket.end("Parent handled this connection");
});

//pass the server reference to the child process
server.listen(4040, () => {
  child.send(
    "This is the child process. Created to handle requests from the parent process",
    server
  );
});
child.on("message", (message) => {
  console.log(message);
});
