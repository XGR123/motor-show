var reg = require('./reg');
var login = require('./login');
var article = require('./article');
var msg = require('./msg');

var brand = require('./webpage/brand');
var news = require('./webpage/news');
var product = require('./webpage/product');
var service = require('./webpage/service');
var business = require('./webpage/business');
var contact = require('./webpage/contact');

var articleModel = require('../models/articleModel');
var userModel = require('../models/userModel');
var msgModel = require('../models/msgModel');



module.exports = function(app){
	

	app.get('/',function(req,res){
		//console.log(req.session.user)
		res.locals.user = req.session.user;
		articleModel.find({}).sort({'time':-1}).populate('user','name sex headimg introduce').exec(function(err,as){
			if(err){
				//res.send('查询错误');
				res.render('index',{as:'查询错误'});
			}
			// console.log(req.session.user+'@@@@@@@@@')
			res.render('index',{as:as,name:''});
			// res.send('ok');
			// console.log(as);
		})
	})
	app.get('/i/:uid',function(req,res){
		res.locals.user = req.session.user;
		var uid = req.params.uid;
		console.log(uid)
		articleModel.find({user:{_id:uid}}).sort({'time':-1}).populate('user','name sex headimg introduce').exec(function(err,as){
		if(err){
			//res.send('查询错误');
			res.render('index',{as:'查询错误'});
		}
		console.log(as);
		res.render('index',{as:as});
			
		})

		
		
	});
	app.get('/exit',function(req,res){
		req.session.user = '';
		res.locals.user = req.session.user;
		res.redirect('/');
	})
	app.use('/register',reg);
	app.use('/login',login);
	app.use('/article',article);
	app.use('/msg',msg);

	app.use('/brand',brand);
	app.use('/news',news);
	app.use('/product',product);
	app.use('/service',service);
	app.use('/business',business);
	app.use('/contact',contact);

}