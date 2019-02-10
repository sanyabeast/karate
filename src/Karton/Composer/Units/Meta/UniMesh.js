import * as THREE from "three"

class UniMesh extends THREE.Mesh {

	constructor () {
		super()

		this.geometry = new THREE.Geometry()
		this.material = []
	}

	merge (mesh) {
		this.add(mesh)
		return;
		let geometry = mesh.geometry;
		let material = mesh.material;

		if (geometry instanceof THREE.BufferGeometry){
			let _geometry = new THREE.Geometry()
			_geometry.fromBufferGeometry(mesh.geometry)
			geometry = _geometry
		}
		
		console.log(geometry)
		this.material.push(material)
		this.geometry.merge(geometry, mesh.matrix, this.material.length - 1)
	}

}

export default UniMesh