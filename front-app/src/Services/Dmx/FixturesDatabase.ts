import { byte, random, random01, randomByte } from "../../Core/Helpers/Mathf";
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
                [3]: "White",
                [4]: "Dimmer",
                [5]: "Stroboscope"
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
                [3]: "White",
                [4]: "Dimmer",
                [5]: "Stroboscope",
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


const faceLedElements = (color: Color, dimmer: byte): SceneElement[] => {

    return [
        parRgbJardinCour,
        parRgbCourJardin,
    ].map(fixture => {

        return {
            fixture,
            values: [
                {
                    chan: "Color",
                    value: color
                },
                {
                    chan: "Dimmer",
                    value: dimmer
                }
            ]
        }
    })
};


const allLedElements = (color: Color, dimmer: byte): SceneElement[] => {

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
                    value: color
                },
                {
                    chan: "Dimmer",
                    value: dimmer
                }
            ]
        }
    })
}

const contresLedElements = (color: Color, dimmer: byte): SceneElement[] => {

    return [
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
                    value: color
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
            name: "Warm",
            key: uuid(),

            elements: () => {

                const dimmer = random(160, 255);
                return faceLedElements(Color.warmWhite, dimmer);
            }
        },
        {
            name: "Cold",
            key: uuid(),

            elements: allLedElements(Color.white, 0xff)
        },
        {
            name: "Contres",
            key: uuid(),

            elements: () => {
                const color = Color.hsl(random01(), 1.0, random(0.4, 0.6));
                const dimmer = randomByte(50, 120);

                return contresLedElements(color, dimmer);
            }
        },
        {
            name: "Random Color",
            key: uuid(),

            elements: () => {

                const color = Color.hsl(random01(), 1.0, random(0.4, 0.6));
                const dimmer = randomByte(80, 255);

                return allLedElements(color, dimmer);
            }
        },
        {
            name: "Bicolor",
            key: uuid(),

            elements: () => {

                const l = random(0.35, 0.65);
                const h1 = random01();
                const h2 = h1 > 0.5 ? h1 - 0.5 : h1 + 0.5;

                const facesDimmer = randomByte(180, 255);

                const contresDimmer = randomByte(20, 70);

                const result = contresLedElements(Color.white, contresDimmer);
                result.push(
                    {
                        fixture: parRgbCourJardin,
                        values: [
                            {
                                chan: "Color",
                                value: Color.hsl(h1, 1.0, l)
                            },
                            {
                                chan: "Dimmer",
                                value: facesDimmer
                            }
                        ]
                    },
                    {
                        fixture: parRgbJardinCour,
                        values: [
                            {
                                chan: "Color",
                                value: Color.hsl(h2, 1.0, l)
                            },
                            {
                                chan: "Dimmer",
                                value: facesDimmer
                            }
                        ]
                    },
                );

                return result;
            }
        },
        {
            name: "Douche",
            key: uuid(),

            elements: [
                {
                    fixture: parLedServoCour,
                    values: [
                        {
                            chan: "Dimmer",
                            value: 0xff
                        },
                        {
                            chan: "Warm",
                            value: 0xff
                        },
                        {
                            chan: "Cold",
                            value: 0xff
                        },
                        {
                            chan: "Pan",
                            value: 100
                        },
                        {
                            chan: "Tilt",
                            value: 100
                        },
                    ]
                }
            ]
        }
    ]
}