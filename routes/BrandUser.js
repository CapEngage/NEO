const express = require("express");
var multer = require('multer')
var csv = require('csvtojson')
const app = express();
const BrandUserRoute = express.Router();
const checkAuth = require("../middlewares/check-auth");
// BrandUser model
let BrandUser = require("../models/BrandUser");
const { v4: uuidv4 } = require("uuid");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/user')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  var uploads = multer({ storage: storage })

// Add BrandUser
BrandUserRoute.post(
    "",
    checkAuth,

    (req, res, next) => {
        BrandUser.create(req.body, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.status(200).json(data)
          }
        })
      }
);

BrandUserRoute.post('/uploadUser', uploads.single('csvFile'), (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((response) => {
      for (var x = 0; x < response; x++) {
        usrResponse = parseFloat(response[x].Name)
        response[x].Name = usrResponse
        usrResponse = parseFloat(response[x].Email)
        response[x].Email = usrResponse
        usrResponse = parseFloat(response[x].Phone)
        response[x].Phone = usrResponse
        usrResponse = parseFloat(response[x].brandCode)
        response[x].brandCode = usrResponse
      }
      BrandUser.insertMany(response, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
      })
    });
});
// Get All BrandUsers
BrandUserRoute.route("/filter/:brandCode").get((req, res, next) => {
    const _brandCode = req.params.brandCode;
    BrandUser.find({brandCode: _brandCode}).exec((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
               }
        });
  }); 
// Get single BrandUser
BrandUserRoute.route("/:id").get((req, res) => {
    BrandUser.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Update BrandUser
BrandUserRoute.route("/:id").put((req, res, next) => {
    BrandUser.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                return next(error);
                console.log(error);
            } else {
                res.json(data);
                console.log("Brand Name updated successfully");
            }
        }
    );
});
// Delete BrandUser
BrandUserRoute.route("/:id").delete((req, res, next) => {
    BrandUser.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data,
                
            });
        }
    });
});
module.exports = BrandUserRoute;
