import { LightManagementContext } from "../Contexts/Contexts";

interface DmxControlProps {

}

const DmxControl = (props: DmxControlProps) => <LightManagementContext.Consumer>
    {openDmx => {
        return <div>
            DMX CONTROL
        </div>;
    }}
</LightManagementContext.Consumer>

export default DmxControl;