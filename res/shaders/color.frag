uniform vec3 diffuse;
uniform float opacity;

void main()	{
	gl_FragColor = vec4(diffuse, mod(1., 1000.) / 1000.);
}