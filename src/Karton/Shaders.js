import { Texture, TextureLoader, Vector2 } from "three"
import ShaderContainer from "Karton/Utils/ShaderContainer"
import * as THREE from "three"
import GlobalStorage from "Karton/GlobalStorage"

THREE.WebGLRenderer.prototype.initMaterial = function(){

};

class Shaders {
	static content = {};

	static importShaders () {		
		let context = require.context("raw-loader!shaders", true, /\.(frag|vert)$/);

		context.keys().forEach((path)=>{
			let unit = context(path)
			path = path.replace(".png", "");
			path = path.replace("./", "")
			this.content[path] = unit;
		})
	}	
}

Shaders.importShaders()


// THREE.ShaderLib.sprite = {
// 	vertexShader: Shaders.content["sprite.vert"],
// 	fragmentShader: Shaders.content["sprite.frag"],
// 	uniforms: {
// 		...THREE.ShaderLib.sprite.uniforms,
// 		time: GlobalStorage.time
// 	}
// }

// THREE.ShaderLib.sprite = new Proxy(THREE.ShaderLib.sprite, {
// 	get: function(target, name){
// 		console.warn(new Error());
// 		return target[name];
// 	}
// })


export default Shaders.content