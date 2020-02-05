const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  url: String,
  fileName: String
});

mongoose.model('images', imageSchema);
