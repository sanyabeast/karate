import Unit from "Karton/ShapeMaster/Meta/Unit"
import { Group } from "three"
import { forEach } from "lodash"
import { CircleBufferGeometry, MeshNormalMaterial, MeshBasicMaterial, Mesh, DoubleSide } from "three"
import Units from "Karton/Units"
import Textures from "Karton/Textures"

console.log(Textures)

class Surface extends Unit {

	constructor(...args) {
		super(...args)
	}

	composeElements (description) {
		let elements = new Group()
		
		if (description.ground){
			let ground = this.createGround(description.ground)
			this.composer.renderer.scene.add(ground)
		}

		if (description.fillers){
			let fillers = this.createFillers(description.fillers)
			this.composer.renderer.scene.add(fillers)
		}

		return elements
	}

	setParams (params) {
		super.setParams(params)
	}

	createGround (description) {

		var gridSize = this.params.grid.size
		var radius = Math.sqrt(2 * Math.pow(gridSize, 2))

		var geometry = new CircleBufferGeometry( radius, 64 )
		var material = new MeshBasicMaterial({ color: 0x5eaa5a, side: DoubleSide })
		var plateMesh = new Mesh(geometry, material);
		plateMesh.rotation.x = Math.PI / 2

		window.plateMesh = plateMesh

		return plateMesh;
	}

	createFillers (description) {
		let fillers = new Group()

		forEach(description, (fillerDescription)=>{
			let filler = this.createFiller(fillerDescription)
			fillers.add(filler)
		})

		return fillers
	}

	createFiller (description) {
		let fillerGroup = new Group()
		let filler;


		switch (description.type) {
			case "estate":
				let estateDescription = Units[`estate/${description.name}`]
				filler = this.composer.createEstate(estateDescription);
			break;
		}

		switch (description.location.type){
			case "everywhere":
				for (var a = 0; a < 64; a++){
					for (var b = 0; b < 64; b++){
						let fillerClone = filler.clone()
						let fuzz = this.getFuzz(description.location.fuzz)

						this.setElementPosition(fillerClone, a, b);
						fillerGroup.add(fillerClone.elements)
					}
				}
			break;
			case "random":
				for (var a = 0; a < 64; a++){
					for (var b = 0; b < 64; b++){
						if (Math.random() < description.location.probability){
							let fillerClone = filler.clone()
							let fuzz = this.getFuzz(description.location.fuzz)
							this.setElementPosition(fillerClone, a+ fuzz, b+fuzz);
							fillerGroup.add(fillerClone.elements)
						}
					}
				}
			break;
		}



		return fillerGroup
	}
}

export default Surface