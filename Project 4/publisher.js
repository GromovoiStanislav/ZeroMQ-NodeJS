import { Publisher } from 'zeromq';

const sock = new Publisher();

await sock.bind('tcp://127.0.0.1:7000');
console.log('[x] To exit type "exit"');
console.log('Type a message...');

process.stdin.on('data', async (chunk) => {
  const str = chunk.toString().trim();
  if (str === 'exit') {
    process.exit(0);
  }

  await sock.send(['my-messenger-2', JSON.stringify({ message: str })]);
});
