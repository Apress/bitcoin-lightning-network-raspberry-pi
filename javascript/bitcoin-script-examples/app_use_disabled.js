let evaluate = require('bitcoin-script').evaluate;
let script = 'OP_2 OP_2 OP_MUL OP_4 OP_EQUAL OP_VERIFY';
let useDisabledOpCodes = true;
console.log(evaluate(script, useDisabledOpCodes));
