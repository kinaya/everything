const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  title: String,
  body: String,
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  datePosted: Date,
  visibility: { type: String, enum: ['all', 'friends', 'hidden'] }
});

mongoose.model('items', itemSchema);
