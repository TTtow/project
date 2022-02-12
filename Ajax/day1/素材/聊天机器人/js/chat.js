$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    //为发送按钮点击事件
    $('#btnsend').on('click',function (){
        var test = $('#ipt').val().trim()
        if(test.length <= 0){
            return $('#ipt').val('')
        }
        //追加页面显示
        $('#talk-list').append('<li class="right_word"><img src="img/person02.png"/> <span>'+ test +'</span></li>')
        //清空
        $('#ipt').val('')
        //
        resetui()
        getMsg(test)
    })
    // 获取聊天机器人发送回来的消息
    function getMsg(test){
        $.ajax({
            method:'get',
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{
                spoken: test
            },
            success: function (res){
                // console.log(res)
                if(res.message === 'success' ){
                    var msg =res.data.info.text
                    $('#talk-list').append('<li className="left_word"><img src="img/person01.png"/><span>'+ msg+'</span></li>')
                    resetui()
                    getVoice(msg)
                }
            }
        })
    }
    function getVoice(text){
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text : text
            },
            success: function (res){
                 // console.log(res);
                if (res.status === 200){
                     $('#voice').attr('src',res.voiceUrl)
                }
            }
        })
    }
    //为文本框绑定keyup事件
    $('#ipt').on('keyup',function (e){
        // console.log(e.keyCode)
        if(e.keyCode === 13){
            $('#btnsend').click()
        }

    })
})