import React from "react";
import { StageLightingPlan } from "../../Services/Dmx/Dmx512";


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
    },

    readonly setup: {

        readonly lightingPlan: StageLightingPlan;

    }
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
    },

    setup: {
        
        lightingPlan: {
            name: "UNINITIALIZED",
            fixtures: [
                
            ]
        }
    }
})