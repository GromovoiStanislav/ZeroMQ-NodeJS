const ZMQ = require('zeromq');

const BROKER_SUB = '127.0.0.1:5554';
const BROKER_PUB = '127.0.0.1:5555';

const log = console.log;

const brokerListener = ZMQ.createSocket('sub');
const brokerPublisher = ZMQ.createSocket('pub');

brokerListener.bind('tcp://' + BROKER_SUB, (err) => {
  if (err) throw err;

  brokerListener.subscribe('');
  brokerListener.on('message', (data) => {
    log('BIN: ' + data.toString('utf8'));

    brokerPublisher.send(data, (err) => {
      n++;
      console.error('PUB FAILED: ', err);
    });
  });
  console.error('Broker is listening to ' + BROKER_SUB + '...');
});

brokerPublisher.bind('tcp://' + BROKER_PUB, function (err) {
  if (err) throw err;
  brokerPublisher.on('message', function (data) {
    log('BPUB: ' + data.toString('utf8'));
  });
  console.error('Broker is publishing at ' + BROKER_PUB + '...');
});

// worker
class Worker {
  constructor(id) {
    this.id = id;

    this.publisher = ZMQ.createSocket('pub');
    this.publisher.connect('tcp://' + BROKER_SUB);

    this.subscriber = ZMQ.createSocket('sub');
    this.subscriber.connect('tcp://' + BROKER_PUB);
    this.subscriber.subscribe('');
    this.subscriber.on('message', (data) => {
      log('WIN:', this.id, data.toString('utf8'));
    });
  }

  send(data) {
    log('WOUT:', this.id, data.toString('utf8'));
    this.publisher.send(data);
  }
}

const w1 = new Worker(1);
const w2 = new Worker(2);
const w3 = new Worker(3);
const w4 = new Worker(4);

setTimeout(function () {
  w1.send('foo1');
  w2.send('foo2');
  w3.send('foo3');
  w4.send('foo4');
}, 1000);
