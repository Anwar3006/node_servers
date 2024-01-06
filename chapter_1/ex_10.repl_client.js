// Create an interactive REPL that allows us to execute Javascript code on a remote server.
/**
 * Client Side (stdin/stdout):
 * The first part of the code connects to a server using TCP/IP (net.connect(4040)). Then, it pipes data from the standard input (process.stdin) to the socket and from the socket to the standard output (process.stdout).
 * Essentially, whatever you type in the terminal on the client side (stdin) gets sent to the server, and whatever the server sends back gets displayed in the terminal (stdout).
 */
const net = require("net");

//connect to server
const socket = net.connect(4040);
//pipe data from stdin to server
process.stdin.pipe(socket);
//pipe data from server to stdout
socket.pipe(process.stdout);
