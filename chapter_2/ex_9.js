// this program will run infinitely because of the while loop, the condition will never change because the while loop greedily
// overloads the event loop preventing the timer callback from even getting a chance to be scheduled

var stopp = false;
setTimeout(() => {
  console.log("inside setTimeout");
  stopp = true;
}, 1000);

while (stopp === false) {}
