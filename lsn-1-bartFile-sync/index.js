const fs = require('fs');
const bartQuotes = require('../assets/bartQuotes');
const getMemoryUsed = require('../utils/getMemoryUsed');

let bartText = '';
let numberOfLines = parseFloat(process.argv[2] || '1000');

console.log(`Creating bart data with ${numberOfLines} lines`);
for (let i = 0; i < numberOfLines; i++) {
  bartText += `${bartQuotes[i%bartQuotes.length]}\n`
}

console.log('Writing bart data to file');
fs.writeFileSync('bart.txt', bartText);

console.log('Thread available.');
process.on('exit', () => console.log(getMemoryUsed()));
