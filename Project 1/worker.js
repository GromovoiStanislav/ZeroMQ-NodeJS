const zmq = require('zeromq');
const sock = zmq.socket('pull');

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Worker bound to port 3000');

sock.on('message', function (msg) {
  console.log('work: %s', msg.toString());
});

// sock.bind('tcp://127.0.0.1:3000', (error) => {
//   if (error) {
//     console.log(error);
//     process.exit(0);
//   }

//   console.log('Worker bound to port 3000');

//   sock.on('message', function (msg) {
//     console.log('work: %s', msg.toString());
//   });
// });
