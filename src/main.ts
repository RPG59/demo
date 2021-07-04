import VS from '../shaders/vert.glsl';
import FS from '../shaders/frag.glsl';
import { Shader } from './shader';

const canvas = document.createElement('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

document.body.appendChild(canvas);

enum BufferLocation {
	Vbo = 0,
}

// prettier-ignore
const vertices = new Float32Array([
	0, 1, 0,
	-1, -1, 0,
	1, -1, 0
]);
const vectorSize = 3;

export const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

const defaultShader = new Shader(VS, FS);
const vbo = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.enableVertexAttribArray(BufferLocation.Vbo);
gl.vertexAttribPointer(BufferLocation.Vbo, vectorSize, gl.FLOAT, false, 0, 0);

defaultShader.enable();
gl.drawArrays(gl.TRIANGLES, 0, vertices.length / vectorSize);
