var exp = require("express");
var router = exp.Router();
var userModel = require('../models/userModel');
var checkIsLogin = require("./check").checkIsLogin;

router.get('/',function(req,res){
	res.render('login')
})

router.post('/check',function(req,res){

	var uname = req.body.uname;
	var pw = req.body.pw;       
	
	userModel.find({name:uname,pw:pw}).exec(function(err,users){
		if (users.length>=1) {
			//保存当前信息到session
			var user ={
				_id: users[0]._id,
				name: users[0].name,
				sex: users[0].sex,
				headimg: users[0].headimg,
				introduce: users[0].introduce
			}
			req.session.user = user;
			res.locals.user = req.session.user;
			res.redirect('/i/'+user._id)
		}else{
			 res.send('用户名或密码错误');
		}
	})
})

module.exports = router;