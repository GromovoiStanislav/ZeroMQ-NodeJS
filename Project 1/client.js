const zmq = require('zeromq');
const sock = zmq.socket('req');

const { basename } = require('node:path');

const n = parseInt(process.argv[2], 10);
if (isNaN(n)) {
  console.warn('Usage: %s number', basename(process.argv[1]));
  process.exit(0);
}

sock.connect('tcp://127.0.0.1:3000');
console.log('Producer bound to port 3000');

sock.on('message', function (result) {
  console.log(result.toString());
});

sock.send(n);

setTimeout(() => sock.close(), 1000);
