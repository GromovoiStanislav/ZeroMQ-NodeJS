const zmq = require('zeromq');
const { basename } = require('node:path');

const n = parseInt(process.argv[2], 10);
if (isNaN(n)) {
  console.warn('Usage: %s number', basename(process.argv[1]));
  process.exit(0);
}

async function run() {
  const sock = new zmq.Request();

  sock.connect('tcp://127.0.0.1:3000');
  console.log('Producer bound to port 3000');

  await sock.send(n);
  const [result] = await sock.receive();
  console.log(result.toString());
}

run();
