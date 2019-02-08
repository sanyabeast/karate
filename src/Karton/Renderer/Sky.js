/**
 * @author zz85 / https://github.com/zz85
 *
 * Based on "A Practical Analytic Model for Daylight"
 * aka The Preetham Model, the de facto standard analytic skydome model
 * http://www.cs.utah.edu/~shirley/papers/sunsky/sunsky.pdf
 *
 * First implemented by Simon Wallner
 * http://www.simonwallner.at/projects/atmospheric-scattering
 *
 * Improved by Martin Upitis
 * http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
 *
 * Three.js integration by zz85 http://twitter.com/blurspline
*/

import SkyShader from "Karton/Renderer/shaders/SkyShader"
import * as THREE from "three"
import Pass from "Karton/Renderer/Pass"
import { Mesh } from "three"

class Sky extends Mesh {

	get color () { return this.material.uniforms.skyColor.value } 

	constructor () {
		super()
		
		var shader = SkyShader;

		var material = new THREE.ShaderMaterial( {
			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: THREE.UniformsUtils.clone( shader.uniforms ),
			side: THREE.BackSide
		} );

		this.geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
		this.material = material;

	}
}

export default Sky