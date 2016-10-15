window.onmousedown = function(event){
    event = event || window.event;
    // console.info(event.target);

    var target = event.target || event.srcElement;
    // console.info(target.tagName);

    if(event.button == 2){
        var name = '';
        var url = '';

        if(target.tagName == 'SPAN' || target.tagName == 'span'){

            target.innerHTML != '' ? name = target.innerHTML : name = 'unknow name';
            var targetParent = target.parentNode;

            if(targetParent.tagName == 'A' || targetParent.tagName == 'a') {
                if( targetParent.href != ''){
                        chrome.runtime.sendMessage({'url': targetParent.href, 'name': name});
                }else{
                        chrome.runtime.sendMessage({'url': '', 'name': name});
                }
            }
        }

        if(target.tagName == 'A' || target.tagName == 'a') {
           var targetChild = target.childNodes[0];

           if(targetChild.tagName == 'SPAN' || targetChild.tagName == 'span') {
                targetChild.innerHTML != '' ? name = targetChild.innerHTML : name = 'unknow name';
                if(target.href != ''){
                     chrome.runtime.sendMessage({'url': target.href, 'name': name});
                }else{
                     chrome.runtime.sendMessage({'url': '', 'name': name});
                }
            }
        }

    }
}