/**
 * Conventions for designing/structuring best practice/standard callbacks
 * 1. The first argument returned toa callback function is an error object/message. if no error is to be reported simply pass null.
 * 2. When passing a callback to a function, it should be the last slot of the functions argument list.
 * 3. Any number of arguments can exist between the error and the callback
 */
const mockDataFetching = (id, callback) => {
  //simulating a call to a database uding setTimeout
  setTimeout(() => {
    const data = {
      id: 230,
      name: "User",
    };

    //actually db fetching would wrap this in a try catch block and pass the error to the callback. but here we simulate it without any error and set it to null as per convention
    const error = null;

    //simulating a successful call
    callback(error, data);
  }, 1000);
};

//calling the function
mockDataFetching(230, (error, data) => {
  if (error) return console.error(error);
  console.log(data);
});
