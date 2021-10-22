import { Fixtures } from "../../Services/Dmx/Dmx512";
import { LightManagementContext } from "../Contexts/Contexts";

interface FixturesDisplayProps {

}

const FixturesDisplay = (props: FixturesDisplayProps) => <LightManagementContext.Consumer>

    {context => {

        const fixtures = context.setup.lightingPlan.fixtures;

        return <div>
            <div className="text-2xl">Fixtures</div>
            {fixtures.length > 0 ? 
                <AnyFixtures fixtures={fixtures} /> : 
                <NoFixtures />}
        </div>;
    }}

</LightManagementContext.Consumer>

interface FixturesProps {
    readonly fixtures: Fixtures.Fixture[];
}

const AnyFixtures = (props: FixturesProps) => <div className="flex flex-col">
    {props.fixtures.map(fixture => {

        const fixtureMode = Fixtures.extractMode(fixture);
        return <div
            className="m-2 p-1 bg-gray-200"
            key={fixture.key}
        >
            <div>Name: {fixture.name}</div>
            <div>Adress: {fixture.address}</div>
            <div>Chan count: {fixture.chanNumber}</div>
            <div>Mode: {fixtureMode.name}</div>
            <div className="ml-6">
                {Object.keys(fixtureMode.chans).map(key => {

                    const position = parseInt(key);
                    return <div
                        key={`chan-key-${key}`}
                    >
                        {position}: {fixtureMode.chans[position]}
                    </div>;
                })}
            </div>
        </div>;
    })}
</div>;

const NoFixtures = () => <div>No fixtures</div>;

export default FixturesDisplay;