var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/carshow");

mongoose.connection.on("connected",function(){
	console.log("数据库连接成功.....")
});

module.exports = mongoose;