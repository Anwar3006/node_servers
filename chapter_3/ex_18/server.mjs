// The main server
import http from "http";
import generatePieChart from "./generatePieSVG.mjs";
import convertToPNG from "./convertToPNG.mjs";
import * as fs from "fs";
import path from "path";
import { Readable, Transform } from "stream";
import * as url from "url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

//create server
http
  .createServer(async (req, res) => {
    if (req.url === "/favicon.ico") {
      res.writeHead(200, {
        "Content-Type": "image/x-icon",
      });
      return res.end();
    }

    //url object and retrieve values passed as query parameters
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const queryParams = reqUrl.searchParams.get("values").split(",");
    const cacheKey = queryParams.sort().join("");

    try {
      //create writable stream to store png in file
      const filePath = path.join(dirname, "PNGStorage");
      const filename = `${filePath}/${cacheKey}.jpg`;

      const regex = /\/delete/;
      if (regex.test(req.url)) {
        fs.rm(filename, (err) => {
          if (err) {
            throw err;
          }
        });
        res.end("Resource deleted successfully");
      }

      //generate svg, convert to png, and save to file
      const values = queryParams.map((v) => Number(v));

      if (fs.existsSync(filename)) {
        // If file exists, read it and send it to the client
        res.writeHead(200, { "Content-Type": "text/plain" });
        fs.readFile(filename, (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      } else {
        await convertToPNG(generatePieChart(values), filename);

        res.writeHead(201, { "Content-Type": "text/plain" });
        fs.readFile(filename, (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.writeHead(500);
      res.end("Internal Server Error");
    }
  })
  .listen(4040, () => console.log("Server started on port 4040"));
