var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedSchema   = new Schema({
	name: String,
	email:String,
	feedback:String,
	timestamp: Date
});

module.exports = mongoose.model('Fase', FeedSchema);