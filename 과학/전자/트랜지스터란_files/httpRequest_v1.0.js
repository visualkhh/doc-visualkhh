

// AjaxObject /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var isdebug = false;
var currentPageURL = window.location.href;
var arrAjaxObject = new Array();

AjaxRequest=function(name){
	this.xmlRequest=null;
	this.iframeRequest=null;
	window._ifr_buf_count |= 0;
	this.iframeID = 'iframebuffer' + window._ifr_buf_count++ + "_" + name;
	this.iframeUrl=null;
	
	if (window.XMLHttpRequest){ // if Mozilla, Safari etc
		this.xmlRequest=new XMLHttpRequest()
		if (this.xmlRequest.overrideMimeType)
			this.xmlRequest.overrideMimeType('text/xml')
	}else if (window.ActiveXObject){ // if IE
	//}else if (window.ActiveXObject && !isdebug){ // if IE
			
		try {
			this.xmlRequest=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e){
			try{
				this.xmlRequest=new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e){}
		}
	}
	
	if(!this.xmlRequest){
		this.createIframe();	
	}
	return this;
}

AjaxRequest.prototype.createIframe=function(){
	if(isdebug) alert("create iframe");
	if (document.createElement && document.documentElement &&
	   (window.opera || navigator.userAgent.indexOf('MSIE 5.0') == -1)){
		var ifr = document.createElement('iframe');
		ifr.setAttribute('id', this.iframeID);
		ifr.setAttribute('name', this.iframeID);
		ifr.style.visibility = 'hidden';
		ifr.style.position = 'absolute';
		ifr.style.width = ifr.style.height = ifr.borderWidth = '500px';
		ifr.src = "/_hdn/blank_ajax.html";
		this.iframeRequest = document.getElementsByTagName('body')[0].appendChild(ifr);

	}else if (document.body && document.body.insertAdjacentHTML){
		document.body.insertAdjacentHTML('beforeEnd', '<iframe name="' + this.iframeID +   '" id="' + this.iframeID + '" style="display: none" src="/_hdn/blank_ajax.html"></iframe>');
	}

	
	if (window.frames && window.frames[this.iframeID]) this.iframeRequest = window.frames[this.iframeID];

	
	this.iframeRequest.name = this.iframeID;


}

AjaxObject=function(name, targetArea, elementID, msgArea){
	this.name = name;
	this.ajaxReq=new AjaxRequest(name);
	this.elementID=elementID;
	this.targetArea=targetArea;
	this.msgArea=msgArea;
	this.responseData;
	this.callbackFunc;
	this.finalProcessFunc;
	this.loadingURI;
	this.useIframe;
	this.paramValues;
	this.tailAjax = true;
	this.isMessageAlert = true;
	
	arrAjaxObject[name] = this;	
}

AjaxObject.prototype.load=function(url, useiframe){
	this.useIframe=useiframe;
	if (!url || (!this.ajaxReq.xmlRequest && !this.ajaxReq.iframeRequest)) return false;
	if (this.tailAjax && url.indexOf(".ajax") < 0){
		if(isdebug)alert("url must be .ajax");	
		document.location.href=url;
		return true;
	}
	
	if(!this.callbackFunc){
		this.callbackFunc=callbackLoad;
	}
	
	if (this.msgArea){
		document.getElementById(this.msgArea).style.display = "";
	}
	
	if (this.ajaxReq.xmlRequest){
		//if(isdebug) alert("xml request");
		try{
			return this.setXmlResponse(url, null, useiframe);
		}catch(e){
			
		}
	}else{
		if(useiframe && this.ajaxReq.iframeRequest){
			if(isdebug) alert("iframe request");
			return this.setIframeResponse(url, null);
		}else{
			return false;
		}
	}
}

