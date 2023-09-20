const zmq = require('zeromq');

async function createAndBindSocket(address) {
  const socket = new zmq.Pair();
  await socket.bind(address);
  return socket;
}

function createAndConnectSocket(address) {
  const socket = new zmq.Pair();
  socket.connect(address);
  return socket;
}

async function handleIncomingMessages(socket, name) {
  for await (const [msg] of socket) {
    console.log(`Сокс ${name} получил сообщение:`, msg.toString());
  }
}

async function run() {
  const address = 'tcp://127.0.0.1:5555';

  const socket1 = await createAndBindSocket(address);
  const socket2 = createAndConnectSocket(address);
  const socket3 = createAndConnectSocket(address);

  handleIncomingMessages(socket1, '1');
  handleIncomingMessages(socket2, '2');
  handleIncomingMessages(socket3, '3'); // не будет работать

  socket1.send('Привет, это сокс 1!');
  socket2.send('Привет, это сокс 2!');
  socket3.send('Привет, это сокс 3!');

  setTimeout(() => {
    socket1.close();
    socket2.close();
    socket3.close();
  }, 3000);
}

run();

// >> Сокс 1 получил сообщение: Привет, это сокс 2!
// >> Сокс 2 получил сообщение: Привет, это сокс 1!
