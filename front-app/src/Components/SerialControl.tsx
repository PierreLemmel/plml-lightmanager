interface SerialControlProps {
    readonly onSerialPortSelected: (port: SerialPort) => void;
}

const SerialControl = (props: SerialControlProps) => {

    const serialClick = () => {

    }

    return <div>
        <div className="btn btn-blue" onClick={serialClick}>
            SERIAL
        </div>
    </div>;
}

export default SerialControl;