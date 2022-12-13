const express = require("express");
var multer = require('multer')
var csv = require('csvtojson')
const app = express();
const BrandEventRoute = express.Router();
const checkAuth = require("../middlewares/check-auth");
// BrandEvent model
let BrandEvent = require("../models/Event");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/event')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  });
  var uploads = multer({ storage: storage });

// Add BrandEvent
BrandEventRoute.post(
    "",
    checkAuth,

    (req, res, next) => {
        BrandEvent.create(req.body, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.status(200).json(data)
          }
        })
      }
);
BrandEventRoute.route('/').get((req, res) => {
  BrandEvent.find((err, data) => {
    if (err) {
    } else {
      if (data != '') {
        res.render('index', { data: data })
      } else {
        res.render('index', { data: '' })
      }
    }
  })
})
BrandEventRoute.post('/uploadEvent', uploads.single('EventCsvFile'), (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((response) => {
      for (var x = 0; x < response; x++) {
        empResponse = parseFloat(response[x].Name)
        response[x].Name = empResponse
        empResponse = parseFloat(response[x].Email)
        response[x].Email = empResponse
        empResponse = parseFloat(response[x].Designation)
        response[x].Designation = empResponse
        empResponse = parseFloat(response[x].Mobile)
        response[x].Mobile = empResponse
      }
      BrandEvent.insertMany(response, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.json(data);
        }
      })
    });
});
// Get All BrandEvents
BrandEventRoute.route("/filter").get((req, res) => {
    
  BrandEvent.find({})
      .populate("User_id")
      .exec((error, data) => {
          if (error) {
              return next(error);
          } else {
              res.json(data);
             }
      });
}); 

// Get single BrandEvent
BrandEventRoute.route("/:id").get((req, res) => {
    BrandEvent.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Update BrandEvent
BrandEventRoute.route("/:id").put((req, res, next) => {
    BrandEvent.findByIdAndUpdate(
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
                console.log("Updated successfully");
            }
        }
    );
});
// Delete BrandEvent
BrandEventRoute.route("/:id").delete((req, res, next) => {
    BrandEvent.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data,
                
                
            });
            console.log("Deleted successfully");
        }
    });
});
module.exports = BrandEventRoute;
