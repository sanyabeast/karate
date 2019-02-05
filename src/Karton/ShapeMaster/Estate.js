import Unit from "Karton/ShapeMaster/Meta/Unit"
import { Group } from "three"
import { forEach } from "lodash"

class Estate extends Unit  {
	constructor (...args) {
		super(...args)
	}

	composeElements (description) {
		let group = new Group()

		forEach(description, (element)=>{
			switch (element.type){
				case "sprite":
					let sprite = this.createSprite(element)
					group.add(sprite)
				break
			}
		})

		return group
	}
}

export default Estate