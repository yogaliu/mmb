$(function() {
    swipe.iScroll({
        swipeDom: document.querySelector(".title-nav"),
        swipeType: "x",
    })
    $.ajax({
        url: "http://mmb.ittun.com/api/getbaicaijiatitle",
        success: function(data) {
            var temp = template("title-nav-box", data);
            $(".title-nav-box").html(temp);
        }
    }).then(function() {
        $(".title-nav-box li a").on("click", function(event) {
            event.preventDefault;
            $(this).addClass("action").parent().siblings().children("a").removeClass("action")
            getProduct(this.dataset.titleid);
        })
    })

    function getProduct(id) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbaicaijiaproduct",
            data: { titleid: id },
            success: function(data) {
                var temp = template("baicaiproduct", data);
                $(".baicaiproduct").html(temp);
            }
        })
    }
    getProduct(0);

})