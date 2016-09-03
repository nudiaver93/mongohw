// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the Note schema
var NoteSchema = new Schema({
  // just a string
  title: {
    type:String
  },
  // just a string
  body: {
    type:String
  }
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;