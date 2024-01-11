// Child process to receive server reference from parent and use it to handle requests
process.on("message", (message, server) => {
  console.log(message);
  server.on("connection", (socket) => {
    socket.end("Child handled this request");
  });
});
