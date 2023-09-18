import { Push } from 'zeromq';

const sock = new Push();

await sock.bind('tcp://127.0.0.1:7000');
console.log('[x] To exit type "exit"');
console.log('Type a message...');

process.stdin.on('data', async (chunk) => {
  const str = chunk.toString().trim();
  if (str === 'exit') {
    process.exit(0);
  }

  await sock.send(JSON.stringify({ message: str }));
});
