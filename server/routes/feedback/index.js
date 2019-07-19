import express from 'express';

let router = express.Router();

module.exports = (param) => {
    router.get('/', async (req, res) => {
        let { feedbackService } = param;
        let feedback = await feedbackService.getFeedback();
        let success = req.query.success;

        res.render('feedback', {
            page: 'Feedback',
            feedback,
            success
        });
    });
    router.post('/', async (req, res) => {
        let { feedbackService } = param;
        let feedback = await feedbackService.getFeedback();

        let fbName = req.body.fbName.trim();
        let fbTitle = req.body.fbTitle.trim();
        let fbMessage = req.body.fbMessage.trim();

        if (!fbName || !fbTitle || !fbMessage) {
            res.render('feedback', {
                page: 'Feedback',
                error: true,
                fbName,
                fbTitle,
                fbMessage,
                feedback
            });
        }
        await feedbackService.postFeedback(fbName, fbTitle, fbMessage);
        res.redirect('/feedback?success=true');
    });
    return router;
}

