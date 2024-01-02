// Node allows I/O operations to be performed in an event-oriented manner.
// The use of Read/Write streams in an asynchronous manner upholds Node's characteristic of being asynchronous, non-blocking.
const Readable = require("stream").Readable;
const createWriteStream = require("fs").createWriteStream;

//Create a Readable object and continuous push data to it, to signify EOF you push null.
const readable = new Readable();
var count = 0;

readable._read = () => {
  if (++count > 10) {
    return readable.push(null);
  }
  setTimeout(() => {
    readable.push(count + "\n");
  }, 500); //as soon as data is pushed into the stream, it triggers the pipe function and the data is logged to stdout.
};

//pipe(output) the data to screen(stdout)
// readable.pipe(process.stdout);

//instead of piping it to stdout, we will persist the data in a file
const writeStream = createWriteStream("./chapter_1/counter.txt", {
  flags: "w",
  mode: 0o666,
});
readable.pipe(writeStream);
