var express = require('express');
var router = express.Router();
var checkIsLogin = require('./check').checkIsLogin;

var userModel = require('../models/userModel');
var articleModel = require('../models/articleModel');
var msgModel = require('../models/msgModel');

router.get('/',checkIsLogin,function(req,res){
	res.render('article')
})

router.post('/save',function(req,res){
	var article = new articleModel({
		title:req.body.title,
		jianjie:req.body.jianjie,
		info:req.body.info,
		user:req.body.uid,
		time:Date.now(),
		msgcount:0,
		pv:0
	})
	article.save(function(err,a){
		//res.send('save');
		res.redirect('/article/info/'+a._id)
	})
})

router.get('/info/:aid',checkIsLogin,function(req,res){

	if(!req.session.user){
		req.session.user = '';
		//console.log('没有值'+req.session.user);
	}

	res.locals.user = req.session.user;

	
	articleModel.findById(req.params.aid).populate('user','_id name sex headimg introduce').exec(function(err,article){
		
		var newpv = article.pv+1;
		//console.log(article.pv);
		//console.log(newpv);
		articleModel.findByIdAndUpdate(req.params.aid,{$set:{pv:newpv}}).exec(function(err,a){
			//console.log(err)
		})


		//console.log(article)
		var aid = article._id;

		msgModel.find({article:aid}).populate('user','_id name sex headimg introduce').exec(function(err,ms){
			//console.log(ms)
			res.render('info',{article:article , ms:ms})
		})
	})
})

router.get('/del/:aid',function(req,res){
	var aid = req.params.aid;
	articleModel.findByIdAndRemove(aid,function(err){
		res.send('ok');
	})
})


router.get('/edit/:aid',checkIsLogin,function(req,res){
	//res.locals.user = req.session.user;

	//console.log(res.locals.user);
	articleModel.findById(req.params.aid,function(err,a){
		res.render('edit',a);
	})
})

router.post('/editsave',function(req,res){
	
	var aid = req.body.aid;

	var newa = {
		title:req.body.title,
		jianjie:req.body.jianjie,
		info :req.body.info
	}
	
	articleModel.findByIdAndUpdate(aid, {$set:newa} , function(err){
		res.redirect('/article/info/'+aid)
	})
	
})

router.get('/find',function(req,res){
	articleModel.find({title:'qwe'}).populate('user')
	.exec(function(err,as){
		// console.log(as)
	})

	res.send('find')
})



module.exports = router;