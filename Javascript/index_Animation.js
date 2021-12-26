//获取对象


function $(e) { return document.getElementById(e) }

function $c(e) { return document.getElementsByClassName(e) }
var a1 = $c("a1")
var nav = $("navigator")
var maintext = $("MainText")
var maincontent = $("MainContent")
var Start = $("Start");
var TrueStart = $("TrueStart");
//Init
maincontent.style.marginTop = (7200 + vh) + "px"
    //回调函数
function a1left(e, r, b, o) {
    for (var i = 0; i < e.length; i += 2) {
        e[i].style.left = o.get(o, scrollTop - i * 1000)[0] + "px"
    }
}

function a1lright(e, r, b, o) {
    for (var i = 1; i < e.length; i += 2) {
        e[i].style.left = o.get(o, scrollTop - (i - 1) * 1000)[0] + "px"
    }
}

function navigator_pos(e, r) {
    nav.style.top = r[0]
}

function StartDisappear(e, r) {
    e.style.transform = "scale(" + r[0] + ")"
}

function TrueStartDisappear(e, r) {
    e.style.transform = "scale(" + r[0] + ")"
}

function mainTextFontSize(e, r) {
    maintext.style.display = r[0]
    maintext.style.transform = "scale(" + r[1] + ")"
    maintext.style.opacity = r[2]
}
//创建动画
var p1 = create_LINEAR_ANIMATION(
    callback = a1left, pre = "", suf = "",
    keyframs = [{ r: 0, y: [-vw - 30] }, { r: 400, y: [0] }]
)
var p2 = create_LINEAR_ANIMATION(
    callback = a1lright, pre = "", suf = "",
    keyframs = [{ r: 1200, y: [vw + 30] }, { r: 1800, y: [0] }]
)
var nav_top = create_LINEAR_ANIMATION(
    callback = navigator_pos, pre = "", suf = "px",
    keyframs = [{ r: 0, y: [-3 * _rem] }, { r: 5200, y: [-3 * _rem] }, { r: 6800, y: [0] }]
)
var mainTextFontSizeAni = create_LINEAR_ANIMATION(
    callback = mainTextFontSize, pre = "", suf = "",
    keyframs = [{ r: 0, y: ["none", 100, 1] }, { r: 4500, y: ["block", 100, 0] }, { r: 6200, y: ["block", 1, 1] }, { r: 6800, y: ["none", 1, 0] }]
)
var StartOfBeginDisapper = create_LINEAR_ANIMATION(
    callback = StartDisappear, pre = "", suf = "",
    keyframs = [{ r: 0, y: [1] }, { r: 300, y: [0] }]
)

var TrueStartOfBeginDisapper = create_LINEAR_ANIMATION(
    callback = TrueStartDisappear, pre = "", suf = "",
    keyframs = [{ r: 0, y: [1] }, { r: 300, y: [0] }]
)
p1.element = a1
p2.element = a1
mainTextFontSizeAni.element = maintext
nav_top.element = nav
StartOfBeginDisapper.element = Start
TrueStartOfBeginDisapper.element = TrueStart

scroll_KEYFRAME_anis.push(p1)
scroll_KEYFRAME_anis.push(p2)
scroll_KEYFRAME_anis.push(nav_top)
scroll_KEYFRAME_anis.push(mainTextFontSizeAni)
scroll_KEYFRAME_anis.push(StartOfBeginDisapper)
scroll_KEYFRAME_anis.push(TrueStartOfBeginDisapper)