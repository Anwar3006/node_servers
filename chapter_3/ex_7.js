// Now let us create a simple http server
const http = require("http");

const server = http
  .createServer((req, res) => {
    console.log("Got Request Headers: \n" + JSON.stringify(req.headers));
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.write("PONG");
    res.end();
  })
  .listen(4040);
