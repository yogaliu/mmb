$(function() {
    //请求标题头
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrandtitle",
        success: function(data) {
            var temp = template("nav-title", data);
            $(".nav-title").html(temp);
        }
    })
})