const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: {type: String, match: [/\S+@\S+\.\S+/]},
  name: String,
  image: String
});

mongoose.model('users', userSchema);
