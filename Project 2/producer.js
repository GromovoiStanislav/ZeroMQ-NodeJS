const zmq = require('zeromq');

async function run() {
  const sock = new zmq.Push();

  sock.connect('tcp://127.0.0.1:3000');
  console.log('Producer connected to port 3000');

  while (true) {
    await sock.send('some work');
    console.log('sending work');
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
}

run();
