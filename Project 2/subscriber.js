const zmq = require('zeromq');

async function run() {
  const sock = new zmq.Subscriber();
  await sock.bind('tcp://127.0.0.1:3000');
  console.log('Subscriber bound to port 3000');

  sock.subscribe('kitty cats');

  for await (const [topic, message] of sock) {
    console.log('received a message related to:', topic.toString());
    console.log('containing message:', message.toString());
  }
}

run();
