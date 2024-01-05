const udp = require("dgram");

const client = udp.createSocket("udp4");

client.on("connect", () => console.log("connected to server!"));
process.stdin.on("data", (data) => {
  client.send(data, 4040, "localhost", (err) => {
    if (err) throw err;
  });
});

client.on("message", (message) => console.log(message.toString()));
