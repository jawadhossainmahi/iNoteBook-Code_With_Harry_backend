const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    unique:true
  },
  tag: {
    type: String,
    dafault: "Geneeral"
  },
  date: {
    type: Date,
    dafault: Date.now
  }
  
});


module.exports = mongoose.model('notes', noteSchema);