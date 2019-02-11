uniform float time;
uniform vec3 diffuse;
uniform float opacity;

varying vec2 vUv;
varying vec4 vPosition;

void main()	{
	gl_FragColor = vec4(diffuse, opacity);
}