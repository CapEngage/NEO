const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let BrandUser = new Schema(
  {
    Name: {type: String, required: true},
    Email: {type: String},
    Phone: { type: Number},
    CreatedAt: {type: Date, default: Date.now},  
    brandCode: { type: String, ref: "BrandAccount", required: true }
    
   },
  {collection: 'BrandUser'}
  
);
BrandUser.set('toJSON', {
virtuals: true,
versionKey: false,
  transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
}
});
module.exports = mongoose.model('BrandUser', BrandUser);
