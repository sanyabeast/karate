uniform vec2 resolution;

varying vec2 vUv;
void main()	{
	vUv = uv;
	vec4 pos = vec4(position, 1.);
	vec4 modeledPosition = modelViewMatrix * pos;
	vec4 projectedPosition = projectionMatrix * modeledPosition;
	gl_Position = projectedPosition;
}