AjaxObject.prototype.submit=function(formRef, useiframe){
	this.useIframe=useiframe;
	var method = formRef.getAttribute('method'), url = formRef.getAttribute('action');
	if (!url || (!this.ajaxReq.xmlRequest && !this.ajaxReq.iframeRequest)) return false;
	if (this.tailAjax && url.indexOf(".ajax") < 0){
		if(isdebug)alert("url must be .ajax");	
		document.location.href=url;
		return true;
	}

	if(!this.callbackFunc){
		this.callbackFunc=callbackSubmit;
	}

	if (this.msgArea){
		document.getElementById(this.msgArea).style.display = "block";
	}

	if (method && method.toLowerCase() == 'post') {
		if (this.ajaxReq.xmlRequest){
			this.setXmlResponse(url, parseForm(formRef), false);
			return false;
		}else if (this.ajaxReq.iframeRequest){
			return this.setIframeResponse(url, formRef);
		}else{
			return false;
		}
	 } else {
		  return this.load(url + (url.indexOf('?') == -1 ? '?' : '&') + parseForm(formRef));
	 }

}

AjaxObject.prototype.message=function(url, useiframe){
	this.useIframe=useiframe;
	if (!url || (!this.ajaxReq.xmlRequest && !this.ajaxReq.iframeRequest)) return false;
	if (this.tailAjax && url.indexOf(".ajax") < 0){
		if(isdebug)alert("url must be .ajax");	
		document.location.href=url;
		return true;
	}
	
	if(!this.callbackFunc){
		this.callbackFunc=callbackMessage;
	}
	
	if (this.msgArea){
		document.getElementById(this.msgArea).style.display = "";
	}
	
	if (this.ajaxReq.xmlRequest){
		//if(isdebug) alert("xml request");
		try{
			return this.setXmlResponse(url, null, true);
		}catch(e){
		}
	}else if(this.ajaxReq.iframeRequest){
			if(isdebug) alert("iframe request");
			return this.setIframeResponse(url, null);
	}else{
		return false;
	}
	
}


AjaxObject.prototype.setXmlResponse=function(url, formStr, isRetryParseResult){

	var ajaxObj=this;	
	var ajaxReqObj=this.ajaxReq;
	var xmlReqObj=this.ajaxReq.xmlRequest;
	var elementID=this.elementID;
	var url=url + (url.indexOf('?') == -1 ? '?' : '&') + "___ajaxcachebust="+new Date().getTime();
	var callbackFunc=this.callbackFunc;
	var finalProcessFunc=this.finalProcessFunc;
	var targetArea=this.targetArea;
	var msgArea=this.msgArea;
	var paramValues=this.paramValues;
	var isMessageAlert=this.isMessageAlert;

	xmlReqObj.onreadystatechange=function() {
		var resultContent="";
		var isSuccess=true;
		if (xmlReqObj.readyState == 4){ //if request of file completed

			if (msgArea){
				document.getElementById(msgArea).style.display = "none";
			}
			
			if (isdebug) showDebug(url, formStr);

			if (xmlReqObj.status==200 || window.location.href.indexOf("http")==-1){ //if request was successful or running script locally
				try{	
					var doc;
					var is_ie = ((navigator.userAgent.toLowerCase().indexOf("msie") != -1) && (navigator.userAgent.toLowerCase().indexOf("opera") == -1));
					if (!is_ie){
						doc = (new DOMParser()).parseFromString(xmlReqObj.responseText, "text/xml");
					}else{
						doc = xmlReqObj.responseXML;
					}					
					
					resultContent = getContent(doc, elementID);
					if(elementID){
						isSuccess = checkSuccess(doc);
					}
				}catch(e){
					isSuccess = false;
					if(isRetryParseResult){	
						
						//xmlResponse받을때 오류가 있다면 iframeRequest를 보낸다.
						ajaxReqObj.createIframe();
						ajaxReqObj.iframeUrl = url;
						if(isdebug) alert("iframe request");
						return;
					}
				
				}
				if(isSuccess == null) isSuccess = true;
				
				callbackFunc(resultContent, targetArea, isSuccess, url, finalProcessFunc, paramValues, isMessageAlert);
			}else{
				isSuccess = false;
				callbackFunc("", targetArea, isSuccess, url, finalProcessFunc, paramValues, isMessageAlert);
			}
		}

	};
	xmlReqObj.open(formStr ? 'POST' : 'GET', url, true);
	if (formStr ) {
	   	xmlReqObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	   	xmlReqObj.setRequestHeader("Connection", "close");
		xmlReqObj.send(formStr);
	}else{
		xmlReqObj.send(null);	
	}


	return true;
}

