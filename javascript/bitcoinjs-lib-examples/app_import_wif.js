const bitcoin = require('bitcoinjs-lib');

const wif = 'L12wE92KBbwS3RNFxeAnGLbmP5ibw8PRK2Lr1tfZrEvPqn1MP1MD';

console.log(`Using WIF key: ${wif}`);

const keyPair = bitcoin.ECPair.fromWIF(wif);
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

console.log(`Corresponding address: ${address}`);

