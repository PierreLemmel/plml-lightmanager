import { Fixtures } from '../Services/Dmx/Dmx512';
import { useAuth, usePublicData } from '../Services/Firebase/Firebase';

type Dmx512Data = {
    readonly fixtureModels: Fixtures.FixtureModel[];
}

const ShowControl = () => {

    const [user] = useAuth();

    const [value, loading, error] = usePublicData<Dmx512Data>("public/dmx512");
    
    return <div>
        <div>
            {error && <>Error: {JSON.stringify(error)}</>}
            {loading && <>Document: Loading...</>}
            {value && <div>
                {value.fixtureModels.map((model, i) => <div key={`fixture-${i}`} className="m-4">
                    <div>Name: {model.name}</div>
                    <div>Manufacturer: {model.manufacturer}</div>
                    <div>Type: {model.type}</div>
                    <div>Channels:</div>
                    <div className="mb-2">
                        {model.channels.map((chan, j) => <div className="ml-6" key={`fixture-chan-${j}`}>"{chan.name}" / "{chan.type}"</div>)}
                    </div>
                    <div>Modes:</div>
                    <div className="mb-2">
                        {model.modes.map((mode, k) => <div className="ml-6" key={`fixture-mode-${k}`}>
                            <div>{mode.name}</div>
                            <div className="ml-6">
                                {Object.keys(mode.channels).map(c => <div key={`channel-${c}`}>
                                    {c}: {mode.channels[Number.parseInt(c)]}
                                </div>)}
                            </div>
                        </div>)}
                    </div>
                </div>)}
            </div>}
        </div>
        <div>
            {user && user.uid}
        </div>
    </div>
};

export default ShowControl;