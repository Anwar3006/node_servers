//child process listens for message from parent and logs it
process.on("message", (message) => {
  console.log("Parent said " + message);
  process.send("I love you too!");
});
