const mongoose = require('mongoose');

const MaterialDataSchema = new mongoose.Schema({
  cluster: {
    type: String,
    required: true,
  },
  station: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  selectedFolder: String,
  updatedBy: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

MaterialDataSchema.index({ cluster: 1, station: 1 }, { unique: true });

module.exports = mongoose.model('MaterialData', MaterialDataSchema);