import float3 from './math/float3';
import float4x4 from './math/float4x4';
import { gl } from './main';

enum SHADER_CONSTANTS {
	MODEL_MATRIX = 'u_modelMatrix',
	PROJECTION_MATRIX = 'u_projMatrix',
	VIEW_MATRIX = 'u_viewMatrix',
	VIEW_POSITION = 'u_viewPos',
}

export class Shader {
	program: WebGLProgram;

	constructor(vs: string, fs: string) {
		const vsId = this.createShader(gl.VERTEX_SHADER, vs);
		const fsId = this.createShader(gl.FRAGMENT_SHADER, fs);

		this.compileShader(vsId);
		this.compileShader(fsId);

		this.createProgram(vsId, fsId);
	}

	enable(): void {
		gl.useProgram(this.program);
	}

	disable(): void {
		gl.useProgram(null);
	}

	createShader(type: number, data: string): WebGLShader {
		const id = gl.createShader(type);
		gl.shaderSource(id, data);
		return id;
	}

	compileShader(shaderId: WebGLShader): boolean {
		gl.compileShader(shaderId);
		if (gl.getShaderParameter(shaderId, gl.COMPILE_STATUS)) {
			return true;
		}

		throw new Error(`[shader]: ${gl.getShaderInfoLog(shaderId)}`);
	}

	createProgram(vsId: WebGLShader, fsId: WebGLShader): void {
		this.program = gl.createProgram();
		gl.attachShader(this.program, vsId);
		gl.attachShader(this.program, fsId);
		gl.linkProgram(this.program);

		gl.deleteShader(vsId);
		gl.deleteShader(fsId);
	}

	setUniform1i(name: string, data: number): void {
		const location = gl.getUniformLocation(this.program, name);
		gl.uniform1i(location, data);
	}

	setUniform3f(name: string, vec: float3): void {
		const location = gl.getUniformLocation(this.program, name);
		gl.uniform3f(location, vec.x, vec.y, vec.z);
	}

	setUniformMatrix4f(name: string, data: Float32Array): void {
		const location = gl.getUniformLocation(this.program, name);
		gl.uniformMatrix4fv(location, false, data);
	}

	setModelMatrix(mat: float4x4): void {
		this.setUniformMatrix4f(SHADER_CONSTANTS.MODEL_MATRIX, mat.elements);
	}

	setProjectionMatrix(mat: float4x4): void {
		this.setUniformMatrix4f(SHADER_CONSTANTS.PROJECTION_MATRIX, mat.elements);
	}

	setViewMatrix(mat: float4x4): void {
		this.setUniformMatrix4f(SHADER_CONSTANTS.VIEW_MATRIX, mat.elements);
	}

	setViewPosition(vec: float3): void {
		this.setUniform3f(SHADER_CONSTANTS.VIEW_POSITION, vec);
	}
}
