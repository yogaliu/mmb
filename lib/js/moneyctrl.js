$(function() {
    function GetQueryString(name) //截取url地址中的参数
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var pages = null; //总页数
    var reg = /(\d*)\/\w*/;
    console.log(reg.exec("11/15"));
    $.ajax({ //第一次url请求
        url: "http://mmb.ittun.com/api/getmoneyctrl",
        type: "get",
        data: { pageid: 0 },
        success: function(data) {
            var html = template("product-list", data)
            $(".product-list").html(html) //这是列表模块
            pages = Math.ceil(data.totalCount / data.pagesize)
            var pagesHtml = '';
            for (var i = 1; i <= pages; i++) { //这是option页面
                pagesHtml += "<option>" + i + "/" + pages + "</option>"
            }
            console.log(data.pagesize)
            $("#pagesSel").html(pagesHtml)
        }
    })

    $("#pagesSel").on("change", function() {
        getpages(reg.exec($("#pagesSel")[0].value)[1] - 1)
    });
    $(".prev").on("click", function() { //下一页
        if (reg.exec($("#pagesSel")[0].value)[1] == 1) {
            alert("这已经是第一页了")
            return
        }

        $("#pagesSel")[0].value = (+reg.exec($("#pagesSel")[0].value)[1] - 1) + "/" + pages;
        getpages(reg.exec($("#pagesSel")[0].value)[1] - 1)
    })

    $(".next").on("click", function() { //上一页
        if (reg.exec($("#pagesSel")[0].value)[1] == pages) {
            alert("这已经是最后一页了了")
            return
        }
        $("#pagesSel")[0].value = (+reg.exec($("#pagesSel")[0].value)[1] + 1) + "/" + pages;
        getpages(reg.exec($("#pagesSel")[0].value)[1] - 1)
    })

    function getpages(page) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            type: "get",
            data: { pageid: page },
            success: function(data) {
                var html = template("product-list", data)
                $(".product-list").html(html) //这是列表模块
            }
        })
    }
})