// Now let us create a secure server using https which is simply an http protocol layered on top of a tls/ssl protocol.
// Https is an encrypted transmission protocol that uses certificates to encrypt/decrypt the data.
// Now we will create a Self-signed certificate using  openssl.
// openssl genrsa -out ./chapter_3/ex_12_server-key.pem 2048
// openssl req -new -key ./chapter_3/ex_12_server-key.pem -out ./chapter_3/ex_12_server-csr.pem
// openssl x509 -req -in ./chapter_3/ex_12_server-csr.pem -signkey ./chapter_3/ex_12_server-key.pem -out ./chapter_3/ex_12_server-cert.pem
const https = require("https");
const fs = require("fs");

const secureHttp = https.createServer(
  {
    key: fs.readFileSync("./chapter_3/ex_12_server-key.pem"),
    cert: fs.readFileSync("./chapter_3/ex_12_server-cert.pem"),
  },
  (req, res) => {
    res.writeHead(200);
    res.end("Server has responded!!");
  }
);

secureHttp.listen(443, () => console.log("Server is listening on port 443"));
secureHttp.on("error", (err) => console.error(err));
