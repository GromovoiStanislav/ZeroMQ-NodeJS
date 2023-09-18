import { Pull } from 'zeromq';
const sock = new Pull();

sock.connect('tcp://127.0.0.1:7000');

console.log('Server is ready listening on port 7000');
console.log('[x] To exit press CTRL+C');
console.log('Listening for messages...');

for await (const msg of sock) {
  const { message } = JSON.parse(msg.toString());
  console.log('Message received:', message);
}
