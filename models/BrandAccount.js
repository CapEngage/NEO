const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define collection and schema
let BrandAccount = new Schema(
    {
        
        email: { type: String },
        name: { type: String },
        password: { type: String },
        role: { type: String, default: "SuperAdmin" },
        userStatus: { type: String, default: "Active" },
        brandCode: {type: String},
        brandName: {type: String, required: true},
        userAccess:[],
        brandStatus: { type: String, default: "Active" },
        planStatus: { type: String, enum: ['Annual', 'Month'], default: "Month" },
        token: {type: String},
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { collection: "BrandAccount" }
);
BrandAccount.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    },
});
module.exports = mongoose.model("BrandAccount", BrandAccount);

 
