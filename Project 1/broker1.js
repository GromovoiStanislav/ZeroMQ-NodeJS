const zmq = require('zeromq');

const BROKER_REP = '127.0.0.1:5554';
const BROKER_PUB = '127.0.0.1:5555';

// broker
const brokerListener = zmq.createSocket('rep');
const brokerPublisher = zmq.createSocket('pub');

brokerListener.bind('tcp://' + BROKER_REP, (err) => {
  if (err) throw err;

  brokerListener.on('message', (data) => {
    console.log('BIN: ' + data.toString('utf8'));
    brokerPublisher.send(data);
    brokerListener.send(data);
  });

  console.log('Broker is listening to ' + BROKER_REP + '...');
});

brokerPublisher.bind('tcp://' + BROKER_PUB, (err) => {
  if (err) throw err;

  console.log('Broker is listening to ' + BROKER_PUB + '...');
});

// worker
class Worker {
  constructor(id, brokerRep, brokerPub) {
    this.id = id;
    this.w = zmq.socket('req');
    this.w.connect(`tcp://${brokerRep}`);

    this.w1 = zmq.socket('sub');
    this.w1.connect(`tcp://${brokerPub}`);
    this.w1.subscribe('');

    this.w.on('message', (result) => {
      this.log('Result:', result.toString());
    });

    this.w1.on('message', (data) => {
      this.log('WIN', data.toString('utf8'));
    });
  }

  send(data) {
    this.log('WOUT', data);
    this.w.send(data);
  }

  log(...args) {
    console.log(...args, this.id);
  }
}

const w1 = new Worker(1, BROKER_REP, BROKER_PUB);
const w2 = new Worker(2, BROKER_REP, BROKER_PUB);
const w3 = new Worker(3, BROKER_REP, BROKER_PUB);
const w4 = new Worker(4, BROKER_REP, BROKER_PUB);

setTimeout(() => {
  w1.send('foo1');
  w2.send('foo2');
  w3.send('foo3');
  w4.send('foo4');
}, 500);
