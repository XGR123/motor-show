new Swiper('.slideshow',{
	loop: true,
	// initialSlide :2,
	// on:{
	// 	init: function(){
	//         	swiperAnimateCache(this); //隐藏动画元素 
	//         	swiperAnimate(this); //初始化完成开始动画
	//         }, 
	//         slideChangeTransitionEnd: function(){ 
	//         	swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
	//         } 
	// },
	navigation: {
		prevEl: '.swiper-button-prev',
    	nextEl: '.swiper-button-next',
 	},
	pagination:{
		el:'.swiper-pagination',
	},
	autoplay:true,
	effect : 'fade'
})

new Swiper('.base-slideshow',{
	loop: true,
	navigation: {
		prevEl: '.swiper-button-prev',
    	nextEl: '.swiper-button-next',
   		
 	},
	pagination:{
		el:'.swiper-pagination',
		clickable :true,
	},
	autoplay:true,
	effect : 'club',
})



// ---------------------------------------------------------------

// $(function(){
	
// 	$(".img>li").eq(0).on("mouseover",function(){
// 		console.log(this)
// 		$(".tip>li").eq(0).addClass("show");
// 	}).on("mouseout",function(){
// 		$(".tip>li").eq(0).removeClass("show");
// 	})

// 	$(".img>li").eq(1).on("mouseover",function(){
// 		console.log(this)
// 		$(".tip>li").eq(1).addClass("show");
// 		console.log(this)
// 	}).on("mouseout",function(){
// 		$(".tip>li").eq(1).removeClass("show");
// 	})

// 	$(".img>li").eq(2).on("mouseover",function(){
// 		console.log(this)
// 		console.log($(".tip>li").eq(2))
// 		$(".tip>li").eq(2).addClass("show");
// 	}).on("mouseout",function(){
// 		$(".tip>li").eq(2).removeClass("show");
// 	})
	
// })


// ---------------------------主菜单栏----------------------------------------------

$(function(){
	$("#navigation a").each(function(){
		$this = $(this);
		if($this[0].href == String(window.location)){
			// $("#navigation a:first-child").removeClass("addcolor");
			$this.addClass("addcolor");
		}
	})
})


// -----------------------------登录框正则检测----------------------------------------

	var flag = false;

	$('#uname').blur(function(){
		var uname = $(this).val();
		$.ajax({
			url:'/register/checkname/'+uname,
			type:'get',
			success:function(data){
				if(data=='ok'){
					flag = true;
					// console.log('允许注册')
					// $("#showName").text("输入正确")
				}else{
					flag = false;
					// $('#popover58688').show();
					// console.log('不允许注册')
					$("#showName").text("用户名已经被使用")
				}
			}
		})
	})


	$("#uname").change(function(){
		var reg = /^.{2,9}$/;		//2-9位数字，字母，下划线
		if(reg.test($('#uname').val())){
			$("#showName").text("输入正确").css({color:"green"})
		}else{
			$("#showName").text("请输入2位以上9位以下的数字，字母或下划线的用户名").css({color:"red"})
		}
	})
	$("#pw").change(function(){
		var reg = /^\w{6,18}$/;		//6-18位数字，字母，下划线
		if(reg.test($('#pw').val())){
			$("#showPw").text("输入正确").css({color:"green"})
		}else{
			$("#showPw").text("输入错误").css({color:"red"})
		}
	})
	$("#pw2").change(function(){
		var reg = /^\w{6,18}$/;		//6-18位数字，字母，下划线
		if($('#pw').val()===$('#pw2').val()){
				$("#showPw2").text("输入正确").css({color:"green"})
		}else{
			$("#showPw2").text("输入错误").css({color:"red"})
		}
	})

	function sub(){
		if(flag){
			$('.register').submit();
		}
	}