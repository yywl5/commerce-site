let RegisterButton = document.querySelector(".RegisterButton");
let ReturnLogin = document.querySelector(".ReturnLogin");
let login = document.querySelector(".login");
let register = document.querySelector(".register");
let bird1 = document.getElementById('bird1');
let bird2 = document.getElementById("bird2");
let forest = document.getElementById("forest");
let moon = document.getElementById("moon");
let mountains_front = document.getElementById("mountains_front");
let mountains_behind = document.getElementById("mountains_behind");
let water = document.getElementById("water");
let ChangeButton = document.getElementById("LoginButton");
let RegisterConfirm = document.getElementsByClassName("registerbutton");


window.onload = function() {
    WindowsOpenDatabase();
    RegisterButton.addEventListener("click", () => {
        login.style.transform = "rotateY(180deg)"
        register.style.transform = "rotateY(0deg)";
        //bird1.style.display = "none";
        //bird2.style.display = "none";
        //$("#forest").fadeOut(1000);
        $("#forest").css("transform", "rotateX(90deg)");
        //forest.style.display = "none";
        //mountains_front.style.display = "block";
        $("#mountains_behind").css("transform", "rotateX(0deg)");
        //mountains_behind.style.display = "block";
        //moon.style.display = "block";
        $("#moon").slideDown(3000);
        $("#bird1").fadeTo("slow", 0);
        $("#bird2").fadeTo("slow", 0);
        $("#mountains_front").css("transform", "rotateY(0deg)");
        //water.style.display = "none";
        //$(".Background").css("background", "linear-gradient(#2b1055,#7597de)");
        $("h2").css("color", "#fff");
        $("input").css("color", "#fff");
        $("#ChangeButton").css("background", "000");
        $("input::-webkit-input-placeholder").css("color", "#fff");
        $("p").css("color", "#fff");
        $(".Background").css("backgroundImage", "linear-gradient(125deg, hsl(263, 68%, 20%), hsl(242, 52%, 46%), hsl(242, 55%, 50%), hsl(228, 41%, 39%), hsl(221, 61%, 66%))");

        $(".Background").css("backgroundSize", "400%");
        $(".nav").css("background", "linear-gradient(#2b1055,#7597de)");
        $("i").css("color", "#fff");
        $(".text-gray").css("color", "#fff");
        $("#cloud").css("z-index", "2");
        $("#water").fadeOut(3000);
        $(".Background").css("animation", "bganimation 15s infinite");

    })

    ReturnLogin.addEventListener("click", () => {

        login.style.transform = "rotateY(0deg)"
        register.style.transform = "rotateY(-180deg)";
        //bird1.style.display = "block";
        //bird2.style.display = "block";
        $("#bird1").fadeTo("5s", 1);
        $("#bird2").fadeTo("5s", 1);
        //$("#forest").fadeIn(1000);
        //forest.style.display = "block";
        $("#forest").css("transform", "rotateX(0deg)");
        $("#mountains_behind").css("transform", "rotateX(90deg)");
        //mountains_front.style.display = "none";
        $("#mountains_front").css("transform", "rotateY(90deg)");
        //mountains_behind.style.display = "none";
        //moon.style.display = "none";
        $("#moon").slideUp(3000);
        //water.style.display = "block";
        $("#water").fadeIn(3000);
        //$(".Background").css("background", "var(--sky--)");
        $(".Background").css("backgroundImage", "linear-gradient(120deg, hsl(217, 96%, 81%) 0%, hsl(216, 80%, 70%), hsl(210, 60%, 50%), hsl(207, 62%, 52%), hsl(200, 91%, 87%) 100%)");
        $("h2").css("color", "#000");
        $("input").css("color", "#000");
        $("input::-webkit-input-placeholder").css("color", "#000");
        $("p").css("color", "#000");
        $(".nav").css("background", "#f5f5f5");
        $("i").css("color", "#000");
        $(".text-gray").css("color", "#000");
        $("#cloud").css("z-index", "0");
        $(".Background").css("animation", "bganimation 15s infinite");
    })



    /*********************************登录对象***********************************/
    LoginButton.addEventListener("click", () => {
        var name = document.getElementById("login_name");
        var pwd = document.getElementById("login_pwd");
        if ((name.value == null || name.value == "") || (pwd.value == null || pwd.value == "")) {
            alert("用户名或密码不能为空!!");
        } else if (name.value == "1234" && pwd.value == "1234") {
            alert("登录成功");
            window.location.href = "../index.html";
        } else {
            alert("用户名错误或者密码错误");
        }
    })

    /*********************************登录对象***********************************/
    /*********************************注册对象***********************************/
    document.getElementById("ChangeButton").onclick = function() {
        if (RegisterConfirms() && PassWord() && CheckRePassword() && CheckEmail() && CheckTelphone()) {
            SaveStorage();
            alert("注册成功");
            return true;
        }
    };
    document.getElementById("register_name").onblur = RegisterConfirms;
    document.getElementById("register_pwd").onblur = PassWord;
    document.getElementById("register_repwd").onblur = CheckRePassword;
    document.getElementById("register_email").onblur = CheckEmail;
    document.getElementById("register_phone").onblur = CheckTelphone;
    /*********************************注册对象***********************************/




}
test();

