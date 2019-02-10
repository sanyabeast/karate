class DataContainer {
	$value = undefined;

	get value () { return this.valueOf() }
	set value(value){ this.set(value) }

	constructor (value) {
		this.set(value)
	}

	valueOf () {
		return this.$value
	}

	set (value){
		this.$value = value
	}

	get () { return this.valueOf() }
}

export default DataContainer