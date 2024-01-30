/**
 * Our goal is to use Node to generate pie charts dynamically on a server based on client requests.
 * A client will specify some data values, and a PNG representing that data in a pie will be generated.
 * We are going to use the D3.js library, which provides a Javascript API for creating data visualizations, and the jsdom NPM package, which allows us to create a virtual DOM within a Node process.
 */

const http = require("http");

http
  .createServer((req, res) => {
    //because a GET request will also automatically request for a favicon b default, we implement a logic to check and handle it
    if (req.url === "/favicon.ico") {
      res.writeHead(200, {
        "Content-Type": "image/x-icon",
      });
      return res.end();
    }
    const values = new URL(req.url, "http://localhost").searchParams
      .get("values")
      .split(",");
    const cacheKey = values.sort().join("");
    console.log(values, cacheKey);

    //create a virtual DOM using jsdom. The pie chart will be generated in SVG format within the DOM using D3.
    const jsdom = require("jsdom");
    const d3 = require("d3");
    const { JSDOM } = jsdom;

    //create a child process which will take the SVG and convert it into PNG using ImageMagick
    const { spawn } = require("child_process");
    const svgToPng = spawn("convert", ["svg:", "png:-"]);
    svgToPng.stdin.write(svg);
    svgToPng.stdin.end();

    const transfrom = require("stream").Transform;
    transfrom._transform = (buffer, enc, cb) => {
      filewriter;
    };
    res.end();
  })
  .listen(4040);
