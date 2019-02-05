import Renderer from "Karton/Renderer"
import Units from "Karton/Units"
import Composer from "Karton/Composer"

class Karton {


	constructor () {
		this.renderer = new Renderer()
		this.composer = new Composer()

		console.log(Units)

		document.body.appendChild(this.renderer.dom)
	}
} 

export default Karton;
