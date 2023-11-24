import $ from "jquery";



var amount = Math.max.apply(Math, $("#content-00 li").map(function () { return $(this).outerWidth(true); }).get());
$("#content-00").mCustomScrollbar({
    axis: "x",
    theme: "inset",
    advanced: {
        autoExpandHorizontalScroll: true
    },
    scrollButtons: {
        enable: true,
        scrollType: "stepped"
    },
    keyboard: { scrollType: "stepped" },
    snapAmount: amount,
    mouseWheel: { scrollAmount: amount }
});