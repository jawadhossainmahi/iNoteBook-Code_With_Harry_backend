const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    dafault: "Geneeral"
  },
  date: {
    type: Date,
    dafault: Date.now
  },

});


module.exports = mongoose.model('notes', noteSchema);