import tweener from "tweener"
import { forEach, merge } from "lodash"
import Helpers from "Karton/Helpers"

class Weather {

	static weatherData = null;

	get colorPow () { return this.renderer.passes.colorCorPass.material.uniforms.powRGB.value }
	get colorMul () { return this.renderer.passes.colorCorPass.material.uniforms.mulRGB.value }
	get colorAdd () { return this.renderer.passes.colorCorPass.material.uniforms.addRGB.value }

	get saturation () { return this.renderer.passes.hsPass.material.uniforms.saturation }
	get hue () { return this.renderer.passes.hsPass.material.uniforms.hue }

	get brightness () { return this.renderer.passes.bacPass.material.uniforms.brightness }
	get contrast () { return this.renderer.passes.bacPass.material.uniforms.contrast }

	get bleach () { return this.renderer.passes.bleachPass.material.uniforms.opacity }

	get weatherData () { return Weather.weatherData }

	constructor (renderer) {
		this.renderer = renderer
		this.$easeSettings = {
			duration: 10,
			yoyo: true
		}

		this.defaultWeather = {
			color:{
				pow: {x: 1, y: 1, z: 1},
				mul: {x: 1, y: 1, z: 1},
				add: {x: 0, y: 0, z: 0},
			},
			fog: {
				density: 0.02
			},
			saturation: 0,
			hue: 0,
			contrast: 0,
			brightness: 0,
			bleach: 0
		}

		this.prevRandWeather = null;


		this.ease("cold-wind")
	}

	randWeather () {
		let weather = Helpers.randValueFromObject(this.weatherData)
		while(weather.name == this.prevRandWeather){
			weather = Helpers.randValueFromObject(this.weatherData)
		}


		this.prevRandWeather = weather.name

		this.ease(weather)
	}

	easeWeatherParam (weatherParam, type){
		switch(type){
			case "color":
				forEach(weatherParam, (colorParam, type)=>{
					switch(type){
						case "mul":
							tweener.to(
								this.colorMul, 
								this.$easeSettings.duration, 
								{...colorParam, ...this.$easeSettings}
							)
						break;
						case "pow":
							tweener.to(
								this.colorPow, 
								this.$easeSettings.duration, 
								{...colorParam, ...this.$easeSettings}
							)
						break;
						case "add":
							tweener.to(
								this.colorAdd, 
								this.$easeSettings.duration, 
								{...colorParam, ...this.$easeSettings}
							)
						break;
					}
				})
			break;
			case "fog":
				tweener.to(this.renderer.scene.fog, this.$easeSettings.duration, {
					...weatherParam.fog, 
					...this.$easeSettings,
					onComplete: ()=>{
						this.randWeather()
					}
				})
			break;
			case "sky":
				let clearColor = this.renderer.webglRenderer.getClearColor().clone();
				let newClearColor = new THREE.Color()
				newClearColor.setHex(params.sky)
				tweener.to(clearColor, this.$easeSettings.duration, {
					r: newClearColor.r,
					g: newClearColor.g,
					b: newClearColor.b, 
					onUpdate: ()=>{
						this.renderer.webglRenderer.setClearColor(clearColor)
						this.renderer.fog.color.set(newClearColor)
					},
					...this.$easeSettings,
				})
			break;
			case "hue":
				tweener.to(
					this.hue, 
					this.$easeSettings.duration, 
					{
						value: weatherParam,
						...this.$easeSettings
					}
				)
			break;
			case "saturation":
				tweener.to(
					this.saturation, 
					this.$easeSettings.duration, 
					{
						value: weatherParam,
						...this.$easeSettings
					}
				)
			break;
			case "contrast":
				tweener.to(
					this.contrast, 
					this.$easeSettings.duration, 
					{
						value: weatherParam,
						...this.$easeSettings
					}
				)
			break;
			case "brightness":
				tweener.to(
					this.brightness, 
					this.$easeSettings.duration, 
					{
						value: weatherParam,
						...this.$easeSettings
					}
				)
			break;
			case "bleach":
				tweener.to(
					this.bleach, 
					this.$easeSettings.duration, 
					{
						value: weatherParam,
						...this.$easeSettings
					}
				)
			break;
		}
	}

	ease (params, onComplete) {

		if (typeof params == "string") return this.ease(this.weatherData[params])

		this.currentWeather = params

		params = Helpers.deepMerge(this.defaultWeather, params)

		//esnext
		forEach(params, (...args)=>{ this.easeWeatherParam(...args) })

	}

	static importWeatherData () {
		var context = require.context("weather", true, /\.(yaml)$/);

		var tokens = {};

		context.keys().forEach((path)=>{
			let unit = context(path)
			path = path.replace(".yaml", "");
			path = path.replace("./", "")
			tokens[path] = unit
		})

		Weather.weatherData = tokens;

	}
}

Weather.importWeatherData();

export default Weather