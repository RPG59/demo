#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision lowp float;
#endif

in vec3 v_positions;
in vec3 v_normals;

out vec4 color;

uniform vec3 u_viewPos;

float ambientStrength = .1;
float diffuseStength = .5;
float specularStrength = .5;

vec3 lightColor = vec3(1, 1, 1);
vec3 lightPos = vec3(1, 1, 1);
vec3 albedo = vec3(1, 1, 1);

void main() {
    vec3 norm = normalize(v_normals);
    vec3 lightDir = normalize(lightPos - v_positions);
    float diff = max(dot(norm, lightDir), 0.);
    vec3 diffuse = diffuseStength * diff * lightColor;

    vec3 viewDir = normalize(u_viewPos - v_positions);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.), 32.);
    vec3 specular = specularStrength * spec * lightColor;

    vec3 ambient = ambientStrength * lightColor;
    vec3 result = (ambient + diffuse + specular) * albedo;


    color = vec4(result, 1.);
}