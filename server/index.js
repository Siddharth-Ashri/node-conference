import express from "express";
import path from 'path';
import routes from './routes';
import createError from 'http-errors';
import configs from './config';
import bodyParser from 'body-parser';
import SpeakerService from './services/SpeakerService';
import FeedbackService from './services/FeedbackService'

let app = express();
let config = configs[app.get('env')];
let feedbackService = new FeedbackService(config.data.feedback);
let speakerService = new SpeakerService(config.data.speakers);
const PORT = 3000;
app.locals.page = 'Home';


if (app.get('env') === 'development') {
    app.locals.pretty = true;
};

app.set('view engine', 'pug');
app.set('index', path.join(__dirname, './views'));
app.locals.title = config.sitename;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/favico.ico', (req, res, next) => {
    res.sendStatus(204);
    next();
});

app.use(async (req, res, next) => {
    try {
        let names = await speakerService.getNames();
        res.locals.speakerNames = names;
        return next();
    } catch (err) {
        return next(err);
    }
});

app.use('/', routes({
    speakerService,
    feedbackService
})); //calling routes() initializes the modules.exports ()=>{} function in router.js

app.use((req, res, next) => {
    //if no routes match with it then express will use this middleware to send back an error 
    return next(createError(404, 'File not found'));
});

app.use((err, req, res, next) => {
    //setting the rror variables to be used for error.pug
    res.locals.message = err.message;
    let status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    return res.render('error');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});