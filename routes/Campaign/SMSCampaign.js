const express = require("express");

const app = express();
const SMSCampaignRoute = express.Router();
const checkAuth = require("../../middlewares/check-auth");
// SMSCampaign model
let SMSCampaign = require("../../models/Campaign/SMSCampaign");
const { v4: uuidv4 } = require("uuid");
// Add SMSCampaign
// SMSCampaignRoute.post("", async (req, res) => {
//     const _SMSCampaign = new SMSCampaignModel(req.body);

//     try {
//         await _SMSCampaign.save();
//         res.send(_SMSCampaign);
//       } catch (error) {
//         res.status(500).send(error);
//       }
    
//       }
// );

SMSCampaignRoute.route('/').post((req, res, next) => {
    SMSCampaign.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });
// Get All SMSCampaigns
SMSCampaignRoute.route("/").get((req, res) => {
    SMSCampaign.find({}).exec((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
});
// Get single SMSCampaign
SMSCampaignRoute.route("/:id").get((req, res) => {
    SMSCampaign.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

app.put("/:id", async (req, res) => {
    try {
      await SMSCampaignModel.findByIdAndUpdate(req.params.id, {$set: req.body,});
      await SMSCampaignModel.save();
      res.send(SMSCampaign);
       
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Update SMSCampaign
/* SMSCampaignRoute.route("/:id").put((req, res, next) => {
    SMSCampaign.findByIdAndUpdate(
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
}); */
// Delete SMSCampaign
SMSCampaignRoute.route("/:id").delete((req, res, next) => {
    SMSCampaign.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data,
                
            });
        }
    });
});
module.exports = SMSCampaignRoute;
