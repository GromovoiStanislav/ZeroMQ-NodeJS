const zmq = require('zeromq');
const sock = zmq.socket('push');

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Producer bound to port 3000');

setInterval(function () {
  console.log('sending work');
  sock.send('some work');
}, 500);

// sock.bind('tcp://127.0.0.1:3000', (error) => {
//   if (error) {
//     console.log(error);
//     process.exit(0);
//   }

//   console.log('Producer bound to port 3000');

//   setInterval(function () {
//     console.log('sending work');
//     sock.send('some work');
//   }, 500);
// });
