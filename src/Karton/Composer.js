import Unit 	from "Karton/Composer/Units/Meta/Unit"
import Surface 	from "Karton/Composer/Units/Surface"
import Estate 	from "Karton/Composer/Units/Estate"
import Actor 	from "Karton/Composer/Units/Actor"
import Thing 	from "Karton/Composer/Units/Thing"
import Weather  from "Karton/Composer/Weather"

import UniMesh from "Karton/Composer/Units/Meta/UniMesh"
import Units from "Karton/Units"
import Textures from "Karton/Textures"

import GlobalStorage from "Karton/GlobalStorage"
import Shaders from "Karton/Shaders"

class Composer {
	static Unit = Unit;
	static Surface = Surface;
	static Estate = Surface;
	static Actor = Actor;
	static Thing = Thing;

	constructor (params) {
		this.surface = null;
		this.unimeshes = {}
		this.renderer = params.renderer
		this.weather = new Weather(this.renderer)
		this.shared = {}
	}

	setSurface (surface) {
		this.surface = surface
		this.weather.setSurface(surface)
		this.weather.init()
	}

	createSurface (description) {
		return new Surface(this, description)
	}

	createEstate (description){
		return new Estate(this, description)
	}

	getUniMesh (id) {
		if (!this.unimeshes[id]) this.unimeshes[id] = new UniMesh()
		return this.unimeshes[id]
	}

}

export default Composer;