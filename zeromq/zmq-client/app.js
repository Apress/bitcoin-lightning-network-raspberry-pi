// load zmq library
let zmq = require('zeromq');
let sock = zmq.socket('sub');

// connect with bitcoind
sock.connect('tcp://127.0.0.1:28332');

// subscribe to topic "hashblock"
sock.subscribe('hashblock');

// write diagnostic mesage to console
console.log('Connected to port 28332');

// setup even handler for processing incoming messages
sock.on('message', function(topic, message) {
  console.log('TOPIC: ', topic.toString(), ' - Block Hash:', message.toString('hex'));
});
