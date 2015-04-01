var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var verticalSchema = new Schema({
  view: [{ name: 'string',description:'string'}],
  name: String,
  description: String,
  timestamp: Date,
})

module.exports = mongoose.model('Bear', BearSchema);