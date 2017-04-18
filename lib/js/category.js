$(function() {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getcategorytitle',
        type: 'get',
        success: function(data) {
            var html = template('category-title', data)
            $('#category-box').html(html)
            $(".category-title").on('click', function(e) {
                e.preventDefault();
                var _this = $(this).parent()[0];
                console.log(location.href)
                $(_this).children('.category-data-box').toggleClass("data-block")
                $(_this).children('.category-title').toggleClass("data-block")
                if ($(_this).attr("isSend")) { return; }
                var id = _this.dataset.titleId
                $.ajax({
                    url: 'http://mmb.ittun.com/api/getcategory',
                    type: 'get',
                    data: { titleid: id },
                    success: function(data) {
                        var html = template('category-data', data)
                        $("[data-title-id=" + id + "] .category-data-box").html(html)
                        $(_this).attr("isSend", true)
                    }
                })
            })
        }
    })


})