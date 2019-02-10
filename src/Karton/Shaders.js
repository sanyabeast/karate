import { Texture, TextureLoader, Vector2 } from "three"
import ShaderContainer from "Karton/Utils/ShaderContainer"

class Shaders {
	static content = {};

	static importShaders () {		
		let context = require.context("raw-loader!shaders", true, /\.(frag|vert)$/);

		context.keys().forEach((path)=>{
			let unit = context(path)
			path = path.replace(".png", "");
			path = path.replace("./", "")
			this.content[path] = new ShaderContainer(unit)
		})

		console.log(this.content)
	}	
}


Shaders.importShaders()

export default Shaders.content