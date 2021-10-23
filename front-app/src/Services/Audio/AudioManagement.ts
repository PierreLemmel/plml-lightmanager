import { Model } from "../../Core/Models/Models";

export interface AudioElement extends Model {
    readonly src: string;
}

export interface AudioElementsCollection extends Model {
    readonly clips: AudioElement[];
}

export class AudioPlayer {

    private readonly _audio = new Audio();

    public async play(src: string) {
        this._audio.src = src;
        if (this._audio.paused) {
            this._audio.play();
        }
    }

    public setVolume(volume: number) {
        this._audio.volume = volume;
    }

    public stop() {
        this._audio.pause();
        this._audio.currentTime = 0;
        this._audio.src = "";
    }
}