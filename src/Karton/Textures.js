import { Texture, TextureLoader } from "three"
let tokens = {};

let contextPNG = require.context("sprites", true, /\.(png)$/);

contextPNG.keys().forEach((path)=>{
	let unit = contextPNG(path)
	path = path.replace(".png", "");
	path = path.replace("./", "")
	tokens[path] = unit
	let texture = new TextureLoader().load(unit);
	tokens[path] = texture
})

let contextJPG = require.context("sprites", true, /\.(jpg)$/);

contextJPG.keys().forEach((path)=>{
	let unit = contextJPG(path)
	path = path.replace(".jpg", "");
	path = path.replace("./", "")
	tokens[path] = unit
	let texture = new TextureLoader().load(unit);
	tokens[path] = texture
})




export default tokens