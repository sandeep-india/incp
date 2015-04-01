var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CaseSchema3   = new Schema({
	name: String,
	globe:Boolean,
	lat: String,
	lon: String,
	location:String,
	content:Boolean,
	thumbName:String,
	summary:String,
	nbb1_num:String,
	nbb1_txt:String,
	nbb2_num:String,
	nbb2_txt:String,
	nbb3_num:String,
	nbb3_txt:String,
	sol_high:String,
	feedback:String,
	designation:String,
	sector:String,
	bannerName:String,
	videoName:String,
	type: String,
	timestamp: Date,
});

module.exports = mongoose.model('Cases1', CaseSchema3);