const mongoose = require("mongoose");
require('dotenv').config();
// const MONGOURI = "mongodb://testuser:testpassword@ds257698.mlab.com:57698/node-auth";
// const MONGO_URL = "mongodb://127.0.0.1:27017/_CapEngage"
//MONGO_URL="mongodb+srv://CapEngage:JGZTClHXHeR8q2pO@capengage.ajgfa.mongodb.net/CapEngage"
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    });
    console.log("Connected to DataBase !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;