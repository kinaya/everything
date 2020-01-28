const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema

const userSchema = new Schema({
  googleId: String,
  email: {type: String, match: [/\S+@\S+\.\S+/]},
  name: String,
  image: String
});

mongoose.model('users', userSchema); // Create it if not exists