AjaxObject.prototype.setIframeResponse=function(url, formRef){
															
	var iframeReqObj=this.ajaxReq.iframeRequest;
	var url=url + (url.indexOf('?') == -1 ? '?' : '&') + "___ajaxreq=iframe&___ajaxcachebust="+new Date().getTime();
	if (!document.readyState) return false;
	if (document.getElementById) var o = document.getElementById(this.ajaxReq.iframeID).offsetWidth;

	// Either route the form submission to the IFRAME (easy!)...
	if (formRef) formRef.setAttribute('target', this.ajaxReq.iframeID);
	// ...or load the provided URI in the IFRAME, checking for browser bugs:
	// 1) Safari only works well using 'document.location'.
	// 2) Opera needs the 'src' explicitly set!
	// 3) Konqueror 3.1 seems to think ifrDoc's location = window.location, so watch that too.
	var ifrDoc = iframeReqObj.contentDocument || iframeReqObj.document;

	if (!window.opera && ifrDoc.location &&	 ifrDoc.location.href != location.href) ifrDoc.location.replace(url);
	else iframeReqObj.src = url;
	// Either way, set the loading flag and start the readyState checking loop.
	// Opera likes a longer initial timeout with multiple frames running...
	this.loadingURI = url;

	//setTimeout(this.name+".checkIframeRequest()", (window.opera ? 250 : 100));
}

AjaxObject.prototype.checkIframeRequest=function(){
	var iframeReqObj=this.ajaxReq.iframeRequest;
	// Called after a timeout, periodically calls itself until the load is complete.
	// Get a reference to the loaded document, using either W3 contentDocument or IE's DOM.

	doc = iframeReqObj.contentDocument || iframeReqObj.document;
	// Check the IFRAME's .readyState property and callback() if load complete.
	// IE4 only seems to advance to 'interactive' so let it proceed from there.
	var il = iframeReqObj.location, dr = doc.readyState;
	var ilhref = "";
	var loadurl = "";
	if(il && il.href){
		ilhref = il.href.indexOf("http://") < 0 ? il.href : il.href.substr(7);
		ilhref = ilhref.substr(ilhref.indexOf("/"));
		loadurl= this.loadingURI.indexOf("http://") < 0 ? this.loadingURI : this.loadingURI.substr(7);
		loadurl= loadurl.substr(loadurl.indexOf("/"));
	}
	 if (ilhref == loadurl &&
	(dr == 'complete' || (!document.getElementById && dr == 'interactive')))
	{
		this.responseData = getContent((doc.documentElement || doc), this.elementID);
		this.callbackFunc(this.responseData, this.targetArea, true, loadurl, this.finalProcessFunc, this.paramValues, this.isMessageAlert);
		this.loadingURI = '';
		if (this.msgArea){
				document.getElementById(this.msgArea).style.display = "none";
		}
	}
	else setTimeout(this.name + '.checkIframeRequest()', 50);
}

// AjaxObject End/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

parseForm = function(form) { with (this)
{
 // Parses a form DOM reference to an escaped string suitable for GET/POSTing.

 var str = '', gE = 'getElementsByTagName', inputs = [
  (form[gE] ? form[gE]('input') : form.all ? form.all.tags('input') : []),
  (form[gE] ? form[gE]('select') : form.all ? form.all.tags('select') : []),
  (form[gE] ? form[gE]('textarea') : form.all ? form.all.tags('textarea') : [])
 ];

 // Loop through each list of tags, constructing our string.
 for (var i = 0; i < inputs.length; i++)
  for (j = 0; j < inputs[i].length; j++)
   if (inputs[i][j])
   {
	if(inputs[i][j].type == "checkbox" && !inputs[i][j].checked) continue;
	else if(inputs[i][j].type == "button") continue;	
	else if(inputs[i][j].type == "image") continue;	
	else if(inputs[i][j].type == "reset") continue;	
	else if(inputs[i][j].type == "submit") continue;	
    
	var plus = '++'.substring(0,1); // CodeTrim fix.
    str += encodeURIComponent(inputs[i][j].getAttribute('name')).replace(plus, '%2B') +
     '=' + encodeURIComponent(inputs[i][j].value).replace(plus, '%2B') + '&';
   }

 // Strip trailing ampersand, because we can :)
 return str.substring(0, str.length - 1);
}};


