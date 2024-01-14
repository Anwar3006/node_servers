// To solve this race condition is similar to solving any other race condition: execute one before the other
// in this case we will onl emit the event on the next tick
const events = require("events");

const getEmitter = () => {
  var emitter = new events.EventEmitter();
  //emit event on next tick
  process.nextTick(() => {
    emitter.emit("started on next tick");
  });
  return emitter;
};

const emitter = getEmitter();
emitter.on("started on next tick", () =>
  console.log("event emitted, solved race condition")
);

//Here the attachment of the on(start handler is allowed to occur prior to the emission of the start event by the emitter instantiated in getEmitter.
//this is because the emit function is delayed using nextTick allowing the process to bind the handler to the start event.
