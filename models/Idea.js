const mongoose = require('mongoose');

// Schema takes in an object with all the field in the Schema
// we don't have to set the id , it's gonna be handled for us.
const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a text field']
  },
  tag: {
    type: String
  },
  username: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// require: [true, 'the message we want the user to fill'] this will give us some backend validation.

module.exports = mongoose.model('Idea', IdeaSchema);

// model('the name of the model', the name of the Schema)