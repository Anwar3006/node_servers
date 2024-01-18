var fs = require("fs");
var EventEmitter = require("events").EventEmitter;
var pos = 0;
var messenger = new EventEmitter();
// Listener for EventEmitter
messenger.on("message", function (msg) {
  console.log(++pos + " MESSAGE: " + msg);
});
// (A) FIRST
console.log(++pos + " FIRST"); //gets executed 1st in the main thread.

//  (B) NEXT
process.nextTick(function () {
  console.log(++pos + " NEXT"); //gets executed 4th because nextTick executes before any I/O or timer events.
});

// (C) QUICK TIMER
setTimeout(function () {
  console.log(++pos + " QUICK TIMER"); //gets executed 5th, although it is a timer event, the time has expired within the current event loop and will executed.
}, 0);
// (D) LONG TIMER
setTimeout(function () {
  console.log(++pos + " LONG TIMER"); //gets executed 9th, within the next event loop provided the timer has expired by then.
}, 10);
// (E) IMMEDIATE
setImmediate(function () {
  console.log(++pos + " IMMEDIATE"); //gets executed 8th, after I/O events have been executed.
});

// (F) MESSAGE HELLO!
messenger.emit("message", "Hello!"); //gets executed 2nd because emit is synchronous and is sequentially placed above I.

// (G) FIRST STAT
fs.stat(__filename, function () {
  console.log(++pos + " FIRST STAT"); //gets executed 6th, this is an I/O event(file system event).
});
// (H) LAST STAT
fs.stat(__filename, function () {
  console.log(++pos + " LAST STAT"); //gets executed 7th, another I/O event.
});

// (I) LAST
console.log(++pos + " LAST"); //gets executed 3rd in the main thread
