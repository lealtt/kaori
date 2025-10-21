/**
 * A generic Queue class implementing a First-In, First-Out (FIFO) data structure.
 * Optimized for performance using a circular buffer approach.
 * @template T The type of elements held in the queue.
 */
export class Queue<T> {
  private elements: (T | undefined)[];
  private head: number = 0;
  private tail: number = 0;
  private count: number = 0;
  private capacity: number;

  /**
   * Creates a new Queue instance.
   * @param initialCapacity Initial capacity of the queue (default: 16)
   */
  constructor(initialCapacity: number = 16) {
    this.capacity = Math.max(1, initialCapacity);
    this.elements = new Array(this.capacity);
  }

  /**
   * Adds an element to the end of the queue.
   * Automatically grows the queue if needed.
   * @param element The element to add.
   */
  public enqueue(element: T): void {
    if (this.count === this.capacity) {
      this.grow();
    }

    this.elements[this.tail] = element;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
  }

  /**
   * Removes and returns the element at the beginning of the queue.
   * Returns `undefined` if the queue is empty.
   * @returns The removed element or undefined.
   */
  public dequeue(): T | undefined {
    if (this.count === 0) {
      return undefined;
    }

    const element = this.elements[this.head];
    this.elements[this.head] = undefined; // Clear reference for GC
    this.head = (this.head + 1) % this.capacity;
    this.count--;

    // Shrink if queue is using less than 25% of capacity
    if (this.count > 0 && this.count < this.capacity / 4 && this.capacity > 16) {
      this.shrink();
    }

    return element;
  }

  /**
   * Returns the element at the beginning of the queue without removing it.
   * Returns `undefined` if the queue is empty.
   * @returns The element at the front of the queue or undefined.
   */
  public peek(): T | undefined {
    return this.count === 0 ? undefined : this.elements[this.head];
  }

  /**
   * Checks if the queue is empty.
   * @returns `true` if the queue has no elements, `false` otherwise.
   */
  public isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Gets the number of elements in the queue.
   * @returns The size of the queue.
   */
  public get size(): number {
    return this.count;
  }

  /**
   * Clears all elements from the queue.
   */
  public clear(): void {
    this.elements = new Array(this.capacity);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  /**
   * Converts the queue to an array (in FIFO order).
   * @returns Array containing all queue elements.
   */
  public toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      result.push(this.elements[index] as T);
    }
    return result;
  }

  /**
   * Doubles the capacity of the queue.
   */
  private grow(): void {
    const newCapacity = this.capacity * 2;
    this.resize(newCapacity);
  }

  /**
   * Halves the capacity of the queue.
   */
  private shrink(): void {
    const newCapacity = Math.floor(this.capacity / 2);
    this.resize(newCapacity);
  }

  /**
   * Resizes the internal array.
   */
  private resize(newCapacity: number): void {
    const newElements: (T | undefined)[] = new Array(newCapacity);

    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      newElements[i] = this.elements[index];
    }

    this.elements = newElements;
    this.head = 0;
    this.tail = this.count;
    this.capacity = newCapacity;
  }

  /**
   * Iterator support for for...of loops.
   */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      yield this.elements[index] as T;
    }
  }
}

export function queue<T>(): Queue<T> {
  return new Queue<T>();
}
