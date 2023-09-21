const zmq = require('zeromq');
const router = zmq.socket('router');

// Привязываем роутер к порту и адресу
router.bind('tcp://127.0.0.1:5555', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Сервер привязан к порту 5555');
  }
});

const clients = {};

// Обработка входящих сообщений
router.on('message', (clientId, delimiter, message, ...args) => {
  clients[`${clientId}`] = clientId;

  console.log('clientId', clientId);
  console.log(
    'args',
    args.map((a) => a.toString())
  );

  if (message && delimiter) {
    console.log('delimiter', delimiter.toString());
    console.log('message', message.toString());
    console.log(
      'Получено сообщение от клиента',
      clientId,
      ':',
      message.toString()
    );

    // Отправляем ответ клиенту с помощью DEALER
    router.send([clientId, message, 1, 2, 3]);
  } else {
    console.log('message', delimiter.toString());
    console.log(
      'Получено сообщение от клиента',
      clientId,
      ':',
      delimiter.toString()
    );

    // Отправляем ответ клиенту с помощью DEALER
    router.send([clientId, delimiter]);
  }
});

setTimeout(() => {
  const clientIds = Object.values(clients);
  for (const clientId of clientIds) {
    router.send([clientId, 'Привет, клиент!']);
  }
}, 3000);
