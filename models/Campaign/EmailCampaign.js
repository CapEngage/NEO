const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmailCampaign = new Schema(
  {
   
    brandCode: {
      type: 'String',
    },
    title: {
      type: 'String',
    },
    tags: {
      type: ['String'],
    },
    status: {
      type: 'String',
    },
    type: {
      type: 'String',
    },
    segmentId: {
      type: 'String',
    },
    userlistId: {
      type: 'String',
    },
    oneTime: {
      type: 'Boolean',
    },
    startDate: {
      type: 'Date',
    },
    skipTargetPage: {
      type: 'Boolean',
    },
    isTargetable: {
      type: 'Boolean',
    },
    order: {
      type: 'Number',
    },
    createdByUser: {
      type: 'String',
    },
    lastModifiedByUser: {
      type: 'String',
    },
    applyFrequencyCapping: {
      type: 'Boolean',
    },
    incrementFrequencyCappingCount: {
      type: 'Boolean',
    },
    applyDnd: {
      type: 'Boolean',
    },
    queueMessage: {
      type: 'Boolean',
    },
    triggerSet: {
      triggers: {
        type: ['Mixed'],
      },
      id: {
        type: 'String',
      },
      'logical-operator': {
        type: 'String',
      },
    },
    container: {
      type: 'String',
    },
    campaignType: {
      type: 'String',
    },
    createdOn: {
      type: 'Date',
    },
    lastModifiedOn: {
      type: 'Date',
    },
    editable: {
      type: 'Boolean',
    },
    sentStatus: {
      status: {
        type: 'String',
      },
      totalCount: {
        type: 'Number',
      },
      successCount: {
        type: 'Number',
      },
      failureCount: {
        type: 'Number',
      },
      fcQueuedCount: {
        type: 'Number',
      },
      dndQueuedCount: {
        type: 'Number',
      },
    },
    variations: {
      type: ['Mixed'],
    },
    sent: {
      type: 'String',
    },
    campaignViewAbWinner: {
      winnerDecided: {
        type: 'Boolean',
      },
      controlGroupWinner: {
        type: 'Boolean',
      },
    },
    havingInclusionExclusion: {
      type: 'Boolean',
    },
    
    ttl: {
      type: 'Number',
    },
  },
  { collection: 'EmailCampaign' }
);

EmailCampaign.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});
module.exports = mongoose.model('EmailCampaign', EmailCampaign);
