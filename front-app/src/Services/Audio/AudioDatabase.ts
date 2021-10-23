import { uuid } from "../../Core/Helpers/Utils";
import { AudioElementsCollection } from "./AudioManagement";

const rngTitles: string[] = [
    "2nd World",
    "Ancient Cultures 2",
    "Ancient Cultures",
    "Become God",
    "Big Jet Plane (Animal Trainer Remix)",
    "Broken Sleep",
    "Copie de j'ai mal au mic - instru",
    "Daft Punk ft. Julian Casablancas - Instant Crush (Official Video)",
    "DE CEUX",
    "Dusk to Dawn",
    "edIT Ants",
    "everything i wanted",
    "F.U.Y.A.",
    "Fightclubbing (feat. Vale Poher)",
    "First Snow",
    "Fjarlægur",
    "Flow Asesino",
    "Fog Machine",
    "Habibi",
    "Hello",
    "I'll Be Good",
    "Inside Your Head",
    "j'ai mal au mic - instru",
    "Japanese Porn (feat. Ira Lee)",
    "JEUNESSE TALKING BLUES",
    "Let's Buy Happiness",
    "Lonely Road (feat. Malika)",
    "Lost In Thought",
    "Lucy (Instrumentale)",
    "Magnets",
    "Maribel",
    "Nucléaire",
    "Odezenne - saxophone - O.V.N.I. - INSTRU",
    "Odezenne - tu pu du cu - O.V.N.I. - INSTRU",
    "On nait on vit on meurt",
    "Parasite Eve",
    "Porto",
    "Prickly Pear",
    "Racing with the Sun",
    "Respire",
    "Ritual Spirit",
    "Sad Rap Beat",
    "Shinichi",
    "So Far",
    "Still Insomniac",
    "Sync",
    "Technicolour Beat",
    "The Curse",
    "Trop beau (instrumentale)",
    "Twenty One Pilots - Car Radio (Official Instrumental)",
    "Tyler Hadley",
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