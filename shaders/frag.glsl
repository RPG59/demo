#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision lowp float;
#endif

out vec4 color;

void main() {
    color = vec4(.3, .8, .9, 1.);
}
