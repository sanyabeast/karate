import Unit 	from "Karton/Composer/Units/Meta/Unit"
import Surface 	from "Karton/Composer/Units/Surface"
import Estate 	from "Karton/Composer/Units/Estate"
import Actor 	from "Karton/Composer/Units/Actor"
import Thing 	from "Karton/Composer/Units/Thing"
import Weather  from "Karton/Composer/Weather"

import Units from "Karton/Units"
import Textures from "Karton/Textures"

class Composer {
	static Unit = Unit;
	static Surface = Surface;
	static Estate = Surface;
	static Actor = Actor;
	static Thing = Thing;

	constructor (params) {
		this.renderer = params.renderer
		this.weather = new Weather(this.renderer.passes.colorCorPass, this.renderer.passes.bacPass, this.renderer.passes.hsPass)
		this.shared = {}
	}

	createSurface (description) {
		return new Surface(this, description)
	}

	createEstate (description){
		return new Estate(this, description)
	}

}

export default Composer;