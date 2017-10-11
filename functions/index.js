const functions = require('firebase-functions');

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(functions.config().sendgrid.key);

exports.httpEmail = functions.https.onRequest((req, res) => {
  return Promise.resolve()
    .then(() => {
      if (req.method !== 'POST') {
        const error = new Error('Only POST requests are accepted');
        error.code = 405;
        throw error;
      }
      let msg = {
        to: req.body.recipients,
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.plainText,
        html: req.body.htmlText,
        sendAt: req.body.sendAt
      };
      return sendgrid.send(msg);
    })
    .then((response) => {
      if (response.body) {
        res.send(response.body);
      } else {
        res.end();
      }
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
})