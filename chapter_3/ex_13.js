// Let us look at the URL module
// URL will return a new URL object with protocol, hostname, port, pathname, search, and hash properties
console.log(new URL("http://localhost:4040"));

//Using the query string module to parse the query string received from an http POST request
//for GET requests, we can use the URL method to parse the url
const qs = require("querystring");
console.log(qs.parse("foo=bar&zap=zazzle"));
console.log(qs.parse("mom=woman%dad=man", "%", "="));
