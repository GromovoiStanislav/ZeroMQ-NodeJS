# Simple send queue using ZeroMQ (Version 6) (TS/JS)

This example implements a simple outgoing queue that will queue messages before sending them. If sending is possible, messages from the queue will be forwarded to the socket. If sending is not possible because the socket blocks, queueing will continue until the queue is full.

This example can serve as the basis for a queue that can be used in a broker to temporarily queue messages while there are no worker processes available, for example.

## Running this example

```bash
npm run start:dev
#or
npm run build
npm run start:prod

```

## Expected behaviour

The example will start a queue, send messages onto it, and only afterwards connect a worker socket. The output will be similar to this:

```
received: hello
received: world!
received: <empty message>
```
