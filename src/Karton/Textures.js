import { Texture, TextureLoader } from "three"

let context = require.context("sprites", true, /\.(png)$/);

let tokens = {};

context.keys().forEach((path)=>{
	console.log(path)
	let unit = context(path)
	path = path.replace(".png", "");
	path = path.replace("./", "")
	tokens[path] = unit
	let texture = new TextureLoader().load(unit);
	tokens[path] = texture
})



export default tokens