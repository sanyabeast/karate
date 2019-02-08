import tweener from "tweener"
import { forEach } from "lodash"

class Weather {

	constructor (colorCorPass, bacPass, hsPass) {
		this.colorCorPass = colorCorPass;
		this.bacPass = bacPass;
		this.hsPass = hsPass

		let weathers = [
			{
				color: {
					mul: { x : 0.5 }
				}
			}
		]

		this.ease(weathers[0])
	}



	ease (params, onComplete) {
		forEach(params, (token, type)=>{
			switch(type){
				case "color":
					forEach(token, (param, type)=>{
						switch(type){
							case "mul":
								tweener.to(this.colorCorPass.material.uniforms.mulRGB.value, 1, param)
							break;
						}
					})
				break;
			}

		})
	}
}

export default Weather