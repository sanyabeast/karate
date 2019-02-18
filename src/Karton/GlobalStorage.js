import postal from "postal"
import DataContainer from "Karton/DataTypes/DataContainer"

class GlobalStorage {
	static time = new DataContainer(2);
}

setInterval(()=>{
	GlobalStorage.time.set(GlobalStorage.time + 1/60000);
	GlobalStorage.time.set(GlobalStorage.time % 1)
}, 1000 / 60)

window.GlobalStorage = GlobalStorage;


export default GlobalStorage