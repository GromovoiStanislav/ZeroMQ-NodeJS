const zmq = require('zeromq/v5-compat');

const push = zmq.socket('push');
const sub = zmq.socket('pull');

///////////////////////////////////////////////////////
sub.bind('tcp://127.0.0.1:3456', (err) => {
  if (err) throw err;

  console.log('Worker bound to port 3456');

  sub.on('message', (msg) => {
    console.log(msg.toString());
  });
});

///////////////////////////////////////////////////////
push.connect('tcp://127.0.0.1:3456');

console.log('Pusher connected to port 3456');

setInterval(() => {
  push.send('message');
}, 500);

setTimeout(() => {
  push.close();
  sub.close();
  process.exit(0);
}, 5000);
