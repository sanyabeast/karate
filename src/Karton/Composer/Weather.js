import tweener from "tweener"
import { forEach, merge } from "lodash"
import Helpers from "Karton/Helpers"

class Weather {

	static weatherData = null;

	get fog () { return this.renderer.state.fog }
	get sky () { return this.renderer.sky }
	get colorPow () { return this.renderer.passes.colorCorPass.material.uniforms.powRGB.value }
	get colorMul () { return this.renderer.passes.colorCorPass.material.uniforms.mulRGB.value }
	get colorAdd () { return this.renderer.passes.colorCorPass.material.uniforms.addRGB.value }
	get saturation () { return this.renderer.passes.hsPass.material.uniforms.saturation }
	get hue () { return this.renderer.passes.hsPass.material.uniforms.hue }
	get brightness () { return this.renderer.passes.bacPass.material.uniforms.brightness }
	get contrast () { return this.renderer.passes.bacPass.material.uniforms.contrast }
	get bleach () { return this.renderer.passes.bleachPass.material.uniforms.opacity }
	get weatherData () { return Weather.weatherData }
	set addTween (t){ this.tweens.push(t) }

	constructor (renderer) {
		window.weather = this

		this.surface = null;

		this.renderer = renderer
		this.$easeSettings = {
			duration: 1,
			yoyo: true,
			ease: "easeInOutBack" 
		}

		this.tweens = []

		this.defaultWeather = this.weatherData.default;

		this.prevRandWeather = null;
		
	}
	init () {
		this.ease("default", { duration: 0 })

		this.ease("winter", {
			onComplete: ()=>{ this.randWeather() }
		})
	}

	$killAllTweens () {  
		forEach(this.tweens, (t)=>{
			t.kill()
		})
	}

	randWeather () {
		let weather = Helpers.randValueFromObject(this.weatherData)
		while(weather.name == this.prevRandWeather){
			weather = Helpers.randValueFromObject(this.weatherData)
		}


		this.prevRandWeather = weather.name

		this.ease(weather, {
			onComplete: ()=>{ 
				setTimeout(()=>{
					this.randWeather()
				}, 5000)
			}
		})
	}

	easeWeatherParam (weatherParam, type, customEasingSettings){
		customEasingSettings = customEasingSettings || {}
		let easeSettings = { ...this.$easeSettings, ...customEasingSettings }

		switch(type){
			case "color":
				forEach(weatherParam, (colorParam, type)=>{
					switch(type){
						case "mul":
							this.addTween = tweener.to(
								this.colorMul, 
								easeSettings.duration, 
								{...colorParam, easeSettings}
							)
						break;
						case "pow":
							this.addTween = tweener.to(
								this.colorPow, 
								easeSettings.duration, 
								{...colorParam, easeSettings}
							)
						break;
						case "add":
							this.addTween = tweener.to(
								this.colorAdd, 
								easeSettings.duration, 
								{...colorParam, easeSettings}
							)
						break;
					}
				})
			break;
			case "fog":
				let newFogColor = new THREE.Color().setHex(weatherParam.color)

				this.addTween = tweener.to(this.fog.color, easeSettings.duration, {
					...newFogColor, 
					easeSettings,
					onComplete: easeSettings.onComplete
				})

				this.addTween = tweener.to(this.fog, easeSettings.duration, {
					density: weatherParam.density,
					easeSettings,
				})
			break;
			case "sky":
				let newColor = new THREE.Color().setHex(weatherParam.color)

				this.addTween = tweener.to(this.sky.color, easeSettings.duration, {
					...newColor,
					easeSettings,
				})
			break;
			case "ground":
				{
					let newColor = new THREE.Color().setHex(weatherParam.color)

					this.addTween = tweener.to(this.surface.ground.material.color, easeSettings.duration, {
						...newColor,
						easeSettings,
					})
				}
			break;
			case "hue":
				this.addTween = tweener.to(
					this.hue, 
					easeSettings.duration, 
					{
						value: weatherParam,
						easeSettings
					}
				)
			break;
			case "saturation":
				this.addTween = tweener.to(
					this.saturation, 
					easeSettings.duration, 
					{
						value: weatherParam,
						easeSettings
					}
				)
			break;
			case "contrast":
				this.addTween = tweener.to(
					this.contrast, 
					easeSettings.duration, 
					{
						value: weatherParam,
						easeSettings
					}
				)
			break;
			case "brightness":
				this.addTween = tweener.to(
					this.brightness, 
					easeSettings.duration, 
					{
						value: weatherParam,
						easeSettings
					}
				)
			break;
			case "bleach":
				this.addTween = tweener.to(
					this.bleach, 
					easeSettings.duration, 
					{
						value: weatherParam,
						easeSettings
					}
				)
			break;
		}
	}

	ease (params, customEasingSettings) {

		if (typeof params == "string") return this.ease(this.weatherData[params], customEasingSettings)

		this.$killAllTweens()

		this.currentWeather = params

		params = Helpers.deepMerge(this.defaultWeather, params)

		console.log(this.surface)

		//esnext
		forEach(params, (weatherParam, type)=>{ this.easeWeatherParam(weatherParam, type, customEasingSettings) })

	}

	setSurface (surface) {
		this.surface = surface;
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