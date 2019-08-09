var express = require('express');
var router = express.Router();
var checkIsLogin = require('../check').checkIsLogin;

// var userModel = require('../../models/userModel');
var articleModel = require('../../models/articleModel');
// var msgModel = require('../../models/msgModel');

router.get('/',checkIsLogin,function(req,res){
	articleModel.find().populate('user','_id name sex headimg introduce').exec(function(err,article){
		console.log(article[0].title);
		res.render('news',{article:article})
	})
})
	


module.exports = router;