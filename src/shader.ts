import { gl } from './main';
import float3 from './math/float3';
import float4x4 from './math/float4x4';

enum SHADER_CONSTANTS {
	MODEL_MATRIX = 'u_modelMatrix',
	PROJECTION_MATRIX = 'u_projMatrix',
	VIEW_MATRIX = 'u_viewMatrix',
	VIEW_POSITION = 'u_viewPos',
}

export class Shader {
	program: WebGLProgram;
	fsId: WebGLShader;
	vsId: WebGLShader;

	constructor(vs: string, fs: string) {
		this.vsId = this.createShader(gl.VERTEX_SHADER, vs);
		this.fsId = this.createShader(gl.FRAGMENT_SHADER, fs);

		if (!this.compileShader(this.vsId)) return;
		if (!this.compileShader(this.fsId)) return;
		this.createProgram();
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

		console.log('%cSHADER COMPILE ERROR: ' + gl.getShaderInfoLog(shaderId), 'color: red');
		return false;
	}

	createProgram(): void {
		this.program = gl.createProgram();
		gl.attachShader(this.program, this.vsId);
		gl.attachShader(this.program, this.fsId);
		gl.linkProgram(this.program);

		gl.deleteShader(this.vsId);
		gl.deleteShader(this.fsId);
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
