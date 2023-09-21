const zmq = require('zeromq');

const clients = {};

async function run() {
  const router = new zmq.Router();

  // Привязываем роутер к порту и адресу
  await router.bind('tcp://127.0.0.1:5555');
  console.log('Сервер привязан к порту 5555');

  async function handleIncomingMessages() {
    for await (const [clientId, delimiter, message, ...args] of router) {
      clients[`${clientId}`] = clientId;

      console.log('clientId', clientId);
      console.log(
        'args',
        args.map((a) => a.toString())
      );

      if (delimiter && message) {
        console.log('delimiter', delimiter.toString());
        console.log('message', message.toString());
        router.send([clientId, message, 5, 6, 7, 8]);
      } else {
        console.log('message', delimiter.toString());
        router.send([clientId, delimiter]);
      }
      console.log('\n');
    }
  }

  // Обработка входящих сообщений
  handleIncomingMessages();

  setTimeout(() => {
    console.log('start');
    const clientIds = Object.values(clients);
    for (const clientId of clientIds) {
      router.send([clientId, 'Привет, клиент!']);
    }
  }, 3000);
}

run();
