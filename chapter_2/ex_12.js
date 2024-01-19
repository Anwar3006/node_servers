/**
 * Handling errors in execution contexts
 * we use domains to wrap our code blocks such that all events that are emitted in that domain will be handled in the same way
 * this allows for more informative stack traces
 */
const domain = require("node:domain");
const fs = require("fs");

const fsDomain = domain.create();
fsDomain.on("error", (error) => {
  console.error("FS error: " + error);
});

const appDomain = domain.create();
appDomain.on("error", (error) => {
  console.error("App error: " + error);
});

appDomain.run(() => {
  a = b;
  process.nextTick(() => {
    fsDomain.run(() => {
      fs.open("no_file_here", "r", (err, fd) => {
        if (err) {
          throw err;
        }
      });
    });
  });
});
