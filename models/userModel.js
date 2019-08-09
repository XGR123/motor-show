var mongoose = require("./db");

var userSchema = mongoose.Schema({
	name:String,
	pw:String,
	sex:String,
	headimg:String,
	introduce:String
},{collection:"users"});

module.exports = mongoose.model("users",userSchema);