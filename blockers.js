const fs = require('fs');
let fileContent = 'former content';
fs.readFile('input.txt', (err, data) => {
    if(err) console.log(err);
    fileContent = data.toString();
    console.log('Hi, I just finished the file');
    console.log(fileContent);
});
console.log(`File content is ${fileContent}`);
