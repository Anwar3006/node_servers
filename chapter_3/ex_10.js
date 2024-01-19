// Oftentime, a server may be used as:
// a proxy/broker to make requests on behalf of the client,
// a load balancer to manage client requests and distribute load,
// or a tunnel to connect clients to a secure remote server.

//Let's use a server to make requests on behalf of a client
const http = require("http");

const server = new http.Server();
server.on("request", (request, socket) => {
  http
    .request(
      {
        host: "www.google.com",
        path: "/",
        method: "GET",
        port: 80,
      },
      (res) => {
        res.pipe(socket);
      }
    )
    .end();
});
server.listen(4040);
