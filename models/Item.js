const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  title: String,
  body: String,
  _user: {type: Schema.Types.ObjectId, ref: 'users'},
  datePosted: Date,
  visibility: Boolean,
  image: String
});

mongoose.model('items', itemSchema);
