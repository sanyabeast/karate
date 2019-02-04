import Renderer from "Karton/Renderer"
import Scenarios from "Karton/Scenarios"

class Karton {


	constructor () {
		this.renderer = new Renderer()

		document.body.appendChild(this.renderer.dom)
	}
} 

export default Karton;
