// Now let us use Transform Stream. typically in cases where you'd want too process chunks received
// Write a custom Transform stream that takes in ASCII codes and converts them to ther respective characters
const stream = require("stream");

const transform = new stream.Transform();
transform._transform = (buffer, encoding, cb) => {
  const ascii_rep = String.fromCharCode(new Number(buffer) + "\n");
  transform.push(ascii_rep);
  cb();
};

process.stdin.pipe(transform).pipe(process.stdout);
