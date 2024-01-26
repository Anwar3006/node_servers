// Let us create a tunnel server. We will require a proxy server which we will establish using http
// Then we will create a tcp server within the proxy server.
// When we receive a request event on the proxy server, we capture the request, client socket and head(the first packet of the http request),
// in a callback function and set up our socket server(tcp server) then pipe the client request to the tcp server and then pipe the response back to the client

//In the provided code, when the client initiates a CONNECT request to the proxy server, it establishes a tunnel between the client and the destination server.
//The proxy server facilitates this tunneling by forwarding data between the client and the destination server without inspecting or modifying it.

//In summary, the provided code implements both a proxy server and a tunneling mechanism. It acts as a proxy server for handling HTTP requests
//and as a tunnel for establishing TCP connections between clients and destination servers, allowing for direct communication between them.

const http = require("http");
const net = require("net");

//////////////////////////////create a server
const proxy = new http.Server();
proxy
  .on("connect", (req, clientSocket, head) => {
    //on connect, create a tcp connection to destination server
    const [hostname, port] = req.url.split(":");
    const serverSocket = net.connect(port || 80, hostname, () => {
      clientSocket.write("HTTP/1.1 200 Connection established\r\n\r\n"); //send message to client if successful
      serverSocket.write(head); //forward the request headers to destination server
      serverSocket.pipe(clientSocket); //forward the response from destination server to client
      clientSocket.pipe(serverSocket); //forward the request from client to destination server
    });
    serverSocket.on("error", (err) => console.error(err.message));
  })
  .listen(4040);

///////////////////////////////create a client request
const request = http.request({
  hostname: "localhost",
  port: 4040,
  method: "CONNECT",
  path: "www.google.com:80",
});
request.end();
request.on("connect", (res, socket, head) => {
  socket.write(
    "GET / HTTP/1.1\r\nHost: www.google.com:80\r\nConnection: close\r\n\r\n"
  );
  socket.on("data", (data) => {
    console.log(data.toString());
  });
  socket.on("error", (err) => console.error(err.stack));
  socket.on("end", () => {
    proxy.close();
  });
});
