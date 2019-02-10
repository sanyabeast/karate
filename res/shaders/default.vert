uniform vec2 resolution;
void main()	{
	vec4 modeledPosition = modelViewMatrix * vec4(position, 1.);
	vec4 projectedPosition = projectionMatrix * modeledPosition;
	gl_Position = projectedPosition;
}