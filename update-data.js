const fs = require('fs');

fs.copyFileSync('node_modules/wise-quotes/db/quotes.json', 'data/quotes.json');
console.log('Data file [quotes.json] was copied.');
