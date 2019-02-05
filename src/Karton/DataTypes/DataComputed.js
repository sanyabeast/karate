import DataContainer from "Karton/DataTypes/DataContainer"

class DataComputed extends DataContainer {
	$compFunction = null;

	valueOf () {
		return this.$value()
	}

	constructor (...args) {
		super(...args)
	}
}

export default DataComputed