// in ex_1.js we create a custom Readable stream using a function constructor that inherits from the Readable stream.
// In the options passed to the initialization of the Readable stream we didnt pass the objectMode property, meaning we cant read object just string or buffer
// In this implementation we will enable the functionality of reading object
const stream = require("stream");

const ToDo = () => {
  const readable = new stream.Readable({
    objectMode: true,
  });

  const tasks = [
    { 1: "Clean room" },
    { 2: "Wash Dishes" },
    { 3: "Buy Groceries" },
  ];

  readable._read = () => {
    if (tasks.length) {
      return readable.push(tasks.shift());
    }
    readable.push(null);
  };

  return readable;
};

const todo = ToDo();
todo.on("data", (data) => {
  process.stdout.write(JSON.stringify(data) + "\n");
});
todo.on("end", () => {
  console.log("\t=> Stream ended!");
});
