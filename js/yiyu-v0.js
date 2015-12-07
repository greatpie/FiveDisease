var data = [{
	"Q":"您猜，在中国患抑郁症的人占比大概为？",
	"options":{"A":"1%","B":"5%","C":"7%"},
	"answer":"B"
},{
	"Q":"女性比男性更容易患抑郁症？",
	"options":{"A":"是","B":"否"},
	"answer":"A"
},{
	"Q":"遇事能灵活处理，善于自我调整情绪，一般不容易得抑郁症？",
	"options":{"A":"是","B":"否"},
	"answer":"A"
},{
	"Q":"抑郁症与遗传是否有关系？",
	"options":{"A":"没有太大关系","B":"有密切关系"},
	"answer":"B"
},{
	"Q":"抑郁症最佳治疗方式是？",
	"options":{"A":"药物治疗+心理治疗","B":"单独心理治疗"},
	"answer":"A"
},{
	"Q":"不属于轻型精神疾病的是：",
	"options":{"A":"强迫症","B":"精神分裂","C":"抑郁症"},
	"answer":"B"
},{
	"Q":"抑郁症是否可完全治愈，恢复工作和生活？",
	"options":{"A":"是","B":"否"},
	"answer":"A"
}
]

var i = 0;
var cur = data[i];
// console.log(cur);
$(".cur-question").text("Q"+(i+1));
$("#question_text").text(cur.Q);
if(cur.options.C){
	$("#optionC").show();
	$("#optionC").find(".option-text").text(cur.options.C);
}
else{
	$("#optionC").hide();
}
$("#optionA").find(".option-text").text(cur.options.A);
$("#optionB").find(".option-text").text(cur.options.B);


$(function(){
	//隐藏id为id_a的元素，显示id为id_b的元素，此处主要用于页面跳转
	function hideA_showB(id_a,id_b){
		var a = $("#"+id_a);
		var b = $("#"+id_b);

		a.css("display","none");
		b.css("display","block");
	};

	//点击封面页跳到问答页面
	$("#start_btn").click(function(){
		hideA_showB("Cover","Main");
		ajust_process(23);
	});

	// 选择答案
	var selected = false;
	$(".option").click(function(){
		console.log($(this).position().top);
		$("#right").css("top",$(this).position().top*1.075+parseFloat($(this).css("margin-top"))+"px")
		if($(this).data("option") === cur.answer){
			$("#wrong").css("display","none");
			// console.log($(this).offset().top);
			// $("#right").css("margin-top",$(this).position().top*1.05+"px")
		}
		if(!selected){
			$(this).css("background-image","url(img/selected.png)");
			// selected = true;
			return;
		}
		// return false;
	});


	// $(document).click(function(e){
	// 	var target = $(e.target);
	// 	var w = target.width();
	// 	var h = target.height();
	// 	console.log(target.parent().html()+":width:"+w+",height:"+h);
	// })



	// 适配进度条在不同浏览器的显示问题
	function ajust_process(percentage){
		var w = $(".process-line-base").width();
		var ml = $(".process-line-base").css("margin-left");
		// console.log(s);
		// console.log(j);
		$("#process_line_div").css("margin-left",ml);
		$("#process_line_div").width(w*percentage/100);
		$(".process-footer").width($(".process-line-base").width());
		$("#process_num").css("margin-left",w*(percentage-3)/100)
	}
	ajust_process(35);
	
	// $(".cur-question").text("Q"+2);

})