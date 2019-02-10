import Unit from "Karton/Composer/Units/Meta/Unit"
import { Group } from "three"
import { forEach } from "lodash"

class Estate extends Unit  {
	constructor (...args) {
		super(...args)
	}

	composeElements (description) {
		let group = new Group()
		let itemsCount = 0

		forEach(description, (element)=>{
			switch (element.type){
				case "sprite":
					let sprite = this.createSprite(element)
					group.add(sprite)
					itemsCount++
				break
			}
		})

		if (itemsCount == 1	){
			return group.children[0]
		}

		return group
	}
}

export default Estate