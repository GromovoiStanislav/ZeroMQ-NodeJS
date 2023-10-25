const zmq = require('zeromq');
const sock1 = zmq.socket('sub');
const sock2 = zmq.socket('sub');
const sock3 = zmq.socket('pub'); //xpub

sock3.bindSync('tcp://127.0.0.1:3000');
console.log('Publisher bound to port 3000');

sock1.connect('tcp://127.0.0.1:3000');
console.log('Subscriber connected to port 3000');
sock1.subscribe('a');
sock1.subscribe('b');
sock1.on('message', (topic, message) => {
  console.log('received a message related to:', topic.toString());
  console.log('containing message:', message.toString());
});

sock2.connect('tcp://127.0.0.1:3000');
console.log('Subscriber connected to port 3000');
sock2.subscribe('b');
sock2.subscribe('c');
sock2.on('message', (topic, message) => {
  console.log('received a message related to:', topic.toString());
  console.log('containing message:', message.toString());
});

setInterval(() => {
  console.log('sending a multipart message envelope');
  sock3.send(['a', '1']);
  sock3.send(['b', '2']);
  sock3.send(['c', '3']);
}, 500);
