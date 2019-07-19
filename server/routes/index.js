import express from 'express';
import speakerRoute from './speakers';
import feedbackRoute from './feedback'

//creating a router object

let router = express.Router();

module.exports = (param) => {
    //this router objects middleware has a speaker router in it as well
    // console.log(param.speakerService);
    router.use('/speakers', speakerRoute(param));
    router.use('/feedback', feedbackRoute(param));

    router.get('/', async (req, res) => {
        let { speakerService } = param;
        // let speakerList = await speakerService.getListShort();
        // let speakerArtwork = await speakerService.getAllArtwork(); // using two await methods like this can cause performance issues

        let promises = [];
        promises.push(speakerService.getListShort());
        promises.push(speakerService.getAllArtwork());

        let results = await Promise.all(promises);
        return res.render('index', {
            page: 'Home',
            speakerList: results[0],
            artwork: results[1]
        });
    });
    return router;
    //finally return the router object to the server  
};
