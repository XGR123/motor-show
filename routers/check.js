module.exports={
	checkIsLogin:function(req,res,next){
		if(req.session.user){
			res.locals.user = req.session.user;
			next();
		}else{
			res.locals.user = "";
			next();
		}
	},

	checkNotLogin:function(req,res,next){
		res.locals.user = req.session.user;
		if(!req.session.user){
			return res.redirect('./login');
		}else{
			return res.redirect('/');
		}
		next();
	}
}