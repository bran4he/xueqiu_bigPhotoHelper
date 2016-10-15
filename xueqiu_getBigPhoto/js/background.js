chrome.contextMenus.create({
    'type':'normal',
    'title':'查看雪球大头像……',
    'contexts':['link'],
    'id':'xueqiu',
    'onclick':getLargePhoto,
    'documentUrlPatterns':['*://xueqiu.com/*']
});

chrome.contextMenus.create({
    type: 'separator'
});

var url;
var HTTP_TYPE = "http:";
var FIRST_STR = 'SNB.data.statuses';
var LAST_STR = 'SNB.data.statusType';

function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

function getLargePhoto(info, tab){
    console.info('getLargePhoto url:' + url);

    if(url != ''){
        httpRequest(url, function(data){
            var tempStr = data.substring(data.indexOf(FIRST_STR), data.indexOf(LAST_STR));
            var targetStr = tempStr.substring(tempStr.indexOf('=') +1, tempStr.lastIndexOf(';'));
            var jsonObj = JSON.parse(targetStr);
            var imgUrls = jsonObj.statuses[0].user.profile_image_url;
            // console.info(imgUrls);
            var photoDomain = jsonObj.statuses[0].user.photo_domain;
            window.open(HTTP_TYPE + photoDomain + imgUrls.split(',')[0], '_blank');
        });
    }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.info('addListener message:' + message);
    url = message.url;
    var name = message.name;
    chrome.contextMenus.update('xueqiu',{
        'title':'查看雪球大头像:'+name
    });
});
