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
// inheritance in classes
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

## Constructor Functions

- A constructor function is a simply a way of modularizing pieces of code into a blueprint that represents the properties and methods that all instances of the function will have, over here the constructor function is a plain old javascript function with no special declarative keywords like `class`.
- The syntax of a cF is typically just a function within which you list the properties and subfunctions that each instance can use by using the `this` key word. Subfunctions created in cFs are not stored in the classes' prototype object, instead, each instance gets a copy of the methods and variables declared within the cF. Yes, they all take up memory and as you start to work with instances in the millions then you'd potentially be working with lots of memory usage by your application.
- Prototpe inheritance by constructor functions provided the traditional wa of inheritance, before classes. They tpicall worked by assigning the prototype of the class you want to inherit to the prototype of your class thereby exteposing the properties and methods to for your class to use.

```javascript
const Counter = function (count) {
  this.count = count;

  this.increment = function () {
    this.count++;
    this.emit("incremented", this.count);
  };
};

// Prototype inheritance
Counter.prototype = EventEmitter.prototype;
```
