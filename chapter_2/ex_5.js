// Deffered Execution of callbacks using setTimeOut and setInterval
// We look at the use of deffered execution to order the execution of callbacks either before or after the processing of queued I/O events

//process.nextTick
//process.nextTick() allows us to execute a callback in the next tick of the event loop.
//Because all nextTick callbacks are placed at the head of the event queue and are executed synchronously to completion
// This is useful for cases where we want to execute a callback before processing any queued I/O or timer events.
// nextTick is primarily used to delay the result events to give a chance to the process to bind all callback to their appropriate emit events

/**
 * The below code presents a race condition where the start event is emitted synchronously but the event handler is executed asynchronously.
 * emitter.emit("start") is a synchronous way of emitting an event because emit function is inherently synchronous.
 * emitter.on("start", () => console.log("event emitted")), over here, the function to log the event is asynchronous.
 * The race condition here is that after the getEmitter() function is called, the event is emitted but there may not be enough time for the
 * event handler to be bound to the start event.
 */

const events = require("events");

const getEmitter = () => {
  var emitter = new events.EventEmitter();
  emitter.emit("start");
  return emitter;
};

const emitter = getEmitter();
emitter.on("start", () => console.log("event emitted"));
