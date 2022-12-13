const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Segment = new Schema(
  {
    SegmentName: {type: String, required: true},
    SegmentUsers: {type: String},
    CreatedAt: {type: Date, default: Date.now}, 
    BrandCode: { type: String, ref: "BrandAccount", required: true } 
    
   },
  {collection: 'Segment'}
  
);
Segment.set('toJSON', {
virtuals: true,
versionKey: false,
  transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
}
});
module.exports = mongoose.model('Segment', Segment);