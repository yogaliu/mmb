$(function() {
    function GetQueryString(name) //截取url地址中的参数
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var productid = GetQueryString("productid");
    $.ajax({
        url: "http://mmb.ittun.com/api/getmoneyctrlproduct",
        data: { productid: productid },
        success: function(data) {
            var temp = template("discount-detail", data)
            $(".discount-detail").html(temp)
            temp = template("discount-city", data)
            $(".discount-city").html(temp)
            temp = template("discount-comment", data)
            $(".discount-comment").html(temp)
        }
    })
})