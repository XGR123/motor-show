var exp = require("express");
var router = exp.Router();
var userModel = require('../models/userModel');

var multer = require('multer');
var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./public/upload')
	},
	filename:function(req,file,cb){
		cb(null,Date.now()+file.originalname);
	}
})
var upload = multer({storage:storage})


router.get('/',function(req,res){
	res.render('register')
})


router.post('/saveuser',upload.single('img'),function(req,res){
	
	var user = new userModel({
		name:req.body.uname,
		pw:req.body.pw,
		sex:req.body.sex,
		headimg:req.file.filename,
		introduce:req.body.introduce
	})

	user.save(function(err){
		if(err){
			return res.send('注册失败')
		}else{
			res.send('注册成功')
		}		
	})
	
})


//检查用户名是否重复: 返回值: no表示不可注册,ok表示可以注册
router.get('/checkname/:uname',function(req,res){
	userModel.find({name:req.params.uname}).exec(function(err,users){
		if(users.length>0){
			res.send('no');
		}else{
			res.send('ok');
		}	
	})
	//res.send("ok")
})


module.exports = router;