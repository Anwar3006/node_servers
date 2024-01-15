// setImmediate is part of the class of timers(ssetInterval, setTimeout).
// setImmediate is used to defer the execution of a callback until after an I/O and timer event.

const defferedCallback = () => {
  console.log("Hello from setImmediate");
};

setImmediate(defferedCallback);

setTimeout(() => {
  console.log("Hi from the setTimeout callback");
}, 2000);

/**
 * In your scenario, because there are no pending I/O events when both setImmediate and setTimeout are executed, the setImmediate callback will be executed first.
 * This is because setImmediate callbacks are always processed before any I/O events, timers, or other types of callbacks scheduled with setTimeout or setInterval.
 * But that is conditional, if the timer set has expired for the setInterval or setTimeout callback then it will be executed first, but within the context of our current
 * event loop, setImmediate will be executed before setTimeout.
 */
