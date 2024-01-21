// Now let us create a custom Writable Stream object, and overwrite the write method
const stream = require("stream");

const writable = new stream.Writable({
  // highWaterMark: 16000 //setting the write buffer size to 16kb = 16,383
  highWaterMark: 10, //intentional allocate buffer size of 10
});
writable._write = (chunk, encoding, callback) => {
  process.stdout.write(chunk);
  callback();
};

//listening for the drain event. The buffer stream will emit a drain event whenever it is safe to write more data to it.
//this is to prevent writing more data than is being read.
writable.on("drain", () => {
  writable.write("W\n");
});

const buf = Buffer.alloc(20, "A", "utf-8");
console.log(writable.write(buf.toString()));
