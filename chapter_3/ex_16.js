//An http server must deal with the implementation of a favicon request that is served automatically when a client requests some resource/page
//Meaning when a client requests to go to a page, the HTTP GET request is actually two requests, one for the favicon and the other for the page

const http = require("http");

http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      res.writeHead(200, {
        "Content-Type": "image/x-icon",
      });
      return res.end();
    }
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.write("Some requested resource\n");
    res.end();
  })
  .listen(4040);
