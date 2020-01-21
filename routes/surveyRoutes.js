const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); // "free" in node!
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {

  app.get('/api/surveys', requireLogin, async (req, res) => {
    // We don't want the list of recipients! Called "projection"
    const surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
    res.send(surveys);
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({email, url}) => {
        const match = p.test(new URL(url).pathname);
        if(match) { return {email, surveyId: match.surveyId, choice: match.choice}}
      })
      .compact()
      .uniqBy('email','surveyId')
      .each(({surveyId, email, choice}) => {
        // Do most of search logic on mongo side! We dont want to handle lots of data!
        // This whole thing is run on mongodn and we dont fetch anything!
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: {email: email, responded: false}
          }
        }, {
          $inc: { [choice]:1 }, // find the choice property and increment (inc)
          $set: { 'recipients.$.responded':true },
          lastResponded: new Date() // set a property. $ is the one that matched above
        }).exec();
      })
      .value();

      res.send({});
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);          // Send back the user
    } catch (err) {
      res.status(422).send(err);
    }

  });
};
