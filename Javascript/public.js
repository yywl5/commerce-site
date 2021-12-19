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


let QRCode = document.getElementById("link_a");
let PCharacter = document.getElementById("nav_img");
let Nav_p = document.getElementById("nav_p");
QRCode.addEventListener("mouseover", () => {
    Nav_p.style.display = "block";
    PCharacter.style.display = "block";
});
QRCode.addEventListener("mouseout", () => {
    Nav_p.style.display = "none";
    PCharacter.style.display = "none";
});