import { Dealer } from 'zeromq';

import { Queue } from './queue.js';

async function main() {
  const sender = new Dealer();
  sender.connect('tcp://127.0.0.1:5555');

  const queue = new Queue(sender);
  queue.send('hello');
  queue.send('world!');
  queue.send(null);

  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  const receiver = new Dealer();
  await receiver.bind('tcp://127.0.0.1:5555');

  for await (const [msg] of receiver) {
    if (msg.length === 0) {
      receiver.close();
      console.log('received: <empty message>');
    } else {
      console.log(`received: ${msg}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
