import { Shader } from './shader';
import FS from '../shaders/frag.glsl';
import VS from '../shaders/vert.glsl';
import { generateSphere } from '../geometries/sphere';
import float4x4 from './math/float4x4';
import float3 from './math/float3';

const canvas = document.getElementById('main');
if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
	throw new Error('Canvas element dont found!');
}
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

enum BufferLocation {
	vertices = 0,
	indices = 1,
}

export const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

gl.enable(gl.DEPTH_TEST);

console.log(gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
///////////////////////////////////////////////////

// prettier-ignore
// const vertices = [
//     0, .5, 0,
//     -1, -.5, 0,
//     1,  -.5, 0
// ];
const {vertices, indices} = generateSphere();

const VBO = gl.createBuffer();
const IBO = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

gl.enableVertexAttribArray(BufferLocation.vertices);
gl.vertexAttribPointer(BufferLocation.vertices, 3, gl.FLOAT, false, 0, 0);

const shader = new Shader(VS, FS);
shader.enable();

function render() {
	const time = Date.now() / 1000;
	const cameraPosition = new float3(Math.sin(time), 1, Math.cos(time));
	const projMatrix = new float4x4().perspective(90, WIDTH / HEIGHT, 0.1, 100);
	const viewMatrix = new float4x4().lookAt(
		cameraPosition,
		new float3(0, 0, 0),
		new float3(0, 1, 0)
	);

	shader.setProjectionMatrix(projMatrix);
	shader.setViewMatrix(viewMatrix);
	shader.setViewPosition(cameraPosition);

	gl.clearColor(0, 0, 0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawElements(gl.TRIANGLE_STRIP, indices.length, gl.UNSIGNED_SHORT, 0);
	requestAnimationFrame(render);
}

render();
