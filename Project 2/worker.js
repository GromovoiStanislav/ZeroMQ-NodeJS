const zmq = require('zeromq');

async function run() {
  const sock = new zmq.Pull();
  await sock.bind('tcp://127.0.0.1:3000');
  console.log('Worker bound to port 3000');

  for await (const [msg] of sock) {
    console.log('work: %s', msg.toString());
  }
}

run();
