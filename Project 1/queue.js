const zmq = require('zeromq');

async function runProducer() {
  const sock = zmq.socket('dealer');

  sock.connect('tcp://127.0.0.1:3000');
  console.log('Producer connected to port 3000');

  sock.send('Hello');
  sock.send('World');
  sock.send('!');
  sock.send('EXIT');
  sock.close();
  console.log('Producer disconnected');
}

function runReceiver() {
  const receiver = zmq.socket('dealer');
  receiver.bindSync('tcp://127.0.0.1:3000');
  console.log('Receiver bound to port 3000');

  receiver.on('message', function (msg) {
    if (msg.toString() === 'EXIT') {
      receiver.close();
      console.log('Receiver disconnected');
    } else {
      console.log(`received: ${msg}`);
    }
  });
}

runProducer();

setTimeout(runReceiver, 3000);
