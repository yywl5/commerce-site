$(function() {
    $(".bottom-nav ul>li").hover(function() {
        var alength = $(this).children().length;
        if (alength != 1) {
            $(this).children("div").stop().slideToggle(200).end().siblings().children("div").hide();
        } else {
            $(this).children("div").hide();
        }
    });
})