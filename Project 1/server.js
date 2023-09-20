const zmq = require('zeromq');

async function run() {
  const sock = zmq.socket('rep');
  sock.bind('tcp://127.0.0.1:3000');
  console.log('Server bound to port 3000');

  sock.on('message', (msg) => {
    console.log(msg, parseInt(msg, 10)); // <Buffer 34> 4
    sock.send(2 * parseInt(msg, 10));
  });
}

run();
