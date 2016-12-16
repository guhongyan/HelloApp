apiready = function () {
    var newsId = api.pageParam.newsId;
    var getNewsByIdUrl = '/news/?filter=';
    var urlParam = {where: {id: newsId}};
    api.showProgress({
        title: '加载中...',
        modal: false
    });
    ajaxRequest(getNewsByIdUrl+JSON.stringify(urlParam),'get','',function(ret,err){
        if (ret) {
            var content = $api.byId('content');
            var tpl = $api.byId('news-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret[0]);
            api.parseTapmode();
            $("#fav").off('click').on('click', function () {
                collect(this, 'news_fav');
            })
            var uid = $api.getStorage('uid');
            if (uid) {
                var getUserAct_favUrl = '/user?filter=';
                var act_urlParam = {
                    fields: {"news_fav": true},
                    include: ["news_fav"],
                    where: {
                        id: uid
                    }
                };
                ajaxRequest(getUserAct_favUrl + JSON.stringify(act_urlParam), 'GET', '', function (ret, err) {
                    if (ret) {
                        var new_favArr = ret[0].news_fav;
                        for (var i = 0; i < new_favArr.length; i++) {
                            if (new_favArr[i].news == newsId) {
                                fav = true;
                                if (fav) {
                                    $api.html($api.byId('fav'), "已收藏");
                                    $("#fav").off('click').on('click', function () {
                                        uncollect('news_fav', new_favArr[i].id, this);
                                    })
                                }
                                break;
                            }
                        }

                    } else {
                        api.toast({
                            msg: err.msg
                        })
                    }
                })

            }
        } else {
            api.toast({
                msg: err.msg
            })
        }
        api.hideProgress();
    });


};


