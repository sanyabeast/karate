import { WebGLRenderer, Scene, PerspectiveCamera } from "three"
import Unicycle from "unicycle"

const unicycle = new Unicycle();

class Renderer {

	get dom () { return this.webglRenderer.domElement }

	constructor () {
		this.scene = new Scene();
		this.webglRenderer = new WebGLRenderer({
			antialias: true
		})

		this.camera = new PerspectiveCamera(90, 1, 0, 1000)

		window.addEventListener("resize", ()=>{
			this.webglRenderer.setSize(window.innerWidth, window.innerHeight)
		})

		unicycle.addTask(this.render.bind(this))
	}

	render () {
		this.webglRenderer.render(this.scene, this.camera)
	}


}

export default Renderer