const bitcoin = require('bitcoinjs-lib');

const mainnet = bitcoin.networks.mainnet;

const keyPair = bitcoin.ECPair.makeRandom({ network: mainnet });
const result = bitcoin.payments.p2sh({ 
  redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })
});
console.log(result.address);

