var exp = require('express');
var router = exp.Router();
var checkIsLogin = require('../check').checkIsLogin;

router.get('/',checkIsLogin,function(req,res){
	res.render('contact');
})

module.exports = router;