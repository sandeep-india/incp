var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CaseSchema   = new Schema({
	name: String,
	fileName:String,
	thumbName:String,
	globe:Boolean,
	lat: String,
	lon: String,
	type: String,
	timestamp: Date
});

module.exports = mongoose.model('Case', CaseSchema);