export default {

	uniforms: {
		"skyColor": { value: new THREE.Color().setHex(0xf44336) },

	}, 

	vertexShader: [
		'void main() {',
		'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'	gl_Position.z = gl_Position.w;', // set z to camera.far

		'}'
	].join( '\n' ),

	fragmentShader: [
		'uniform vec3 skyColor;',

		'void main() {',
		'   gl_FragColor = vec4(skyColor, 1.);',

		'}'
	].join( '\n' )

}