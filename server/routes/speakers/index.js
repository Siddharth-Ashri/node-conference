import express from 'express';

let router = express.Router();

module.exports = (param) => {

    router.get('/', async (req, res) => {
        try {
            let {speakerService} = param;
            let promises = [];
            promises.push(speakerService.getList());
            promises.push(speakerService.getAllArtwork());

            let results = await Promise.all(promises);

            res.render('speakers', {
                page: 'All Speakers',
                speakerDetails: results[0],
                artwork: results[1]
            });
        } catch (err) {
            console.log(err);
        }
    });

    router.get('/:name', async (req, res) => {
        try {

            let {speakerService} = param;
            let promises = [];
            promises.push(speakerService.getSpeaker(req.params.name));
            promises.push(speakerService.getSpeakerArtwork(req.params.name));
            let results = await Promise.all(promises);
            res.render(`speakers/detail`, {
                page: `${req.params.name}`,
                speakerName: results[0]['name'],
                speakerShortname: results[0]['shortname'],
                speakerTitle: results[0]['title'],
                speakerSummary: results[0]['description'],
                artwork: results[1]
            });
        } catch (err) {
            console.log(err);
        }
    });
    return router;

}