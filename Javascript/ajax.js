function createXmlHttpRequest() {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlHttp;
}
var url = 'http://127.0.0.1:52330';

function ajax(method, url, success, b) {
    var xmlHttp = createXmlHttpRequest();
    xmlHttp.open(method, url, b); //与服务器创建建立连接
    xmlHttp.send(); //发送请求
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            success(JSON.parse(this.responseText));
        }
    }
}