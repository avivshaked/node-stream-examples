const fs = require('fs');
const bartQuotes = require('../assets/bartQuotes');
const getMemoryUsed = require('../utils/getMemoryUsed');

let numberOfLines = parseFloat(process.argv[2] || '1000');

console.log('Creating a write file stream');
const bartFile = fs.createWriteStream('bart.txt');

console.log(`Writing bart data to file with ${numberOfLines} lines`);
for (let i = 0; i < numberOfLines; i++) {
  bartFile.write(`${bartQuotes[i%bartQuotes.length]}\n`);
}
bartFile.end();

console.log('Main thread available');
process.on('exit', () => console.log(getMemoryUsed()));
process.on('error', () => console.log(getMemoryUsed()));
