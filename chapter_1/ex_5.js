// use of WeakMaps
const owners = new WeakMap();
const tasks = {
    title: "Create blog"
}

owners.set(tasks, "John");
