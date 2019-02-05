var context = require.context("units", true, /\.(yaml)$/);

var tokens = {};

context.keys().forEach((path)=>{
	let unit = context(path)
	path = path.replace(".yaml", "");
	path = path.replace("./", "")
	tokens[path] = unit
})

export default tokens