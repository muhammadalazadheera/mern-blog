const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title']
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);