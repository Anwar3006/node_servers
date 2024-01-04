/**
 * Working with V8
 * V8 is what Node runs on. V8 is a javascript engine written in C++
 * It compiles and executes javascript code in a virtual machine
 *
 * This program will break V8 as an attempt to understand it's limits
 */

var count = 0;
(function curse() {
  console.log(++count);
  curse();
})();

//this function has no exit condition, it will recursively call itself and add a stack to the frame
// each time it gets to the curse() call. This will eventuall exceed the allowable stack size and throw an error

//to check the max stack size that v8 allocates to all programs run:
//      node --v8-options | grep -e '--stack-size'

//to increase the stack size for your node app, there are two options:
//          1. run this command: node --stack-size=1200 ex_4.js; this will increase from 984kb to 1.2mb
//       OR 2. add this inside your node app, preferably at the top, before any other code
//                  const v8 = require('v8'); v8.setFlagsFromString('--stack-size=1200');
