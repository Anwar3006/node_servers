# Class Vs Constructor Functions

- Both are used to create objects and modularize properties and functions that are interrelated.

- The main differences between **classes** and **constructor** functions is in:
  - Syntax
  - Prototype Inheritance

## Class

- A class is a simply a way of modularizing pieces of code into a blueprint that represents the properties and methods that all instances of the class will have.
- The syntax of a class usually involves the use of a constructor to organize class parameters into properties. Methods created in classes are then stored in the classes' prototpe object and each instance of the class that implements that method would trace a reference to the method.
- Due to ECMAScript 2015(ES6), Javascript classes are regarded as `syntactic suagr over prototype-based inheritance`. Simply means that the classes provide a clean and convenient way of Inheritance(through the use of the `extends` keyword), over the traditional way implemented by Constructor functions.

```javascript
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
```
