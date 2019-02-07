import { Fog, FogExp2, Pass, MeshLambertMaterial, PointLight, MeshPhongMaterial, WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, SphereGeometry, BoxBufferGeometry, MeshBasicMaterial, Mesh, AxesHelper, MeshNormalMaterial, HemisphereLight } from "three"
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

let someCameraPos1 = `{"metadata":{"version":4.5,"type":"Object","generator":"Object3D.toJSON"},"object":{"uuid":"904E7E4A-ED00-4AD8-A9BC-A287468FDCFC","type":"PerspectiveCamera","layers":1,"matrix":[-0.3381079798909248,0,-0.9411073232815044,0,-0.03599214393096904,0.9992684129262038,0.012930758028755962,0,0.9404188213287368,0.03824446270959795,-0.3378606244632891,0,32.881671623560685,1.3372146917048149,-11.813270700427177,1],"fov":45,"zoom":1,"near":0.1,"far":100000,"focus":10,"aspect":1.4063926940639269,"filmGauge":35,"filmOffset":0}}`

class Renderer {

	get dom () { return this.webglRenderer.domElement }

	constructor () {

		this.scene = new Scene();
		this.webglRenderer = new WebGLRenderer({
			antialias: true,
			// alpha: true
		})

		this.fog = new FogExp2( 0xd99126, 0.03, 80 )
		this.scene.fog = this.fog

		tweener.fromTo(this.fog, 1.3333, { density: 0.03 },  { density: 0.035, repeat: -1, yoyo: true, ease: "easeInOutQuad" })

		this.passes = {}

		this.effectComposer = new EffectComposer(this.webglRenderer)

		this.webglRenderer.setClearColor(0xd99126)

		this.camera = new PerspectiveCamera(45, 1, 0.1, 100000)

		
		// this.camera.fromJSON(JSON.parse(someCameraPos1))

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

		this.camera.position.set(
			4.8409511692456295,
			0.8436333012180357,
			1.478066511668653
		)

		this.camera.rotation.set(
		    -2.928495741566725,
		    -0.6803072396778582,
		    -3.006312674275912
		)

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
		this.orbit.autoRotateSpeed = 0.3

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
		// this.scene.add( axesHelper );

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

		tweener.fromTo(bleachPass.material.uniforms.opacity, 30, {
			value: 0
		}, {
			value: 3,
			yoyo: true,
			repeat: -1
		})

		// tweener.fromTo(bacPass.material.uniforms.contrast, 15, {
		// 	value: 0
		// }, {
		// 	value: 1,
		// 	yoyo: true,
		// 	repeat: -1
		// })

		halftonePass.material.uniforms.radius.value = 1;

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

		// this.passes.filmPass.enabled = false;
		this.passes.glitchPass.enabled = false;
		this.passes.dotScreenPass.enabled = false;
		this.passes.unrealBloomPass.enabled = false;
		this.passes.halftonePass.enabled = false;
		this.passes.bacPass.enabled = false;
		this.passes.freiPass.enabled = false;

		this.passes.halftonePass.uniforms.radius.value = 0.02851


	    this.effectComposer.addPass(renderPass);
	    this.effectComposer.addPass(filmPass)
	    this.effectComposer.addPass(dotScreenPass)
	    // this.effectComposer.addPass(bloomPass)
	    this.effectComposer.addPass(unrealBloomPass)
	    this.effectComposer.addPass(bacPass)
	    this.effectComposer.addPass(bleachPass)
	    this.effectComposer.addPass(freiPass)
	    this.effectComposer.addPass(halftonePass)
	    this.effectComposer.addPass(glitchPass)
	    this.effectComposer.addPass(copyPass)
	}

}

export default Renderer