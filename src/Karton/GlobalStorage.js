import postal from "postal"
import DataContainer from "Karton/DataTypes/DataContainer"

class GlobalUniforms {
	static time = new DataContainer(0);
}

setInterval(()=>{
	GlobalUniforms.time.set(GlobalUniforms.time + 1);
	GlobalUniforms.time.set(GlobalUniforms.time % 60000)
}, 1000 / 60)

window.GlobalUniforms = GlobalUniforms;

export default GlobalUniforms