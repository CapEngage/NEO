const express = require("express");
const app = express();
var multer = require('multer')
var csv = require('csvtojson')
const SegmentRoute = express.Router();
const checkAuth = require("../../middlewares/check-auth");
// Segment model
let Segment = require("../../models/Campaign/Segment");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/segment')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  });
  var uploads = multer({ storage: storage });

SegmentRoute.post("",checkAuth, (req, res, next) => {
       
        const _Segment = new Segment({
            SegmentName: req.body.SegmentName,
            BrandCode: req.body.BrandCode,
            CreatedBy: req.FetchedUserData.userId,
        });
        Segment.findOne({ SegmentName: req.body.SegmentName })
      .then((SegmentName1) => {
        if (SegmentName1) {
          return res.status(401).json({
            message: req.body.SegmentName + ' : Already Exists! Try with diffrent Segment Name',
          });
        };
        _Segment
            .save()
            .then((_Segment) => {
                if (_Segment) {
                    res.status(201).json({
                        message: req.body.SegmentName + ": created successfully",
                        _Segment: {
                            ..._Segment,
                            id: _Segment._id,
                        },
                    });
                } else {
                    res.status(500).json({ message: "Error Adding Segment Name : "  + req.body.SegmentName });
                    return next;
                }
            })
          })
            .catch((e) => {});
    }
);

SegmentRoute.post('/uploadSegment', uploads.single('SegmentCsvFile'), (req, res) => {
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
        Segment.insertMany(response, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.redirect('/')
          }
        })
      });
  });
// Get All Segments
// Get All Employees
/* SegmentRoute.route('/:brandCode').get((req, res) => {
  const _brandCode = req.params.brandCode;
    Segment.findOne({brandCode: _brandCode}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  }) */

  SegmentRoute.route('/').get((req, res) => {
    const _brandCode = req.params.brandCode;
      Segment.find().exec((error, data) => {
        if (error) {
          return next(error)
        } else {p204536
           +
           323
           .0-.0 
          res.json(data)
        }
      })
    })
    SegmentRoute.route("/filter/:brandCode").get((req, res, next) => {
      const _brandCode = req.params.brandCode;
      Segment.find({brandCode: _brandCode}).exec((error, data) => {
              if (error) {
                  return next(error);
              } else {
                  res.json(data);
                 }
          });
    }); 
 
// Get single BrandAccount
SegmentRoute.route("/:id").get((req, res, next) => {
    const _id = req.params.id;
   Segment.find({id:_id}).populate("BrandCode").exec((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Update Segment
SegmentRoute.route("/:id").put((req, res, next) => {
    Segment.findByIdAndUpdate(
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
// Delete Segment
SegmentRoute.route("/:id").delete((req, res, next) => {
    Segment.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data,
                
            });
        }
    });
});
module.exports = SegmentRoute;
