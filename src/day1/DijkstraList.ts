function hasUnvisited(seen: boolean[], dists: number[]): boolean {
	// If there are any unseen vertex, and any vertex with finite distance
	return seen.some((s, i) => !s && dists[i] !== Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
	// Find the lowest unvisited vertex
	let idx = -1;
	let lowestDistance = Infinity;

	for (let i = 0; i < seen.length; ++i) {
		// Skip seen vertices
		if (seen[i]) {
			continue;
		}
		// Update the lowest distance
		if (dists[i] < lowestDistance) {
			lowestDistance = dists[i];
			idx = i;
		}
	}

	return idx;

}
export default function dijkstra_list(
	source: number,
	sink: number,
	arr: WeightedAdjacencyList): number[] {

	const seen = new Array(arr.length).fill(false);
	const prev = new Array(arr.length).fill(-1);
	const dists = new Array(arr.length).fill(Infinity);

	dists[source] = 0;

	while (hasUnvisited(seen, dists)) {
		const curr = getLowestUnvisited(seen, dists);

		seen[curr] = true;

		// this should give us the list of edges
		const adjs = arr[curr];
		for (let i = 0; i < adjs.length; ++i) {
			const edge = adjs[i];
			if (seen[edge.to]) {
				continue;
			}

			const dist = dists[curr] + edge.weight;
			if (dist < dists[edge.to]) {
				dists[edge.to] = dist;
				prev[edge.to] = curr;
			}

		}
	}

	const out: number[] = [];
	let curr = sink;

	while (prev[curr] !== -1) {
		out.push(curr);
		curr = prev[curr];
	}

	out.push(source);
	return out.reverse();
}