function RegisterConfirms() {
    var username = document.getElementById("register_name").value;
    var reg_username = /^([a-zA-Z0-9_-])/;
    var flag = reg_username.test(username);

    var s_username = document.getElementById("s_username");

    if (flag) {
        s_username.innerHTML = "<img src='../img/gou.png' width='35px' height='35px' >"
    } else {
        s_username.innerHTML = "用户名格式有误!";
    }
    return flag;
}

function PassWord() {
    var password = document.getElementById("register_pwd").value;
    var reg_password = /^\w{6,12}$/;
    var flag = reg_password.test(password);
    var s_password = document.getElementById("s_password");

    if (flag) {
        s_password.innerHTML = "<img src='../img/gou.png' width='35px' height='35px'/>";
    } else {
        //提示红色错误信息
        s_password.innerHTML = "密码格式有误";
    }
    return flag;
}

function CheckRePassword() {
    var password = document.getElementById("register_pwd").value;
    var repassword = document.getElementById("register_repwd").value;



    if (repassword === password && repassword != "") {
        s_repassword.innerHTML = "<img src='../img/gou.png' width='35px' height='35px'/>";
        return true;
    } else {
        s_repassword.innerHTML = "两次密码输入不一致！";
        return false
    }


}


function CheckEmail() {
    var email = document.getElementById("register_email").value;
    var reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var flag = reg_email.test(email);
    var s_email = document.getElementById("s_email");

    if (flag) {
        s_email.innerHTML = "<img src='../img/gou.png' width='35px' height='35px'/>";
    } else {
        s_email.innerHTML = "Email格式有误";
    }
    return flag;
}

function CheckTelphone() {
    //1.获取手机号的值
    var telphone = document.getElementById("register_phone").value;
    //2.定义正则表达式
    var reg_telphone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    //3.判断值是否符合正则的规则
    var flag = reg_telphone.test(telphone);
    //4.提示信息
    var s_telphone = document.getElementById("s_telphone");

    if (flag) {
        //提示绿色对勾
        s_telphone.innerHTML = "<img src='../img/gou.png' width='35px' height='35px'/>";
    } else {
        //提示红色错误信息
        s_telphone.innerHTML = "手机号输入有误";
    }
    return flag;


}


function SaveStorage() {
    var UserData = new Object;
    UserData.UserNameData = document.getElementById("register_name").value;
    UserData.UserEmailData = document.getElementById("register_email").value;
    UserData.UserPhoneData = document.getElementById("register_phone").value;
    UserData.UserPWD = document.getElementById("register_pwd").value;
    var str = JSON.stringify(UserData);
    localStorage.setItem(UserData.UserNameData, str);
    console.log(UserData);
    $.ajax({
        type: "post",
        url: "http://127.0.0.1:52330",
        headers: { 'Content-Type': 'application/json;charset=utf8', 'organId': '1333333333' },
        data: "str",
        dataType: "json",
        Timeout: 10000,
        success: function(response) {
            console.log(str);
        }
    });

}

function test() {
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.status);
        }
    };
    xhttp.open("GET", "http://127.0.0.1:52330", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
}

function WindowsOpenDatabase() {
    if (window.openDatabase) {
        console.log("浏览器支持DataBase");

    } else {
        console.log("浏览器不支持DataBase");
    }
}