import { OpenDmxContext } from "../Services/Dmx/OpenDmx";

const ShowControl = () => {

    if (navigator.serial) {
        return <SerialAvailable />
    }
    else {
        return <SerialUnavailable />
    }
};

const SerialAvailable = () => <div>Serial available</div>;

const SerialUnavailable = () => <div>Serial unavailable use a more recent browser.</div>;

export default ShowControl;