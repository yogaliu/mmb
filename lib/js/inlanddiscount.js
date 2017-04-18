$(function() {
    $.ajax({
        url: "http://mmb.ittun.com/api/getinlanddiscount",
        success: function(data) {
            var datas = {};
            var top = 0;
            var num = 6;
            var step = 4;
            var result = data.result.slice(0, 6);
            datas.result = result;
            var temp = template("discount-list-box", datas)
            $(".discount-list").html(temp);
            var timer = null;
            $(window).on("scroll", function() {
                clearTimeout(timer)
                timer = setTimeout(function() {
                    if (datas.result.length == 0 || num >= data.result.length) {
                        temp = null;
                        $(".loading-text").text("没有更多数据了 傻逼")
                        return;
                    }
                    if ($("body").scrollTop() > $("body").height() - $(window).height() - 50) {
                        addData();

                        function addData() {
                            result = data.result.slice(num, num + step);
                            datas.result = result
                            num = num + step;
                            temp = template("discount-list-box", datas)
                            $(".discount-list").append(temp)
                        }
                    }
                }, 500)

            })
        }
    })
})