getContent=function(domDoc, elementID){
	// This copies the <body> content of the loaded DOM document into an element in the
	// current page with a specified ID.

	// Retrieve references to the loaded BODY. You might want to modify this so that you
	// load content from <div id="content"> within the loaded document perhaps?
	var src = domDoc.body?  domDoc.body : (domDoc.getElementsByTagName('body')[0] ? domDoc.getElementsByTagName('body')[0] : domDoc);
	// innerHTML is still a little more reliable than importNode across browsers.
	if (src.innerHTML){
		return src.innerHTML;
	}else {
		if(elementID){
			return domDoc.documentElement.getElementsByTagName(elementID)[0].firstChild.nodeValue;
		}else{
			return domDoc;
		}
	}
}

checkSuccess=function(domDoc){
	return domDoc.documentElement.getAttribute("success");
}

document.writeln=function(str) {document.write(str+"\n");};
var oldWriteMethod = document.write;

function evalInDiv(js, target) {
	target.innerHTML = "";
	document.write = function(str){
		target.innerHTML += str;
	};
	eval(js);
	document.write = oldWriteMethod;
}


function srcInDiv(jsObj, src, target) {
	try {
		target.innerHTML = "";
		document.write = function(str){
			target.innerHTML += str;
		};
		jsObj.setAttribute("src", src);
	} catch(e) { }
}

var embedScriptArr = null;
var embedScriptIdx = 0;
scriptParse=function(obj){
     try {
        tmpEmbedScriptArr = obj.getElementsByTagName("SCRIPT");
        if( tmpEmbedScriptArr != null ) {
                embedScriptArr = new Array();
                for( i=0; i<tmpEmbedScriptArr.length; i++ ) {
                        embedScriptArr[i] = tmpEmbedScriptArr[i];
                }
        }
        if (embedScriptArr != null) {
            embedScriptIdx = 0;
            executeScript();
        }
    }catch(e){}
};


try {
	var	jsWriteDiv = document.createElement("DIV");
	jsWriteDiv.style.cssText = "display:none;";
}catch(e){ }
var _agent = navigator.userAgent.toLowerCase();
executeScript=function(){
    try {
            if(embedScriptIdx >= embedScriptArr.length)
                return;

            if(embedScriptArr[embedScriptIdx].src != ""){
            	var	embedJsObject = embedScriptArr[embedScriptIdx];
                var source = embedJsObject.src;
                if(navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
                	try {
	                	srcInDiv(document.getElementById("dynamicContent"), source, jsWriteDiv);
			            dynamicContent.onreadystatechange = function(){
			            	document.write = oldWriteMethod;
			            	for( var i=0; i<jsWriteDiv.childNodes.length; i++ ) {
			            		embedJsObject.parentNode.insertBefore(jsWriteDiv.childNodes[i], embedJsObject);
			            	}
	                        embedScriptIdx++;
	                        executeScript();
	                    }
                	} catch(e) { }
                } else {
                    var sss  = document.createElement("script"),
                    	jsParentNode = embedJsObject.parentNode;
                    sss.src = source;
                    sss.onload = function(){
	                    jsParentNode.removeChild(embedJsObject);
                        embedScriptIdx++;
                        executeScript();
                    };
                    jsParentNode.appendChild(sss);
                    if(_agent.indexOf("safari")>-1 && _agent.indexOf("419") >-1){ // when safari ver 2.0
                    	embedScriptIdx++;
                        executeScript();
                    } 
                }
            }else{
            	if( embedScriptArr[embedScriptIdx].innerHTML.indexOf("write") > -1 ) {
            		try {
	            		var	embedJsObject = embedScriptArr[embedScriptIdx];
	                	evalInDiv(embedScriptArr[embedScriptIdx].innerHTML, jsWriteDiv);
	                	for( var i=0; i<jsWriteDiv.childNodes.length; i++ ) {
			            	embedJsObject.parentNode.insertBefore(jsWriteDiv.childNodes[i], embedJsObject);
			            }
            		}catch(e) { }
            	}
            	else {
            		try {
	                	eval(embedScriptArr[embedScriptIdx].innerHTML);
            		}catch(e) { }
            	}
                embedScriptIdx++;
                executeScript();
            }
    }catch(e){
    }
};


