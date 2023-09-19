const zmq = require('zeromq');
const sock = new zmq.Pull();

const run = async () => {
  await sock.bind('tcp://127.0.0.1:7000');
  console.log('Server is ready listening on port 7000');

  for await (const msg of sock) {
    console.log(`received job ${msg.toString()}`);
  }
};

run();
