// use of WeakMaps
const owners = new WeakMap();
let tasks = {
  title: "Create blog",
};

owners.set(tasks, "John");

const owner = (task) => {
  if (owners.has(task)) {
    return console.log("owner is: " + owners.get(task)); //John
  }
  console.log("no owner");
};

// owner(tasks); // owner is: John

//remove reference to the key object tasks
tasks = null;

owner(tasks); // no owner, now tasks variable has no reference to the tasks object inside the weakmap so gc removes it
