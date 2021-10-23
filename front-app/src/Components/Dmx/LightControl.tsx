import { LightManagementContext } from "../Contexts/Contexts";
import { Button, Slider } from "../Core/Core";

interface LightcontrolProps {

}

const LightControl = (props: LightcontrolProps) => <LightManagementContext.Consumer>
    {ctx => {
        const {
            canStart,
            start,
            canStop,
            stop,
            fade,
            setFade
        } = ctx.lightManagement;

        return <div className="flex flex-col w-100">
            <div className="flex flex-row w-100">
                <Button className="w-40" enabled={canStart} onClick={start}>Start</Button>
                <Button enabled={canStop} onClick={stop}>Stop</Button>
            </div>
            <div className="w-1/4">
                <Slider
                    label={`Fade: ${fade.toFixed(2)}s`}
                    value={fade} min={0.0} max={15.0}
                    step={0.25}
                    onValueChanged={setFade} />
            </div>
        </div>;
    }}
</LightManagementContext.Consumer>

export default LightControl;