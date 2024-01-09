// Signals
// Signals are a form of inter-process/thread-to-thread communication within a Linux, Unix-like or
// POSIX-compliant operating system.

/**
 * Here we run a program and send a signal to interrupt the process
 */
setInterval(() => {}, 1e6);
process.on("SIGINT", () => {
  console.log("\nCaught interrupt signal");
  process.exit();
});
