#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision lowp float;
#endif

in vec3 v_pos;
out vec4 color;

void main() {
    color = vec4(v_pos.x, .1, .9, 1.);
}
