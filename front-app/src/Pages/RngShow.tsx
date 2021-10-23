import LightControl from "../Components/Dmx/LightControl";
import ScenesPanel from "../Components/Dmx/ScenesPanel";

const RngShow = () => {

    return <div>
        <div className="text-5xl">RNG</div>
        <div className="p-4">
            <div className="text-2xl mb-2">Light control</div>
            <LightControl />
        </div>
        <div className="p-4">
            <div className="text-2xl mb-2">Scenes</div>
            <ScenesPanel />
        </div>

    </div>
};

export default RngShow;