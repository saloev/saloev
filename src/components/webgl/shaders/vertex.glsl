attribute vec2 position;

varying vec2 textCoords;

void main() {
    textCoords = (position + 1.0) / 2.0;
    textCoords.y = 1.0 - textCoords.y;
    gl_Position = vec4(position, 0, 1.0);
}