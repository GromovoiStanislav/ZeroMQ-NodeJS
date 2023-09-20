const zmq = require('zeromq');

function createAndConnectSocket(address) {
  const socket = new zmq.Dealer();
  socket.connect(address);
  return socket;
}

async function handleIncomingMessages(socket, name) {
  for await (const [msg, ...args] of socket) {
    console.log('args', args);

    console.log(`Сокс ${name} получил сообщение:`, msg.toString());

    console.log('\n');
  }
}

async function run() {
  const address = 'tcp://127.0.0.1:5555';

  const dealer1 = createAndConnectSocket(address);
  const dealer2 = createAndConnectSocket(address);

  // Обработка входящих сообщений
  handleIncomingMessages(dealer1, '1');
  handleIncomingMessages(dealer2, '2');

  // Отправляем запросы на сервер ROUTER
  await dealer1.send('Запрос1 от клиента 1');
  await dealer1.send('Запрос2 от клиента 1');
  await dealer2.send('Запрос1 от клиента 2');
  await dealer1.send('Запрос3 от клиента 1');
  await dealer1.send('Запрос4 от клиента 1');
  await dealer2.send(['5', 'Запрос 2 от клиента 2', 'a', 'b']);

  setTimeout(() => {
    dealer1.close();
    dealer2.close();
  }, 10000);
}

run();
