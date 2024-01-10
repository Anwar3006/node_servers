// Working with Child Processes in Node
const cp = require("child_process");

const child = cp.fork(__dirname + "/ex_2.childProcess.js");

//when child sends message, log it to terminal
child.on("message", (message) => {
  process.stdout.write("Child said: " + message, "utf-8");
});

//reply child with this
child.send("I Love You");
