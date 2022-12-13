const express = require("express");

const app = express();
const EmailCampaignRoute = express.Router();
const checkAuth = require("../../middlewares/check-auth");
// EmailCampaign model
let EmailCampaign = require("../../models/Campaign/EmailCampaign");
const { v4: uuidv4 } = require("uuid");
// Add EmailCampaign
EmailCampaignRoute.route('/').post((req, res, next) => {
    EmailCampaign.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });

// Get All EmailCampaigns
/* EmailCampaignRoute.route("/").get((req, res) => {
    EmailCampaign.find({}).exec((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
}); */

EmailCampaignRoute.route("/campaignByBrand/:brandCode").get((req, res, next) => {
    const _brandCode = req.params.brandCode;
    EmailCampaign.find({brandCode: _brandCode}).exec((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
               }
        });
  }); 
// Get single EmailCampaign
EmailCampaignRoute.route("/:id").get((req, res) => {
    EmailCampaign.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

app.put("/:id", async (req, res) => {
    try {
      await EmailCampaignModel.findByIdAndUpdate(req.params.id, {$set: req.body,});
      await EmailCampaignModel.save();
      res.send(EmailCampaign);
       
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Update EmailCampaign
/* EmailCampaignRoute.route("/:id").put((req, res, next) => {
    EmailCampaign.findByIdAndUpdate(
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
// Delete EmailCampaign
EmailCampaignRoute.route("/:id").delete((req, res, next) => {
    EmailCampaign.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data,
                
            });
        }
    });
});
module.exports = EmailCampaignRoute;
