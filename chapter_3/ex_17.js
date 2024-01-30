// Handling POST request
// POST request are not idempotent
// Idempotent HTTP Methods means that when you make multiple requests of that method, only the first request would cause a change in state.
const http = require("http");
const qs = require("querystring");

http
  .createServer((req, res) => {
    var body = "";
    if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      return res.end(
        '<form action="/submit" method="post">\
            <input type="text" name="sometext">\
            <input type="submit" value="Upload">\
            </form>'
      );
    }

    if (req.url === "/submit") {
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        var fields = qs.parse(body);
        res.end("Danke!");
        console.log(fields);
      });
    }
  })
  .listen(4040, () => console.log("Server listening on port 4040"));
