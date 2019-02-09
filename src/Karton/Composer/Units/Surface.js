import Unit from "Karton/Composer/Units/Meta/Unit"
import { Group } from "three"
import { forEach } from "lodash"
import { CircleBufferGeometry, MeshNormalMaterial, MeshBasicMaterial, Mesh, DoubleSide } from "three"
import Units from "Karton/Units"
import Textures from "Karton/Textures"

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

		if (description.sky){
			this.setupSky(description.sky)
		}

		return elements
	}

	setParams (params) {
		super.setParams(params)
	}

	createGround (description) {

		clog(description)
		var gridSize = this.params.grid.size
		var radius = Math.sqrt(2 * Math.pow(gridSize, 2)) * 2

		var geometry = new CircleBufferGeometry( radius, 64 )

		switch (description.type) {
			case "color":
				var material = new MeshBasicMaterial({ color: description.color, side: DoubleSide })
			break;
			case "sprite":
				let spriteTexture = this.getSomeTexture(description.texture)
				if (description.repeat){
					this.setTextureRepeat(spriteTexture, description.repeat)
				}
				var material = new MeshBasicMaterial({ map: spriteTexture, side: DoubleSide })
			break
		}

		this.composer.shared.surfaceGridSize = gridSize

		var plateMesh = new Mesh(geometry, material);
		plateMesh.rotation.x = Math.PI / 2

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
				
				let estateFillerGroup = this.createEstateFiller(description)
				fillerGroup.add(estateFillerGroup)
				// filler = this.composer.createEstate(estateDescription);
			break;
		}


		return fillerGroup
	}

	createEstateFiller (description) {
		let estateDescription = Units[`estate/${description.name}`]
		let estateFillerGroup = new Group()

		switch (description.location.type){
			case "everywhere":
				for (var a = 0; a < 64; a++){
					for (var b = 0; b < 64; b++){
						let filler = this.composer.createEstate(estateDescription)
						let fuzzFactor = description.location.fuzz;
						this.setElementPosition(filler, this.fuzz(a, fuzzFactor), this.fuzz(b, fuzzFactor));
						estateFillerGroup.add(filler.elements)
					}
				}
			break;
			case "random":
				for (var a = 0; a < 64; a++){
					for (var b = 0; b < 64; b++){
						if (Math.random() < description.location.probability){
							let filler = this.composer.createEstate(estateDescription)
							let fuzzFactor = description.location.fuzz;
							this.setElementPosition(filler, this.fuzz(a, fuzzFactor), this.fuzz(b, fuzzFactor));
							estateFillerGroup.add(filler.elements)
						}
					}
				}
			break;
		}

		return estateFillerGroup;
	}

	setupSky (description){
		this.composer.renderer.setClearColor(description.background)
	}
}

export default Surface