viewContent=function(doc, destId){
	var dest = document.getElementById ? document.getElementById(destId) :  (document.all ? document.all[destId] : null);
	var src = this.getContent(doc, "contents");
	dest.innerHTML = src;

}

callbackLoad=function(responseData, targetArea, isSuccess, url, finalProcess, paramValues){
	try{
		if(isSuccess == true || isSuccess == "true"){
			var dest = document.getElementById ? document.getElementById(targetArea) :  (document.all ? document.all[targetArea] : null);
			if (dest != null) {
				if(dest.style.display == "none")	{
					dest.style.display = "block";
				}
				if (navigator.userAgent.indexOf("Safari") > 0 && navigator.userAgent.indexOf("Chrome") <= 0 && navigator.userAgent.indexOf("Netscape") <= 0 ) {
					window.scrollTo(0, 0);	// for Safari Display Bug.
				}
				dest.innerHTML = responseData;
				//debugTool.write(responseData);
				scriptParse(dest);
				try {
					var index = url.indexOf("blog.daum.net/");
					var koclick_url = "/_action"+url;
					var curURIDOM = document.getElementById("blog_curURI");
					var curURI = url;
					if( index > -1 ) {
						var uri = url.substring(index+14);
						curURI = "/" + uri;
						koclick_url = "/_action/"+uri;
						
					}
					window.frames["blog_koclick"].location.replace(koclick_url);
					if(curURIDOM){
		    			curURIDOM.value = curURI; 
					}
					
				}catch(e) {}
			}
		}else{
			url = url.replace(".ajax", ".do");
			document.location.href = url;
		}
			
		if(finalProcess) finalProcess(isSuccess, url, paramValues);	
	}catch(e){
		url = url.replace(".ajax", ".do");
		document.location.href = url;
	}
}


callbackMessage=function(responseData, targetArea, isSuccess, url, finalProcess, paramValues, isMessageAlert){
	if(isSuccess == false || isSuccess == "false"){
		if(isMessageAlert){
			alert("현재 사용자가 많아 정상적으로 데이터를 읽지 못했습니다. 잠시 후 다시 시도해주시기 바랍니다.");
		}
	}else{
		var dest = document.getElementById ? document.getElementById(targetArea) :  (document.all ? document.all[targetArea] : null);
		dest.innerHTML = responseData;
		scriptParse(dest);
	}
		
	if(finalProcess) finalProcess(isSuccess, url, paramValues);	
		
}


callbackSubmit=function(responseData, targetArea, isSuccess, url, finalProcess, paramValues, isMessageAlert){
	if(isSuccess == false || isSuccess == "false"){
		if(isMessageAlert){
			alert("현재 사용자가 많아 정상적으로 데이터를 읽지 못했습니다. 잠시 후 다시 시도해주시기 바랍니다.");
		}
	}else{
		var dest = document.getElementById ? document.getElementById(targetArea) :  (document.all ? document.all[targetArea] : null);
		dest.innerHTML = responseData;
		scriptParse(dest);
	}
		
	if(finalProcess) finalProcess(isSuccess, url, paramValues);	
		
}

locationAjax=function(objAjax, url, callback) {
	if(objAjax) {
		var isSuccess = false;	
		var orgUrl = url;
		try {
			if(!document.getElementById(objAjax.targetArea)) {
				if(isdebug) alert("no target exist!");
				location.href=url;
				return;
			}

			//@ blog_v2.2.js
			if(isFirstAjaxCall) {
				historyInitailize();
				//dhtmlHistory.add("ajax_history_home", location);
				historyStorage.put("ajax_history_home", location);
				isFirstAjaxCall = false;
			}
			
			url = url.replace(".do", ".ajax");
			window.isAjax=true;
			historyInsert(url);
			isSuccess = objAjax.load(url, false);
			if(isSuccess){
				currentPageURL = orgUrl;
			}else{
				if(isdebug)alert("ajax fail!");
				location.href=orgUrl;
			}
			
		}catch(e){
			if(isdebug)alert("ajax fail!-exception "+e);
			location.href=orgUrl;
		}

	} else {
		if(isdebug)alert("ajax object not exist!");
		location.href=url;
	}

}

showDebug=function(url, formStr){
	url = url.replace(".ajax", ".do");
	var _winDebugSrc = window.open(url, "_winDebugSrc");
	//_winDebugSrc.focus();

}


