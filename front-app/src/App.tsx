import { useState } from 'react';
import './App.css';
import { useEffectAsync } from './Core/React/Hooks';
import { Enttec, OpenDmxDevice } from './Services/Dmx/OpenDmx';
import { AudioManagementContext, AudioManagementContextProps, LightManagementContext, LightManagementContextProps } from './Components/Contexts/Contexts';
import { LightManager, LightManagerOptions, Scene, SceneCollection } from './Services/Dmx/LightManagement';
import { StageLightingPlan } from './Services/Dmx/Dmx512';
import AppRouting from './AppRouting';
import { improvibarLightingPlan, rngSceneCollection } from './Services/Dmx/FixturesDatabase';
import { AudioElement, AudioElementsCollection, AudioPlayer } from './Services/Audio/AudioManagement';
import { rngAudioElements } from './Services/Audio/AudioDatabase';
import Header from './Header';
import Footer from './Footer';

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

    const setScene = (scene: Scene) => {
        lightManager?.playScene(scene);
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
            setFade: onFadeSet,

            setScene,
        },
        setup: {
            lightingPlan: lightingPlan
        },
        sceneCollection: sceneCollection
    }


    const [audioPlayer] = useState<AudioPlayer>(new AudioPlayer());
    const [volume, setVolume] = useState<number>(1.0);
    const [currentAudio, setCurrentAudio] = useState<AudioElement>();
    const [audioLibrary, setAudioLibrary] = useState<AudioElementsCollection>(rngAudioElements);

    const playAudio = (audio: AudioElement) => {
        setCurrentAudio(audio);
        audioPlayer.play(audio.src);
    };

    const stopAudio = () => {
        setCurrentAudio(undefined);
        audioPlayer.stop();
    }

    const onSetVolume = (volume: number) => {
        setVolume(volume);
        audioPlayer.setVolume(volume);
    }

    const isAudioPlaying = currentAudio !== undefined;

    const audioManagementContext: AudioManagementContextProps = {

        audioManagement: {

            volume,
            setVolume: onSetVolume,
            isPlaying: isAudioPlaying,
            play: playAudio,
            currentAudio,
            stop: stopAudio
        },

        library: audioLibrary
    }

    return <div className="app flex flex-col h-screen w-screen justify-between">
        <Header />

        <main className="flex-auto">
            <LightManagementContext.Provider value={lightManagementContext}>
            <AudioManagementContext.Provider value={audioManagementContext}>

                <AppRouting />

            </AudioManagementContext.Provider>
            </LightManagementContext.Provider>
            
        </main>
        
        <Footer />
    </div>;
}

export default App;