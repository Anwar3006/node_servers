// Making a simple GET request using the http module
const http = require("http");

http
  .get("www.google.com/", (response) => {
    console.log("Response: " + response.statusCode);
  })
  .on("error", (err) => console.error(err.message));
