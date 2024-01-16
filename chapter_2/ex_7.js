// using setInterval returns an object which can be used to cancel the interval loop

const intervalObj = setInterval(() => {
  console.log("Hello from setInterval");
}, 500);

setTimeout(() => clearInterval(intervalObj), 3000);
