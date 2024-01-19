// Let's apply what we've learned. The goal is to create a server that a client can connect to and receive updates from Twitter.
// We will first create a process to query Twitter for any messages with the hashtag #nodejs, and writes any found messages to a tweets.txt file in 140-byte chunks.
// We will then create a network server that broadcasts these messages to a single client.
// Those broadcasts will be triggered by write events on the tweets.txt file.
// Whenever a write occurs, 140-byte chunks are asynchronously read from the last known client read pointer.
// This will happen until we reach the end of the file, broadcasting as we go.
// Finally, we will create a simple client.html page, which asks for, receives, and displays these messages.

/**
 * While this example is certainly contrived, it demonstrates:
• Listening to the filesystem for changes and responding to those events
• Using data stream events for reading and writing files
• Responding to network events
• Using timeouts for polling state
• Using a Node server itself as a network event broadcaster
 */
const fs = require("fs");
const http = require("http");

let theUser = null; //the client
var userPos = 0; //a pointer to where the user has read to in the jokess file
var jokesFile = "./chapter_2/jokes.txt"; //the file we are watching for changes

//create the server
const httpServer = http
  .createServer((request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    });

    theUser = response;
    response.write(":" + Array(2049).join(" ") + "\n");
    response.write("retry: 2000\n");

    response.socket.on("end", () => {
      console.log("client disconnected");
      theUser = null;
    });
  })
  .listen(4040);

//function to read from the tweets file
const readAndSendNext = (fd) => {
  const buf = Buffer.alloc(1024); //allocate a buffer of 1024 bytes
  fs.read(
    fd,
    buf,
    0,
    buf.length,
    userPos * buf.length,
    (err, bytesRead, buffer) => {
      if (!err && bytesRead > 0 && theUser) {
        const data = buffer.toString("utf8", 0, bytesRead);
        userPos += data.split("\n").length - 1; //increment position pointer based on lines read.
        theUser.write(`data: ${data}\n\n`); //write buffer to writable stream(send to client)
        return process.nextTick(() => readAndSendNext(fd)); //using nextTick to make repeat this entire process until we get an error or reach EOF
      }
    }
  );
};

//function to watch the file
const start = () => {
  fs.open(jokesFile, "r", (err, fd) => {
    if (err) {
      setTimeout(start, 1000); //file may not exist so poll using setTimeout until file exists.
      return;
    }

    fs.watch(jokesFile, (event, filename) => {
      if (event === "change") {
        readAndSendNext(fd);
      }
    });
  });
};
start();

//#################### function to query for jokes, create buffer to store the joke, and write to file ####################
//function to create a new buffer
const cleanBuffer = (len) => {
  return Buffer.alloc(len).fill("\0");
};

var jokePos = 0; //keep track of where we have written to within the jokes file
const writeStream = fs.createWriteStream(jokesFile, { flags: "a" });
const getJokes = async () => {
  try {
    var jokeJson = await fetch(
      "https://v2.jokeapi.dev/joke/Any?type=single"
    ).then((response) => response.json());

    if (jokeJson.error === true) {
      throw new Error("Error fetching joke");
    }

    //write joke to jokesfile
    writeStream.write(jokeJson.joke + "\n\n", () =>
      console.log("Joke written to file")
    );

    //set timer to recall function after 10 seconds
    setTimeout(getJokes, 10000);
  } catch (error) {
    setImmediate(getJokes); //if error, catch the error and try again
  }
};
getJokes();
