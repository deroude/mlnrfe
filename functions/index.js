'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.username;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Listen for updates to any `user` document.
exports.sendInvitations = functions.firestore
  .document('invitations/{invitationId}')
  .onCreate((event) => {
    // Retrieve the current and previous value
    const data = event.data.data();
    const mailOptions = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text
    };
    return mailTransport.sendMail(mailOptions).then((error) => {
      if (error) {
        event.data.ref.set({ status: 'ERROR' }, { merge: true })
      } else {
        event.data.ref.set({ status: 'SENT' }, { merge: true });
      }
    });
  });