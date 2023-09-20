const zmq = require('zeromq');

// Создаем и привязываем сокс типа "pair" к порту 3000
const socket1 = zmq.socket('pair');
socket1.bindSync('tcp://127.0.0.1:3000');

// Создаем socket2 типа "pair" и подключаем его к socket1
const socket2 = zmq.socket('pair');
socket2.connect('tcp://127.0.0.1:3000');

// Создаем socket3 типа "pair" и подключаем его к socket1
const socket3 = zmq.socket('pair');
socket3.connect('tcp://127.0.0.1:3000');

// Обработка входящих сообщений
socket1.on('message', (message) => {
  console.log('Сокс 1 получил сообщение:', message.toString());
});

socket2.on('message', (message) => {
  console.log('Сокс 2 получил сообщение:', message.toString());
});

socket3.on('message', (message) => {
  console.log('Сокс 3 получил сообщение:', message.toString()); //Ничего не получит
});

// Отправляем сообщения из всех sockets
socket1.send('Привет, это сокс 1!');
socket2.send('Привет, это сокс 2!');
socket3.send('Привет, это сокс 3!'); // Никто не услышит

setTimeout(() => {
  socket1.close();
  socket2.close();
  socket3.close();
}, 3000);

// >> Сокс 1 получил сообщение: Привет, это сокс 2!
// >> Сокс 2 получил сообщение: Привет, это сокс 1!
