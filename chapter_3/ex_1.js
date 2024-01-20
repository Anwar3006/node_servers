// Understanding the use of streams to continuously read or write data
// The Stream module provides an API for working with streams and it inherits from the EventEmitter class
// Readable, Writtable, Duplpex, Transform are the 4 types of streams.
// The Stream Interface provides an abstraction. Noting that an interface simply provides a blueprint of a class.
// Let's create a function constructor called Feed that inherits from the Readeble stream
const stream = require("stream");

// creates a custom readable stream
const Feed = (channel) => {
  const readable = stream.Readable({
    encoding: "utf8",
  });

  const news = ["Big Win!", "Stocks Down", "Actor Sad"];

  //implement the _read method, which is called whenever data is requested. Here we overwrite it with our own implementation.
  readable._read = () => {
    if (news.length) {
      return readable.push(news.shift() + "\n");
    }
    readable.push(null);
  };
  return readable;
};

const feed = Feed();
feed.on("readable", () => {
  var data = feed.read();
  data && process.stdout.write(data);
});
feed.on("end", () => console.log("No more news"));
