const zmq = require('zeromq'),
  sock = zmq.socket('pub');

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Publisher bound to port 3000');

setInterval(function () {
  console.log('sending a multipart message envelope');
  sock.send(['kitty cats', 'meow!']);
}, 500);

// sock.bind('tcp://127.0.0.1:3000', (error) => {
//   if (error) {
//     console.log(error);
//     process.exit(0);
//   }

//   console.log('Publisher bound to port 3000');

//   setInterval(function () {
//     console.log('sending a multipart message envelope');
//     sock.send(['kitty cats', 'meow!']);
//   }, 500);
// });
