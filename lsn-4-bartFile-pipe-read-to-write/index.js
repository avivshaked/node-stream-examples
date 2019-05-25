const fs = require('fs');
const bartQuotes = require('../assets/bartQuotes');
const getMemoryUsed = require('../utils/getMemoryUsed');
const { Readable } = require('stream');

let numberOfLines = parseFloat(process.argv[2] || '1000');

console.log('Creating the bart write stream');
const bartFile = fs.createWriteStream('bart.txt');

let index = 0;
// Creating the quotes as a Read stream
const bartReadable = new Readable({
  read() {
    const i = index++;
    if (i === numberOfLines) {
      // pushing null will terminate the stream
      console.log('No more bart wisdom to push into the read stream');
      this.push(null);
    } else {
      this.push(`${bartQuotes[i % bartQuotes.length]}\n`);
    }
  },
});

console.log(`Writing bart data to file with ${numberOfLines} lines`);
console.log('piping the bart read stream into the bart file write stream');
bartReadable.pipe(bartFile);

console.log('Main thread available');

process.on('exit', () => console.log(getMemoryUsed()));

