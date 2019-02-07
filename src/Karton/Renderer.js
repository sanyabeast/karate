import { Pass, MeshLambertMaterial, PointLight, MeshPhongMaterial, WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, SphereGeometry, BoxBufferGeometry, MeshBasicMaterial, Mesh, AxesHelper, MeshNormalMaterial, HemisphereLight } from "three"
import tweener from "tweener"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Unicycle from "unicycle"
// import { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer'
import EffectComposer from "Karton/Renderer/EffectComposer"
import RenderPass from "Karton/Renderer/passes/RenderPass"
import ShaderPass from "Karton/Renderer/passes/ShaderPass"
import GlitchPass from "Karton/Renderer/passes/GlitchPass"
import DotScreenPass from "Karton/Renderer/passes/DotScreenPass"
import CopyShader from "Karton/Renderer/shaders/CopyShader"
import BleachBypassShader from "Karton/Renderer/shaders/BleachBypassShader"
import FreiChenShader from "Karton/Renderer/shaders/FreiChenShader"
import BrightnessContrastShader from "Karton/Renderer/shaders/BrightnessContrastShader"
import BloomPass from "Karton/Renderer/passes/BloomPass"
import HalftonePass from "Karton/Renderer/passes/HalftonePass"
import FilmPass from "Karton/Renderer/passes/FilmPass"
import UnrealBloomPass from "Karton/Renderer/passes/UnrealBloomPass"
import { forEach } from "lodash"

import * as THREE from "three"
window.THREE = THREE
window.tweener = tweener

console.log(RenderPass)

const unicycle = new Unicycle();
unicycle.start()

class Renderer {

	get dom () { return this.webglRenderer.domElement }

	constructor () {

		this.scene = new Scene();
		this.webglRenderer = new WebGLRenderer({
			antialias: true,
			// alpha: true
		})

		this.passes = {}

		this.effectComposer = new EffectComposer(this.webglRenderer)

		this.webglRenderer.setClearColor(0x00bcd4)

		this.camera = new PerspectiveCamera(45, 1, 0.1, 100000)

		// this.ambientLight = new AmbientLight(0xeeeeee)
		// this.ambientLight.position.set(0, 100, 0)
		// this.ambientLight.intensity = 0.2
		this.hemisphereLight = new HemisphereLight( 0xff9800, 0x673ab7, 0.75 );
		this.pointLight = new PointLight( 0xff0000, 2, 100 )
		this.pointLight.position.set(0, 150, 0)

		// this.scene.add(this.ambientLight)
		this.scene.add(this.hemisphereLight)
		this.scene.add(this.pointLight)
		this.scene.add(this.camera)

		this.camera.position.set(0, 0, 200)

		window.addEventListener("resize", ()=>{
			this.updateSize()
		})

		this.setupFX()

		this.updateSize()
		this.$addTestElements()
		unicycle.addTask(this.render.bind(this))
	}

	updateSize () {
		this.webglRenderer.setSize(window.innerWidth, window.innerHeight)
		this.effectComposer.setSize(window.innerWidth, window.innerHeight)
		this.camera.aspect = window.innerWidth/ window.innerHeight
		this.camera.updateProjectionMatrix()

		forEach(this.passes, (pass)=>{
			pass.setSize(window.innerWidth, window.innerHeight)
		})
	}

	render () {
		this.orbit.update()
		// this.webglRenderer.render(this.scene, this.camera)
		this.effectComposer.render()
	}

	$addTestElements () {
		var orbit = new OrbitControls( this.camera, this.webglRenderer.domElement );
			orbit.enableZoom = true

		this.orbit = orbit
		this.orbit.autoRotate = true

		// console.log(BoxBufferGeometry)

		// for (var a = 0; a < 2; a++){
		// 	for (var b = 0; b < 2; b++){
		// 		for (var c = 0; c < 2; c++){
		// 			let geometry = new BoxBufferGeometry( 1, 1, 1 );
		// 			geometry.translate(0, 0.5, 0)
		// 			let material = new MeshLambertMaterial({ color: 0x03a9f4 })
		// 			let sphere = new Mesh( geometry, material );

		// 			sphere.position.set(a * 2, c * 2, b * 2)

		// 			this.scene.add( sphere );
		// 		}
		// 	}
		// }

		var axesHelper = new AxesHelper( 20 );
		this.scene.add( axesHelper );

	}

	setClearColor (...args) {
		this.webglRenderer.setClearColor(...args)
	}

	setupFX () {
		let renderPass = new RenderPass(this.scene, this.camera)

		// let bloomPass = new BloomPass(1)
		// this.effectComposer.addPass(bloomPass)

		// this.passes.bloomPass = bloomPass
		// bloomPass.renderToScreen = false

		// let unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 6, 3, 4)
		// this.effectComposer.addPass(unrealBloomPass)
		// this.passes.unrealBloomPass = unrealBloomPass

		let bloomPass = new BloomPass(0)
		let unrealBloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
		let glitchPass = new GlitchPass()
		let dotScreenPass = new DotScreenPass()
		let filmPass = new FilmPass(0.001, 0.5, 50, false )
		let copyPass = new ShaderPass(CopyShader)
		let bacPass = new ShaderPass(BrightnessContrastShader)
		let bleachPass = new ShaderPass(BleachBypassShader)
		let freiPass = new ShaderPass(FreiChenShader)
		let halftonePass = new HalftonePass()

		this.passes = { 
			renderPass, 
			filmPass, 
			glitchPass,
			dotScreenPass,
			copyPass,
			bloomPass,
			unrealBloomPass,
			bacPass,
			bleachPass,
			freiPass,
			halftonePass
		}

		this.passes.filmPass.enabled = false;
		this.passes.glitchPass.enabled = false;
		this.passes.dotScreenPass.enabled = false;
		this.passes.unrealBloomPass.enabled = false;
		this.passes.freiPass.enabled = false;


	    this.effectComposer.addPass(renderPass);
	    this.effectComposer.addPass(filmPass)
	    this.effectComposer.addPass(glitchPass)
	    this.effectComposer.addPass(dotScreenPass)
	    // this.effectComposer.addPass(bloomPass)
	    this.effectComposer.addPass(unrealBloomPass)
	    this.effectComposer.addPass(bacPass)
	    this.effectComposer.addPass(bleachPass)
	    this.effectComposer.addPass(freiPass)
	    this.effectComposer.addPass(halftonePass)
	    this.effectComposer.addPass(copyPass)
	}

}

export default Renderer