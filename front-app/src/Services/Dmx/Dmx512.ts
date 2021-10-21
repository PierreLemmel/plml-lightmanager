import { clampByte } from "../../Core/Helpers/Utils";

export class Color {

    public readonly r: number;
    public readonly g: number;
    public readonly b: number;


    private constructor(r: number, g: number, b: number) {
        this.r = clampByte(r);
        this.g = clampByte(g);
        this.b = clampByte(b);
    }

    public Apply(target: number[], position: number) {
        target[position] = this.r;
        target[position + 1] = this.g;
        target[position + 2] = this.b;
    }

    
    public static Rgb(r: number, g: number, b: number): Color {
        return new Color(r, g, b);
    }

    public static Lerp(from: Color, to: Color, a: number) {
        const b = 1.0 - a;

        return new Color(
            a * from.r + b * to.r,
            a * from.g + b * to.g,
            a * from.b + b * to.b
        );
    }
}

export type ByteChannelTypes = "Dimmer"
    | "Stroboscope"
    | "White"
    | "Uv"
    | "Cold"
    | "Warm"
    | "Amber"
    | "Pan"
    | "Tilt";

export type ColorChannelTypes = "Color";

export type ChannelType = ByteChannelTypes | ColorChannelTypes;

export interface FixtureModel {

    readonly name: string;
    readonly key: string;
    readonly modes: {

        readonly [chanCount: number]: {

            readonly name: string;
            readonly chans: {
                readonly [position: number]: ChannelType;
            }
        };
    }
}


export interface FixtureModelCollection {

    readonly name: string;
    readonly models: FixtureModel[];
}


export interface StageLightingPlan {
    
    readonly name: string;
    readonly fixtures: {

        readonly name: string;
        readonly address: number;
        readonly model: FixtureModel;
        readonly chanNumber: number;
        readonly remarks?: string;
    }[];
}