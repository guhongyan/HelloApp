function modifyNick(nickname) {
    nickname = nickname || '';
    api.openWin({
        name: 'modifyNick',
        url: 'modifyNick.html',
        opaque: true,
        pageParam: {
            nickname: nickname
        },
        vScrollBarEnabled: false
    });
}

function modifyPwd() {
    api.openWin({
        name: 'modifyPwd',
        url: 'modifyPwd.html',
        opaque: true,
        vScrollBarEnabled: false
    });
}

function loginBtn() {
    api.openWin({
        name: 'userLogin',
        url: 'userLogin.html',
        opaque: true,
        vScrollBarEnabled: false
    });
}

function loginOut() {

    var common_url = 'http://117.78.3.26/mcm/api';
    var appId = 'A6963429484030';
    var key = '7F836F04-CAAC-52C8-2332-CF337134FA6F';
    var now = Date.now();
    var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
    var logoutUlr = '/User/logout';
    api.showProgress({
        title: '正在注销...',
        modal: false
    });
    api.ajax({
        url: common_url + logoutUlr,
        method: 'post',
        cache: false,
        timeout: 20,
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "X-APICloud-AppId": appId,
            "X-APICloud-AppKey": appKey,
            "authorization": $api.getStorage('token')
        }
    }, function (ret, err) {
        if (ret) {
            $api.clearStorage();
            api.execScript({
                name: 'root',
                script: 'openTab("main");'
            });
            setTimeout(function () {
                api.closeWin();
            }, 100);
        } else {
            alert(JSON.stringify(err));
        }
        api.hideProgress();
    });
}

function toRegister() {
    api.openWin({
        name: 'userLogin',
        url: 'userLogin.html',
        opaque: true,
        vScrollBarEnabled: false
    });
}

//清除下载缓存文件、拍照临时文件、网页缓存文件等
function clearData() {
    api.clearCache();

    setTimeout(function () {
        api.alert({
            msg: '缓存已清空!'
        });
    }, 300);
}

function openAbout() {
    api.openWin({
        name: 'about',
        url: './about.html'
    });
}

function init() {
    api.showProgress({
        title: '加载中...',
        modal: false
    });
    var uid = $api.getStorage('uid');
    var getUserById = '/user/' + uid;
    ajaxRequest(getUserById, 'get', '', function (ret, err) {
        if (ret) {
            var content = $api.byId('content');
            var tpl = $api.byId('template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret);
        } else {
            api.toast({msg: err.msg})
        }
        api.hideProgress();
    })
}

apiready = function () {
    init();
};