const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let BrandEvent = new Schema(
  {
    
    Name: {type: String, required: true},
    Category: { type: String},
    CreatedAt: {type: Date, default: Date.now}, 
    User_id: { type: String, ref: "BrandUser", required: true } ,
    BrandCode: { type: String, ref: "BrandAccount", required: true }
    
   },
  {collection: 'BrandEvent'}
  
);
BrandEvent.set('toJSON', {
virtuals: true,
versionKey: false,
  transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
}
});
module.exports = mongoose.model('BrandEvent', BrandEvent);
