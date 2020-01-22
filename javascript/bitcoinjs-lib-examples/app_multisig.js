const bitcoin = require('bitcoinjs-lib');

const mainnet = bitcoin.networks.mainnet;

const keyPair1 = bitcoin.ECPair.makeRandom({ network: mainnet });
const keyPair2 = bitcoin.ECPair.makeRandom({ network: mainnet });
const keyPair3 = bitcoin.ECPair.makeRandom({ network: mainnet });

const pubkeys = [
  keyPair1.publicKey,
  keyPair2.publicKey,
  keyPair3.publicKey
];
const multisig = bitcoin.payments.p2sh({
  redeem: bitcoin.payments.p2ms({ m: 2, pubkeys })
})

console.log(multisig.address);
