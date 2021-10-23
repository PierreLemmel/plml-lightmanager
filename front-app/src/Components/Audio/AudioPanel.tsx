import { AudioElement as AudioClip } from "../../Services/Audio/AudioManagement";
import { AudioManagementContext } from "../Contexts/Contexts";
import { Button, Slider } from "../Core/Core";

interface AudioPanelProps {

}

const AudioPanel = (props: AudioPanelProps) => <AudioManagementContext.Consumer>
    {ctx => {
        const {
            audioManagement: {
                isPlaying,
                stop,
                play,
                volume,
                setVolume
            },
            library: {name, clips}
        } = ctx;

        return <div>
            <div className="text-2xl">{}</div>
            <Button onClick={stop} enabled={isPlaying}>Stop</Button>
            <Slider value={volume}
                min={0} max={1} step={0.05}
                onValueChanged={setVolume}
                label={`Volume: ${(100 * volume).toFixed(0)}%`}
            />
            {clips.length > 0 ? 
                <AnyClips clips={clips} playClip={play} /> :
                <NoClips />}
        </div>
    }}
</AudioManagementContext.Consumer>

interface AnyClipsProps {
    readonly clips: AudioClip[];
    readonly playClip: (audio: AudioClip) => void;
}

const AnyClips = (props: AnyClipsProps) => <div className="flex flex-col">
    {props.clips.map((clip, i) => {
        
        const onClick = () => {
            props.playClip(clip);
        }

        return <div
            key={`clip-${i}`}
        >
            <Button onClick={onClick}>{clip.name}</Button>
        </div>
    })}
</div>

const NoClips = () => <div>No Clips</div>

export default AudioPanel;