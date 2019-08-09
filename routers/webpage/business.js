var exp = require('express');
var router = exp.Router();
var checkIsLogin = require('../check').checkIsLogin;

router.get('/',checkIsLogin,function(req,res){
	res.render('business');
})

module.exports = router;