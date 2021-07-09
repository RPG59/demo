import { Shader } from './shader';
import FS from '../shaders/frag.glsl';
import VS from '../shaders/vert.glsl';
import float4x4 from './math/float4x4';
import float3 from './math/float3';
import { CUBE } from './cube';

const canvas = document.getElementById('main');

if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
	throw new Error('Canvas element dont found!');
}

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

export const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

gl.enable(gl.DEPTH_TEST);

enum BufferLocation {
	vertices = 0,
	normals = 1,
}

const VBO: WebGLBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
gl.bufferData(gl.ARRAY_BUFFER, CUBE.vertices, gl.STATIC_DRAW);

gl.enableVertexAttribArray(BufferLocation.vertices);
gl.vertexAttribPointer(
	BufferLocation.vertices,
	3,
	gl.FLOAT,
	false,
	8 * Float32Array.BYTES_PER_ELEMENT,
	0
);

gl.enableVertexAttribArray(BufferLocation.normals);
gl.vertexAttribPointer(
	BufferLocation.normals,
	3,
	gl.FLOAT,
	false,
	8 * Float32Array.BYTES_PER_ELEMENT,
	3 * Float32Array.BYTES_PER_ELEMENT
);

const shader = new Shader(VS, FS);
shader.enable();

function render() {
	gl.clearColor(0, 0, 0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES, 0, CUBE.numberOfVertices);
	requestAnimationFrame(render);
}

render();
