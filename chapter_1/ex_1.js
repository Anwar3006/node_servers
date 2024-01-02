// learn to use the Node eventEmitter to convert common class objects to events
// by creating an eventEmitter object and assigning it to the constructor functions' prototype

const EventEmitter = require("events").EventEmitter;

// this is a class, it wont work when we directly assign the EventEmitter prototype because
class Counter extends EventEmitter {
  constructor(count) {
    super();
    this.count = count;
  }

  increment() {
    this.count++;
    this.emit("incremented", this.count);
  }
}

// const Counter = function (count) {
//   this.count = count;

//   this.increment = function () {
//     this.count++;
//     this.emit("incremented", this.count);
//   };
// };

// Counter.prototype = new EventEmitter(); throws an error, because we arent directly assigning the EventEmitter prototype to the constructor prototype but instead, assigning an instance of the EventEmitter
// To resolve this, you should set the prototype to EventEmitter.prototype
Counter.prototype = EventEmitter.prototype;
const counterObj = new Counter(10);

//callback
const callback = (count) => {
  console.log("count is: " + count);
};

//all objects will now inherit from the eventEmitter because we assigned an EventEmitter object to the constructor prototype
counterObj.addListener("incremented", callback);
counterObj.increment(); // 11
counterObj.increment(); // 12
counterObj.removeListener("incremented", () => console.log("removed listener"));
