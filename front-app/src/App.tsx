import { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SerialControl from './Components/Dmx/SerialControl';
import ShowControl from './Pages/ShowControl';
import { useEffectAsync } from './Core/React/Hooks';
import { Enttec, OpenDmxDevice } from './Services/Dmx/OpenDmx';
import { LightManagementContext, LightManagementContextProps } from './Components/Contexts/Contexts';
import { improvibarLightingPlan } from './Services/Dmx/FixturesDatabase';
import { LightManager, LightManagerOptions } from './Services/Dmx/LightManagement';
import { StageLightingPlan } from './Services/Dmx/Dmx512';

const App = () => {

    const [device, setDevice] = useState<OpenDmxDevice|null>(null);
    const [lightManager, setLightManager] = useState<LightManager|null>(null);
    const [lightingPlan, setLightingPlan] = useState<StageLightingPlan>({
        name: "UNINITIALIZED",
        fixtures: [

        ]
    });

    const getLightManagerOptions = (): Partial<LightManagerOptions> => {
        return {

        };
    }

    const onPortSelected = (port: SerialPort) => {
        
        const newDevice = new OpenDmxDevice(port);
        setDevice(newDevice);
        
        const newLightManager = new LightManager(lightingPlan, newDevice, getLightManagerOptions())
        setLightManager(newLightManager);
    }

    const onLightingPlanLoaded = (newPlan: StageLightingPlan) => {
        setLightingPlan(newPlan);

        if (device) {
            const newLightManager = new LightManager(newPlan, device, getLightManagerOptions())
            setLightManager
        }
    }

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

    const hasSerial = navigator.serial !== undefined;
    const hasDevice = device !== null;

    const canStart = hasSerial && hasDevice && !portOpened && !isSending
    const start = async () => {
        if (!lightManager || !device) {
            return;
        }

        await lightManager.start();
        setPortOpened(device.opened);
        setIsSending(lightManager.isSending);
    };

    const canStop = hasSerial && hasDevice && portOpened && isSending;
    const stop = async () => {
        if (!lightManager || !device) {
            return;
        }

        await lightManager.stop();
        setIsSending(lightManager.isSending);
        setPortOpened(device.opened);
    }

    

    const lightManagementContext: LightManagementContextProps = {
        openDmx: {
            hasSerial,
            hasDevice,
            portOpened,
            isSending
        },
        lightManagement: {
            canStart,
            start,
    
            canStop,
            stop,
        },
        setup: {
            lightingPlan: lightingPlan
        }
    }

    const onSerialPortSelected = (port: SerialPort) => setDevice(new OpenDmxDevice(port));

    return <div>
        {!device && <SerialControl onSerialPortSelected={onSerialPortSelected} />}

        <LightManagementContext.Provider value={lightManagementContext}>

            <BrowserRouter>
                <Switch>
                    <Route exact path={["/", "/show"]} component={ShowControl} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>

        </LightManagementContext.Provider>
    </div>;
}
export default App;