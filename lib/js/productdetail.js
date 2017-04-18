'use strict';
$(function() {
    function GetQueryString(name) //截取url地址中的参数
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var productid = GetQueryString("productid");
    // 第一次ajax
    $.ajax({
            url: "http://mmb.ittun.com/api/getproduct",
            data: { "productid": productid },
            success: function(data) {
                console.log(data)
                var cateId = data.result[0].categoryId; //请求面包屑id
                var html = template("crumbs", data); //面包屑第一层
                $(".crumbs").html(html);
                html = template("title-img", data); //图片标题
                $(".title-img").html(html);

                html = template("detail-nav", data) //价格比较
                $(".price").html(html);
                $.ajax({
                    url: "http://mmb.ittun.com/api/getcategorybyid",
                    data: { "categoryid": cateId },
                    success: function(data) {
                        console.log(data.result[0].category)
                        console.log($(".toCategory"))
                        $(".toCategory").html(data.result[0].category)
                    }
                })
            }
        })
        // end
    $.ajax({
        url: "http://mmb.ittun.com/api/getproductcom",
        type: "get",
        data: { "productid": productid },
        success: function(data) {
            console.log(data)
            var html = template("comment", data)
            $(".comment-main>ul").html(html)
        }
    })
})