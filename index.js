const path = require("path");
const express = require("express");

const InitiateMongoServer = require("./db/db");
const header_middleware = require("./middlewares/header");
InitiateMongoServer();
const BrandAccountRoute = require("./routes/BrandAccount");
//const BrandAccountRoute = require("./routes/BrandAccount");
const BrandUserRoute = require("./routes/BrandUser");
const BrandEventRoute = require("./routes/Event");
const SegmentRoute = require("./routes/Campaign/Segment");
const EmailCampaignRoute = require("./routes/Campaign/EmailCampaign");
const SMSCampaignRoute = require("./routes/Campaign/SMSCampaign");
const app = express();

var cors = require("cors");
require("dotenv").config();

app.use(header_middleware);
app.use(cors({ origin: "*" }));
const port = 3000


  
  app.use(express.json());
  app.use("/account/auth", BrandAccountRoute);
  app.use("/brand", BrandAccountRoute);
  app.use("/brand/user", BrandUserRoute);
  app.use("/brand/event", BrandEventRoute);
  app.use("/segment", SegmentRoute);
  app.use("/brand/:BrandCode/segment", SegmentRoute);
  app.use("/campaign/email", EmailCampaignRoute);
  app.use("/campaign/sms", SMSCampaignRoute);

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})