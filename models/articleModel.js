var mongoose = require('./db');

var articleSchema = mongoose.Schema({
	title:String,
	time:{type:Date,default:Date.now()},
	jianjie:String,
	info:String,
	pv:{type:Number,default:0},
	msgconunt:0,
	user:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
},{collection:"articles"})

module.exports = mongoose.model("articles",articleSchema);