let nodemailer = require('nodemailer');

// Create a SMTP transport object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAILING_USER,
        pass: process.env.MAILING_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});


let resetPasswordMessage = function(recipient, resetUrl, next) {
    transporter.sendMail({
        // sender info
        from: '"Prello Support" <' + process.env.MAILING_USER +'>',
        // Comma separated list of recipients
        to: '' + recipient.fullName() + ' <' + recipient.email + '>',
        // Subject of the message
        subject: 'Prello - Reset your password',
        // plaintext body
        text: 'Hello ' + recipient.firstName + '!',
        // HTML body
        html:'<p>Hello <b>' + recipient.username + '</b> !</p>'+
        '<p>You have send request to reset your password.<br/>' +
        'Click on the link below to reset your password account. (Expire in 1 hour)<br/>' +
        'Link : <a href="' + resetUrl + '">' + resetUrl + '</a></p>' +
        '<p>Best regards,</p>' +
        '<p>Prello Team</p>'
    }, (err) => { transporter.close(); next(err) });
};


let confirmEmailMessage = function(recipient, confirmUrl, next) {
    transporter.sendMail({
        // sender info
        from: '"Prello Support" <' + process.env.MAILING_USER +'>',
        // Comma separated list of recipients
        to: '' + recipient.fullName() + ' <' + recipient.email + '>',
        // Subject of the message
        subject: 'Prello - Confirm your email',
        // plaintext body
        text: 'Hello <b>' + recipient.firstName + '</b> !',
        // HTML body
        html:'<p><b>Hello</b> ' + recipient.firstName + ' !</p>'+
        '<p>Thanks you for your registration on Prello !<br/>' +
        'Click on the link below to confirm your email address.<br/>' +
        'Link : <a href="' + confirmUrl + '">' + confirmUrl + '</a></p>' +
        '<p>Best regards,</p>' +
        '<p>Prello Team</p>'
    }, (err) => { transporter.close(); next(err) });
};

module.exports = {
    resetPasswordMessage : resetPasswordMessage,
    confirmEmailMessage : confirmEmailMessage
};