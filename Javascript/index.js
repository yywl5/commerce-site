/******搜索框********/




window.onload = function() {
    msApi(); //秒杀专区
    hotSaleApi(); //热卖专区数据
    guessLikeApi(); //猜你喜欢数据
    /*        ajax("get", "helloword.json", function(res) {
                console.log(res);
            }, true);
            */




    var searchInput = document.getElementById("searchInput");
    //搜索框
    searchInput.addEventListener("keyup", debounce(getSuggest, 500), false);


    searchInput.addEventListener("blur", hideKeyword, false);

    searchInput.addEventListener("focus", showKeyword, false);

    function showKeyword() {
        if (searchInput.value !== "") {
            // getSuggest();
            document.getElementById("search-suggest").style.display = "block";
        }
    }

    function hideKeyword() {
        document.getElementById("search-suggest").style.display = "none";
    }



    getSuggest();

    function getSuggest() {
        ajax("get", "../json/suggest.json", function(res) {
            if (res.code == 0) {

                var suggest_list = document.getElementById("search-suggest"); //下拉提示列表与容器元素
                var data = res.data;
                // console.log(data);
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    str += "<li>" + data[i].suggestname + "</li>";
                }
                suggest_list.innerHTML = str;
                showKeyword();
                //    console.log(str);
            }

        }, true)
    }
    //防抖函数
    function debounce(fn, delay) {
        var handle;
        return function() {
            clearTimeout(handle);
            handle = setTimeout(function() {
                fn();
            }, delay)
        }
    }
    //异步处理
    /******搜索框********/


    /******轮播图操作********/


    //设置轮播图的透明度和位移.
    bannerOption();

    //轮播图操作




    function bannerOption() {
        var swiper = document.getElementById("swiper"); //获得轮播图包裹层元素
        var swiperItem = swiper.getElementsByClassName("swiper-item"); //获取轮播图列表
        var prev = document.getElementsByClassName("prev")[0]; //获取上一张按钮
        var next = document.getElementsByClassName("next")[0]; //获取下一张按钮
        var index = 0; //当前轮播图索引.默认第一张.
        var indicators = document.getElementsByClassName("indicator"); //获取原点列表
        var timer = null; //定时数

        for (var i = 0; i < swiperItem.length; i++) {
            if (index == i) {
                swiperItem[i].style.opacity = 1;
            } else {
                swiperItem[i].style.opacity = 0;
            }
            swiperItem[i].style.transform = "translateX(" + (-i * swiperItem[0].offsetWidth) + "px)";
        }


        //给圆点添加点击事件.
        for (var k = 0; k < indicators.length; k++) {
            indicators[k].onclick = function() {
                clearInterval(timer);
                var clickIndex = parseInt(this.getAttribute("data-index"));
                index = clickIndex;
                changeImg();
            }
        }

        prev.onclick = function() {
            clearInterval(timer);
            index--;
            changeImg();
        }

        next.onclick = function() {
                clearInterval(timer);
                index++;
                changeImg();
            }
            /******清除定时效果与增加定时效果********/
        swiper.addEventListener("mouseover", function() {
            clearInterval(timer);
        }, false);

        swiper.addEventListener("mouseout", function() {
            autoChange();
        }, false);
        /******清除定时效果与增加定时效果********/
        function changeImg() {
            if (index < 0) {
                index = swiperItem.length - 1;
            } else if (index > swiperItem.length - 1) {
                index = 0;
            }
            for (var j = 0; j < swiperItem.length; j++) {
                swiperItem[j].style.opacity = 0;
            }
            swiperItem[index].style.opacity = 1;
            setIndexOn();
        }

        //设置激活状态.
        function setIndexOn() {
            for (var i = 0; i < indicators.length; i++) {
                indicators[i].classList.remove("on");
            }
            indicators[index].classList.add("on");
        }
        /******轮播图操作********/


        /******自动播放********/
        autoChange();

        function autoChange() {
            timer = setInterval(function() {
                index++;
                changeImg();
            }, 5000)
        }
    }


    function msApi() {
        ajax("get", "../json/miaosha.json", function(res) {
            //  console.log(res);
            if (res.code == 0) {
                var cd_time = res.data.ms_time;
                var good_list = res.data.goods_list;
                countDown(cd_time);
                var miaoshaList = document.getElementById("miaoshaList");
                var str = "";
                for (var i = 0; i < good_list.length; i++) {
                    str +=
                        '<div class="ms-item">' +
                        '<a href="#" class="ms-item-lk">' +
                        '<img src="' + good_list[i].good_img + '" alt="" class="ms-item-img">' +
                        '<p class="ms-item-name">' + good_list[i].name + '</p></p>' +
                        '<div class="ms-item-buy">' +
                        '<span class="progress"><span class="progress-bar" style="width:' + good_list[i].progress + '%"></span></span>' +
                        '<span class="buy-num">已抢' + good_list[i].progress + '</span>' +
                        '</div>' +
                        '<div class="ms-item-price clearfix">' +
                        '<span class="cm-price new-price" >￥' + good_list[i].new_price + '</span>' +
                        '<span class="cm-price origin-price" >￥' + good_list[i].old_price + '</span>' +
                        '</div>' +
                        '</a>' +
                        '</div>';
                }
                miaoshaList.innerHTML = str;
            }
        }, true);
    }

    function countDown(t) {
        //秒杀倒计时
        var ms_time = t;
        var ms_timer = setInterval(function() {
            if (ms_time < 0) {
                clearInterval(ms_timer);
            } else {

                callTime(ms_time);
                ms_time--;
            }
        }, 1000);

    }

    function callTime(time) {
        var hour = Math.floor(time / 60 / 60); //小时
        //Math.floor 为向下取整
        var minutes = Math.floor(time / 60 % 60); //分钟
        var seconds = Math.floor(time % 60); //秒
        hour = formatTime(hour);
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);
        document.getElementsByClassName("cd_hour")[0].innerHTML = hour;
        document.getElementsByClassName("cd_minute")[0].innerHTML = minutes;
        document.getElementsByClassName("cd_second")[0].innerHTML = seconds;
    }

    function formatTime(t) {
        if (t < 10) {
            t = "0" + t;
        }
        return t;
    }


    //获取热卖单品列表.
    function hotSaleApi() {
        ajax("get", "../json/hotsale.json", function(res) {
            console.log(res);
            if (res.code == 0) {
                var list = res.data;
                var hotSaleList = document.getElementById("hotSaleList");
                var str = "";
                for (var i = 0; i < list.length; i++) {
                    str +=
                        '<li class="bs-item item">' +
                        '<a href="">' +
                        '<img src="' + list[i].good_img + '" alt="">' +
                        '<p class="title">' + list[i].name + '</p>' +
                        '<div class="line-2 clearfix">' +
                        '<span class="comment">评论<em>' + list[i].commentNum + '</em></span>' +
                        ' <span class="collect">收藏<em>' + list[i].collectNum + '</em></span>' +
                        '</div>' +
                        '<div class="line-3">' +
                        '<span class="strong">' + list[i].new_price + '</span>' +
                        '<span class="price-through">￥' + list[i].old_price + '</span>' +
                        '<span class="sell">月销售' + list[i].saleNum + '</span>' +
                        '</div>' +
                        '</a>' +
                        '</li>';
                }
                hotSaleList.innerHTML = str;
                //alert(str);
            }


        }, true);
    }



    //获取推荐喜欢单品
    function guessLikeApi() {
        ajax("get", "../json/guesslike.json", function(res) {
            console.log(res);
            if (res.code == 0) {
                var list = res.data;
                var hotSaleList = document.getElementById("gl");
                var str = "";
                for (var i = 0; i < list.length; i++) {
                    str +=
                        `<li class="like-item item">
                    <a href="https://www.baidu.com">
                    <img src="${list[i].good_img}" alt="" class="item-img">
                    </a>
                    <p class="title">${list[i].name}</p>
                    <div class="line-3">
                         <span class="strong">${list[i].new_price}</span>
                         <span class="sell">月销${list[i].saleNum}笔</span>
                    </div>
                    <a href="https://xdclass.net" class="item-more">发现更多相似宝贝</a>
               </li>`;
                }
                gl.innerHTML = str;
            }


        }, true);
    }

    document.getElementById("loadMore").onclick = function() {
        var LiNode = new Array();
        for (var i = 0; i < 5; i++) {
            LiNode[i] = document.createElement("li");

            LiNode[i].setAttribute("class", "like-item item");
            var LiContent = "";
            LiContent +=

                `<i><a href="https://www.baidu.com">
        <img src="../img/good.jpg" alt="" class="item-img">
        </a>
        <p class="title">分布式无线路由器</p>
        <div class="line-3">
             <span class="strong">1100</span>
             <span class="sell">月销3000笔</span>
        </div>
        <a href="https://xdclass.net" class="item-more">发现更多相似宝贝</a></i>`;
            LiNode[i].innerHTML += LiContent;
            document.getElementById("gl").appendChild(LiNode[i]);
        }
    }
}

