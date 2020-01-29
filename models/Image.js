const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema

const imageSchema = new Schema({
  url: String,
  fileName: String
});

mongoose.model('images', imageSchema);
