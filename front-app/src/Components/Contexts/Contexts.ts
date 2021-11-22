import React from "react";
import { number01 } from "../../Core/Helpers/Mathf";
import { AudioElement, AudioElementsCollection } from "../../Services/Audio/AudioManagement";
import { StageLightingPlan } from "../../Services/Dmx/Dmx512";
import { Scene, SceneCollection } from "../../Services/Dmx/LightManagement";


export interface LightManagementContextProps {
    readonly openDmx: {
        readonly hasSerial: boolean;
        readonly hasDevice: boolean;
    
        readonly portOpened: boolean;
        readonly isSending: boolean;
    },

    readonly lightManagement: {
        readonly canStart: boolean;
        readonly start: () => Promise<void>;

        readonly canStop: boolean;
        readonly stop: () => Promise<void>;

        readonly fade: number;
        readonly setFade: (fade: number) => void;

        readonly setScene: (scene: Scene) => void;
    },

    readonly setup: {
        readonly lightingPlan: StageLightingPlan;
    }

    readonly sceneCollection: SceneCollection;
}

export const LightManagementContext = React.createContext<LightManagementContextProps>({
    openDmx: {
        hasSerial: false,
        hasDevice: false,
        portOpened: false,
        isSending: false,
    },

    lightManagement: {
        canStart: false,
        start: () => Promise.resolve(),

        canStop: false,
        stop: () => Promise.resolve(),

        fade: 0.0,
        setFade: (fade: number) => {},

        setScene: (scene: Scene) => {},
    },

    setup: {
        
        lightingPlan: {
            name: "UNINITIALIZED LIGHTING PLAN",
            fixtures: [
                
            ]
        }
    },

    sceneCollection: {
        name: "UNINITIALIZED SCENE COLLECTION",
        scenes: [
            
        ]
    }
})

export interface AudioManagementContextProps {

    readonly audioManagement: {

        readonly volume: number01;
        readonly setVolume: (volume: number01) => void;
        
        readonly isPlaying: boolean;
        readonly play: (audio: AudioElement) => void;
        readonly currentAudio?: AudioElement;
        
        readonly stop: () => void;
    },

    library: AudioElementsCollection
}

export const AudioManagementContext = React.createContext<AudioManagementContextProps>({
    
    audioManagement: {

        volume: 1.0,
        setVolume: () => {},
        isPlaying: false,
        play: () => { },
        stop: () => { }
    },

    library: {
        name: "UNINITALIZED",       
        clips: [

        ]
    }
})