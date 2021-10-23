import { Scene } from "../../Services/Dmx/LightManagement";
import { LightManagementContext } from "../Contexts/Contexts"
import { Button } from "../Core/Core";

interface ScenesPanelProps {

}

const ScenesPanel = (props: ScenesPanelProps) => <LightManagementContext.Consumer>
    {ctx => {
        const {
            sceneCollection: { scenes, name },
            lightManagement: { setScene }
        } = ctx;

        return <div>
            <div className="text-2xl">{name}</div>
            {scenes.length > 0 ?
                <AnyScenes scenes={scenes} setScene={setScene} /> :
                <NoScenes />
            }
        </div>;
    }}
</LightManagementContext.Consumer>


interface ScenesProps {
    readonly scenes: Scene[];
    readonly setScene: (scene: Scene) => void;
}

const AnyScenes = (props: ScenesProps) => <div className="flex flex-col">
    {props.scenes.map(scene => {
        const { key, name } = scene;

        const onClick = () => {
            props.setScene(scene);
        }

        return <div
            key={`scene-${key}`}
        >
            <Button onClick={onClick}>{name}</Button>
        </div>
    })}
</div>


const NoScenes = () => <div>
    No Scenes
</div>

export default ScenesPanel;