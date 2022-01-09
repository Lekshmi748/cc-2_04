const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      return res.status(204).end();
    }
    return next();
  }
app.use(ignoreFavicon);  

app.get("/", (req, res) => {
    res.send("Welcome to coding competition#2 by Lekshmi S, Norka B3");
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname,"/public/mail.html"));
});

app.post("/mailer", (req, res) => {
    var email = req.body.email;

    console.log(`email : ${email}`);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PSW
        }
    });
    console.log(process.env.EMAIL_ID);
      
    var mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: 'Email using Node.js',
        text: 'Hello...This is a sample mail using Node.js from Lekshmi!!!'
    };
      
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("Something went wrong.");
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Mail sent successfully.');
        }
    });
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running on PORT 3000" ));