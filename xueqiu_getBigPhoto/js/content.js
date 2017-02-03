window.onmousedown = function(event){
    event = event || window.event;
    // console.info(event.target);

    var target = event.target || event.srcElement;
    // console.info(target.tagName);

    /*
    1.click a 
    <a href="http://xueqiu.com/7488507662" target="_blank">一个不活跃的游资</a>

    2.click <span>一个不活跃的游资</span>
    <a target="_blank" href="/7488507662" data-name="一个不活跃的游资">
    	<span>一个不活跃的游资</span>
    	<span class="user_remark" data-name="一个不活跃的游资" style="display:none">()</span>
    </a>

    3.click a
    <a href="/7488507662" target="_blank" data-screenname="一个不活跃的游资" class="name">
    	一个不活跃的游资
    	<span style="display:none" class="user-remark">()</span>
    </a>

     */    
    
    if(event.button == 2){
    	
    	
        var name = '';
        var url = '';
        
        //init status
        chrome.runtime.sendMessage({'url': url, 'name': name});
        
        //2
        if(target.tagName == 'SPAN' || target.tagName == 'span'){

            target.innerHTML != '' ? name = target.innerHTML : name = 'unknow name';
            var targetParent = target.parentNode;

            if(targetParent.tagName == 'A' || targetParent.tagName == 'a') {
            	chrome.runtime.sendMessage({'url': targetParent.href, 'name': name});
            }
        }

        if(target.tagName == 'A' || target.tagName == 'a') {
        	var targetChildren = target.childNodes;
//        	console.log(target.childNodes);
//        	console.log("target.childNodes:" + target.childNodes.length);
        	
        	//1
        	if(targetChildren.length == 1){
        		target.innerHTML != '' ? name = target.innerHTML : name = 'unknow name';
        		chrome.runtime.sendMessage({'url': target.href, 'name': name});
        	}else if(targetChildren.length == 2){
        		//3
        		target.getAttribute('data-screenname') != '' ? name = target.getAttribute('data-screenname') : name = 'unknow name';
        		chrome.runtime.sendMessage({'url': target.href, 'name': name});
        	}	
        	
        }

    }
}