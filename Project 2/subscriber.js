const zmq = require('zeromq');

async function run() {
  const sock = new zmq.Subscriber();

  sock.connect('tcp://127.0.0.1:3000');
  sock.subscribe('kitty cats');
  console.log('Subscriber connected to port 3000');

  for await (const [topic, message] of sock) {
    console.log('received a message related to:', topic.toString());
    console.log('containing message:', message.toString());
  }
}

run();
