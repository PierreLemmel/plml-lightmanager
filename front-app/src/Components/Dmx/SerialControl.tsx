import { Button } from "@mui/material";
import { Enttec } from "../../Services/Dmx/OpenDmx";

interface SerialControlProps {
    readonly onSerialPortSelected: (port: SerialPort) => void;
}

const SerialControl = (props: SerialControlProps) => {

    const serialClick = async () => {
        
        const port = await navigator.serial?.requestPort();
        if (port && Enttec.isEnttecOpenDmx(port)) {
            props.onSerialPortSelected(port);
        }
    }

    return <div className="w-100 p-2 flex flex-row-reverse">
        <Button onClick={serialClick}>
            Connect to Dmx
        </Button>
    </div>;
}

export default SerialControl;