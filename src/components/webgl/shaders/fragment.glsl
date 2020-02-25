precision highp float;

varying vec2 textCoords;

uniform sampler2D textureSampler;

void main(){
    gl_FragColor = texture2D(textureSampler, textCoords);
}