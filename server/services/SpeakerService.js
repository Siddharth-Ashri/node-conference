import fs from 'fs';
import { promisify } from 'util';

let readFile = promisify(fs.readFile);

class SpeakerService {

    constructor(datafile) {
        this.datafile = datafile;
    }
    async getNames() {
        let data = await this.getData();

        return data.map((speaker) => {
            if (!speaker) return {};
            return { name: speaker.name, shortname: speaker.shortname };
        });
    }
    async getAllArtwork() {
        let data = await this.getData();
        let Artwork = data.reduce((acc, ele) => {
            if (ele.artwork) {
                acc = [...acc, ...ele.artwork];
                return acc;
            };
        }, []);
        return Artwork;
    }
    async getSpeaker(shortname) {
        let data = await this.getData();
        let speaker = data.find((speaker) => {
            if (speaker.shortname === shortname) {
                return {
                    title: speaker.title,
                    shortname: speaker.shortname,
                    name: speaker.name,
                    summary: speaker.description
                };
            }
        });
        if (!speaker) return [];
        return speaker;
    }
    async getSpeakerArtwork(shortname) {
        let data = await this.getData();
        let speaker = data.find((speaker) => {
            if (shortname === speaker.shortname) {
                return speaker;
            }
        });
        if (!speaker || !speaker.artwork) return [];
        return speaker.artwork;
    }
    async getListShort() {
        let data = await this.getData();

        return data.map((speaker) => {
            if (!speaker) return {};
            return { name: speaker.name, shortname: speaker.shortname, title: speaker.title };
        });

    }
    async getList() {
        let data = await this.getData();

        return data.map((speaker) => {
            if (!speaker) return {};
            return {
                name: speaker.name,
                shortname: speaker.shortname,
                title: speaker.title,
                summary: speaker.summary
            };
        });

    }

    async getData() {
        let data = await readFile(this.datafile, 'utf8');
        if (!data) return [];
        return JSON.parse(data).speakers;
    }
}
module.exports = SpeakerService;