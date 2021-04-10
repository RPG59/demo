export default class float3 {
	x: number;
	y: number;
	z: number;

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	set(x: number, y: number, z: number): float3 {
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	}

	toArray(): number[] {
		return [this.x, this.y, this.z];
	}

	add(v: float3): float3 {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;
	}

	sub(v: float3): float3 {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;
	}

	length(): number {
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
	}

	clone(): float3 {
		return new float3(this.x, this.y, this.z);
	}

	divideScalar(val: number): float3 {
		this.x /= val;
		this.y /= val;
		this.z /= val;

		return this;
	}

	multiplyScalar(val: number): float3 {
		this.x *= val;
		this.y *= val;
		this.z *= val;

		return this;
	}

	normalize(): float3 {
		return this.divideScalar(this.length() || 1);
	}

	cross(v: float3): float3 {
		this.x = this.y * v.z - this.z * v.y;
		this.y = this.z * v.x - this.x * v.z;
		this.z = this.x * v.y - this.y * v.x;

		return this;
	}

	setLength(l: number): float3 {
		return this.normalize().multiplyScalar(l);
	}
}
