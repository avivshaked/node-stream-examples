const fs = require('fs');
const bartQuotes = require('../assets/bartQuotes');
const getMemoryUsed = require('../utils/getMemoryUsed');

let numberOfLines = parseFloat(process.argv[2] || '1000');
let interval;

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function writeBartFile( callback) {
  console.log('Creating a write file stream');
  const bartFile = fs.createWriteStream('bart.txt');
  let ok = true;
  let i = numberOfLines - 1;
  function write() {
    do {
      i--;
      if (i === 0) {
        // last time!
        bartFile.end(`${bartQuotes[i%bartQuotes.length]}\n`);
        callback();
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = bartFile.write(`${bartQuotes[i%bartQuotes.length]}\n`);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains

      bartFile.once('drain', write);
    }
  }
  console.log('Writing Bart wisdom to the write stream.');
  write();
}

console.log(`Writing bart data to file with ${numberOfLines} lines`);
writeBartFile(() => {
  // This will run when we finish writing
  console.log('finished writing bart file');
  clearInterval(interval);
});

console.log('Main thread available');

// Demonstrate thread availability
interval = setInterval(() => console.log('Possible to do something since the thread is available.'), 2000);
process.on('exit', () => console.log(getMemoryUsed()));

