$(function() {

    console.log($.Deferred())

    function GetQueryString(name) //截取url地址中的参数
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var brandtitleid = GetQueryString("brandtitleid");
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrand",
        data: { brandtitleid: brandtitleid },
        success: function(data) {
            var temp = template("top-nav", data)
            $(".top-nav").html(temp)
        }
    })
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrandproductlist",
        data: { brandtitleid: brandtitleid },
        success: function(data) {
            var temp = template("productlistData", data)
            $(".list-main").html(temp)
        }
    })
})