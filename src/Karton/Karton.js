import Renderer from "Karton/Renderer"
import Units from "Karton/Units"
import Composer from "Karton/Composer"

class Karton {


	constructor () {
		this.renderer = new Renderer()
		this.composer = new Composer({
			renderer: this.renderer
		})

		console.log(Units)

		let forset = window.forest = this.composer.createSurface(Units["surface/forest"])

		clog(forest)
		

		document.body.appendChild(this.renderer.dom)
	}
} 

export default Karton;
