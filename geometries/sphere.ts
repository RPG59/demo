export function generateSphere(): { vertices: Float32Array; indices: Uint16Array } {
	const M = 8 * 2;
	const N = 16 * 2;
	const sph_n = (M + 1) * N;
	let vertices = new Float32Array(3 * sph_n);

	for (let i = 0; i < M + 1; ++i) {
		const phi = (i * Math.PI) / M;
		const y = Math.cos(phi);
		const r = Math.sin(phi);
		for (let j = 0; j < N; ++j) {
			const th = (j * 2 * Math.PI) / N;
			const idx = (j + i * N) * 3;
			vertices[idx] = r * Math.cos(th);
			vertices[idx + 1] = y;
			vertices[idx + 2] = r * Math.sin(th);
		}
	}

	const indicesCount = M * (N * 2 + 2) + (M - 1) * 2;
	const indices = new Uint16Array(indicesCount);
	let idx = 0;

	for (let i = 0; i < M; ++i) {
		for (let j = 0; j < N; ++j) {
			indices[idx++] = i * N + j;
			indices[idx++] = (i + 1) * N + j;
		}
		indices[idx++] = i * N;
		indices[idx++] = (i + 1) * N;

		if (i < M - 1) {
			indices[idx++] = (i + 1) * N + (N - 1);
			indices[idx++] = i + 1;
		}
	}

	return { vertices, indices };
}
