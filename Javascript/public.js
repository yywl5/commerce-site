$(function() {
    /**************数量加减***************/
    $(".num .sub").click(function() {
        var num = parseInt($(this).siblings("span").text());
        if (num <= 1) {
            $(this).attr("disabled", "disabled");
        } else {
            num--;
            $(this).siblings("span").text(num);
            //获取除了货币符号以外的数字
            var price = $(this).parents(".number").prev().text().substring(1);
            //单价和数量相乘并保留两位小数
            $(this).parents(".th").find(".sAll").text('￥' + (num * price).toFixed(2));
            Calculate();
            CalculateResult();
        }
    });
    $(".num .add").click(function() {
        var num = parseInt($(this).siblings("span").text());
        if (num >= 5) {
            confirm("限购5件");
        } else {
            num++;
            $(this).siblings("span").text(num);
            var price = $(this).parents(".number").prev().text().substring(1);
            $(this).parents(".th").find(".sAll").text('￥' + (num * price).toFixed(2));
            Calculate();
            CalculateResult();
        }
    });
    //计算总价
    function Calculate() {
        var all = 0;
        var len = $(".th input[type='checkbox']:checked").length;
        if (len == 0) {
            $("#all").text('￥' + parseFloat(0).toFixed(2));
        } else {
            $(".th input[type='checkbox']:checked").each(function() {
                //获取小计里的数值
                var sAll = $(this).parents(".th_label").siblings('.sAll').text().substring(1);
                //累加
                all += parseFloat(sAll);
                //赋值
                $("#all").text('￥' + all.toFixed(2));
            })
        }

    }
    //计算总共几件商品
    function CalculateResult() {
        var zsl = 0;
        var index = $(".th input[type='checkbox']:checked").parents(".th").find(".num span");
        var len = index.length;
        if (len == 0) {
            $("#sl").text(0);
        } else {
            index.each(function() {
                zsl += parseInt($(this).text());
                $("#sl").text(zsl);
            })
        }
        if ($("#sl").text() > 0) {
            $(".count").css("background", "#c10000");
        } else {
            $(".count").css("background", "#8e8e8e");
        }
    }
    /*****************商品全选***********************/
    $("input[type='checkbox']").on('click', function() {
        var sf = $(this).is(":checked");
        var sc = $(this).hasClass("checkAll");
        if (sf) {
            if (sc) {
                $("input[type='checkbox']").each(function() {
                    this.checked = true;
                });
                CalculateResult();
                Calculate();
            } else {
                $(this).checked = true;
                var len = $("input[type='checkbox']:checked").length;
                var len1 = $("input").length - 1;
                if (len == len1) {
                    $("input[type='checkbox']").each(function() {
                        this.checked = true;
                    });
                }
                CalculateResult();
                Calculate();
            }
        } else {
            if (sc) {
                $("input[type='checkbox']").each(function() {
                    this.checked = false;
                });
                CalculateResult();
                Calculate();
            } else {
                $(this).checked = false;
                var len = $(".th input[type='checkbox']:checked").length;
                var len1 = $("input").length - 1;
                if (len < len1) {
                    $('.checkAll').attr("checked", false);
                }
                CalculateResult();
                Calculate();
            }
        }

    });
    /****************************LabelDetail 加入购物车*******************************/
    $(".btns .cart").click(function() {
        if ($(".categ p").hasClass("on")) {
            var num = parseInt($(".num span").text());
            var num1 = parseInt($(".goCart span").text());
            $(".goCart span").text(num + num1);
        }
    });

    //删除购物车商品
    $('.delete').click(function() {
        //单个删除
        if ($(this).parent().parent().hasClass("th")) {
            $(".mask").show();
            $(".TipDelete").show();
            index = $(this).parents(".th").index() - 1;
            $('.certain').click(function() {
                $(".mask").hide();
                $(".TipDelete").hide();
                $(".th").eq(index).remove();
                $('.certain').off('click');
                if ($(".th").length == 0) {
                    $(".ShoppingCarTable .goOn").show();
                }
            })
        } else {
            //选中多个一起删除
            if ($(".th input[type='checkbox']:checked").length == 0) {
                $(".mask").show();
                $(".pleaseChoose").show();
            } else {
                $(".mask").show();
                $(".TipDelete").show();
                $('.certain').click(function() {
                    $(".th input[type='checkbox']:checked").each(function(j) {
                        index = $(this).parents('.th').index() - 1;
                        $(".th").eq(index).remove();
                        if ($(".th").length == 0) {
                            $(".ShoppingCarTable .goOn").show();
                        }
                    })
                    $(".mask").hide();
                    $(".TipDelete").hide();
                    CalculateResult();
                    Calculate();
                })
            }
        }
    })
    $('.cancel').click(function() {
        $(".mask").hide();
        $(".TipDelete").hide();
    })
    $(".off").click(function() {
        $(".mask").hide();
        $(".LabelDelete").hide();
        $(".pleaseChoose").hide();
    });
    /***********************OrderConfirm***************/
    $(".RealAddress").click(function() {
        $(this).addClass("on").siblings().removeClass("on");
    })
    $(".way img").click(function() {
        $(this).addClass("on").siblings().removeClass("on");
    })
    $(".PostedWay span").click(function() {
        $(this).addClass("on").siblings().removeClass("on");
    });
    $(".RealAddress").on('click', '.setDefault', function() {
            $(this).next().remove();
            $(this).parent("p").prev().append('<span class="default">[默认地址]</span>').parents('.RealAddress').addClass("on").siblings().removeClass("on")
                .find(".default").remove().end().find(".tit p").eq(1).prepend('<a href="#" class="setDefault">设为默认</a><span>|</span>');
            $(this).parent("p").prev().parents('.RealAddress').prependTo("Address");
            $(this).remove();
        })
        //	订单页面修改添加信息
    $(".edit").click(function() {
        $(".mask").show();
        $(".ReallyAddress").show();
    });
    $(".QorY>input").click(function() {
        if ($(this).val() == "保存") {
            $(".mask").hide();
            $(".ReallyAddress").hide();
        } else {
            $(".mask").hide();
            $(".ReallyAddress").hide();
        }
    });

})