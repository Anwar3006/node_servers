// PassThrough is a special kind of Transfrom for when you dont want to transform the data.
// Over here we use PassThrough as an event spy, add a listener to an event, when we finish reading from a file
const fs = require("fs");
const stream = require("stream");

const spy = new stream.PassThrough();
spy.on("end", () => console.log("All data has been sent"));

fs.createReadStream("./chapter_3/passThru.txt").pipe(spy).pipe(process.stdout);
