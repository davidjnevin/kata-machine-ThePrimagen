export default class MinHeap {
	public length: number;
	private data: number[];

	constructor() {
		this.data = [];
		this.length = 0;
	}

	insert(value: number): void {
		this.data[this.length] = value;
		this.headifyUp(this.length);
		this.length++;
	}

	delete(): number {
		// If heap is empty what do we want to
		// return.
		if (this.length === 0) {
			return -1;
		}

		// define output
		const out = this.data[0];

		// For a heap with only one element
		if (this.length === 1) {
			this.data = [];
			// Reduce length
			this.length--;
			return out;
		}

		// In other cases we want to return the root value,
		// replace the root value with the last in,
		// and then sift down the value to its correct location.
		// Replace the root with the last in.
		this.data[0] = this.data[this.length - 1];
		// Sift the root to its correct position
		this.heapifyDown(0);

		this.length--;
		// return the root value
		return out;
	}

	// private helper functions
	private heapifyDown(idx: number): void {
		// Check if we are at the end of the heap
		if (idx >= this.length) {
			return;
		}

		const lIdx = this.getLeftChildIndex(idx);
		const rIdx = this.getRightChildIndex(idx);

		// Check if we are at the end of the heap
		if (lIdx >= this.length) {
			return;
		}

		const leftValue = this.data[lIdx];
		const rightValue = this.data[rIdx];
		const value = this.data[idx];

		if (leftValue > rightValue && value > rightValue) {
			// if the right value is the smallest AND
			// the value is greater than the smallest
			// we need to swap and heapify down.
			this.data[idx] = rightValue;
			this.data[rIdx] = value;
			this.heapifyDown(rIdx);

		} else if (rightValue > leftValue && value > leftValue) {
			// if the left value is the smallest AND
			// the value is greater than the smallest
			// we need to swap and heapify down.
			this.data[idx] = leftValue;
			this.data[lIdx] = value;
			this.heapifyDown(lIdx);
		}

	}
	private headifyUp(idx: number): void {
		// recursive
		if (idx === 0) {
			return;
		}

		const parentIdx = this.parent(idx);
		const parentValue = this.data[parentIdx];
		const value = this.data[idx];

		if (parentValue > value) { // Must satisfy min heap property
			// swap parent and child
			this.data[parentIdx] = value;
			this.data[idx] = parentValue;
			// continue to headify up
			this.headifyUp(parentIdx);
		}



	}
	private parent(idx: number): number {
		return Math.floor((idx - 1) / 2);
	}

	private getLeftChildIndex(idx: number): number {
		return idx * 2 + 1;
	}
	private getRightChildIndex(idx: number): number {
		return idx * 2 + 2;
	}

}
