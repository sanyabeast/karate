import Unit 	from "Karton/ShapeMaster/Meta/Unit"
import Surface 	from "Karton/ShapeMaster/Surface"
import Estate 	from "Karton/ShapeMaster/Estate"
import Actor 	from "Karton/ShapeMaster/Actor"
import Thing 	from "Karton/ShapeMaster/Thing"

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
	}

	createSurface (description) {
		return new Surface(this, description)
	}

	createEstate (description){
		return new Estate(this, description)
	}

}

export default Composer;