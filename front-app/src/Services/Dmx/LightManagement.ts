import { byte, smoothDamp, Velocity } from '../../Core/Helpers/Mathf';
import { getValue, ValueProvider } from '../../Core/Helpers/Utils';
import { Model } from '../../Core/Models/Models';
import { Chans, Color, Fixtures, StageLightingPlan } from './Dmx512';
import { OpenDmxDevice } from './OpenDmx';

export type ByteProvider = ValueProvider<byte>;
export type ColorProvider = ValueProvider<Color>;

interface ChanValueSource<TChan, TProvider> {
    readonly chan: TChan;
    readonly value: TProvider;
}

interface ByteSource extends ChanValueSource<Chans.ByteChannelType, ByteProvider> { }
interface ColorSource extends ChanValueSource<Chans.ColorChannelType, ColorProvider> { }


type ValueSource = ByteSource | ColorSource;

type SceneElementsProvider = ValueProvider<SceneElement[]>;


export interface SceneElement {
    readonly fixture: Fixtures.Fixture;
    readonly values: ValueSource[];
}

export interface Scene extends Model {

    readonly elements: SceneElementsProvider;
}

export interface SceneCollection extends Model {

    readonly scenes: Scene[];
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

    private readonly _targetBuffer: Buffer;
    private readonly _currentValues: number[];
    private readonly _velocities: Velocity[];
    private readonly _outBuffer: Buffer;

    private _fade: number = 0.0;
    public get fade(): number {
        return this._fade;
    }

    public set fade(fade: number){
        this._fade = fade;
    }

    public constructor(lightingPlan: StageLightingPlan, openDmxDevice: OpenDmxDevice, options: Partial<LightManagerOptions>) {
        this._lightingPlan = lightingPlan;
        this._openDmxDevice = openDmxDevice;

        this._options = {
            ...defaultLightManagerOptions,
            ...options
        };

        const { minAddress, maxAddress } = this._lightingPlan.fixtures.length > 0 ? 
            this._lightingPlan
                .fixtures
                .reduce((previous, { address, chanNumber }) => {
                    
                    const minAddress = Math.min(previous.minAddress, address);
                    const maxAddress = Math.max(previous.maxAddress, address + chanNumber);

                    return { minAddress, maxAddress };

                }, { minAddress: Number.MAX_VALUE, maxAddress: Number.MIN_VALUE }) :
            { minAddress: 0x00, maxAddress: 0xff };


        this._firstAddress = minAddress;

        const addrCount = maxAddress - minAddress;

        this._targetBuffer = Buffer.alloc(addrCount);
        this._currentValues = Array(addrCount).fill(0);
        this._velocities = Array(addrCount).fill(Velocity.zero);
        this._outBuffer = Buffer.alloc(addrCount);
    }

    public get refreshRate(): number {
        return this._options.refreshRate;
    }

    public get deltaTime(): number {
        return 1000 / this.refreshRate;
    }

    public async start(): Promise<void> {
        await this._openDmxDevice.open();
        this.startSending();
    }

    public async stop(): Promise<void> {
        this.stopSending();
        await this._openDmxDevice.close();
    }

    public playScene(scene: Scene): void {

        this.clearTargets();
        const targets = this._targetBuffer;

        const elements = getValue(scene.elements);
        elements.forEach(({ fixture, values }) => {
            
            const mode = Fixtures.extractMode(fixture);
            const chanMapping = Fixtures.getModeReverseMap(mode);

            const fixtureAddress = fixture.address;
            getValue(values)
                .forEach(({ chan, value }) => {

                    const position = chanMapping.get(chan);
                    if (position) {
                        
                        if (Chans.isByteChannel(chan)) {
                        
                            const byte = getValue(value as ByteProvider);
                            targets[fixtureAddress + position] = byte;
                        }
                        else if (Chans.isColorChannel(chan)) {
    
                            const color = getValue(value as ColorProvider);
                            targets[fixtureAddress + position] = color.r;
                            targets[fixtureAddress + position] = color.g;
                            targets[fixtureAddress + position] = color.b;
                        }
                    }
                    else {
                        throw Error('Undefined position')
                    }
                });
        })
    }

    private _loopbackInterval: NodeJS.Timeout|null = null;
    public get isSending(): boolean {
        return this._loopbackInterval !== null;
    }
    
    private startSending(): void {
        this._loopbackInterval = setInterval(async () => {
            await this.update();
        }, this.deltaTime)
    }

    private stopSending(): void {
        
        if (this._loopbackInterval !== null) {
            clearInterval(this._loopbackInterval);
            this._loopbackInterval = null;
        }
    }

    private async update() {

        const { 
            _targetBuffer: targets,
            _outBuffer: outBuffer,
            _currentValues: currentValues,
            _velocities: vels,

            _firstAddress: firstAddress,
            _openDmxDevice: openDmxDevice,
            fade,
            deltaTime
        } = this;

        const addrCount = targets.length;
        for (let i = 0; i < addrCount; i++) {

            const value = smoothDamp(currentValues[i], targets[i], vels[i], fade, deltaTime);
            currentValues[i] = value;
            outBuffer[i] = Math.round(value);
        }

        openDmxDevice.write(outBuffer, firstAddress);
        await openDmxDevice.sendFrame();
    }

    private clearTargets(): void {
        this._targetBuffer.fill(0);
    }

}