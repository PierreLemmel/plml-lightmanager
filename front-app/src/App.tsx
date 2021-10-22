import { useState } from 'react';
import './App.css';
import SerialControl from './Components/Dmx/SerialControl';
import { useEffectAsync } from './Core/React/Hooks';
import { Enttec, OpenDmxDevice } from './Services/Dmx/OpenDmx';
import { LightManagementContext, LightManagementContextProps } from './Components/Contexts/Contexts';
import { LightManager, LightManagerOptions, SceneCollection } from './Services/Dmx/LightManagement';
import { StageLightingPlan } from './Services/Dmx/Dmx512';
import AppRouting from './AppRouting';
import { uuid } from './Core/Helpers/Utils';
import { improvibarLightingPlan, rngSceneCollection } from './Services/Dmx/FixturesDatabase';

const App = () => {

    const [device, setDevice] = useState<OpenDmxDevice|null>(null);
    const [lightManager, setLightManager] = useState<LightManager|null>(null);
    const [fade, setFade] = useState<number>(0.0);
    const [lightingPlan, setLightingPlan] = useState<StageLightingPlan>(improvibarLightingPlan);
    const [sceneCollection, setSceneCollection] = useState<SceneCollection>(rngSceneCollection);

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
            setLightManager(newLightManager);
        }
    }

    const [portOpened, setPortOpened] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);

    useEffectAsync(async () => {

        const ports = await navigator.serial?.getPorts();
        if (ports) {
            const enttecPort = ports.find(Enttec.isEnttecOpenDmx);
            if (enttecPort) {
                onPortSelected(enttecPort);
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

    const onFadeSet = (fade: number) => {
        
        if (lightManager) {
            lightManager.fade = fade;
        }
        setFade(fade);
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

            fade,
            setFade: onFadeSet
        },
        setup: {
            lightingPlan: lightingPlan
        },
        scenes: sceneCollection
    }

    return <div>
        {!device && <SerialControl onSerialPortSelected={onPortSelected} />}

        <LightManagementContext.Provider value={lightManagementContext}>

            <AppRouting />

        </LightManagementContext.Provider>
    </div>;
}

export default App;