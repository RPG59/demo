#version 300 es

layout(location = 0) in vec4 pos;

uniform mat4 u_projMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_modelMatrix;

out vec3 v_pos;

void main() {
    v_pos = pos.xyz;
    gl_Position = u_projMatrix * u_viewMatrix * pos;
}