export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
	// Initialize the seen and prev arrays
	const seen = new Array(graph.length).fill(false);
	const prev = new Array(graph.length).fill(-1);

	seen[source] = true;
	const queue: number[] = [source];

	do {
		const curr = queue.shift() as number;
		if (curr === needle) {
			break;
		}
		const adjs = graph[curr];
		for (let i = 0; i < adjs.length; ++i) {
			if (adjs[i] && !seen[i]) {
				seen[i] = true;
				prev[i] = curr;
				queue.push(i);
			}
		}
		seen[curr] = true;

	} while (queue.length);

	// Reconstruct the path backwards
	let curr = needle;
	const pathOut: number[] = [];

	while (prev[curr] !== -1) {
		pathOut.push(curr);
		curr = prev[curr];
	}

	if (pathOut.length) {
		// Add the source
		pathOut.push(source);
		return pathOut.reverse();
	}
	return null;
}
