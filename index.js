const http = require('http');

// http.createServer( (request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Welcome to my first server!');
// }).listen(8081);

//A function that receives a callback as parameter
const sayHiAfterTask = (callback) => {
    //After some task
    callback("Hi", "Emmanuel");
};

const callbackFunc = (message, name) => {
    console.log(`${message}, ${name}.`)
};

const age = 2;
console.log(2);
//This is where we actually call the function and pass the callback
sayHiAfterTask(callbackFunc);
