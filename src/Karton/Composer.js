import Unit 	from "Karton/Composer/Meta/Unit"
import Surface 	from "Karton/Composer/Surface"
import Estate 	from "Karton/Composer/Estate"
import Actor 	from "Karton/Composer/Actor"
import Thing 	from "Karton/Composer/Thing"

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