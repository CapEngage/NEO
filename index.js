const express = require('express')
const app = express()
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