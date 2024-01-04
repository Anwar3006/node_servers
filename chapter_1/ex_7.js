/**
 * Receiving data from a network socket (input stream) and
 * sending the processed data to another network socket (output stream).
 *
 * how to approach this:
 * create client, UDP client -> sends data -> server, UDP server -> receives data, processes it, writes it to file.
 */
const udp = require("dgram");

//Server
const server = udp.createSocket("udp4");
server.bind(4040);
server.on("message", (message) => {});
