// On the topic of events, there exists some events specific to files called file events
// This program will watch this file for any changes, rename itself, log the change, and exit the watch event
// persistent set to false means if the watcher is the only activity keeping this entire process alive then simply exit it.
const fs = require("fs");

fs.watch(__filename, { persistent: false }, (event, filename) => {
  console.log("Logged Event: " + event);
  console.log("Filename " + filename);
});

setImmediate(() => {
  fs.rename(__filename, __filename + ".new", () => {});
});
