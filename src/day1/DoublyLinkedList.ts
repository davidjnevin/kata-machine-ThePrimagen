type Node<T> = {
	value: T;
	prev?: Node<T>;
	next?: Node<T>;
}

export default class DoublyLinkedList<T> {
	public length: number;
	private head?: Node<T>;
	private tail?: Node<T>;

	private debug() {
		let curr = this.head;
		let out = '';
		for (let i = 0; curr && i < this.length; i++) {
			out += `${curr.value} `;
			curr = curr.next;
		}
		console.log(out);
	}

	constructor() {
		this.length = 0;
		this.head = this.tail = undefined;
	}

	prepend(item: T): void {

		const node = { value: item } as Node<T>;
		this.length++;

		if (!this.head) {
			this.head = this.tail = node;
			return;
		}
		node.next = this.head; // set the next pointer to the current head
		this.head.prev = node; // set the previous pointer of the current head to the new node
		this.head = node; // set the head to the new node
	}
	insertAt(item: T, idx: number): void {
		// if the index is 0, set the head to the new node
		if (idx === 0) {
			this.prepend(item);
			return;
		}
		// if the index is out of bounds, throw an error
		if (idx < 0 || idx > this.length) {
			throw new Error('Index out of bounds');
		}
		// if the index is the length, set the tail to the new node
		if (idx === this.length) {
			this.append(item);
			return;
		}
		// traverse the list until we reach the index
		const curr = this.getAt(idx) as Node<T>;
		const node = { value: item } as Node<T>;

		// set the next pointer of the new node to the current node
		// as we are inseting at = before the current node
		node.next = curr;
		// set the previous pointer of the new node to the previous of the current node
		node.prev = curr.prev;
		// set the previous pointer of the current node to the new node
		curr.prev = node;
		// set the next pointer of the previous node to the new node
		if (node.prev) { // this is already covered by previous conditions, but for typescripts sake.
			node.prev.next = node;
		}
		// increment the length
		this.length++;

	}
	append(item: T): void {
		this.length++;
		const node = { value: item } as Node<T>;

		if (!this.tail) {
			this.head = this.tail = node;
			this.debug();
			return;
		}
		node.prev = this.tail;
		this.tail.next = node;
		this.tail = node;
		this.debug();
	}

	remove(item: T): T | undefined {
		let curr = this.head;

		for (let i = 0; curr && i < this.length; i++) {
			if (curr.value === item) {
				break;
			}
			curr = curr.next;
		}
		// if we've reached the end of the list and there is no curr (the item is not in the list), return undefined
		if (!curr) {
			return undefined;
		}
		return this.removeNode(curr);
	}

	get(idx: number): T | undefined {
		return this.getAt(idx)?.value;
	}

	removeAt(idx: number): T | undefined {
		const node = this.getAt(idx);
		if (!node) {
			return undefined;
		}
		return this.removeNode(node);
	}

	private removeNode(node: Node<T>): T | undefined {
		this.length--;
		// if the item is the head, set the head to the next node
		if (this.length === 0) {
			const val = this.head?.value;
			this.head = this.tail = undefined;
			return val;
		}
		if (node.prev) {
			node.prev.next = node.next;
		}
		if (node.next) {
			node.next.prev = node.prev;
		}
		if (node === this.head) {
			this.head = node.next;
		}
		if (node === this.tail) {
			this.tail = node.prev;
		}
		node.prev = node.next = undefined;
		return node.value;
	}

	private getAt(idx: number): Node<T> | undefined {
		if (idx < 0 || idx >= this.length) {
			return undefined;
		}
		let curr = this.head;
		for (let i = 0; curr && i < idx; i++) {
			curr = curr.next;
		}
		return curr;
	}
}
