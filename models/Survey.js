const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], // "Subdocument collection". an array of Recipients
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  _user: {type: Schema.Types.ObjectId, ref: 'User'}, // Relationship to the User model
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema); // Create it if not exists
