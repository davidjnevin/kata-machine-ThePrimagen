// A <- B <- C <- D
type Node<T> = {
	value: T,
	prev?: Node<T>,
}


export default class Stack<T> {
	public length: number;
	private head?: Node<T>;




	constructor() {
		this.head = undefined;
		this.length = 0;
	}

	push(item: T): void {
		const node = { value: item } as Node<T>;

		this.length++;

		// if head is undefined, set head to node
		if (this.head === undefined) {
			this.head = node;
			return;
		}

		// A <- B <- C <- D <- push E
		// set node prev to head
		node.prev = this.head; // E is now pointing to D
		// set head to node
		this.head = node; // head is now E

	}
	pop(): T | undefined {
		this.length = Math.max(0, this.length - 1);
		if (this.length === 0) {
			const head = this.head;
			this.head = undefined;
			return head?.value;
		}

		const head = this.head as Node<T>;
		this.head = head.prev;

		// free up memory
		// head.prev = undefined;
		return head.value;
	}
	peek(): T | undefined {
		return this.head?.value;

	}
}
