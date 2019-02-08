import { forEach } from "lodash"

class Helpers {
	static filerObjectByRegExp (object, regexp) {
		let result = {}

		forEach(object, (value, key)=>{
			if (key.match(new RegExp(regexp))){
				result[key] = value;
			}
		})

		return result
	}

	static randValueFromObject (object) {
		let keys = Object.getOwnPropertyNames(object)
		return object[this.randFromArray(keys)]
	}

	static randFromArray (arr) {
		return arr[this.randIntegerFromTo(0, arr.length - 1)]
	}

	static randIntegerFromTo (min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	static deepMerge (target, source) {
		let result = {...target}

		forEach(source, (value, key)=>{
			if (typeof value == "object" && value !== null){
				result[key] = this.deepMerge(result[key] || null, value)
			} else {
				if (value !== undefined){
					result[key] = value;
				}
			}
		})

		return result
	}
}

export default Helpers