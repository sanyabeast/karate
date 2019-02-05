import { Group, SpriteMaterial, Sprite } from "three"
import { forEach } from "lodash"
import Units from "Karton/Units"
import Textures from "Karton/Textures"

class Unit {
	composer = null;
	description = null;
	elements = null;
	tags = null;
	params = null;

	get position () {
		return this.elements.position
	}

	get rotation () {
		return this.elements.rotation
	}

	constructor (composer, description) {
		this.composer = composer;
		this.description = description;

		this.tags = []
		this.params = {};

		if (description.tags){
			this.setTags(description.tags);
		}

		if (description.params){
			this.setParams(description.params);
		}

		if (description.elements){
			this.elements = this.composeElements(description.elements)
		}

	}

	composeElements (description) {
		let elements = new Group()
		return elements
	}

	setTags (tags) {
		forEach(tags, (tag)=>{
			this.tags.push(tag)
		})
	}

	setParams (params){
		forEach(params, (value, key)=>{
			this.params[key] = value
		})
	}

	createObject3D (type, description) {

	}

	clone () {
		let clone = new this.constructor(this.composer, this.description)
		return clone
	}

	createSprite (description) {
		let texture = Textures[description.texture]

		var spriteMaterial = new SpriteMaterial( { map: texture, color: 0xffffff, transparent: true } );

		var sprite = new Sprite( spriteMaterial );

		if (description.scale){
			let fuzz = this.getFuzz(description.scale.fuzz)
			sprite.scale.set(description.scale.x + fuzz, description.scale.y + fuzz, 1)
			sprite.position.y = (description.scale.y + fuzz) / 2
			
		}

		return sprite;
	}

	setElementPosition (element, x, y) {
		element.position.set(x - 32, element.position.y, y - 32)
	}

	getFuzz (fuzz) {
		return ((Math.random() * fuzz) - (fuzz / 2)) || 0;
	}
}

export default Unit