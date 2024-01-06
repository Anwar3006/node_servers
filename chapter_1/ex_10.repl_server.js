/**
 * Server Side (REPL over TCP/IP):
 * The second part of the code creates a TCP server (net.createServer) that listens on port 4040.
 * When a client connects to this server, it starts a REPL (Read-Eval-Print Loop) session using the repl.start() method.
 * This REPL session allows you to execute JavaScript commands on the server side. The input and output of the REPL session are both connected to the socket, so whatever you type on the client side gets sent to the server, evaluated, and then the result is sent back to the client.
 */

const net = require("net");
const repl = require("repl");

//server
const server = net
  .createServer((socket) => {
    repl
      .start({
        prompt: "=> ",
        input: socket,
        output: socket,
        terminal: true,
      })
      .on("exit", () => {
        socket.end();
      });
  })
  .listen(4040);
