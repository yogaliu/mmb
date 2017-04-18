$(function() {
    $.ajax({
        url: "http://mmb.ittun.com/api/getsitenav",
        success: function(data) {
            var temp = template("sitenav", data);
            $(".sitenav").html(temp)
        }
    });
})