let evaluate = require('bitcoin-script').evaluate;
let parse = require('bitcoin-script').parse;
let myScript = "OP_TRUE OP_VERIFY";

console.log('Script result is: ' + evaluate(myScript));
console.log('Parsed script is: ' + JSON.stringify(parse(myScript), null, 3));
