interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHead: () => number;
  getTail: () => number;
  getTailIndex: () => number;
  getArray: () => T[] | null[];
  clear: () => void;
  isEmpty: () => void;
  isFull: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private head = 0;
  private tail = 0;
  private tailIndex = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } else {
    this.tailIndex = this.tail;
    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else {
    delete this.container[this.head];
    this.head = (this.head + 1) % this.size;
    this.length--;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
     return this.container[this.head % this.size];
  };

  getHead() {
    return this.head;
  }
  getTail() {
    return this.tail;
  }
  getTailIndex() {
    return this.tailIndex;
  };
  getArray() {
    return this.container;
  }

  clear() {
    this.length = 0;
    this.head = 0;
    this.tail = 0;
    this.tailIndex = 0;
  }

  isEmpty = () => this.length === 0;

  isFull = () => {
    return this.length >= this.size;
  }
};

export const queue = new Queue<string>(7);
