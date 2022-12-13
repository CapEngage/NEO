const express = require('express');
const BrandAccount = require('../models/BrandAccount');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const BrandAccountRoute = express.Router();
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'goutam.k@capengage.com', // generated ethereal user
    pass: 'zdqypfawnzekirwt', // generated ethereal password
  },
});

BrandAccountRoute.post('/register', (req, res, next) => {
  const brandCodeN =
    'CE' +
    (Math.floor(1000000 + Math.random() * 9000000 + Math.random() + 1) + 'A');
  const API_Token = uuidv4();
  
   
  bcryptjs
    .hash(req.body.password, 10)
    .then((hash) => {
      const _BrandAccount = new BrandAccount({
        email: req.body.email,
        password: hash,
        role: req.body.role,
        name: req.body.name,
        brandName: req.body.brandName,
        // brandCode: parseInt(Date.now() * Math.random()),
        brandCode: brandCodeN,
        userAccess:req.body.email,
        token: API_Token,
        createdBy: req.body.email,
      });

      BrandAccount.findOne({ brandName: req.body.brandName })
      .then((user1) => {
        if (user1) {
          return res.status(401).json({
            message: req.body.brandName + ' : Brand Name Already Exists!',
          });
        }

        _BrandAccount.save().then((result) => {
          if (!result) {
            return res.status(500).json({
              message: 'Error: Unable to create a brand name, Try again!',
            });
          }
          res.status(201).json(
            {
              message: 'You have successfully created your account!',
              result: result,
            },
            (mailOptions = {
              to: req.body.email,

              subject: "Welcome to CapEngage! Let's get you started",
              html: `<div >
              <style>
              .p {
                font-family: 'CircularXXWeb-Regular, Arial, sans-serif';
                font-size: 8px;
              }</style>

              <p><span>Hi ${req.body.name},</span></p>
          
              <p><span>We are happy to have ${req.body.brandName} on-board with us!&nbsp;</span></p>
          
              <p><span>Pretty soon, you will be using best resources to Engage your app/web customers with the Right Message at the Right Time.</span></p>
          
              <p>
                  <span><strong>How do you wish to proceed from here?</strong></span>
              </p>
          
              <ul>
                  <li>
                      <span>
                          <span>
                              <a href="http://app.CapEngage.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://app.CapEngage.com&amp;source=gmail&amp;ust=1665433977895000&amp;usg=AOvVaw0b0nJzpj8XRCKh-nKNGue5">
                                  Explore the Dashboard
                              </a>
                          </span>
                      </span>
                  </li>
                  <li>
                      <span>
                          <span>
                              <a href="http://docs.CapEngage.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://docs.CapEngage.com&amp;source=gmail&amp;ust=1665433977895000&amp;usg=AOvVaw0nkspX7DN-axp513RyE2YG">
                                  Integrate the SDKs
                              </a>
                          </span>
                      </span>
                  </li>
                  <li>
                      <span>
                          <span>
                              <a href="http://help.CapEngage.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://help.CapEngage.com&amp;source=gmail&amp;ust=1665433977895000&amp;usg=AOvVaw330Va4Qq_MywMXE2rpmqXj">
                                  Learn more at CapEngage Help Center
                              </a>
                          </span>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                      </span>
                  </li>
              </ul>
          
              <p>
                  <span>In case, you have any questions about getting started - you can reply here, chat with us on dashboard or directly reach out to us at <a href="mailto:support@CapEngage.com" target="_blank">support@CapEngage.com</a>.</span>
              </p>
          
              <p>
                  <span>
                      Happy engaging your users!<br />
                      Customer Success, CapEngage
                  </span>
              </p>
              
          </div>
              `,
            }),
            transporter.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
                res.end('error');
              } else {
                console.log('Message sent: ' + req.body.email);
                res.end('sent');
              }
            })
          );
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

BrandAccountRoute.post('/login', (req, res, next) => {
  let FetchedBrandAccountData;

  BrandAccount.findOne({ email: req.body.email })
    .then((_BrandAccount) => {
      if (!_BrandAccount) {
        return res.status(401).json({
          message: 'User Authentication Failed | No User Account Found',
        });
      }
      FetchedBrandAccountData = _BrandAccount;
      return bcryptjs.compare(req.body.password, _BrandAccount.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: 'Authentication Failed: Inccorect Password',
        });
      }
      const accessToken = jwt.sign(
        { email: FetchedBrandAccountData.email, BrandAccountId: FetchedBrandAccountData._id },
        '279ce3cf-d8c4-42cc-acac-748050925925',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        accessToken: accessToken,
        expiresIn: 360000,
        BrandAccountId: FetchedBrandAccountData._id,
        email: FetchedBrandAccountData.email,
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

// Get All BrandUsers
BrandAccountRoute.route("/:brandCode").get((req, res, next) => {
  const _brandCode = req.params.brandCode;
  BrandAccount.findOne({brandCode: _brandCode}).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = BrandAccountRoute;
