import { uuid } from "../../Core/Helpers/Utils";
import { FixtureModel, FixtureModelCollection, StageLightingPlan } from "./Dmx512";

const parLedRGBW: FixtureModel = {

    name: "Par LED RGBW",
    key: uuid(),
    modes: {

        [6]: {
            name: "6 CH",
            chans: {
                [0]: "Color",
                [4]: "White",
                [5]: "Dimmer",
                [6]: "Stroboscope"
            }
            
        }
        
    }
}

const parLedRGBUv: FixtureModel = {

    name: "Par LED RGBUv",
    key: uuid(),
    modes: {

        [6]: {
            name: "6 CH",
            chans: {
                [0]: "Color",
                [4]: "Uv",
                [5]: "Dimmer",
                [6]: "Stroboscope",
            }
            
        }
        
    }
}


const flatParCW_WW_Amber: FixtureModel = {

    name: "FlatPar CW/WW/Amber",
    key: uuid(),
    modes: {

        [4]: {
            name: "4 CH",
            chans: {
                [0]: "Color",
                [4]: "White",
                [5]: "Dimmer",
                [6]: "Stroboscope",
            }
            
        }
        
    }
}

const parLedServoSharkCombi: FixtureModel = {

    name: "ParLedServo Shark combi",
    key: uuid(),
    modes: {

        [20]: {
            name: "20 CH",
            chans: {
                [0]: "Pan",
                [2]: "Tilt",
                [5]: "Stroboscope",
                [6]: "Color",
                [9]: "Cold",
                [10]: "Warm"
            }
        }
    }
}

export const defaultModelCollection: FixtureModelCollection = {

    name: "Improvibar",
    models: [
        parLedRGBW,
        parLedRGBUv,
        flatParCW_WW_Amber,
        parLedServoSharkCombi
    ]
};


export const improvibarLightingPlan: StageLightingPlan = {

    name: "Improvibar",
    fixtures: [

        {
            name: "PAR RGB - Jardin/Cour",
            address: 11,
            model: parLedRGBW,
            chanNumber: 6
        },
        {
            name: "PAR RGB - Cour/Jardin",
            address: 17,
            model: parLedRGBW,
            chanNumber: 6
        },

        {
            name: "PAR RGB - Contre 1",
            address: 41,
            model: parLedRGBW,
            chanNumber: 6
        },
        {
            name: "PAR RGB - Contre 2",
            address: 35,
            model: parLedRGBW,
            chanNumber: 6
        },
        {
            name: "PAR RGB - Contre 3",
            address: 29,
            model: parLedRGBW,
            chanNumber: 6
        },
        {
            name: "PAR RGB - Contre 4",
            address: 23,
            model: parLedRGBW,
            chanNumber: 6
        },

        {
            name: "PAR LED - Jardin/Cour",
            address: 5,
            model: flatParCW_WW_Amber,
            chanNumber: 4
        },
        {
            name: "PAR LED - Cour/Jardin",
            address: 1,
            model: flatParCW_WW_Amber,
            chanNumber: 4
        },

        {
            name: "PAR Led Servo - Cour",
            address: 53,
            model: parLedServoSharkCombi,
            chanNumber: 20
        }
    ]
}