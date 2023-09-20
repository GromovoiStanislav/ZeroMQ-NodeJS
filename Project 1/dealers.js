const zmq = require('zeromq');
const dealer1 = zmq.socket('dealer');
const dealer2 = zmq.socket('dealer');

// Подключаемся к серверу ROUTER
dealer1.connect('tcp://127.0.0.1:5555');
dealer2.connect('tcp://127.0.0.1:5555');

// Обработка входящего ответа от сервера ROUTER
dealer1.on('message', (message) => {
  console.log(`Получен ответ от сервера 1: ${message.toString()}`);
});

dealer2.on('message', (message, delimiter) => {
  if (delimiter) {
    console.log('delimiter', delimiter.toString());
  }
  console.log(`Получен ответ от сервера 2: ${message.toString()}`);
});

// Отправляем запросы на сервер ROUTER
dealer1.send('Запрос1 от клиента 1');
dealer1.send('Запрос2 от клиента 1');
dealer1.send('Запрос3 от клиента 1');
dealer1.send('Запрос4 от клиента 1');
dealer2.send('Запрос1 от клиента 2');
dealer2.send(['5', 'Запрос 2 от клиента 2']);
