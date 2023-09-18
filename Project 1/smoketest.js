const zmq = require('zeromq');
const sock = zmq.socket('push');

sock.bind('tcp://127.0.0.1:3000', (error) => {
  if (error) {
    console.log(error);
    process.exit(0);
  }

  console.log('Producer bound to port 3000');
  setTimeout(function () {
    sock.send('test');
  }, 500);

  setTimeout(function () {
    sock.close();
  }, 1000);
});
