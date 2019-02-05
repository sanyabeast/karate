import { MeshLambertMaterial, PointLight, MeshPhongMaterial, WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, SphereGeometry, BoxBufferGeometry, MeshBasicMaterial, Mesh, AxesHelper, MeshNormalMaterial, HemisphereLight } from "three"
import tweener from "tweener"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Unicycle from "unicycle"

console.log(AxesHelper)

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

		this.updateSize()
		this.$addTestElements()
		unicycle.addTask(this.render.bind(this))
	}

	updateSize () {
		this.webglRenderer.setSize(window.innerWidth, window.innerHeight)
		this.camera.aspect = window.innerWidth/ window.innerHeight
		this.camera.updateProjectionMatrix()
	}

	render () {
		this.orbit.update()
		this.webglRenderer.render(this.scene, this.camera)
	}

	$addTestElements () {
		var orbit = new OrbitControls( this.camera, this.webglRenderer.domElement );
			orbit.enableZoom = true

		this.orbit = orbit

		console.log(BoxBufferGeometry)

		for (var a = 0; a < 2; a++){
			for (var b = 0; b < 2; b++){
				for (var c = 0; c < 2; c++){
					let geometry = new BoxBufferGeometry( 1, 1, 1 );
					geometry.translate(0, 0.5, 0)
					let material = new MeshLambertMaterial({ color: 0x03a9f4 })
					let sphere = new Mesh( geometry, material );

					sphere.position.set(a * 2, c * 2, b * 2)

					this.scene.add( sphere );
				}
			}
		}

		var axesHelper = new AxesHelper( 20 );
		this.scene.add( axesHelper );

	}


}

export default Renderer