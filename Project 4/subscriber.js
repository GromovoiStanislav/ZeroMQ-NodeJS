import { Subscriber } from 'zeromq';

const sock = new Subscriber();

sock.connect('tcp://127.0.0.1:7000');
sock.subscribe('my-messenger');

console.log('Server is ready listening on port 7000');
console.log('[x] To exit press CTRL+C');
console.log('Listening for messages...');

for await (const [topic, message] of sock) {
  console.log('received a message related to:', topic.toString());
  const { message: msg } = JSON.parse(message.toString());
  console.log('Message received:', msg);
}
