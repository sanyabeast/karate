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
}

export default Helpers