type Node<T> = {
	value: T,
	next?: Node<T>,
}

export default class Queue<T> {
	public length: number;
	private head?: Node<T>;
	private tail?: Node<T>;


	constructor() {
		this.length = 0;
		this.head = this.tail = undefined;
	}

	enqueue(item: T): void {
		const node = { value: item } as Node<T>;
		this.length++; // increment length
		if (!this.tail) {
			this.tail = this.head = node;
			return;
		}

		this.tail.next = node; // set tail next to node
		this.tail = node; // set tail to node
	}
	deque(): T | undefined {
		if (this.head === undefined) {
			return undefined;
		}
		this.length--; // decrement length

		const head = this.head; // save head
		this.head = this.head.next; // move head to next
		// free up memory
		head.next = undefined;

		if (this.length === 0) {
			this.tail = undefined;
		}

		return head.value; // return head value
	}
	peek(): T | undefined {

		return this.head?.value;
	}
}
