import fs, { write } from 'fs';
import { promisify } from 'util';

let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);

class FeedbackService {

    constructor(datafile) {
        this.datafile = datafile;
    }
    async getFeedback() {
        let data = await this.getData();
        let feedback = data.map(ele => {
            return {
                title: ele.title,
                name: ele.name,
                message: ele.message
            }
        });
        return feedback;
    }

    async postFeedback(name, title, message) {
        let data = await this.getData();
        data.unshift({ name, title, message });
        return writeFile(this.datafile, JSON.stringify(data))
    }

    async getData() {
        let data = await readFile(this.datafile, 'utf8');
        if (!data) return [];
        return JSON.parse(data);
    }
}
module.exports = FeedbackService;