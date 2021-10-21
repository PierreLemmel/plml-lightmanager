import { ByteChannelTypes, Color, ColorChannelTypes, StageLightingPlan } from './Dmx512';
import { OpenDmxDevice } from './OpenDmx';

type ValueProvider<T> = T|(() => T)

export type ByteProvider = ValueProvider<number>;
export type ColorProvider = ValueProvider<Color>;

type ChanValueSource<TChan, TProvider> = {
    readonly chan: TChan;
    readonly value: TProvider;
}
type ByteSource = ChanValueSource<ByteChannelTypes, ByteProvider>;
type ColorSource = ChanValueSource<ColorChannelTypes, ColorProvider>;

type ValueSource = ByteSource | ColorSource;

export interface Scene {
    readonly name: string;
    readonly key: string;

    readonly elements: {
        readonly fixtureKey: string;
        readonly values: ValueSource[];
    }[];
}

type TransitionType = "Instant"|"Ease"|"Linear";
export class Transition {
    public readonly type: TransitionType;
    public readonly duration: number;

    private constructor(type: TransitionType, duration: number) {
        this.type = type;
        this.duration = duration;
    }

    public static Instant(): Transition {
        return new Transition("Instant", 0);
    }

    public static Ease(duration: number): Transition {
        return new Transition("Ease", duration);
    }

    public static Linear(duration: number): Transition {
        return new Transition("Linear", duration);
    }
}


export interface LightManagerOptions {
    readonly refreshRate: number;
}

const defaultLightManagerOptions: LightManagerOptions = {
    refreshRate: 10.0
}

export class LightManager {

    private readonly _lightingPlan: StageLightingPlan;
    private readonly _openDmxDevice: OpenDmxDevice;
    private readonly _options: LightManagerOptions

    private readonly _firstAddress: number;
    private readonly _buffer: Buffer;

    public constructor(lightingPlan: StageLightingPlan, openDmxDevice: OpenDmxDevice, options: Partial<LightManagerOptions>) {
        this._lightingPlan = lightingPlan;
        this._openDmxDevice = openDmxDevice;

        this._options = {
            ...defaultLightManagerOptions,
            ...options
        };

        const { minAdress, maxAdress } = this._lightingPlan.fixtures.reduce((previous, { address, chanNumber }) => {
            
            const minAdress = Math.min(previous.minAdress, address);
            const maxAdress = Math.max(previous.maxAdress, address + chanNumber);

            return { minAdress, maxAdress };

        }, { minAdress: Number.MAX_VALUE, maxAdress: Number.MIN_VALUE });

        this._firstAddress = minAdress;
        this._buffer = Buffer.alloc(maxAdress - minAdress);
    }

    public get refreshRate(): number {
        return this._options.refreshRate;
    }

    public async start() {
        await this._openDmxDevice.open();
        this.startSending();
    }

    public async stop() {
        this.stopSending();
        await this._openDmxDevice.close();
    }

    private _loopbackInterval: NodeJS.Timeout|null = null;
    public get isSending(): boolean {
        return this._loopbackInterval !== null;
    }
    
    private startSending(): void {
        this._loopbackInterval = setInterval(async () => {

            this._openDmxDevice.write(this._buffer, this._firstAddress);
            await this._openDmxDevice.sendFrame();
        }, 1000 / this.refreshRate)
    }

    private stopSending(): void {
        
        if (this._loopbackInterval !== null) {
            clearInterval(this._loopbackInterval);
            this._loopbackInterval = null;
        }
    }

}