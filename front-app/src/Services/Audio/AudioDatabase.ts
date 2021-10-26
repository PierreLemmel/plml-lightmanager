import { uuid } from "../../Core/Helpers/Utils";
import { AudioElementsCollection } from "./AudioManagement";

const rngTitles: string[] = [
    
];

export const rngAudioElements: AudioElementsCollection = {

    name: "RNG Audio",
    key: uuid(),

    clips: rngTitles.map(title => {
        return {
            name: title,
            key: uuid(),
            src: require(`../../Data/Audio/${title}.mp3`).default
        }
    })
}