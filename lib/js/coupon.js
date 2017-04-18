$(function() {
    $.ajax({
        url: "http://mmb.ittun.com/api/getcoupon",
        success: function(data) {
            var temp = template("coupon-box", data);
            console.log(temp)
            $(".coupon-box").html(temp)
        }
    });
})