$(function() {
    function GetQueryString(name) //截取url地址中的参数
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var couponid = GetQueryString("couponid");
    $.ajax({
        url: "http://mmb.ittun.com/api/getcoupon",
        success: function(data) {

            $(data.result).each(function() {
                if (this.couponId == couponid) {
                    $(".header h2").text(this.couponTitle + "优惠券")

                }
            })

        }

    });
    $.ajax({
        url: "http://mmb.ittun.com/api/getcouponproduct",
        data: { couponid: couponid },
        success: function(data) {
            var temp = template("product-box", data);
            $(".product-box").html(temp)
            var k = null;
            $(".product-box li").each(function(i, cur) {
                $(this).on("click", function(e) {
                    $(".mask span").html(data.result[i].cuponProductImg)
                    $(".mask").show(100)
                    k = i;
                })
            });
            $(".mask").on("click", function() {
                event.preventDefault();
                event.stopPropagation();
                $(this).hide(100)
            });
            $(".mask .prev").on("click", function(event) {
                event.stopPropagation();
                console.log(k)
                if (k === 0) {
                    alert("已经是第一张");
                    return
                }
                k--;
                $(".mask span").html(data.result[k].couponProductImg)
            })
            $(".mask .next").on("click", function(event) {
                event.stopPropagation();
                if (k === data.result.length - 1) {
                    alert("已经是最后一张");
                    return
                }
                k++;
                $(".mask span").html(data.result[k].couponProductImg)
            })

        }
    });
})