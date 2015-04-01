var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var TpSchema   = new Schema({
	id1:String,
	id2:String,
	id3:String,
	id4:String,
	id5:String,
	id6:String,
	id7:String,
	id8:String,
	name:String,
	recent: String,
	timestamp: Date
});

module.exports = mongoose.model('Tp',TpSchema);