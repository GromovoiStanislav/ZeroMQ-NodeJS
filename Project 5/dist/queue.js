export class Queue {
    queue = [];
    socket;
    max;
    sending = false;
    constructor(socket, max = 100) {
        this.socket = socket;
        this.max = max;
    }
    send(msg) {
        if (this.queue.length > this.max) {
            throw new Error('Queue is full');
        }
        this.queue.push(msg);
        this.trySend();
    }
    async trySend() {
        if (this.sending) {
            return;
        }
        this.sending = true;
        while (this.queue.length) {
            // @ts-ignore
            await this.socket.send(this.queue.shift());
        }
        this.sending = false;
    }
}
