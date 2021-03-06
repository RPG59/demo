#version 300 es

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normals;

uniform mat4 u_projMatrix;
uniform mat4 u_viewMatrix;

out vec3 v_positions;
out vec3 v_normals;


void main() {
    v_positions = a_position.xyz;
    v_normals = a_normals;

    gl_Position = u_projMatrix * u_viewMatrix * a_position;
}