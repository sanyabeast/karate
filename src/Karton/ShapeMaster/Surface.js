import Unit from "Karton/ShapeMaster/Meta/Unit"
import { Group } from "three"
import { forEach } from "lodash"
import { CircleBufferGeometry, MeshNormalMaterial, MeshBasicMaterial, Mesh, DoubleSide } from "three"

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

		return elements
	}

	setParams (params) {
		super.setParams(params)
	}

	createGround (description) {

		var gridSize = this.params.grid.size
		var radius = Math.sqrt(2 * Math.pow(gridSize, 2))

		var geometry = new CircleBufferGeometry( radius, 64 )
		var material = new MeshBasicMaterial({ color: 0x8bc34a, side: DoubleSide })
		var plateMesh = new Mesh(geometry, material);
		plateMesh.rotation.x = Math.PI / 2

		window.plateMesh = plateMesh

		return plateMesh;
	}
}

export default Surface