$(function() {
    var shopId, areaId;
    shopId = 0;
    areaId = 0;
    //rem.js
    ! function(a, b, c) {
        function q() {
            var d = Math.min((o ? e[h]().width : f.innerWidth) / (a / b), c);
            d != p && (k.innerHTML = "html{font-size:" + d + "px!important;" + n + "}", p = d)
        }
        console.log(1);

        function r() {
            clearTimeout(l), l = setTimeout(q, 500)
        }
        var l, d = document,
            e = d.documentElement,
            f = window,
            g = "addEventListener",
            h = "getBoundingClientRect",
            i = "pageshow",
            j = d.head || d.getElementsByTagName("HEAD")[0],
            k = d.createElement("STYLE"),
            m = "text-size-adjust:100%;",
            n = "-webkit-" + m + "-moz-" + m + "-ms-" + m + "-o-" + m + m,
            o = h in e,
            p = null;
        a = a || 320, b = b || 16, c = c || 32, j.appendChild(k), d[g]("DOMContentLoaded", q, !1), "on" + i in f ? f[g](i, function(a) {
            a.persisted && r()
        }, !1) : f[g]("load", r, !1), f[g]("resize", r, !1), q()
    }(
        640, // 设置设计稿基准宽度
        32, // 设置开发时的被除数（见HOW TO USE第4步） 在设计稿基准宽度为320时最好设置为16（在在设计稿基准宽度为其他值时等比放大，如640时设置为32等）。因为浏览器默认的值就是16，这样代码失效或尚未起效时，不会有布局问题
        32 // 设置最大根元素font-size，请注意这是一个css像素值，而非物理像素值。它的作用是，当用户用非常宽的屏幕（pad、pc）访问页面时，不至于使得根元素的font-size超过这个值，使得布局非常难看。见图“show/wide_max_rem.jpg”
    );

    //发送请求获得商品
    function getProduct(datas) {
        console.log(datas)
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsproduct",
            data: datas,
            success: function(data) {
                var temp = template("product-detail", data);
                $(".product-detail").html(temp);
            }
        });
    }
    // 第一次调用
    getProduct({ shopid: 0, areaid: 0 })
        // 点击事件
    $(".nav-drop>div").on("click", function() {
        event.stopPropagation();
        $(this).siblings("div").children("ul").removeClass("selectNow");
        $(this).children("ul").toggleClass("selectNow")
    })

    $(document).on("click", function() {
            console.log(1)
            $(".nav-drop>div>ul").removeClass("selectNow");
            //点击隐藏
        })
        // 获取城市
    $.ajax({
        url: "http://mmb.ittun.com/api/getgsshop",
        success: function(data) {
            var temp = template("city-drop", data)
            $(".nav-drop .city").html(temp);
            $(".nav-drop>div>.city>li").on("click", function(event) {
                event.stopPropagation();
                //防止冒泡
                $(this).parent().parent().children("span").text($(this).text());
                $(this).parent().removeClass("selectNow");
                shopId = this.dataset.shopid;
                getProduct({
                    shopid: shopId,
                    areaid: areaId
                })
            })
        }
    });
    // 获取地区
    $.ajax({
        url: "http://mmb.ittun.com/api/getgsshoparea",
        success: function(data) {
            var temp = template("rigion-drop", data)
            $(".nav-drop .rigion").html(temp);
            $(".nav-drop>div>.rigion>li").on("click", function(event) {
                event.stopPropagation();
                //防止冒泡
                $(this).parent().parent().children("span").text($(this).text().slice(0, 2));
                $(this).parent().removeClass("selectNow");
                areaId = this.dataset.areaid;
                getProduct({
                    shopid: shopId,
                    areaid: areaId
                })
            })
        }
    })
});