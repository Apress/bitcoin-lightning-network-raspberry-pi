const Client = require('bitcoin-core');

// setup client chain & access data
const client = new Client({
  network: 'regtest',
  username: 'raspiuser',
  password: 'mypassword',
});

// Use an asynchronous function for several async/await calls.
// Alternatively, all of the below calls could also be done
// by using JavaScript "Promise" facilities.
(async function() {

  // query wallet balance
  const balance = await client.getBalance();
  console.log(`Balance is: ${balance}`);

  // create new address
  const recipient = await client.getNewAddress();
  console.log(`Got new address: ${recipient}`);

  // optionally, unlock your wallet with a passphrase
  // comment it out if wallet is not password enrypted
  await client.walletPassphrase('mypassword', 10);
  
  // sent 10BTC to previously created address
  const txid = await client.sendToAddress(recipient, 10);
  console.log(`Created transaction: ${txid}`)

  // generate 10 more blocks to make transaction confirmed
  const blocks = await client.generate(10);
  console.log(`Generated blocks: ${JSON.stringify(blocks, null, 3)}`);

  // get detailed transaction information
  const tx = await client.getTransaction(txid);

  // copy certain transaction fields into a new object
  const shorttx = { 
                     confirmations: tx.confirmation, 
                     blockhash: tx.blockhash, 
                     txid: tx.txid, 
                     details: tx.details 
                  };

  // print out distilled transaction data
  console.log(`Transaction data: ${JSON.stringify(shorttx, null, 4)}`);

}());