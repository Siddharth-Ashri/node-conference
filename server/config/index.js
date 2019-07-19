import path from 'path';

module.exports = {
    development: {
        sitename: 'Roux meetups [Development]',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json')
        }
    },
    production: {
        sitename: 'Roux meetups',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json')
        }
    }
};