
var express = require('express');
var router = express.Router();
var msgModel = require('../models/msgModel');
var articleModel = require('../models/articleModel');
var checkIsLogin = require('./check').checkIsLogin;


router.post('/',checkIsLogin,function(req,res){
	//console.log(req.session.user);
	var msg = new msgModel({
		context: req.body.context,
		article: req.body.aid,
		user: req.body.uid,
		time:Date.now()
	})
	// console.log(req.body.context);
	// console.log(req.body.aid);
	// console.log(req.body.uid);
	msg.save(function(err,m){
		//console.log(m);
		//console.log(req.originalUrl);
		//article/info/+req.body.aid
		//res.send('ok');
		msgModel.find({article:req.body.aid}).exec(function(err,msg){
			articleModel.findByIdAndUpdate(req.body.aid,{$set:{msgcount:msg.length}}).exec(function(err){

			})
		})
		res.redirect('/article/info/'+req.body.aid);
	})
})

router.get('/del/:mid',function(req,res){
	msgModel.findByIdAndRemove(req.params.mid,function(err,m){
		// console.log(m)
		articleModel.find({_id:m.article}).exec(function(err,mcount){
			// console.log(mcount)
			var a = --mcount[0].msgcount;
			console.log(a);
			articleModel.findByIdAndUpdate(m.article,{$set:{msgcount:a}}).exec(function(err){

			})
		})
		res.redirect('/article/info/'+m.article);
	})
})



module.exports = router;