const zmq = require('zeromq');
const sock = zmq.socket('sub');

// sock.bindSync('tcp://127.0.0.1:3000');
// console.log('Subscriber bound to port 3000');

// sock.subscribe('kitty cats');

// sock.on('message', function (topic, message) {
//   console.log('received a message related to:', topic.toString());
//   console.log('containing message:', message.toString());
// });

sock.bind('tcp://127.0.0.1:3000', (error) => {
  if (error) {
    console.log(error);
    process.exit(0);
  }

  console.log('Subscriber bound to port 3000');

  sock.subscribe('kitty cats');

  sock.on('message', (topic, message) => {
    console.log('received a message related to:', topic.toString());
    console.log('containing message:', message.toString());
  });
});
