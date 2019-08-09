var mongoose = require('./db');

var msgSchema = mongoose.Schema({
	context:String,
	time:{type:Date,default:Date.now()},
	article:{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' },
	user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }
},{collection:'msgs'})

module.exports = mongoose.model('msgs',msgSchema);

