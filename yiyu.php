<?php
/**
 * Created by PhpStorm.
 * User: pie
 * Date: 2015-12-8
 * Time: 0:38
 */
//调用jssdk
require_once "jssdk/jssdk.php";
$jssdk = new JSSDK("wx157f55dfbafbd7b8", "85fdd885d0be7673093f9381db983b91");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1 user-scalable=no">
    <title>抑郁君</title>
    <link rel="stylesheet" type="text/css" href="css/yiyu.css">
</head>
<body>
<!-- 封面页 -->
<div id="Cover">
    <img src="img/title.png" alt="PK吧，疾病君！" class="cover-title">
    <img src="img/yiyujun_big.png" alt="疾病君大图" class="yiyujun-big">
    <img src="img/start_btn.png" alt="开始测试" id="start_btn">

    <div class="cover-footer">镝次元出品</div>
</div>
<!-- 答题页 -->
<div id="Main">
    <img src="img/pk_jibingjun.png" class="pk-text">

    <div class="blood-vs">
        <div id="blue_blood_box" class="blood-line-box">
            <div id="blue_blood" class="blood-line"></div>
        </div>
        <div id="red_blood_box" class="blood-line-box">
            <div id="red_blood" class="blood-line"></div>
        </div>
        <span class="jibingjun-span">疾病君</span>
        <span class="wo-span">我</span>
        <img src="img/vs_bg.png" class="vs-bg">
        <img src="img/vs_person.png" class="vs-person">
    </div>
    <div class="question-and-options">
        <div class="question-board">
            <div id="question"><span class="cur-question">Q1</span>：<span
                    id="question_text">你认为，一年中大概有百分之几的人口患抑郁症？</span></div>
        </div>

        <ol id="options">
            <li id="optionA" class="option" data-option="A">
                <img src="img/A.png" id="imgA" class="option-img">
                <span class="option-text">1%</span>
            </li>
            <li id="optionB" class="option" data-option="B">
                <img src="img/B.png" id="imgB" class="option-img">
                <span class="option-text">5%</span>
            </li>
            <li id="optionC" class="option" data-option="C">
                <img src="img/C.png" id="imgC" class="option-img">
                <span class="option-text">7%</span>
            </li>
            <img src="img/yes.png" id="right" class="check">
            <img src="img/no.png" id="wrong" class="check">
        </ol>
    </div>
    <div class="question-process">
        <img src="img/process_line.png" class="process-line-base">

        <div id="process_line_div">
            <img src="img/process_line_full.png" class="process-line-full">
        </div>
        <div class="process-footer">
				<span id="process_num">
					<span class="triangle-up"></span>
					<span id="cur_question" class="cur-question">Q1</span>
				</span>
            <img src="img/datijindu.png" class="process-text">
        </div>
    </div>
</div>
<!-- 结果页 -->
<div id="win" class="Result">
    <div id="win_score" class="score">6</div>
    <img class="scoreboard" src="img/scoreboard.png">
    <img class="result_text" src="img/victory_text.png">
    <img id="painted_eggshell_btn" class="result_btn" src="img/painted_eggshell_btn.png">

    <div class="result_footer">
        <img class="persons" src="img/win_persons.png">
        <img class="stage" src="img/stage.png">
    </div>
</div>

<div id="fail" class="Result">
    <div id="fail_score" class="score">3</div>
    <img class="scoreboard" src="img/scoreboard_blue.png">
    <img class="result_text" src="img/fail_text.png">
    <img id="help_btn" class="result_btn" src="img/help_btn.png">

    <div class="result_footer">
        <img class="persons" src="img/fail_persons.png">
        <img class="stage" src="img/stage.png">
    </div>
</div>
<!-- 结束页 -->
<div id="Over" class="Result">
    <img id="share_title" src="img/share_title.png">
    <div id="video_contain">
        <img id="video_cover" src="img/play_cover.png">
    </div>
    <div id="pk_others">
        <img id="pk_title" src="img/pk_others_title.png">
        <div class="disease_row">
            <img src="img/tangniao.png" class="disease_item">
            <img src="img/hiv.png" class="disease_item">
            <img src="img/ganyan.png" class="disease_item">
            <img src="img/jiehe.png" class="disease_item">
        </div>
    </div>
    <img id="invite_btn" src="img/invite_btn.png">
</div>
<script type="text/javascript">
    wx.config({
        debug: false,
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: '<?php echo $signPackage["timestamp"];?>',
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',  //判断当前客户端版本是否支持指定JS接口
            'onMenuShareTimeline', //分享给好友
            'onMenuShareAppMessage', //分享到朋友圈
            'hideMenuItems',//隐藏菜单
            'hideAllNonBaseMenuItem',
            'showMenuItems'
        ]
    });
    var img_url = "http://www.dyclub.org/pie/img/logo.png";
    var link = "http://www.dyclub.org/pie/yiyu.php";
    var title= "抑郁症";
    var desc="抑郁症";
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img_url, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                alert(link);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({

            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img_url, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.hideAllNonBaseMenuItem();
        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage','menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
        });

    });
    wx.error(function (res) {
        alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
    });
</script>
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/yiyu.js"></script>

</body>
</html>
