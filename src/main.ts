import { generateSphere } from '../geometries/sphere';
import { Shader } from './shader';

import VS from '../shaders/vert.glsl';
import FS from '../shaders/frag.glsl';
import float3 from './math/float3';
import float4x4 from './math/float4x4';

const canvas = document.createElement('canvas');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

document.body.appendChild(canvas);

export const gl: WebGL2RenderingContext = canvas.getContext('webgl2');

console.log('%c' + gl.getParameter(gl.VENDOR), 'color: orange');
