import { forEach } from "lodash"
import * as THREE from "three"
import GlobalStorage from "Karton/GlobalStorage"
import Textures from "Karton/Textures"
import Helpers from "Karton/Helpers"


class ShaderContainer {
	code = "";
	uniformsRegexp = new RegExp("uniform\\s+\\w+\\s+\\w+;", "gm")

	constructor (glslCode) {
		this.update(glslCode)
	}

	update (glslCode) {
		this.code = glslCode;
		this.uniforms = this.$parseUniforms(glslCode)
	}

	$parseUniforms (code) {
		let parsed = code.match(this.uniformsRegexp)
		let uniforms = {}

		forEach(parsed, (string, index)=>{
			string = string.trim()
			let splitted = string.replace(";", "").split(" ");
			let type = splitted[1]
			let name = splitted[2]

			uniforms[name] = type
		})

		return  uniforms
	}

	getDefaultValue (type) {
		switch (type) {
			case "float":
				return 0
			break;
			case "int":
				return 0
			break;
			case "vec2":
				return new THREE.Vector2(0, 0)
			return
			case "vec3":
				return new THREE.Vector3(0, 0, 0)
			return
			case "vec4":
				return new THREE.Vector4(0, 0, 0, 0)
			return
		}
	}

	collectUniforms (...collections) {
		let collectedUniforms = {}
		
		forEach (this.uniforms, (type, name)=>{
			collectedUniforms[name] = this.getDefaultValue(type)

			forEach(collections, (collection, index)=>{
				forEach(collection, (value, $name)=>{
					if ($name == name){
						let normalizedValue = this.$normalizeValue(type, value);

						collectedUniforms[name] = {
							get value () {
								return normalizedValue.valueOf()
							},

							set value (v) { normalizedValue = v } 
						};
					}
				})
			})
		})

		return collectedUniforms
	}

	$normalizeValue (type, value) {
		if (type == "vec3" && typeof value == "number"){
			let color = new THREE.Color()
			color.setHex(value)
			return color;
		}

		if (type == "sampler2D"){
			let texture = this.getSomeTexture(value);
			return texture;
		}


		return value;
	}

	getSomeTexture (regexp){
		return Helpers.randValueFromObject(Helpers.filerObjectByRegExp(Textures, regexp))
	}

}

export default ShaderContainer