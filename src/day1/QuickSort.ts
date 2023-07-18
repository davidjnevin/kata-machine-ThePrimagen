function qs(arr: number[], low: number, high: number): void {
	if (low >= high) {
		return;
	}

	const pivotIdx = partition(arr, low, high);

	qs(arr, low, pivotIdx - 1);
	qs(arr, pivotIdx + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
	const pivot = arr[high];
	let idx = low - 1;

	for (let i = low; i < high; i++) {
		if (arr[i] <= pivot) {
			idx++;
			const tmp = arr[i];
			arr[i] = arr[idx];
			arr[idx] = tmp;
			// could swap using array destructuring, but can be less performant.
			// [arr[i], arr[idx]] = [arr[idx], arr[i]];
		}
	}
	// Move the pivot to the correct position
	// after the loop is done.
	// This is the last swap.
	idx++; // move to the next position
	arr[high] = arr[idx];
	arr[idx] = pivot;
	// [arr[high], arr[idx]] = [arr[idx], arr[high]]; // swap using array destructuring
	return idx;
}
export default function quick_sort(arr: number[]): void {
	qs(arr, 0, arr.length - 1);

}
