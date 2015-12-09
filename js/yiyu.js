// 题目内容
var data = [{
	"Q":"您猜，在中国患抑郁症的人占比大概为？",
	"options":{"A":"1%","B":"5%","C":"10%"},
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
];
// 相关值
var records = {
	_TOTAL : data.length,	//总题数,常量
	_curNum : 1,	//当前题号
	_success : 0,	//答对题数
	_failure : 0,	//答错题数
	_selected : false,	//是否已做出选择（点击）
	_hasC: true,		//是否有选项C
	_prevHasC : false	//前一题是否有选项C
};


$(function(){


	//用js调整部分样式问题
	// $("#process_line_div").css("margin-left",$(".process-line-base").css("margin-left"));
	// $(".process-footer").width($(".process-line-base").width());

	//隐藏id为id_a的元素，显示id为id_b的元素，此处主要用于页面跳转
	function hideA_showB(id_a,id_b){
		var a = $("#"+id_a);
		var b = $("#"+id_b);

		a.hide();
		b.show();
	};

	// 根据题号更新题目
	function draw_question(curNum){
		var cur = data[curNum-1];
		$(".cur-question").text("Q"+curNum);
		$("#question_text").text(cur.Q);
		if(cur.options.C){
			records._hasC = true;
			$("#optionC").parent().show();
			$("#optionC").find(".option-text").text(cur.options.C);
		}
		else{
			records._hasC = false;
			$("#optionC").parent().hide();
		}
		$("#optionA").find(".option-text").text(cur.options.A);
		$("#optionB").find(".option-text").text(cur.options.B);

		adjust_options_style();

		records._prevHasC = records._hasC;
	};

	// 调整选项部分的样式
	function adjust_options_style(){
		if(records._prevHasC === records._hasC){
			return;
		}
		var H = $("#options").height();
		var h = get_h();
		$("#option_boxA").css("padding-top",(H-h)/2+"px");


		function get_h(){
			var optionBoxes = $(".option-box");
			var sum = 0;

			var length = optionBoxes.length;
			if(!records._hasC){
				length -= 1;
			}
			$("#option_boxA").css("padding-top",0);

			for(var i=0;i<length;i++){
				sum += $(optionBoxes[i]).outerHeight(true);
			}
			return sum;
		};	
	}

	// 根据题号调整进度条
	function adjust_process(curNum){
		// var points = [12,23.5,35,46.5,58,69.5,81,100];
		var w = $(".process-line-box").width();
		var percentage = curNum/records._TOTAL;
		$("#process_line").animate({width:w*percentage+"px"},"500")
		$("#process_num").animate({marginLeft:w*(percentage-.035)+"px"},"500")
	}
	
	// 进入下一题，更新内容与进度条
	function update(){
		records._curNum++;
		records._selected = false;
		if(records._curNum > 7){
			return;
		}
		setTimeout(function(){
			$(".check").hide();
			$(".option").css("background-image","url(img/option.png)");
			adjust_process(records._curNum);
			setTimeout(function(){
				draw_question(records._curNum);
			},600)
		},500)
		// draw_question(records._curNum);
		
	};

	// 更新血条
	function update_blue_blood(){
		var w1 = $("#blue_blood").width();
		$("#blue_blood").animate({width:"-="+w1/7+"px"},1000,update);
		complete();
	}
	function update_red_blood(){
		var w2 = $("#red_blood").width();
		$("#red_blood").animate({width:"-="+w2/7+"px"},1000,update)
		complete();
	}

	// 完成所有题目跳到结果页
	function complete(){
		if(records._curNum === 7){
			// hideA_showB("Cover","Main");
			if(records._success > records._failure){
				$("#blue_blood").animate({width:"0"},1000,toResultPage);
			}
			else if(records._success < records._failure){
				$("#red_blood").animate({width:"0"},1000,toResultPage);
			}
		}
	}

	// 跳到结果页
	function toResultPage(){
		if(records._success > records._failure){
			$("#win_score").text(records._success);
			hideA_showB("Main","win");
		}else{
			$("#fail_score").text(records._success);
			hideA_showB("Main","fail");
		}
		
	}

	// 初始化题目页面
	function toMainPage(){
		hideA_showB("Cover","Main");

		// 调整题目页部分样式问题
		$("#process_line_div").css("margin-left",$(".process-line-base").css("margin-left"));
		$(".process-footer").width($(".process-line-base").width());

		draw_question(1);
		adjust_process(1);
	}


	//点击封面页跳到问答页面
	$("#start_btn").click(function(){
		toMainPage();
	});

	// 单机选项选择答案
	$(".option").click(function(){
		if(records._curNum > 7){
			return;
		}
		var elem = $(this);
		if(!records._selected){
			records._selected = true;
			elem.css("background-image","url(img/selected.png)");
			if(elem.data("option") === data[records._curNum-1].answer){
				records._success++;
				$("#wrong").hide();
				if(elem.data("option") === "A"){	//微调点击第一个选项时图案的位置问题
					$("#right").css("top",elem.position().top*1.075+5+"px");
				}
				else{
					$("#right").css("top",elem.position().top*1.075+"px");
				}
				$("#right").show();
				update_blue_blood();
			}
			else{
				records._failure++;
				var options = $(".option");
				for(var i=0;i<options.length;i++){
					if($(options[i]).data("option") === data[records._curNum-1].answer){
						var right = $(options[i]);
					}
				}
				$(".check").show();
				if(right.data("option") === "A"){	//微调点击第一个选项时图案的位置问题
					$("#right").css("top",right.position().top*1.075+5+"px");
					$("#wrong").css("top",elem.position().top*1.075+"px");
				}
				else if(elem.data("option") === "A"){
					$("#wrong").css("top",elem.position().top*1.075+5+"px");
					$("#right").css("top",right.position().top*1.075+"px");
				}
				else{
					$("#right").css("top",right.position().top*1.075+"px");
					$("#wrong").css("top",elem.position().top*1.075+"px");
				}
				update_red_blood();
			};
			return;
		}
		return;
	});



	//跳转视频页面
	$("#painted_eggshell_btn").click(function(){
		hideA_showB("win","Over");
	});
	$("#help_btn").click(function(){
		hideA_showB("fail","Over");
	});



	// 点击查看视频
	$("#video_btn").click(function(){
		$("#video").show();
		var video = document.getElementById("video");
		video.play();
	})
})