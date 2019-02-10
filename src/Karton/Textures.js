import { Texture, TextureLoader, Vector2 } from "three"

class Textures {
	static content = {};

	static importTextures () {		
		let contextPNG = require.context("sprites", true, /\.(png)$/);

		contextPNG.keys().forEach((path)=>{
			let unit = contextPNG(path)
			path = path.replace(".png", "");
			path = path.replace("./", "")
			this.content[path] = unit
			let texture = new TextureLoader().load(unit, ()=>{
				this.normalizeTexture(texture)
			});

			this.content[path] = texture;
		})

		let contextJPG = require.context("sprites", true, /\.(jpg)$/);

		contextJPG.keys().forEach((path)=>{
			let unit = contextJPG(path)
			path = path.replace(".jpg", "");
			path = path.replace("./", "")
			this.content[path] = unit
			let texture = new TextureLoader().load(unit, ()=>{
				this.normalizeTexture(texture)
			});

			this.content[path] = texture;
		})
	}	

	static normalizeTexture (texture) {
		if (texture.image.width != texture.image.height){
			let canvasElement = document.createElement("canvas")
			let contex2d = canvasElement.getContext("2d")
			let size = new Vector2(0, 0)
			let scale = 1;
			size = Math.max(texture.image.width, texture.image.height) * scale

			canvasElement.width = size;
			canvasElement.height = size;

			contex2d.drawImage(
				texture.image, 
				(Math.abs((texture.image.width * scale) - size) / 2), 
				(Math.abs((texture.image.height * scale) - size)),
				texture.image.width * scale,
				texture.image.height * scale,
			)

			texture.image = canvasElement
		}
		return texture;
	}
}


Textures.importTextures()

export default Textures.content