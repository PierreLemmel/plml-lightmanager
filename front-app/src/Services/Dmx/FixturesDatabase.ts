import { byte, random01, randomByte } from "../../Core/Helpers/Mathf";
import { uuid } from "../../Core/Helpers/Utils";
import { Color, Fixtures, StageLightingPlan } from "./Dmx512";
import { SceneCollection, SceneElement } from "./LightManagement";

const parLedRGBWModel: Fixtures.FixtureModel = {

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

const parLedRGBUvModel: Fixtures.FixtureModel = {

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


const flatParCW_WW_AmberModel: Fixtures.FixtureModel = {

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

const parLedServoSharkCombiModel: Fixtures.FixtureModel = {

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

export const defaultModelCollectionModel: Fixtures.FixtureModelCollection = {

    name: "Improvibar",
    key: uuid(),
    models: [
        parLedRGBWModel,
        parLedRGBUvModel,
        flatParCW_WW_AmberModel,
        parLedServoSharkCombiModel
    ]
};



const parRgbJardinCour = {
    name: "PAR RGB - Jardin/Cour",
    key: uuid(),

    address: 11,
    model: parLedRGBWModel,
    chanNumber: 6
};

const parRgbCourJardin = {
    name: "PAR RGB - Cour/Jardin",
    key: uuid(),

    address: 17,
    model: parLedRGBWModel,
    chanNumber: 6
};

const parRgbContre1 = {
    name: "PAR RGB - Contre 1",
    key: uuid(),

    address: 41,
    model: parLedRGBWModel,
    chanNumber: 6
};

const parRgbContre2 = {
    name: "PAR RGB - Contre 2",
    key: uuid(),

    address: 35,
    model: parLedRGBWModel,
    chanNumber: 6
};

const parRgbContre3 = {
    name: "PAR RGB - Contre 3",
    key: uuid(),

    address: 29,
    model: parLedRGBWModel,
    chanNumber: 6
};

const parRgbContre4 = {
    name: "PAR RGB - Contre 4",
    key: uuid(),

    address: 23,
    model: parLedRGBWModel,
    chanNumber: 6
};

const parLedJardinCour = {
    name: "PAR LED - Jardin/Cour",
    key: uuid(),

    address: 5,
    model: flatParCW_WW_AmberModel,
    chanNumber: 4
};

const parLedCourJardin = {
    name: "PAR LED - Cour/Jardin",
    key: uuid(),

    address: 1,
    model: flatParCW_WW_AmberModel,
    chanNumber: 4
};

const parLedServoCour = {
    name: "PAR Led Servo - Cour",
    key: uuid(),

    address: 53,
    model: parLedServoSharkCombiModel,
    chanNumber: 20
};

export const improvibarLightingPlan: StageLightingPlan = {

    name: "Improvibar",
    key: uuid(),

    fixtures: [
        parRgbJardinCour,
        parRgbCourJardin,
        parRgbContre1,
        parRgbContre2,
        parRgbContre3,
        parRgbContre4,
        parLedJardinCour,
        parLedCourJardin,
        parLedServoCour
    ]
}

const ledElements = (color: Color, dimmer: byte): SceneElement[] => {

    return [
        parRgbJardinCour,
        parRgbCourJardin,
        parRgbContre1,
        parRgbContre2,
        parRgbContre3,
        parRgbContre4
    ].map(fixture => {

        return {
            fixture,
            values: [
                {
                    chan: "Color",
                    value: Color.white
                },
                {
                    chan: "Dimmer",
                    value: dimmer
                }
            ]
        }
    })
}

export const rngSceneCollection: SceneCollection = {
    name: "RNG Scenes",
    key: uuid(),

    scenes: [
        {
            name: "White",
            key: uuid(),

            elements: ledElements(Color.white, 0xff)
        },
        {
            name: "Random Color",
            key: uuid(),

            elements: () => {

                const color = Color.hsl(random01(), 1.0, 0.5);
                const dimmer = randomByte(200);

                return ledElements(color, dimmer);
            }
        }
    ]
}