import VS from '../shaders/vert.glsl';
import FS from '../shaders/frag.glsl';
import { Shader } from './shader';
import { generateSphere } from '../geometries/sphere';
import float4x4 from './math/float4x4';
import float3 from './math/float3';

const canvas = document.createElement('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

document.body.appendChild(canvas);

enum BufferLocation {
	VBO,
}

const { vertices, indices } = generateSphere();
const vectorSize = 3;

export const gl: WebGL2RenderingContext = canvas.getContext('webgl2');
const defaultShader = new Shader(VS, FS);
const VBO = gl.createBuffer();
const IBO = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

gl.enableVertexAttribArray(BufferLocation.VBO);
gl.vertexAttribPointer(BufferLocation.VBO, vectorSize, gl.FLOAT, false, 0, 0);

defaultShader.enable();

const render = () => {
	const time = Date.now() / 1e3;
	const cameraPosition = new float3(Math.sin(time), 1, Math.cos(time));
	const projMatrix = new float4x4().perspective(Math.PI / 2, WIDTH / HEIGHT, 0.1, 100);
	const viewMatrix = new float4x4().lookAt(cameraPosition, new float3(), new float3(0, 1, 0));

	defaultShader.setViewMatrix(viewMatrix);
	defaultShader.setProjectionMatrix(projMatrix);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.clearColor(0, 0, 0, 1);

	gl.drawElements(gl.TRIANGLE_FAN, indices.length, gl.UNSIGNED_SHORT, 0);
	requestAnimationFrame(render);
};
render();
