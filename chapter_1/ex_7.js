/**
 * Receiving data from a network socket (input stream) and
 * sending the processed data to another network socket (output stream).
 *
 * how to approach this:
 * create client, UDP client -> sends data -> server, UDP server -> receives data, processes it, writes it to file.
 */
const udp = require("dgram");
const path = require("path");
const fs = require("fs");

//Server
const server = udp.createSocket("udp4");
server.bind(4040);
//create file and persist message inside the file
const filePath = path.join(__dirname + "/" + "storedUDPMessages.txt");
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "", "utf-8");
  console.log("File Storage Created!");
}

const outputStream = fs.createWriteStream(filePath, {
  flags: "a",
  mode: 0o666,
});

server.on("message", (message, info) => {
  let serverResponse = "message received: " + message + " from " + info.address;
  server.send(serverResponse, info.port, info.address, (err) => {
    if (err) console.error(err);
  });

  //persist message in file
  outputStream.write(
    `${info.address}:${info.port} --> ${message.toString().toUpperCase()}\n`
  );
});
server.on("close", () => outputStream.end());

//client
const client = udp.createSocket("udp4");
process.stdin.on("data", (data) => {
  client.send(data, 4040, "localhost", (err) => {
    if (err) throw err;
  });
});
