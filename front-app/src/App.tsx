import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SerialControl from './Components/SerialControl';
import ShowControl from './Components/ShowControl';
import { useEffectAsync } from './Helpers/Hooks';
import { Enttec, OpenDmxContext, OpenDmxContextProps, OpenDmxDevice } from './Services/Dmx/OpenDmx';

const App = () => {

    const [device, setDevice] = useState<OpenDmxDevice|null>(null);
    const [portOpened, setPortOpened] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);

    useEffectAsync(async () => {

        const ports = await navigator.serial?.getPorts();
        if (ports) {
            const enttecPort = ports.find(Enttec.isEnttecOpenDmx);
            if (enttecPort) {
                setDevice(new OpenDmxDevice(enttecPort));
            }
        }

    }, []);

    const start = async () => {
        if (!device) {
            return;
        }

        await device.open();
        setPortOpened(device.opened);

        device.startSending();
        setIsSending(device.isSending);
    };

    const stop = async () => {
        if (!device) {
            return;
        }

        device.stopSending();
        setIsSending(device.isSending);

        await device.close();
        setPortOpened(device.opened);
    }

    const openDmxContext: OpenDmxContextProps = {
        hasSerial: navigator.serial !== undefined,
        hasDevice: device !== null,

        portOpened: portOpened,
        isSending: isSending,

        start: start,
        stop: stop,
    };

    const onSerialPortSelected = (port: SerialPort) => setDevice(new OpenDmxDevice(port));

    return <div>
        <SerialControl onSerialPortSelected={onSerialPortSelected} />
        <OpenDmxContext.Provider value={openDmxContext}>

            <BrowserRouter>
                <Switch>
                    <Route exact path={["/", "/show"]} component={ShowControl} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>

        </OpenDmxContext.Provider>
    </div>;
}
export default App;