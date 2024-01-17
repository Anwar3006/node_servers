// The unref method allows the developer to assert the following instructions:
// when this timer is the only event source remaining for the event loop to process, go ahead and terminate the process.

// the setInterval function can be used in cases where some external I/O operationis needed by the program example:
// periodic polling for data from a remote server.
// clearInterval is used to explicitly stop the timer but what if we only want to stop the interval timer only when the scheduled callback has executed and produced a desired result
// unref can be used for this case.

//will run once at 1000ms after which the unref will be triggered
setTimeout(() => console.log("stop now"), 1000);

//will run every 500ms
const timer = setInterval(() => {
  // perform some external I/O operation, e.g. fetch data from a remote server
  console.log("polling for data...");
}, 100);

timer.unref();

// timer.ref() wil return the timer to it's normal behavior, meaning the stop now will be printed but after that
// the timer will continue to print polling for data... instead of being stopped.
