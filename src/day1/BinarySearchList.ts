export default function bs_list(haystack: number[], needle: number): boolean {
	// high is inclusive, low is exclusive

	let low = 0;
	let high = haystack.length;

	do {
		const midpoint = Math.floor(low + (high - low) / 2);
		const value = haystack[midpoint];

		if (value === needle) {
			return true;

		} else if (value > needle) {
			// The needle must be in the left hand part.
			// Therefore I want to exclude the right hand part and exclude the midpoint.
			// I reassign the high point.
			high = midpoint;
		} else {
			// the needle is in the right hand side of the array
			// I want to exclude the left hand side and reassign the low
			low = midpoint + 1;
		}
	} while (low < high);
	return false;
}
