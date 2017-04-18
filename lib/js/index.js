$(function() {
    $.ajax({ //请求nav
        url: 'http://mmb.ittun.com/api/getindexmenu',
        type: 'get',
        success: function(data) {
            console.log(data)
            var html = template('nav-temp', data)
            $("#nav-module").html(html)
            $("#more").on("click", function(e) {
                e.preventDefault()
                $(".nav-row").eq(2).toggleClass('nav-hidden');
            })
        }
    })
    $.ajax({ //请求商品列表
        url: 'http://mmb.ittun.com/api/getmoneyctrl',
        type: 'get',
        success: function(data) {
            console.log(data)
            var html = template('detail-temp', data)
            $("#ware").html(html)

        }
    })
    $("#back-top").on('click', function(event) {
        event.preventDefault();
        $("body").animate({ "scrollTop": 0 }, 500)
    });
})