window.onscroll = function() {
    scrollShowBtn()
    var winPos = document.documentElement.scrollTop || document.body.scrollTop; //获取
    var hotSale = document.getElementById("hotsale"); //获取热卖专区元素
    var hotHeight = hotSale.offsetTop + hotSale.offsetHeight; //猜你喜欢之前的总高度.

    if (winPos < hotSale.offsetTop) {
        addOn(0);
    } else if (winPos >= hotSale.offsetTop && winPos < hotHeight) {
        addOn(1);
    } else {
        addOn(2);
    }
}

//添加菜单激活状态.
function addOn(index) {
    var tool = document.getElementsByClassName("tool")[0];
    var toolItem = tool.getElementsByTagName("a");
    for (var i = 0; i < toolItem.length; i++) {
        toolItem[i].classList.remove("on");
    }
    toolItem[index].classList.add("on");
}


//滚动一定距离显示返回顶部按钮
function scrollShowBtn() {
    var top = document.documentElement.scrollTop || document.body.scrollTop; //获取
    if (top > 300) {
        document.getElementById("goTop").style.display = "block";
    } else {
        document.getElementById("goTop").style.display = "none";
    }
}

//返回顶部

function goTop() {
    var topTimer = setInterval(function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //获取
        var iSpeed = Math.floor(-scrollTop / 8);
        if (scrollTop == 0) {
            clearInterval(topTimer);
        }
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
    }, 45)

}
/******自动播放********/

/******固定导航栏********/
$(function() {
    $(window).scroll(function() {
        var ws = $(window).scrollTop();
        if (ws > 60) {
            $(".head").addClass("ding").css({ "background": "rgba(255,255,255," + ws / 300 + ")" });
        } else {
            $(".head").removeClass("ding").css({ "background": "#fff" });
        }
    });
})

/******固定导航栏********/