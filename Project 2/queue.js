const zmq = require('zeromq');

async function runProducer() {
  const sock = new zmq.Dealer();

  await sock.bind('tcp://127.0.0.1:3000');
  console.log('Producer bound to port 3000');

  await sock.send('Hello');
  await sock.send('World');
  await sock.send('!');
  await sock.send('EXIT');
  sock.close();
  console.log('Producer disconnected');
}

async function runReceiver() {
  const receiver = new zmq.Dealer();
  receiver.connect('tcp://127.0.0.1:3000');
  console.log('Receiver connected to port 3000');

  for await (const [msg] of receiver) {
    if (msg.toString() === 'EXIT') {
      receiver.close();
      console.log('Receiver disconnected');
    } else {
      console.log(`received: ${msg}`);
    }
  }
}

runProducer();

setTimeout(runReceiver, 3000);
