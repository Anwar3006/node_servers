const http = require("http");

const server = http.Server();
server.on("connection", (socket) => {
  console.log("New Client connected: " + new Date());

  socket.on("end", () => {
    console.log("Client disconnected: " + new Date());
  });
});
server.listen(4040);
server.on("request", (request, response) => {
  request.on("data", (data) => {
    console.log("client wrote: " + data);
  });
  response.end();
});
server.timeout = 200; //find out what timeout does?
