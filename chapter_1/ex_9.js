// REPL = READ-EVAL-PRINT Loop represents the Node shell

//Node.js provides a REPL (Read-Eval-Print Loop) environment, which is essentially an interactive shell for executing JavaScript code.
//When you run the node command without any arguments in your terminal, it launches the Node.js REPL.

//The REPL reads the JavaScript code you enter, evaluates it, prints the result (if any), and then loops back to wait for more input.
require("repl").start("=> ").context.sayHello = () => {
  return "Hello World";
};
