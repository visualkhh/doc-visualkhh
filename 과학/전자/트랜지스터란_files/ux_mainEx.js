/**
 *	utilEx.js 에서 관리되는 블로그용 Util Object
 */
if (typeof BlogUtil === 'undefined') BlogUtil = {};

BlogUtil.String = {
	toQueryStr: function(d, a) {
		var b = [];
		for (var c in d) {
			if (d[c] instanceof Array) {
				for (var i=0, len=d[c].length; i<len; i++) {
					b.push([c, "=", d[c][i]].join(""));
				}
			} else {
				b.push([c, "=", d[c]].join(""));
			}
		}
		var e = b.join("&");
		if (a) {
			a += (a.indexOf("?") == -1) ? "?" : "&";
			a += e;
			return a;
		}
		return e;
	},
	queryToObject: function(q) {
		var r={}, t=[], i,
			a=q.split('&');
		for(i=0;i<a.length;i+=1){t=a[i].split("=");r[t[0]] = t[1];}
		return r;
	}
}

BlogUtil.Form = {
	autoHeight: function(target, minHeight) {
		var timer = null,
			$tdummy = daum.$('blogutil-autoheight-dummy') || daum.$E(daum.createElement('<textarea id="blogutil-autoheight-dummy" style="height:0;margin:0;padding:0;border:0 none;position:absolute;left:-9999em;top:-9999em;"></textarea>'));
			startHeightCheck = function() {
				if ($tdummy.value != target.value) {
					$tdummy.value = target.value;
					if (target.scrollHeight > target.offsetHeight) {
						target.style.height = daum.String.px(target.scrollHeight);
					} else if ($tdummy.scrollHeight < target.offsetHeight && minHeight <= $tdummy.scrollHeight) {
						target.style.height = daum.String.px($tdummy.scrollHeight);
					} else if (minHeight > $tdummy.scrollHeight) {
						target.style.height = daum.String.px(minHeight);
					}
				}
				timer = setTimeout(startHeightCheck, 20);
			},
			stopHeightCheck = function() {
				clearInterval(timer);
			};
		minHeight = minHeight || target.offsetHeight;
		daum.addEvent(target, 'focus', startHeightCheck);
		daum.addEvent(target, 'blur', stopHeightCheck);
		$tdummy.setStyle({
			width: daum.String.px(target.offsetWidth),
			fontSize: daum.Element.getStyle(target, 'font-size'),
			fontFamily: daum.Element.getStyle(target, 'font-family'),
			lineHeight: daum.Element.getStyle(target, 'line-height')
		});
		$tdummy.value = target.value;
		if (!daum.$('blogutil-autoheight-dummy')) {
			document.body.appendChild($tdummy);
		}
	}
}

BlogUtil.Element = {
	hasParentNode: function(s, t) {
		while (s !== document && s != null) {
			if (s === t) return true;
			s = s.parentNode;
		}
		return false;
	}
}

BlogUtil.Tool = {
	Durl: {
		_callback: null,
		makeShort: function(targetUrl, callback) {
			if (!callback) return;
			this._callback = callback;
			daum.load("http://durl.me/api/Create.do?type=json&callback=BlogUtil.Tool.Durl.getResult&longurl=" + encodeURIComponent(targetUrl));
		},
		getResult: function(res) {
			if (res.status != "ok") {
				this._callback(false);
			} else {
				this._callback(res.shortUrl);
			}
		}
	}
};

// copy from blog_top_util.js
// 2012.4.17...
BlogUtil.Dwr = {
	cache: {},
	loadCache: {},
	load: function(name, callback) {
		var url = '/_blog/dwr/interface/' + name + '.js';
		try {
			if (!this.loadCache[name]) {
				daum.load(url, function() {
					this.loadCache[name] = true;
					if (callback) callback();
				}.bind(this));
			}
		} catch(e) {
			if (console && console.error) console.error("DWR 인터페이스 로드에 문제가 있습니다.");
		}
	}
};

BlogUtil.Action = {
	reportKoreanClick: function(url) {
		var blogHost = "blog.daum.net";
		if (typeof url === 'undefined') {
			url = window.location.href;
		}
		url = url.replaceAll("#", (url.indexOf("?") > -1) ? "&" : "?");
		url = url.replace(blogHost, blogHost + "/_action");
		window.setTimeout(function() { try { blog_koclick.location.replace(url); } catch(e) {} }, 1);
	}
}

var clickAreaCheck = false;

function close_divs(){
	if(document.getElementById("qMenu_service")) {
		divDisplay ("qMenu_service", "none");
		divDisplay ("qMenu_list", "none");
		if(document.getElementById('dir_to_home').className == 'over'){
			document.getElementById('dir_to_home').className = 'out';
		}
		if(document.getElementById('blog_friend_list').className == 'over'){
			document.getElementById('blog_friend_list').className = 'out';
		}
	}
}

// 이미지 롤오버
function rollOverImg(obj, src) {
	obj.src = src;
}

// 절대 높이 계산
function getAbsoluteTop(oNode){
	var oCurrentNode=oNode;
	var iTop=0;
	if(document.all){
		while(oCurrentNode != null && (oCurrentNode.tagName.toUpperCase()!="BODY" || oCurrentNode.tagName.toUpperCase()!="HTML") ){
			iTop+=oCurrentNode.offsetTop;
			oCurrentNode=oCurrentNode.offsetParent;
		}
	}
	else{
		while(oCurrentNode != null && (oCurrentNode.tagName.toUpperCase()!="BODY" || oCurrentNode.tagName.toUpperCase()!="HTML")){
			iTop+=oCurrentNode.offsetTop;
			oCurrentNode=oCurrentNode.offsetParent;
		}
	}
	//alert("top:"+iTop);
	return iTop;
}
// 절대 좌측 계산
function getAbsoluteLeft(oNode){
	var oCurrentNode=oNode;
	var iLeft=0;
	if(document.all){
		while(oCurrentNode != null && (oCurrentNode.tagName.toUpperCase()!="BODY" || oCurrentNode.tagName.toUpperCase()!="HTML")){
			iLeft+=oCurrentNode.offsetLeft;
			oCurrentNode=oCurrentNode.offsetParent;
		}
	}
	else{
		while(oCurrentNode != null && (oCurrentNode.tagName.toUpperCase()!="BODY" || oCurrentNode.tagName.toUpperCase()!="HTML")){
			iLeft+=oCurrentNode.offsetLeft;
			oCurrentNode=oCurrentNode.offsetParent;
		}
	}
	//alert("left:"+iLeft);
	return iLeft;
}

var old_div = '';
var old_imgId = '';
function divDisplay(objId, act, check, imgId, objH) {
	clickAreaCheck = true;
	if(old_div != '' && document.getElementById(old_div) && (document.getElementById(old_div).style.display == 'block' || document.getElementById(old_div).style.display == 'inline')){
		document.getElementById(old_div).style.display = 'none';

		if(old_imgId != '' && document.getElementById(old_imgId) && document.getElementById(old_imgId).className != 'miniArrDown'){
			document.getElementById(old_imgId).className = 'miniArrDown';
		}
		
	}
	if (objId != '' && document.getElementById(objId)) {
		var toggleDiv = document.getElementById(objId);
		if(act != "none" && old_div != objId && !objH){
			var scrollH = document.documentElement ? document.documentElement.scrollHeight : document.body.scrollHeight;
		}
		toggleDiv.style.display = act;
		if(scrollH){
			var position = "";
			if(toggleDiv.currentStyle){
				position = toggleDiv.currentStyle["position"];
			} else {
				position = document.defaultView.getComputedStyle(toggleDiv, null).getPropertyValue("position");
			}
			if(position=="absolute"){
				var offH = toggleDiv.offsetHeight;
				var offT = 0;
				var parent = toggleDiv;
				while(parent && parent.tagName && parent.tagName!="body"){
					offT += parent.offsetTop;
					parent = parent.offsetParent;
				}
				var gapH = scrollH-(offH+offT);
				if(gapH<0){
					toggleDiv.style.marginTop = -offH + "px";
				}				
			}
		}
	}
	if(check == true){
		old_div = objId;
		old_imgId = imgId || "";
	}
}

function popUp(url, width, height) {
	var winObj = window.open(url, "blogPopUp", "scrollbars=no,resiable=yes,width="+width+",height="+height);
	winObj.focus();
}

function getDocHeight(doc) {
	var docHt = 0, sh, oh;

	if (doc.height) docHt = doc.height;
	if (doc.body) {
		if (doc.body.scrollHeight) docHt = sh = doc.body.scrollHeight;
		if (doc.body.offsetHeight) docHt = oh = doc.body.offsetHeight;
		if (sh && oh) docHt = Math.max(sh, oh);
	}
	return docHt;
}

function setIframeHeight(iframeName, setTop, setHide) {

  var iframeWin = window.frames[iframeName];
  var iframeEl = document.getElementById? document.getElementById(iframeName): document.all? document.all[iframeName]: null;
  if ( iframeEl && iframeWin ) {
	if ( setTop )
		iframeEl.style.height = "auto"; // helps resize (for some) if new doc shorter than previous
	if (setHide)
		iframeEl.style.display = "none";
	var docHt = getDocHeight(iframeWin.document);
	// need to add to height to be sure it will all show
	if (docHt) iframeEl.style.height = docHt + 0 + "px";
  }
}

function chg_class_pos(target, div_id){
	var divid = document.getElementById(div_id);
	
	if(divid && divid.style.display != 'block'){
		if(div_id){
			if(!divid.style.top){
				divid.style.top = (target.offsetTop - divid.parentNode.offsetTop + target.offsetHeight + 5) + "px";
				divid.style.left = (target.offsetLeft -target.parentNode.offsetLeft+15) + "px";
			}
			divDisplay(div_id, 'block', true);
		}
	}
	else{
		if(div_id){
			divDisplay (div_id, 'none');
		}
	}
}

function chg_class(target, val, div_id, imgId){
	var divid = document.getElementById(div_id);
	if(divid && divid.style.display != 'block'){
		if(imgId){
			document.getElementById(imgId).className = 'miniArrUp';
		}
		if(div_id){
			divDisplay (div_id, 'block', true, imgId);
		}
	}
	else{
		if(imgId){
			document.getElementById(imgId).className = 'miniArrDown';
		}
		if(div_id){
			divDisplay (div_id, 'none');
		}
	}
	if(val && target){
		target.className = val;
	}
}


function profileImgResize (img) {
	if (img.width > 150) {
		img.width=150;
//		img.reload();
	}
}

function returnBytes(obj, charCnt, textlimitName, isKor){
	if(checkerCheckIn) return;
	var strCount = 0;
	var tempStr, tempStr2;
	var max_charCnt = charCnt;
	strCount = obj.value.bytes();
	charCnt *= isKor?2:1;
	if (strCount > charCnt){
		checkerCheckIn = true;
		alert("최대 " + max_charCnt + (isKor?"자":"byte") + "이므로 초과된 글자수는 자동으로 삭제됩니다.");
		obj.value = obj.value.cut(charCnt, '');
		strCount = obj.value.bytes();
		checkerCheckIn = false;
	}
	if(textlimitName != ""){
		document.getElementById(textlimitName).innerHTML = isKor?Math.floor(strCount/2):strCount;
	}
}

function checkerView(obj, textlimitName, isKor){
	var text = obj.value;
	if(textlimitName) document.getElementById(textlimitName).innerHTML = isKor?Math.floor(text.bytes()/2):text.bytes();
}
var rval="";
var timer=null;
var checkerCheckIn=false;
function checker(obj, count, textlimitName, isKor, callback){
	if(checkerCheckIn) return;
	var text = obj.value;
	var max_count = count;
	count *= isKor?2:1;
	if(rval != text){
		if (obj.value.bytes() > count){
			checkerCheckIn = true;
			if(typeof callback !== 'undefined'){
				callback.call();
			}else if(typeof admin !== 'undefined' && admin.MessageBox){
				admin.MessageBox.alert({title:"최대 " + max_count + (isKor?"자":"byte") + "이므로 초과된 글자수는 자동으로 삭제됩니다."});
			}else{
				alert("최대 " + max_count + (isKor?"자":"byte") + "이므로 초과된 글자수는 자동으로 삭제됩니다.");
			}
			text = text.cut(count, '');
			obj.value = text;
			checkerCheckIn = false;
		}
		if(textlimitName){
			document.getElementById(textlimitName).innerHTML = isKor?Math.floor(text.bytes()/2):text.bytes();
		}
	}
	timer = setTimeout(function(){checker(obj,max_count,textlimitName,isKor,callback)},20);
	rval = text;
}
function stopchecker(){
	clearTimeout(timer);
	rval = "";
}
function findPosX(obj){
		var curleft = 0;
		if(obj != null && obj.offsetParent){
				while(obj.offsetParent){
						curleft +=obj.offsetLeft;
						obj = obj.offsetParent;
				}
		}else if(obj !=null && obj.x){
				curleft += obj.x;
		}
		return curleft;
}
function findPosY(obj){
		var curtop = 0;

		if(obj != null && obj.offsetParent){
				while(obj.offsetParent){
						curtop +=obj.offsetTop;
						obj = obj.offsetParent;
				}
		}else if(obj != null && obj.y){
				curtop += obj.y;
		}
		return curtop;
}
function replaceHTML(val){
	var x = val.replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
	x = x.replace(/<BR>\n/g,"\n");
	x = x.replace(/<br>\n/g,"\n");
	x = x.replace(/<BR>/g,"\n");
	x = x.replace(/<br>/g,"\n");
	return x;
}
function checkItemNum(frm){
	var j = 0;
	for( i=0; i< frm.length; i++){
		e=frm.elements[i];
		if (e.type=='checkbox' && e.name != 'allBox' && e.checked) j++
	}
	return j;
}
var allChecked = false;
function checkItemAll(frm, chkName){
	if( chkName == null ) {
		chkName = 'itemBox';
	}
	if (allChecked == false){
		for( i=0; i< frm.length; i++){
			e=frm.elements[i];
			if(e.name == chkName) e.checked = true;
			if(e.name == chkName+"1") e.checked = true;
		}
		allChecked = true;
	}else{
		for( i=0; i< frm.length; i++){
			e=frm.elements[i];
			if(e.name == chkName) e.checked = false;
			if(e.name == chkName+"1") e.checked = false;			
		}
		allChecked = false;
	}
}
function addDaumBookmark(url, title, tag) {
	//var openWindow=window.open('http://bookmark.daum.net/bookmark/edit.do?decorator=popup&url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+'&tag='+encodeURIComponent(tag),'pop_bookmark','width=486,height=340');
	var openWindow=window.open('/_blog/bookmark/bookmarkRegisterForm.do?link='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+ '&tag='+encodeURIComponent(tag), 'bookmark', 'scrollbars=yes,status=no,toolbar=no,resizable=1,location=no,menu=no,width=530,height=350');
	openWindow.focus();
}

function clickDssArticle2(no,folderid,sourceetc) {
	document.scrapform.data_id.value = no;
	document.scrapform.folder_id.value = folderid;
	var title = document.getElementById("title_"+no).innerHTML;
    document.scrapform.title.value = title;
    document.scrapform.source_etc.value = sourceetc;
}

		
// Image Upload For One File 

var nUploadType = 1; // 1이면 프로파일, 2이면 마이콘, 3이면 배경이미지, 4면 사이드바 배경
	
function getFhandle(url) {
	var		startIdx = url.indexOf('http://');
	if( startIdx != 0 ) {
		return '';
	}
	startIdx = 7;
	var 	endIdx = url.indexOf('/', startIdx);
	if( endIdx < 0 ) {
		return '';
	}
	var 	domain = url.substring(startIdx, endIdx);
	if( domain.indexOf('c') == 0 ) {
		domain = domain.substring(1);
	}
	
	startIdx = url.indexOf('/', endIdx+1);
	if( startIdx < 0 ) {
		return '';
	}
	var		path = url.substring( startIdx );
	return domain+path;
}
		
function browse_flash(type) {
	nUploadType = type;
	try {
		getMovieName("flash_direct_uploader").browse_flash();
	} catch (e) {
		alert('아직 플래쉬를 로딩중입니다. 잠시후 사용해 주십시요');
	}
}
    
function getMovieName(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
            return window.document[movieName];
    } else {
            return document[movieName];
    }
}

	function submit_flash(params) {
		try {
			if( params == 1 ) {
				getMovieName("flash_direct_uploader").activation_flash();
			} else if( params == 2 ) {
				getMovieName("flash_direct_uploader2").activation_flash();
			} else if( params == 3 ) {
				getMovieName("flash_direct_uploader").activation_flash();
			} else if( params == 4 ) {
				getMovieName("flash_direct_uploader2").activation_flash();
			} else if( params == 5 ) {
				getMovieName("flash_direct_uploader3").activation_flash();
			} else if( params == 6 ) {
				getMovieName("flash_direct_uploader4").activation_flash();
			}
		} catch (e) {
		}
	}
	
function sendData(info, params) {
	if( params == 1 ) {
		var	oProfileImage = document.getElementById("profileimage");
		var	oProfileImageName = document.getElementById("profileimagename");
		var	oProfileImageHandler = document.getElementById("profileimagehandler");
		oProfileImage.value = info[1]+"&filename="+info[6];
		oProfileImageName.value = info[6];
		oProfileImageHandler.value = getFhandle(info[1]);
		var	oPimgdel = document.getElementById("pimgdel");
		oPimgdel.value = "N";
		setImg(0, oProfileImage);
		var oDelBtn = document.getElementById("delBtn");
		oDelBtn.style.display = "block";
	} else if( params == 2 ) {
		var	oMyconImage = document.getElementById("Myconimage");
		var	oMyconImageName = document.getElementById("Myconimagename");
		var	oMyconImageHandler = document.getElementById("Myconimagehandler");
		previewImageReady(info[1]+"&width=21&height=21&type=FORCE&filename="+info[6]);
		oMyconImage.value = info[1]+"&filename="+info[6];
		oMyconImageName.value = info[6];
		oMyconImageHandler.value = getFhandle(info[1]);
		UpMycon(0, oMyconImage, info[6]);
	} else if( params == 3 ) {
		if( ImageUloader != null ) {
			ImageUloader.setUploadedImage('bgImg', info[0]+'&filename='+info[6], info[6]);
		}
	} else if( params == 4 ) {
		if( ImageUloader != null ) {
			ImageUloader.setUploadedImage('menuTitleImg', info[0]+'&filename='+info[6], info[6]);
		}
	} else if( params == 5 ) {
		if( ImageUloader != null ) {
			ImageUloader.setUploadedImage('blogTitleImg', info[0]+'&filename='+info[6], info[6]);
		}
	} else if( params == 6 ) {
		var	bookmarkUploadFile = document.getElementById("bookmarkUploadFile");
		var	bookmarkUploadFileName = document.getElementById("bookmarkUploadFileName");
		var	bookmarkUploadFileHandler = document.getElementById("bookmarkUploadFileHandler");
		bookmarkUploadFile.value = info[1]+"&filename="+info[6];
		//UpMycon(0, bookmarkUploadFile, 'mycon_ic');
	}else {
		alert('잘못된 요청이 들어왔습니다.');
	}
}

function	previewImageReady(url) {
	var oPreviewFrame = document.getElementById("previewFrame");
	if( oPreviewFrame != null ) {
		oPreviewFrame.src = url;
	}
}

function errorMessage(str) {
	alert(str);
}

var moreFriendAjax = null;
var moreAlimiAjax = null;

function toggleMiniDaumLayer(blogid, target, type, isToggle){
	var nilTag = (type) ? "&t__nil_blognavi="+type : "";
	var layerId = "qMenu_"+type;
	var layer = document.getElementById(layerId);
	var imgId = type+"Arr";
	
	if(!isToggle || (isToggle && (layer.style.display != "block"))){
		if(type == "friend"){
			moreFriendAjax = new AjaxObject("moreFriendAjax", layerId, "contents");
			moreFriendAjax.load("/_blog/friendListAjax.ajax?blogid=" + blogid + nilTag, true);
		}else if(type == "notice"){
			moreAlimiAjax = new AjaxObject("moreAlimiAjax", layerId, "contents");
			moreAlimiAjax.load("/_blog/_top/hdn/myBlogNewsListForMiniDaum.ajax?blogid=" + blogid + nilTag, true);
			daum.$("newNoticeIcon").style.display = "none";
			var reportClickImage = new Image(1, 1);
			reportClickImage.src = "http://blog.daum.net/UX-JS_2008/1x1.png?ntyp=u";
		}
	}
	
	if(isToggle){
		chg_class(target, "", layerId, imgId);
	}
	
	clickAreaCheck = true; // 수정0918
}

function callbackFriendList(responseData, targetArea, isSuccess, url, finalProcess){
    	if(isSuccess == true){
           var dest = document.getElementById(targetArea);
           dest.innerHTML = responseData;
       }
}

function addFriend( url ){
			window.open(url, 'addfriend', 'width=400, height=200');
}
// for photolist
function hidden_img_detail(){
	divDisplay ('image_view', 'none');
}

/* Key Event Manager 
 * Because Asysnc and Muti Event Attach - By Hopeserver
 */
var KeyManager = {
	mKeyAction: {
		"keydown": new Array(),
		"click": new Array()
	},
	addAction: function(sName, fAction) {
		if(this.mKeyAction[sName]) {
			this.mKeyAction[sName].push(fAction);
		}
	},
	attachEvent: function() {
		document.onkeydown = function(eEvent) {
			if(window.event) {
				eEvent = window.event;
			}
			KeyManager.execEvent("keydown", eEvent);
		}
		
		document.onclick = function(eEvent) {
			if(window.event) {
				eEvent = window.event;
			}
			KeyManager.execEvent("click", eEvent);
		    if (!clickAreaCheck) {
				divDisplay(old_div, 'none');
		    }
			else {
		        clickAreaCheck = false;
			}
		}
	},
	execEvent: function(sName, eEvent) {
		for(var i=0; i<this.mKeyAction[sName].length; i++) {
			this.mKeyAction[sName][i](eEvent);
		}
	}
}
function getLength(str) {
		var i = 0;
		for ( var i=0; i < str.length; i++ ) {
			if( str.charCodeAt(i) < 127 )
				i++;
			else
				i = i + 2;
		}
		return i;	
}

/* 컨텐츠 이미지 리사이징  */
var imgResizeTimer;
function resizeCcontentImg(){
	var cont = document.getElementById('cContent').getElementsByTagName("img");
	for(var i=0; i <cont.length; i++){
		if(cont[i].offsetWidth > sContentWidth){
			cont[i].style.width = sContentWidth + 'px';
		}
	}
	clearTimeout(imgResizeTimer);
}

/*본 댓글이 텍스티콘인지 확인 0MIN*/
var TexticonCheck = {
	isTexticon: function(comment) {				// 텍스티콘인가 확인합니다.
	
		if (comment.indexOf("script") > 0 || comment.indexOf(".js") > 0 || comment.indexOf("iframe") > 0) {
			return false;
		}
	 
		if (comment.indexOf("/texticon") > 0 || comment.indexOf("/ttc") > 0) {
			return true;
		} 
	
		return false;
	},
	checkedComments: function (textHTML){		// 텍스티콘을 평범한 text로 변환 (수정일때만 사용) 
	 	var textHTML = textHTML.replaceAll("&lt;", "<").replaceAll("&gt;", ">");	 	
		sReg = /<IMG.+?value\s*=\s*([\"']?)(.*?)([\"']).*?>/i;
	
		var count; 
		while (count = textHTML.match(/(<IMG)/gi)) {
			matchArr = textHTML.match(sReg);				
			textHTML = textHTML.replace(matchArr[0], matchArr[2]);
		}	
		textHTML = textHTML.replace(/<BR>\n/g,"\n");
		textHTML = textHTML.replace(/<br>\n/g,"\n");
		textHTML = textHTML.replace(/<BR>/g,"\n");
		textHTML = textHTML.replace(/<br>/g,"\n");
		textHTML = textHTML.replace(/&nbsp;/g," "); 								
					
		return 	textHTML;
	}, 
	texticonContent: function(divid, comment) {	// 텍스티콘아닌것에 대한 html tag로 전환 (댓글 볼때 사용) 
		var scComment;
		
		if (TexticonCheck.isTexticon(comment)) {
			scComment = comment;		
		} else {
			scComment =  comment.replaceAll("<", "&lt;").replaceAll(">", "&gt;");		 	
		} 
		document.getElementById(divid).innerHTML = scComment;		
	}, 
	textCutString: function(divid, comment, maxleng) {	// 텍스티콘을 평범한 text로 바꾸고 cutString (수정일때 사용) 
		var scComment;		
		if (TexticonCheck.isTexticon(comment)) {
			scComment = TexticonCheck.checkedComments(comment);
		} else {
			scComment =  comment.replaceAll("<", "&lt;").replaceAll(">", "&gt;");;
		}	
		
		if (maxleng > 0 && scComment.length > maxleng) {
			scComment = scComment.substring(0, maxleng);			
		}		
		document.getElementById(divid).innerHTML = scComment;		
	}  
}

String.prototype.replaceAll = function( searchStr, replaceStr ){
	return this.replace(new RegExp(searchStr, "g"), replaceStr);
}


function fixPNG(curObj) {
	var pNode = curObj.parentNode;

	if(navigator.userAgent.toLowerCase().indexOf("msie 6") != -1){
		pNode.style.backgroundImage = "none";
		pNode.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ curObj.src +"',sizingMethod='scale');"
	}
	else{
		pNode.style.backgroundImage = 'url(' + curObj.src + ')';
		pNode.style.backgroundColor = "transparent";
	}
	pNode.style.width = curObj.offsetWidth + 'px';
	pNode.style.height = curObj.offsetHeight + 'px';
	pNode.style.margin = '0 auto';
	curObj.style.display = 'none';
}

// UploadFarm direct uploader
function getSWF(movieName){
  return (navigator.appName.indexOf("Microsoft") != -1)?window[movieName]:document[movieName];
}

Coca = {
	//function은 수정 금지
	params: {
		quality: 'high', menu: 'false', swliveconnect: 'true', allowScriptAccess: 'always', wmode: 'transparent', scale: 'noscale', salign: 'LT'
	},
	//function : upload 시작
	upload: function(ctx){
  		getSWF("coca").browse();
	},
	//function : activate 시작(현재는 모든 업로드 서버 -php, 업로드팜- 들이 바로 activation 하기 때문에 호출할 필요가 없다. 
	activate: function(ctx){
		getSWF("coca").activate();
	},
	//function : remove 파일 삭제 key 는 attach type url을 집어 넣는다.
	remove: function(key, ctx){
		return getSWF("coca").remove(key);//return remain count
	},

	//callback은 서비스에서 알아서 오버라이드
	//ctx 는 한 페이지 안에 여러 플래시 업로더 인스턴스가 있을 때 구분하기 위한 용도, ctx를 따로 주지 않는 경우 빈 문자열을 반환한다. 

	//callback : 에러 발생 시 호출
	on_error: function(msg, ctx){
		//alert(ctx+"_error:"+msg);
	},
	//callback : 파일 브라우저 창에서 취소 할 때 호출
	on_browse_cancel: function(hasError, ctx){
		//alert(ctx+"_browse_cancel");
	},
	//callback : 파일 브라우저에서 파일 선택 후 확인 시 호출
	on_upload_start: function(ctx){
		if (ctx == "1") {
			if(window.adminShadow){//블로그 관리 로딩 레이어
				adminShadow.show();				
			}
		}
	},
	//callback : 파일 업로드가 시작 될 때 호출 - 파일을 3개 선택했으면 3번 호출
	on_upload_open: function(name, size, type, ctx){
	},
	//callback : 전체 선택 파일의 업로드 량 변화 시 호출 - 퍼센트
	on_upload_progress: function(percent, ctx){
	},
	//callback : 파일 업로드가 끝났을 때 호출 - result 는 이전 카페 php 모듈의 리턴값과 동일, 파일 3개를 올렸으면 3번 호
	on_upload_complete: function(result, ctx){
		var info = result.split('|');
		if( ctx == "1" ) {
			if(window.adminShadow){//블로그 관리 로딩 레이어
				adminShadow.hide();				
			}
			var	size = parseInt(info[6]);
			if( size > 1024*1024 ) {
				if(admin && admin.MessageBox){//블로그 관리 얼럿 박스
					admin.MessageBox.alert({title: "선택된 이미지가 허용된 용량을 초과하였습니다." });
				}else{
					alert('선택된 이미지가 허용된 용량을 초과하였습니다.');					
				}
			}else{
				var	oProfileImage = document.getElementById("profileimage");
				var	oProfileImageName = document.getElementById("profileimagename");
				var	oProfileImageHandler = document.getElementById("profileimagehandler");
				oProfileImage.value = info[2];//+"&filename="+info[0];
				oProfileImageName.value = info[0];
				oProfileImageHandler.value = getFhandle(info[2]);
				var	oPimgdel = document.getElementById("pimgdel");
				oPimgdel.value = "N";
				setImg(0, oProfileImage, null, null, info[0]);
				var oDelBtn = document.getElementById("delBtn");
				oDelBtn.style.display = "block";				
			}
		} else if( ctx == "2" ) {
			var	oMyconImage = document.getElementById("Myconimage");
			var	oMyconImageName = document.getElementById("Myconimagename");
			var	oMyconImageHandler = document.getElementById("Myconimagehandler");
			info[2] = info[2].replace("attach", "M21x21");
			//previewImageReady(info[1]+"&width=21&height=21&type=FORCE&filename="+info[6]);
			oMyconImage.value = info[2];//+"&filename="+info[0];
			oMyconImageName.value = info[0];
			oMyconImageHandler.value = getFhandle(info[2]);
			UpMycon(0, oMyconImage, info[0]);
		} else if( ctx == "3" ) {
			if( ImageUloader != null ) {
				var	size = parseInt(info[6]);
				if( size > 1024*1024 ) {
					alert('선택된 이미지가 허용된 용량을 초과하였습니다.');
				} else {
					ImageUloader.setUploadedImage('userBg', info[2], info[0]);
				}
			}
		} else if( ctx == "4" ) {
			if( ImageUloader != null ) {
				var	size = parseInt(info[6]);
				if( size > 1024*1024 ) {
					alert('선택된 이미지가 허용된 용량을 초과하였습니다.');
				} else {
					ImageUloader.setUploadedImage('userTitleBg', info[2], info[0]);
				}
			}
		} else if( ctx == "5_1" ) {
			if( ImageUloader != null ) {
				var	size = parseInt(info[6]);
				if( size > 1024*1024 ) {
					alert('선택된 이미지가 허용된 용량을 초과하였습니다.');
				} else {
					ImageUloader.setUploadedImage('userSidebar', info[2], info[0], 'userSideTopBg');
				}
			}
		} else if( ctx == "5_2" ) {
			if( ImageUloader != null ) {
				var	size = parseInt(info[6]);
				if( size > 1024*1024 ) {
					alert('선택된 이미지가 허용된 용량을 초과하였습니다.');
				} else {
					ImageUloader.setUploadedImage('userSidebar', info[2], info[0], 'userSideMidBg');
				}
			}
		} else if( ctx == "5_3" ) {
			if( ImageUloader != null ) {
				var	size = parseInt(info[6]);
				if( size > 1024*1024 ) {
					alert('선택된 이미지가 허용된 용량을 초과하였습니다.');
				} else {
					ImageUloader.setUploadedImage('userSidebar', info[2], info[0], 'userSideBotBg');
				}
			}
		} else if( ctx == "6" ) {
			var	bookmarkUploadFile = document.getElementById("bookmarkUploadFile");
			var	bookmarkUploadFileName = document.getElementById("bookmarkUploadFileName");
			var	bookmarkUploadFileHandler = document.getElementById("bookmarkUploadFileHandler");
			bookmarkUploadFile.value = info[2]+"&filename="+info[0];
			oMyconImageName.value = info[0];
			oMyconImageHandler.value = getFhandle(info[2]);
		} else if( ctx == "7" ) {
			if(EBookMakeManager){
				var	size = parseInt(info[6]);
				var url = info[2];
				EBookMakeManager.setUploadedImage(url);
			}
		} else if( ctx == "simpleWriter" ) {
			if (typeof smpWriter !== 'undefined') {
				var	size = parseInt(info[6]);
				if( size > 1024*1024*2 ) {
					smpWriter.removeAllUploadImage();
					(daum.Browser.ff ? smpWriter.showFFalert : alert)('허용된 용량을 초과하였습니다. 이미지는 1개에 2MB까지 등록이 됩니다.');
				} else {
					smpWriter.imageUploadComplete({
						imageName: info[0],
						imageUrl: info[2],
						size: size
					});
				}
			}
		}else {
			alert('잘못된 요청이 들어왔습니다.');
		}
	},
	//callback : 모든 업로드가 끝났을 때 호출
	on_upload_finish: function(ctx){
	},
	//callback : 파일 액티베이트가  끝났을 때 호출 - 현재 파일서버들은 자동 액티베이트 방식이기 때문에 호출되지 않는다.
	on_activate_complete: function(result, ctx){
		//alert(ctx+"_upload_complete:\n"+result);
	},
	//callback : 파일 액티베이트가  모두 끝났을 때 호출 - 현재 파일서버들은 자동 액티베이트 방식이기 때문에 호출되지 않는다.
	on_activate_finish: function(ctx){
		//alert(ctx+"_activate_finish");
	},
	//callback : 설정해놓은 파일 사이즈보다  큰 파일을 선택했을 경우
	on_over_filesize: function(filenames, maxsize, ctx){
		if( ctx == "7" ) {
			if(admin && admin.MessageBox){
				admin.MessageBox.alert({title:"선택된 이미지가 허용된 용량을 초과하였습니다."});
			}else{
				//ff plugin crash
				setTimeout( function(){ alert("선택된 이미지가 허용된 용량을 초과하였습니다."); }, 1);
			}
		}
		//alert(ctx+"_oversize:"+filenames+","+maxsize);
	},
	//callback : 설정해놓은 파일 개수보다  많이  파일을 선택했을 경우
	on_over_filecount: function(overcount, maxcount, ctx){
		//alert(ctx+"_overcount:"+overcount+","+maxcount);
	},
	//callback : 설정해놓은 전체 파일 사이즈 파일를 넘게 선택했을 경우
	on_over_filequota: function(overquota, maxquota, ctx){
		//alert(ctx+"_overquota:"+overquota+","+maxquota);
	},
	//callback : 용량이나 개수 제한이 업로드 도중 넘을 경우 해당 파일은 SKIP
	on_upload_skip: function(name, size, type, ctx){
		//alert(ctx+"_upload_skip:"+name);
	}
};

function skipid(id) {
	if(document.getElementById(id)){
		document.getElementById(id).focus();
	}
}

function clone(obj, deep) {
    if(obj == null) return null;
    var objectClone = new obj.constructor();
    for(var property in obj){
        if(!deep){
            objectClone[property] = obj[property];
        }else if (typeof obj[property] == 'object'){
            objectClone[property] = arguments.callee(obj[property], deep);
        }else{
            objectClone[property] = obj[property];
        }
    }
    return objectClone;
}

// 게시글 플래시 뷰어용 minidaum.vm 으로 이동
//var articleTitleVer = '$Globals.getVersion("articleTitle_ver")';
var params = {
	allowscriptaccess: 'always',
	quality: 'high',
	wmode: 'transparent',
	base: 'http://i1.daumcdn.net/cafeimg/cf_img4/affogato/'
}

ArticleViewerManager = function(flashid, flashvars) {
	if (typeof flashid =="undefined" || typeof flashvars != "object") return;
	
	this.flashid = flashid;
	this.flashvars = flashvars;

	this.generateFlashViewer();
}

ArticleViewerManager.prototype = {
	generateFlashViewer: function() {
		var attributes = {
			id: this.flashid,
			name: this.flashid
		}
		swfobject.embedSWF('http://i1.daumcdn.net/cafeimg/cf_img4/affogato/articletitle_v1.1.swf?'+ articleTitleVer, this.flashid, this.flashvars.width, '20', '9.0.124', false, this.flashvars, params, attributes);
	},
	resizeFlashViewer: function(width, height, title) {
		var textid = this.flashid.replace('Flash', 'Text');
		
		document.getElementById(textid).style.display = "none";
		//document.getElementById(this.flashid).style.width = width+"px";
		document.getElementById(this.flashid).style.height = height+"px";
		document.getElementById(this.flashid).style.display = "block";
		if(title) document.getElementById(this.flashid).title = unescape(title);
	}
}

function rewriteStylesheet(styleTagId, cssText){
    var styleEl = document.getElementById(styleTagId);
    if(styleEl.styleSheet){// IE
        styleEl.styleSheet.cssText = cssText;
    }else{// the world
		styleEl.innerText = cssText;
    }
}

function purge(d, depth) {
	depth = depth || 1;
	if(depth > 6) return ; // follow only Nth depth...
	
    var a = d.attributes, i, l, n;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            n = a[i].name;
            if (typeof d[n] === 'function') {
                d[n] = null;
            }
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            purge(d.childNodes[i], depth + 1);
        }
    }
    //setTimeout("daum.Event.GC()", 1000);
}

var templateCache =  {};
function getTemplateString(path, contextObject){
	if(templateCache[path]){
		return templateCache[path].process(contextObject);
	}else{
		var templateContentStr = Ajax.getTemplate(path);
		templateCache[path] = TrimPath.parseTemplate(templateContentStr);
		return templateCache[path].process(contextObject);
	}	
}

Ajax = {
	getRequest: function(){
		var xmlhttp;
		try{ //to get the mozilla httprequest object
			xmlhttp = new XMLHttpRequest();
		}catch(e){
			try{ //to get MS HTTP request object
				xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				try{ //to get MS HTTP request object
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){
					throw "Unable to get an HTTP request object";
				}
			}
		}
		return xmlhttp;
	},
	sendRequest: function(url){
		var xmlhttp = this.getRequest();
		try{
			xmlhttp.open("GET", url, false);
			xmlhttp.send(null);
		}catch(e){ }
	},
	getText: function(url, callback, failCallback) {
		var xmlhttp = this.getRequest();
		try{
			xmlhttp.open("GET", url, false);
			xmlhttp.send(null);
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200 || xmlhttp.status == 304){
				callback(xmlhttp.responseText);
			}else if(xmlhttp.readyState == 4){
				if(typeof failCallback=="function") failCallback();
			}
		}catch(e){}
	},
	getJson: function(url, callback, failCallback) {
		var xmlhttp = this.getRequest();
		try{
			xmlhttp.open("GET", url, false);
			xmlhttp.send(null);
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200 || xmlhttp.status == 304){
				callback(daum.jsonToObject(xmlhttp.responseText));
			}else if(xmlhttp.readyState == 4){
				if(typeof failCallback=="function") failCallback();
			}
		}catch(e){}
	},
	getScript: function(url, isXml) {
		var xmlhttp = this.getRequest();
		try{
			xmlhttp.open("GET", url, false);
			xmlhttp.send(null);
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200 || xmlhttp.status == 304){
			if(isXml){
				var response = xmlhttp.responseXML;
			}else{
				var response = xmlhttp.responseText;
			}
				return response;
			}
		}catch(e){
			throw "Unable to load script, URL: "+url;
		}
	},
	getTemplate: function(path){
		if(typeof jstTemplates=="undefined") jstTemplates = {};
		if(!jstTemplates[path]){
			var url = "/UX-JS_2008/jst/"+path+"?dummy="+new Date().getTime();
			jstTemplates[path] = this.getScript(url);
		}
		return jstTemplates[path];
	}
}

/**
 * yyyy년 MM월 dd일 hh시 mm분 ss초 ttt밀리세컨드
 * @param {Object} format
 */
Date.prototype.format = function(format) {
    var result = "";
	var str = "";
    for (var i = 0, len = format.length; i < len; i++) {
		if(str=="") str = format.charAt(i);
		if(i+1<format.length && format.charAt(i)==format.charAt(i+1)){
			str += format.charAt(i+1);
		}else{
			result += this.change(str.charAt(0),str.length);
			str = "";
		}			
    }
    return result;
}

Date.prototype.change = function(ch, len) {
	var str = "";
	var delim = "0";
    switch (ch){
	    case "y":
	        str = this.getFullYear();
			break;
		case "M":
	        str = this.getMonth()+1;
			break;
		case "d":
			str = this.getDate();
			break;
		case "h":
			str = this.getHours();
			break;
		case "m":
			str = this.getMinutes();
			break;
		case "s":
			str = this.getSeconds();
			break;
		case "t":
			str = this.getMilliseconds();
			break;
	    default:
	        str = ch;
			delim = ch;
			break;
    }
	return str.toString().lpad(delim,len);
}

String.prototype.lpad = function(ch, len){
	var gap =  this.length-len;
	var str = this;
	if(gap==0) return this;
	if(gap>0){
		if(this.length==4){
			return this.substring(gap,this.length);	
		}else{
			return this;
		}		
	}else{
		while(gap<0){
			str = ch+str;
			gap++;
		}
		return str;
	}
}

String.prototype.escapeHtml = function(){
	var str = this;
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/'/g,"&#39;");
	str = str.replace(/"/g,'&#34;');
	return str;
}

String.prototype.unescapeHtml = function(){
	var str = this;
	str = str.replace(/&lt;/g,"<");
	str = str.replace(/&gt;/g,">");
	str = str.replace(/&#39;/g,"'");
	str = str.replace(/&#34;/g,'"');
	str = str.replace(/&quot;/g,'"');
	str = str.replace(/&amp;/g,"&");
	return str;
}

var Effect = function(effectKind, option){
    this.effectKind = effectKind;
    this.timer = null;
    this.work = true;
    this.option = {perTime: 30, speed: 2};
    this.option = daum.extend(this.option, option, true);
    var me = this;
    switch(this.effectKind){
		case "SCROLL_TOP":
			if(!window.EFFECT_SCROLL_TOP){
				window.EFFECT_SCROLL_TOP = [];
			}else if(window.EFFECT_SCROLL_TOP[me.option.target]){
				window.EFFECT_SCROLL_TOP[me.option.target].clearTimer();
			}
			window.EFFECT_SCROLL_TOP[me.option.target] = me;
			this.target = $E(this.option.target);
			this.top = this.option.top;
			this.effectTop = this.target.scrollTop;
			this.timer = setInterval(me.scrollTop.bind(me),me.option.perTime);
			break;
	}
}

Effect.prototype = {
	scrollTop: function(){
		var top = this.effectTop;
		var gap = this.top - top;
		var perGap = 0;
		if((Math.abs(gap)>1) && this.work){
			perGap = parseInt(Math.sqrt(Math.abs(gap))*this.option.speed);
			perGap = perGap*((gap>0)?1:-1);
			top = top + perGap;
			this.effectTop = top;
			this.target.scrollTop = top;
		}else{
			this.target.scrollTop = this.top;
			this.clearTimer();
		}
	},
	clearTimer: function(){
		this.work = false;
		if(this.timer){
			clearInterval(this.timer);
			this.timer = null;
		}
	}
}

var RestrictedTextArea = function(el, config) {
		this.textArea = $E(el);
		if (!this.textArea) return;
		
		this.defaultHeight = (daum.Browser.ie) ? 32 : 30;
		this.rowHeight = 15;
		this.maxRows = 5;
		this.limitBytes = 40;
		this.isUseLimitBytes = false;
		this.flashViewer = null;
		if (typeof config != "undefined") daum.extend(this, config, true);
		this.maxHeight = this.rowHeight * this.maxRows;

		this.textArea.style.overflow = "hidden";
		this.textArea.style.fontSize = "12px";
		this.textArea.style.lineHeight = this.rowHeight.px();

		this.setTextBoxHeight();
		if (this.isUseLimitBytes) this.generateBytesMarkup();

		this.registKeyEvent();
	}

RestrictedTextArea.prototype = {
	registKeyEvent: function() {
		daum.Event.addEvent(this.textArea, 'focus', this.checkTextAreaContent.bind(this));
		daum.Event.addEvent(this.textArea, 'blur', this.outTextArea.bind(this));
		daum.Event.addEvent(this.textArea, 'keydown', this.onDownTextArea.bindAsEventListener(this));
		if (daum.Browser.op) {
			daum.Event.addEvent(this.textArea, 'keypress', this.onDownTextArea.bindAsEventListener(this));
			daum.Event.addEvent(this.textArea, 'keyup', this.onDownTextArea.bindAsEventListener(this));
		}
		if (!daum.Browser.ff && this.flashViewer) daum.Event.addEvent(this.textArea, 'keyup', this.onChangeFlashViewer.bindAsEventListener(this)); 
	},
	generateBytesMarkup: function() {
		var bytesMarkup = '<p><span id="'+ this.textArea.id +'_byte">0</span>/'+ this.limitBytes +'bytes</p>';
		var bytesTextTag = $E(new daum.Template(bytesMarkup).toElement());

		this.textArea.parentNode.appendChild(bytesTextTag);
	},
	checkTextAreaContent: function() {
		if (daum.Browser.cr) { // 텍스트박스 높이값
			var textScrollHeight =  this.textArea.scrollHeight - 4;
		} else {
			var textScrollHeight =  this.textArea.scrollHeight;
		}
		this.changeTextBoxHeight(textScrollHeight);
		if (this.isUseLimitBytes) this.checkTextLength();
		
		var textObj = this;
		this.checkTimer = setTimeout(textObj.checkTextAreaContent.bind(textObj), 10);
	},
	setTextBoxHeight: function() {
		if (this.textArea.value.indexOf('\n')>-1) {
			var rows = parseInt(this.textArea.value.match(/\n/g).length)+1;
			if (daum.Browser.ie) {
				this.textArea.style.height = ((rows*this.rowHeight) + 2).px();
			} else {
				this.textArea.style.height = (rows*this.rowHeight).px();
			}
		}
	},
	changeTextBoxHeight: function(textScrollHeight) {
		// 텍스트박스 높이값 체크
		if ((!daum.Browser.ie && textScrollHeight > this.maxHeight) || (daum.Browser.ie && textScrollHeight > this.maxHeight+4)) {
			if (daum.Browser.ie) {
				this.textArea.style.height = (textScrollHeight-(this.rowHeight+1)).px();
			} else {
				this.textArea.style.height = (textScrollHeight-this.rowHeight).px();
			}

			this.textArea.blur();
			this.textArea.value = this.textArea.value.substr(0, this.textArea.value.length-1);
		}  else {
			if (this.textArea.value.indexOf('\n')==-1 && textScrollHeight <= this.defaultHeight) { // 줄바꿈이 없다면
				this.textArea.style.height = this.defaultHeight.px();
			} else { // 평소에는 그냥 체크해서 변경
				this.textArea.style.height = textScrollHeight.px();
			}
		}
	},
	checkTextLength: function() {
		if(!this.tmpStr) this.tmpStr = ""; 
		var str = this.textArea.value;

		if(this.tmpStr != str){
			if (str.bytes() > this.limitBytes){
				this.textArea.blur();
				this.textArea.value = this.textArea.value.cut(this.limitBytes, '');
				$(this.textArea.id +'_byte').innerHTML = this.textArea.value.bytes();
			     alert("최대 " + this.limitBytes + "bytes이므로 초과된 글자수는 자동으로 삭제됩니다.");
				 if (this.flashViewer) this.onChangeFlashViewer();
		     } else {
				$(this.textArea.id +'_byte').innerHTML = str.bytes();
			}		
			this.tmpStr = this.textArea.value;
			if (daum.Browser.ff && this.flashViewer) this.onChangeFlashViewer();
		}
	},
	outTextArea: function() {
		if (this.textArea.value.trim()=="") {
			//alert('설명을 입력해주세요.');
			this.onChangeFlashViewer();
			if (typeof this.outEventFunc != "undefined") this.outEventFunc();
		}
		clearTimeout(this.checkTimer);
	},
	onDownTextArea: function(ev) {
		// 줄수 체크
		if (ev.keyCode=="13" && this.textArea.value.indexOf('\n')>-1) { // enter
			if (this.textArea.value.match(/\n/g).length == this.maxRows-1)  {
				daum.Event.stopEvent(ev);
				return;
			}
		}

		if ((ev.keyCode=="8" || ev.keyCode=="46") &&  this.textArea.value.indexOf('\n')>-1) { // backspace or delete
			if (this.textArea.value.indexOf('\n')>-1 && this.textArea.value.match(/\n/g).length > 1) {
				var height = (this.textArea.value.match(/\n/g).length+1) * this.rowHeight;
				if (daum.Browser.ie) {
					this.textArea.style.height = (height+2).px();
				} else {
					this.textArea.style.height = height.px();	
				}
			}
		}
	},
	onChangeFlashViewer: function(){
		if (this.textArea.value.trim() == "") {
			$E(this.flashViewer).setWidth(1);
			$E(this.flashViewer).setHeight(1);
		} else {
			if (typeof $(this.flashViewer).updateDisplay == "function") {
				$(this.flashViewer).updateDisplay({
					'text': this.textArea.value
				});
			}
		}
	}
}

function removeElement(el){
        if(el && el.parentNode){
        	purge(el);
        	el.parentNode.removeChild(el);
        }
        delete el;
}

function getHeight(inside) {
	var nHeight;
	if (window.innerHeight && window.scrollMaxY) {
		nHeight = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){
		nHeight = document.body.scrollHeight;
	} else {
		nHeight = document.body.offsetHeight;
	}
	var nWHeight = window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body?document.body.clientHeight:null;
	if(inside || (nHeight <= nWHeight)){
		if(!inside) this.scrollH = false;
		return nWHeight;
	} else { 
		if(!inside) this.scrollH = true;
		return nHeight;
	}
}

function getWidth(inside) {
	var nWidth;
	if (window.innerWidth && window.scrollMaxX) {
		nWidth = window.innerWidth + window.scrollMaxX;
	} else if (document.body.scrollWidth > document.body.offsetWidth){
		nWidth = document.body.scrollWidth;
	} else {
		nWidth = document.body.offsetWidth;
	}
	var nWWidth = window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body?document.body.clientWidth:null;
	if(inside || (nWidth <= nWWidth)){
		if(!inside) this.scrollW = false;
		return nWWidth;
	} else { 
		if(!inside) this.scrollW = true;
		return nWidth;
	}
}

StringPX = {
    init: function(){
        if(!this.isInit){
            var bg = $("cutStringBg");
            if(!bg){
                bg = document.createElement("div");
                document.body.appendChild(bg);
                bg.id="cutStringBg";
                bg.style.position = "absolute";
                bg.style.left = "-99999px";
                bg.style.top = "-99999px";
                bg.style.whiteSpace = "nowrap";
            }
            this.bg = bg;
        }
        this.isInit = true;    
    },
    cut: function(el, width, height, endStr){
        this.init();
    	var endStr = endStr==null?"..":"";
		var text = "";
        if(typeof el=="string"){
			text = el;
			this.mode = "string";	
		}else{
			text = el.innerHTML;
			this.mode = "object";
		}
		text = text.replaceAll("[\r\n]","");
		text = text.trim();
        this.bg.innerHTML = text;
		var line = 1;
		if(height!=null){
			var line = parseInt(height/this.bg.offsetHeight,10);
			if(line<1) line = 1;
		}
        var offset = this.bg.offsetWidth;
        if(width>offset){
        	this.bg.innerHTML = "";
			if(this.mode=="string"){
		        return text;        
			}else{
				el.innerHTML = text;
				return;
			}
		}
		if(endStr!=""){
			this.bg.innerHTML = endStr;
			var endStrPX = this.bg.offsetWidth;
			width -= endStrPX;
		}
		text = text.unescapeHtml();
        var len = text.length;
        var charWidth = parseInt(offset/len, 10);
		var strHtml = "";
        var subText = "";
		var textLen = len;
		var limitCount = parseInt(width/charWidth, 10);
		for(var i=0;i<line;i++){
			var fin = false;
			var minusGap = false;
			var count = 0;
	        while(!fin){
	            subText = text.substring(0,len);
				if(subText){
					this.bg.innerHTML = subText.escapeHtml();
		            offset = this.bg.offsetWidth;
		            var gap = offset-width;
		            if(gap>=0){
						if(minusGap || gap ==0){
							fin = true;
							len--;
						}else{
							if(count==0){
								len = Math.ceil(width/charWidth);
							}else{
								len -= Math.ceil(gap/charWidth); 
							}
						}
		            }else if(gap<0){
						if(textLen-len==0){
							fin = true;
		                }else{
							minusGap = true;
		                    len += 1;
		                }
		            }
				}else{
					fin = true;	
				}
	            
				if(count>limitCount) fin = true;
				count++;
				if(fin){
					subText = text.substring(0,len);
					this.bg.innerHTML = "";
				}
	        }
			textLen -=len;
			var noBr = true;
			if(textLen==0){
				if(i==0) noBr = false;
				i = line;
			}
			if(height!=null){
				if(i!=0 && noBr) subText = "\n" + subText;
				text = text.substring(len,text.length);
				len = text.length;
			}
			strHtml += subText;
			subText = "";
		}
		strHtml = strHtml.trim();
		if(this.mode=="string"){
	        return (textLen==0?strHtml:strHtml+endStr).escapeHtml().replaceAll("\n","<br />");        
		}else{
			el.innerHTML = (textLen==0?strHtml:strHtml+endStr).escapeHtml().replaceAll("\n","<br />");
		}
    }
}
function setCookie(name, value, expiredays) {
	var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
function getCookie( name ) {
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ) {
					if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
							endOfCookie = document.cookie.length;
					return unescape( document.cookie.substring( y, endOfCookie ) );
			}
			x = document.cookie.indexOf( " ", x ) + 1;
			if ( x == 0 )
					break;
	}
	return null;
}
function delCookie(sName){
	setCookie(sName,'', -1);
	var todayDate = new Date();
    document.cookie = name + "=" + escape( 'deleted' ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

// Ultimate client-side JavaScript client sniff. Version 3.03
// (C) Netscape Communications 1999-2001.  Permission granted to reuse and distribute.
// Revised 17 May 99 to add is_nav5up and is_ie5up (see below).
// Revised 20 Dec 00 to add is_gecko and change is_nav5up to is_nav6up
//                      also added support for IE5.5 Opera4&5 HotJava3 AOLTV
// Revised 22 Feb 01 to correct Javascript Detection for IE 5.x, Opera 4, 
//                      correct Opera 5 detection
//                      add support for winME and win2k
//                      synch with browser-type-oo.js
// Revised 26 Mar 01 to correct Opera detection
// Revised 02 Oct 01 to add IE6 detection

// Everything you always wanted to know about your JavaScript client
// but were afraid to ask. Creates "is_" variables indicating:
// (1) browser vendor:
//     is_nav, is_ie, is_opera, is_hotjava, is_webtv, is_TVNavigator, is_AOLTV
// (2) browser version number:
//     is_major (integer indicating major version number: 2, 3, 4 ...)
//     is_minor (float   indicating full  version number: 2.02, 3.01, 4.04 ...)
// (3) browser vendor AND major version number
//     is_nav2, is_nav3, is_nav4, is_nav4up, is_nav6, is_nav6up, is_gecko, is_ie3,
//     is_ie4, is_ie4up, is_ie5, is_ie5up, is_ie5_5, is_ie5_5up, is_ie6, is_ie6up, is_hotjava3, is_hotjava3up,
//     is_opera2, is_opera3, is_opera4, is_opera5, is_opera5up
// (4) JavaScript version number:
//     is_js (float indicating full JavaScript version number: 1, 1.1, 1.2 ...)
// (5) OS platform and version:
//     is_win, is_win16, is_win32, is_win31, is_win95, is_winnt, is_win98, is_winme, is_win2k
//     is_os2
//     is_mac, is_mac68k, is_macppc
//     is_unix
//     is_sun, is_sun4, is_sun5, is_suni86
//     is_irix, is_irix5, is_irix6
//     is_hpux, is_hpux9, is_hpux10
//     is_aix, is_aix1, is_aix2, is_aix3, is_aix4
//     is_linux, is_sco, is_unixware, is_mpras, is_reliant
//     is_dec, is_sinix, is_freebsd, is_bsd
//     is_vms
//
// See http://www.it97.de/JavaScript/JS_tutorial/bstat/navobj.html and
// http://www.it97.de/JavaScript/JS_tutorial/bstat/Browseraol.html
// for detailed lists of userAgent strings.
//
// Note: you don't want your Nav4 or IE4 code to "turn off" or
// stop working when new versions of browsers are released, so
// in conditional code forks, use is_ie5up ("IE 5.0 or greater") 
// is_opera5up ("Opera 5.0 or greater") instead of is_ie5 or is_opera5
// to check version in code which you want to work on future
// versions.

    // convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();
    // *** BROWSER VERSION ***
    // Note: On IE5, these return 4, so use is_ie5up to detect IE5.
    var is_major = parseInt(navigator.appVersion);
    var is_minor = parseFloat(navigator.appVersion);

    // Note: Opera and WebTV spoof Navigator.  We do strict client detection.
    // If you want to allow spoofing, take out the tests for opera and webtv.
    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var is_nav2 = (is_nav && (is_major == 2));
    var is_nav3 = (is_nav && (is_major == 3));
    var is_nav4 = (is_nav && (is_major == 4));
    var is_nav4up = (is_nav && (is_major >= 4));
    var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) ||
                          (agt.indexOf("; nav") != -1)) );
    var is_nav6 = (is_nav && (is_major == 5));
    var is_nav6up = (is_nav && (is_major >= 5));
    var is_gecko = (agt.indexOf('gecko') != -1);

	var is_safari = (agt.indexOf('safari') != -1);
	
    var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
    var is_ie3    = (is_ie && (is_major < 4));
    var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
    var is_ie4up  = (is_ie && (is_major >= 4));
    var is_ie5    = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
    var is_ie5_5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
    var is_ie5up  = (is_ie && !is_ie3 && !is_ie4);
    var is_ie5_5up =(is_ie && !is_ie3 && !is_ie4 && !is_ie5);
    var is_ie6    = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
    var is_ie6up  = (is_ie && !is_ie3 && !is_ie4 && !is_ie5 && !is_ie5_5);
	var is_ie7 = (is_ie && (is_major == 4) && (agt.indexOf("msie 7.")!=-1));
	var is_ie10 = (is_ie && (is_major == 5) && (agt.indexOf("msie 10.")!=-1));
    // KNOWN BUG: On AOL4, returns false if IE3 is embedded browser
    // or if this is the first browser window opened.  Thus the
    // variables is_aol, is_aol3, and is_aol4 aren't 100% reliable.
    var is_aol   = (agt.indexOf("aol") != -1);
    var is_aol3  = (is_aol && is_ie3);
    var is_aol4  = (is_aol && is_ie4);
    var is_aol5  = (agt.indexOf("aol 5") != -1);
    var is_aol6  = (agt.indexOf("aol 6") != -1);

    var is_opera = (agt.indexOf("opera") != -1);
    var is_opera2 = (agt.indexOf("opera 2") != -1 || agt.indexOf("opera/2") != -1);
    var is_opera3 = (agt.indexOf("opera 3") != -1 || agt.indexOf("opera/3") != -1);
    var is_opera4 = (agt.indexOf("opera 4") != -1 || agt.indexOf("opera/4") != -1);
    var is_opera5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
    var is_opera5up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4);

    var is_webtv = (agt.indexOf("webtv") != -1); 

    var is_TVNavigator = ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1)); 
    var is_AOLTV = is_TVNavigator;

    var is_hotjava = (agt.indexOf("hotjava") != -1);
    var is_hotjava3 = (is_hotjava && (is_major == 3));
    var is_hotjava3up = (is_hotjava && (is_major >= 3));

    // *** JAVASCRIPT VERSION CHECK ***
    var is_js;
    if (is_nav2 || is_ie3) is_js = 1.0;
    else if (is_nav3) is_js = 1.1;
    else if (is_opera5up) is_js = 1.3;
    else if (is_opera) is_js = 1.1;
    else if ((is_nav4 && (is_minor <= 4.05)) || is_ie4) is_js = 1.2;
    else if ((is_nav4 && (is_minor > 4.05)) || is_ie5) is_js = 1.3;
    else if (is_hotjava3up) is_js = 1.4;
    else if (is_nav6 || is_gecko) is_js = 1.5;
    // NOTE: In the future, update this code when newer versions of JS
    // are released. For now, we try to provide some upward compatibility
    // so that future versions of Nav and IE will show they are at
    // *least* JS 1.x capable. Always check for JS version compatibility
    // with > or >=.
    else if (is_nav6up) is_js = 1.5;
    // NOTE: ie5up on mac is 1.4
    else if (is_ie5up) is_js = 1.3

    // HACK: no idea for other browsers; always check for JS version with > or >=
    else is_js = 0.0;

    // *** PLATFORM ***
    var is_win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
    // NOTE: On Opera 3.0, the userAgent string includes "Windows 95/NT4" on all
    //        Win32, so you can't distinguish between Win95 and WinNT.
    var is_win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));

    // is this a 16 bit compiled version?
    var is_win16 = ((agt.indexOf("win16")!=-1) || 
               (agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) || 
               (agt.indexOf("windows 16-bit")!=-1) );  

    var is_win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
                    (agt.indexOf("windows 16-bit")!=-1));

    var is_winme = ((agt.indexOf("win 9x 4.90")!=-1));
    var is_win2k = ((agt.indexOf("windows nt 5.0")!=-1));

    // NOTE: Reliable detection of Win98 may not be possible. It appears that:
    //       - On Nav 4.x and before you'll get plain "Windows" in userAgent.
    //       - On Mercury client, the 32-bit version will return "Win98", but
    //         the 16-bit version running on Win98 will still return "Win95".
    var is_win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
    var is_winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
    var is_win32 = (is_win95 || is_winnt || is_win98 || 
                    ((is_major >= 4) && (navigator.platform == "Win32")) ||
                    (agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));

    var is_os2   = ((agt.indexOf("os/2")!=-1) || 
                    (navigator.appVersion.indexOf("OS/2")!=-1) ||   
                    (agt.indexOf("ibm-webexplorer")!=-1));

    var is_mac    = (agt.indexOf("mac")!=-1);
    // hack ie5 js version for mac
    if (is_mac && is_ie5up) is_js = 1.4;
    var is_mac68k = (is_mac && ((agt.indexOf("68k")!=-1) || 
                               (agt.indexOf("68000")!=-1)));
    var is_macppc = (is_mac && ((agt.indexOf("ppc")!=-1) || 
                                (agt.indexOf("powerpc")!=-1)));

    var is_sun   = (agt.indexOf("sunos")!=-1);
    var is_sun4  = (agt.indexOf("sunos 4")!=-1);
    var is_sun5  = (agt.indexOf("sunos 5")!=-1);
    var is_suni86= (is_sun && (agt.indexOf("i86")!=-1));
    var is_irix  = (agt.indexOf("irix") !=-1);    // SGI
    var is_irix5 = (agt.indexOf("irix 5") !=-1);
    var is_irix6 = ((agt.indexOf("irix 6") !=-1) || (agt.indexOf("irix6") !=-1));
    var is_hpux  = (agt.indexOf("hp-ux")!=-1);
    var is_hpux9 = (is_hpux && (agt.indexOf("09.")!=-1));
    var is_hpux10= (is_hpux && (agt.indexOf("10.")!=-1));
    var is_aix   = (agt.indexOf("aix") !=-1);      // IBM
    var is_aix1  = (agt.indexOf("aix 1") !=-1);    
    var is_aix2  = (agt.indexOf("aix 2") !=-1);    
    var is_aix3  = (agt.indexOf("aix 3") !=-1);    
    var is_aix4  = (agt.indexOf("aix 4") !=-1);    
    var is_linux = (agt.indexOf("inux")!=-1);
    var is_sco   = (agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1);
    var is_unixware = (agt.indexOf("unix_system_v")!=-1); 
    var is_mpras    = (agt.indexOf("ncr")!=-1); 
    var is_reliant  = (agt.indexOf("reliantunix")!=-1);
    var is_dec   = ((agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1) || 
           (agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1) || 
           (agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1)); 
    var is_sinix = (agt.indexOf("sinix")!=-1);
    var is_freebsd = (agt.indexOf("freebsd")!=-1);
    var is_bsd = (agt.indexOf("bsd")!=-1);
    var is_unix  = ((agt.indexOf("x11")!=-1) || is_sun || is_irix || is_hpux || 
                 is_sco ||is_unixware || is_mpras || is_reliant || 
                 is_dec || is_sinix || is_aix || is_linux || is_bsd || is_freebsd);

    var is_vms   = ((agt.indexOf("vax")!=-1) || (agt.indexOf("openvms")!=-1));

/**
 *	common_v2.0.js 에서 관리되는 블로그 전용 Object
 */
if (typeof Blog === 'undefined') Blog = {};
//  Reference By Garrick Cheung's Domready Code
Blog.Ready = {
	init: [],
	trigger: function() {
		if(this.init.length){
			for (var i=0, len=this.init.length; i<len; i++) {
				var func = this.init[i];
				func();
			}
			this.init.length = 0;
		}
	}
};
Blog.Domready = function (func) {
	Blog.Ready.init.push(func);
};


var isIEVersion = ((navigator.userAgent.toLowerCase().indexOf("msie") != -1) && (navigator.userAgent.toLowerCase().indexOf("opera") == -1));

	function sendSubscriber(formObj, flag) {
//		alert("준비중인 기능입니다.");
//		return;
		formObj.flag.value = flag;
		formObj.submit();

		/** GET 방식으로 보낼 경우 */
		/*
		var page = formObj.action+"?";
		page += "blogid="+formObj.blogid.value;
		page += "&flag="+formObj.flag.value;
		page += "&applymail="+formObj.applymail.value;
		page += "&terminatemail="+formObj.terminatemail.value;
		self.location.href = page;
		*/
	}

	function copyTrackback(str) {
		if(copyclipboard(str)) {
			alert("엮인글 주소가 클립보드에 복사되었습니다.");
		}
	}

	function goArticleView(blogID, articleNo){	
//		location.href="/_blog/ArticleView.do?blogID="+blogID+"&articleNo="+articleNo;
//		location.href="/_blog/ArticleView.do?blogid=$BLOGID&articleNo="+articleNo;
		location.href="/_blog/BlogView.do?blogid="+blogID+"&articleno="+articleNo;
	}

	function clickArticle(no) {
		scrapform.articleno.value = no;
		var title = document.getElementById("title_"+no).innerHTML;
		scrapform.title.value = title;
	}

    function clickDssArticle(no,folderid) {
        scrapform.data_id.value = no;
        scrapform.folder_id.value = folderid;
        var title = document.getElementById("title_"+no).innerHTML;
        scrapform.title.value = title;
    }

	function goScrapPlanet() {
		winOpenPlanet(scrapform.url.value,scrapform.blogid.value,scrapform.articleno.value,scrapform.title.value,scrapform.goplanet.value, scrapform.source2.value, scrapform.blogtitle.value, scrapform.blogdaumname.value);
	}
	function goScrapCafe() {
		winOpen(scrapform.blogid.value,scrapform.articleno.value,scrapform.gocafe.value);
	}
	function goScrapBlog() {
		scrapOpen(scrapform.blogid.value, scrapform.articleno.value, scrapform.flag.value, scrapform.goblog.value);
	}
	function goDssPlanet() {
		var oScrapForm = document.scrapform;
        scrapDssOpen(oScrapForm.location_id.value,oScrapForm.folder_id.value,oScrapForm.data_id.value,oScrapForm.source_location_code.value,oScrapForm.source_etc.value, oScrapForm.goplanet.value);
    }
	function goDssCafe() {
		var oScrapForm = document.scrapform;
        scrapDssOpen(oScrapForm.location_id.value,oScrapForm.folder_id.value,oScrapForm.data_id.value,oScrapForm.source_location_code.value,oScrapForm.source_etc.value, oScrapForm.gocafe.value);
    }
    function goDssBlog() {
    	var oScrapForm = document.scrapform;
        scrapDssOpen(oScrapForm.location_id.value,oScrapForm.folder_id.value,oScrapForm.data_id.value,oScrapForm.source_location_code.value,oScrapForm.source_etc.value, oScrapForm.goblog.value);
    }
    function goDssMail() {
    	var oScrapForm = document.scrapform;
        scrapDssOpen(oScrapForm.location_id.value,oScrapForm.folder_id.value,oScrapForm.data_id.value,oScrapForm.source_location_code.value,oScrapForm.source_etc.value, oScrapForm.gomail.value);
    }
    
    function successScrapToYozm(daumid, yozmid){
		var oScrapForm = document.scrapform;
		loadXMLDocWithParam("GET","/_blog/yozmSend.ajax?blogid="+oScrapForm.location_id.value+"&articleno="+oScrapForm.data_id.value+"&scrapdaumid="+daumid+"&yozmid="+yozmid,null,"afterDssYozm",null,null);
	}
    function afterDssYozm(xmlhttp,obj){
		xmlhttp = null;
	}
	function commOpen(url, params) {
		var page = url;
		if(params != '') {
			page = url+"?"+params;
		}
		//var opts = "scrollbars=yes,status=no,toolbar=no,resizable=1,location=no,menu=no,width=600,height=600";
		//window.open(page,"winopen",opts);


		clickAreaCheck = true;
	    var str = "<div class='secret'><div style='padding:7px 5px 0px;'><font style='font-size:12px; color:#161615;'>비밀번호를 입력해주세요.&nbsp;</font><br /><br style='font-size:2px;'>";
	    str += "<input type=password id=password2 name=password2 class=box style='width:143px;' onkeydown='clickAreaCheck = true' onfocus='clickAreaCheck = true'><br />";
	    str += "<a href=\"javascript:del('"+deltype+"','"+boardno+"');\"><img src='http://i1.daumcdn.net/pimg/blog/p_img/b_layer_ok.gif' width='34' height='16' align='absmiddle' title='확인' vspace='5'></a> <a href='#'><img src='http://i1.daumcdn.net/pimg/blog/p_img/b_layer_cancel.gif' width='34' height='16' align='absmiddle' title='취소' vspace='5'></a><br /></div></div>";

	    setNameLayersPosition(curObj, str);
	}

	function goCmmtPwdDel(blogid, atno, no, url, open, curObj, cntdt){

		frm = document.cmmtform;
		frm.blogid.value=blogid;
		frm.articleno.value=atno;
		frm.no.value=no;
		frm.mode.value="D";
		frm.open.value=open;
		frm.regdt.value=cntdt;
		frm.action=url;

		clickAreaCheck = true;
	    var str = "<div class='secret'><div style='padding:7px 5px 0px;'><font style='font-size:12px; color:#161615;'>비밀번호를 입력해주세요.&nbsp;</font><br /><br style='font-size:2px;'>";
	    str += "<input type=password id="+atno+no+" name=cmmtpwd class=box style='width:143px;' onkeydown='clickAreaCheck = true' onfocus='clickAreaCheck = true'><br />";
	    str += "<a href=\"javascript:gocmmtcheck("+atno+no+");\"><img src='http://i1.daumcdn.net/pimg/blog/p_img/b_layer_ok.gif' width='34' height='16' align='absmiddle' title='확인' vspace='5'></a> <a href='#'><img src='http://i1.daumcdn.net/pimg/blog/p_img/b_layer_cancel.gif' width='34' height='16' align='absmiddle' title='취소' vspace='5'></a><br /></div></div>";

	    setNameLayersPosition(curObj, str);

	}
	function gocmmtcheck(cmmtpwd){
		if(document.getElementById(cmmtpwd).value==""){
			alert("비밀번호를 입력해주세요");
			return;
		}
		document.cmmtform.password.value=document.getElementById(cmmtpwd).value;
		document.cmmtform.submit();
	}

	function goCmmtAdminDel(blogid, atno, no, url, open, cntdt){
		frm = document.cmmtform;
		frm.blogid.value=blogid;
		frm.articleno.value=atno;
		frm.no.value=no;
		frm.mode.value="C";
		frm.regdt.value=cntdt;
		frm.open.value=open;
		frm.action=url;
		frm.submit();
	}
	function goCmmtLoginDel(blogid, atno, no, url, open, cntdt, euserid){
		frm = document.cmmtform;
		frm.blogid.value=blogid;
		frm.articleno.value=atno;
		frm.no.value=no;
		frm.mode.value="C";
		frm.regdt.value=cntdt;
		frm.open.value=open;
		frm.euserid.value=euserid;

		frm.action=url;

		frm.submit();
	}

	function scrapOpen(blogid, atno, flag, url) {
		var params = 'blogid='+blogid+'&articleno='+atno+'&scrapflag='+flag;
		var page = url;
		if(params != '') {
			page = url+"?"+params;
		}
		var opts = "scrollbars=yes,status=no,toolbar=no,resizable=1,location=no,menu=no,width=530,height=350";
		window.open(page,"winopen",opts);

	}

    function scrapDssOpen(location_id, folder_id, data_id, source_location_code, source_etc, url) {
        var params = 'location_id='+location_id+'&folder_id='+folder_id+'&data_id='+data_id+'&source_location_code='+source_location_code+'&source_etc='+source_etc;
        var page = url;
        if(params != '') {
            page = url+"&"+params;
        }
        var opts = "scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=530,height=350";
        window.open(page,"dssOpen",opts);
    }
	function winOpen(blogid, atno, url) {
		var page = url + '?blogid='+blogid+'&articleno='+atno;
		var opts = "scrollbars=yes,status=no,toolbar=no,resizable=1,location=no,menu=no,width=530,height=350";

		window.open(page,"winopen",opts);
	}

	function winOpenPlanet(url, blogid, atno, title, suburl, source2, blogtitle, blogdaumname) {
		var page = url + '?url='+suburl+'&blogid='+blogid+'&articleno='+atno+'&title='+title+'&source2='+source2+'&blogtitle='+blogtitle+'&blogdaumname='+blogdaumname;
		var opts = "scrollbars=yes,status=no,toolbar=no,resizable=1,location=no,menu=no,width=530,height=350";

		window.open(page,"winopen",opts);
	}

	function winTrackback(blogid, atno, url, tag) {
		var page = url + '?blogid='+blogid+'&articleno='+atno+'&tagname='+tag;
		var opts = "scrollbars=yes,status=no,toolbar=no,resizable=1,location=no,menu=no,width=530,height=350";

		window.open(page,"winopen",opts);
	}

	function delOpen(blogid, atno, no, url,open) {
		commOpen(url, 'blogid='+blogid+'&articleno='+atno+'&no='+no+'&mode=C&open='+open);
	}

	function delTrackback(obj, blogId, atno, tbno, cntdt){
		var page = '/_blog/TrackbackDelete.do?blogid=' + blogId
		page += '&articleno=' + atno;
		page += '&no=' + tbno;
		page += '&regdt=' + cntdt;
		loadDynamicContent(page);
		alert('엮인글이 삭제되었습니다.');
		goArticleView(blogId, atno);
	}

	function hideTemplate(blogid, listid, flag, menuname, action, pos) {
		var url = action+"?blogid="+blogid+"&listid="+listid+"&openflag="+flag;
		hideframe.location.href = url;
		deleteTemplate(menuname, pos);
	}

	function sendData(){
		frm = document.dataInfo;
		frm.submit();
	}
	
	/* login IP check */
	function checkIP(){
		loadXMLDocWithParam("GET","/_blog/_top/hdn/isLoginOrNot.ajax",null,"afterAreYouLoginNow",null,null);
	}
	function afterAreYouLoginNow(xmlhttp,obj){
		var oXmlDoc = getXMLDocument(xmlhttp);
		var isLogin = getXmlContent(oXmlDoc,'isLogin');
		if(isLogin =="ipchange"){
			document.location="http://login.daum.net/accounts/loginform.do?daumauth=1&category=blog&url="+document.location;
		}
	}

	function showDeleteVisitLayer(blogid, no) {
		document.getElementById('deleteVisitLayer').style.display = 'block';
		document.getElementById('regBlackList').checked = false;
		var frm = document.deleteVisitForm;
		frm.delBlogId.value = blogid;
		frm.delNo.value = no;
		if (typeof(requestAjaxCheck) == 'function') {
			requestAjaxCheck("action=showDeleteVisitLayer&blogid="+blogid);
		}
	}
	function deleteVisitCheck() {
		var frm = document.deleteVisitForm;
		var isBlackListChecked = document.getElementById('regBlackList').checked;
		if(isBlackListChecked){
			loadXMLDoc("GET", '/_blog/blackListTotalCount.ajax?blogid='+ frm.delBlogId.value,  null, "deleteVisitConfirm", "");
		}else{
			deleteVisit(frm.delBlogId.value, frm.delNo.value, '/_blog/VisitDelete.ajax', document.getElementById('regBlackList').checked);
		}
	}
	function deleteVisitConfirm(xmlhttp) {
		var frm = document.deleteVisitForm;
		var xmldoc;
		xmldoc = getXMLDocument(xmlhttp);
		var items = xmldoc.getElementsByTagName('contents');
		var isOver = items[0].firstChild.nodeValue;
		
		if(isOver == "over"){
			alert("블랙리스트 제한 인원을 초과하여 등록할 수 없습니다.");
			document.getElementById('regBlackList').checked = false;
		}else{
			deleteVisit(frm.delBlogId.value, frm.delNo.value, '/_blog/VisitDelete.ajax', document.getElementById('regBlackList').checked);
		}
	}
	function deleteVisit(blogid, no, action, isBlackList) {
		var url = action+"?blogid="+blogid+"&no="+no+"&isBlackList="+isBlackList;
	    loadXMLDoc("GET",url, null ,"deleteVisitName","");
	}
	function deleteVisitName(xmlhttp ){
		var xmldoc = getXMLDocument(xmlhttp);
		var items = xmldoc.getElementsByTagName('contents');
		var no =items[0].firstChild.nodeValue;
		var t = document.getElementById("visit_"+no);
		var p = document.getElementById("visit_blogger");
		p.removeChild(t);
		document.getElementById('deleteVisitLayer').style.display = 'none';
	}
	function updateMenu(blogid, listid, flag, action) {
		viewMenu(listid, flag);
		var url = action+"?blogid="+blogid+"&listid="+listid+"&openflag="+flag;
		hideframe.location.href = url;
	}

	function viewMenu(id, flag) {
		if(flag == 'Y') {
			eval('document.all.'+id+'.style.visibility = "visible";');
			eval('document.all.'+id+'.style.display = "block";');
		}
		else {
			eval('document.all.'+id+'.style.visibility = "hidden";');
			eval('document.all.'+id+'.style.display = "none";');
		}
	}

	function moreMenu(id1, id2, id3, flag) {
		if(flag == 'Y') {
			eval('document.all.'+id1+'.style.visibility = "visible";');
			eval('document.all.'+id2+'.style.visibility = "hidden";');
			eval('document.all.'+id3+'.style.visibility = "visible";');
			eval('document.all.'+id1+'.style.display = "block";');
			eval('document.all.'+id2+'.style.display = "none";');
			eval('document.all.'+id3+'.style.display = "block";');
		}
		else {
			eval('document.all.'+id1+'.style.visibility = "hidden";');
			eval('document.all.'+id2+'.style.visibility = "visible";');
			eval('document.all.'+id3+'.style.visibility = "hidden";');
			eval('document.all.'+id1+'.style.display = "none";');
			eval('document.all.'+id2+'.style.display = "block";');
			eval('document.all.'+id3+'.style.display = "none";');
		}
	}

	function submitComment(cmmtObj, loopObj, n, atcno) {
		var cmt = document.getElementById("cmmtcheck"+n).value;

		if(cmt==undefined){
			cmmtObj.articleno.value	= atcno;
			cmmtObj.name.value 		= loopObj.cmmtname.value;
			cmmtObj.open.value 		= loopObj.cmmtopen.value;
			cmmtObj.password.value 	= loopObj.cmmtpwd.value;
			cmmtObj.contents.value 	= loopObj.cmmttext.value;
			if(loopObj.cmmttext.value==""){
				alert("의견을 입력해주세요.");
				return;
			}
			if( loopObj.cmmtopen.checked ) {
				//alert('체크됨');
				cmmtObj.open.value = 'N';
			} else {
				cmmtObj.open.value = 'Y';
			}

			var key = loopObj.cmmtcheck.value;
			var bflag = false;
			if(key != '' && key != '둘 중에 하나만 입력하세요.') {

				if( key.indexOf("@") > 0 && key.indexOf("/") < 0 ) {
					cmmtObj.cmmtmail.value = key;
					bflag = true;
				} else if( key.indexOf("/") > 0 && key.indexOf(".") > 0 && key.indexOf("@") < 0) {

					if(key.indexOf("http://")<0)
						key = "http://"+key;
					cmmtObj.cmmtblog.value = key;
					bflag = true;
				}
			}
			if(bflag) {

				/** GET 방식으로 보낼 경우 */
				/*
				var page = cmmtObj.action+"?";
				page += "blogid="+cmmtObj.blogid.value;
				page += "&articleno="+cmmtObj.articleno.value;
				page += "&name="+cmmtObj.name.value;
				page += "&open="+cmmtObj.open.value;
				page += "&password="+cmmtObj.password.value;
				page += "&cmmtblog="+cmmtObj.cmmtblog.value;
				page += "&cmmtmail="+cmmtObj.cmmtmail.value;
				page += "&contents="+cmmtObj.contents.value;
				self.location.href = page;
				*/

				cmmtObj.submit();
			}else{
				alert("블로그/이메일 형태가 잘못되었습니다.");
				return;
			}
		}else{

			cmmtObj.articleno.value	= atcno;
			cmmtObj.name.value 		= document.getElementById("cmmtname"+n).value;
			cmmtObj.open.value 		= document.getElementById("cmmtopen"+n).value;
			cmmtObj.password.value 	= document.getElementById("cmmtpwd"+n).value;
			cmmtObj.contents.value 	= document.getElementById("cmmttext"+n).value;

			if(cmmtObj.contents.value==""){
				alert("의견을 입력해주세요.");
				return;
			}

			if( document.getElementById("cmmtopen"+n).checked ) {
				//alert('체크됨');
				cmmtObj.open.value = 'N';
			} else {
				cmmtObj.open.value = 'Y';
			}

			var key = document.getElementById("cmmtcheck"+n).value;
			var bflag = false;

			if(key != '' && key != '둘 중에 하나만 입력하세요.') {

				if( key.indexOf("@") > 0 ) {
					cmmtObj.cmmtmail.value = key;
					bflag = true;
				} else if( key.indexOf(".") >0 ){

					if(key.indexOf("http://")<0)
						key = "http://"+key;

					cmmtObj.cmmtblog.value = key;
					bflag = true;
				}
			}

			if(bflag) {

				/** GET 방식으로 보낼 경우 */
				/*
				var page = cmmtObj.action+"?";
				page += "blogid="+cmmtObj.blogid.value;
				page += "&articleno="+cmmtObj.articleno.value;
				page += "&name="+cmmtObj.name.value;
				page += "&open="+cmmtObj.open.value;
				page += "&password="+cmmtObj.password.value;
				page += "&cmmtblog="+cmmtObj.cmmtblog.value;
				page += "&cmmtmail="+cmmtObj.cmmtmail.value;
				page += "&contents="+cmmtObj.contents.value;
				self.location.href = page;
				*/

				cmmtObj.submit();
			}else{
				alert("블로그/이메일 형태가 잘못되었습니다.");
				return;
			}
		}
	}

	function init_text(loopObj, n) {
		if(document.getElementById("cmmtcheck"+n).value=="둘 중에 하나만 입력하세요.")
			document.getElementById("cmmtcheck"+n).value="";
	}

	function goBlog(pagelink) {
		self.location.href=pagelink;
	}

	function goBlackListRegPopup(url, nil) {
		var nilTag = (!nil) ? "" : "?" + nil;
		var win = window.open("about:blank", 'blackPopup', 'width=400, height=190');
		var frm = document.forms["blackInfo"];
		if(frm) {
			frm.action = "/_blog/BlackListRegisterConfirm.do" + nilTag;
			frm.jobKind.value="U0703";
			frm.blackConf.value=url;
			frm.blackKind.value="U0604";
			frm.target = 'blackPopup';
			frm.submit();
		}
	}
	
	function goBlackListRegT(loop){
		frm = document.loopform;
		document.blackInfo.jobKind.value=eval("frm.jobKind_"+loop+".value");
		document.blackInfo.blackConf.value=eval("frm.blackConf_"+loop+".value");
		document.blackInfo.blackKind.value="U0602";
		document.blackInfo.submit();
	}
	function goBlackListRegC(loop,cmmtloop){
		frm = document.loopform;

		document.blackInfo.jobKind.value=document.getElementById("jobKind_"+loop+"_"+cmmtloop).value;
		document.blackInfo.blackConf.value=document.getElementById("blackConf_"+loop+"_"+cmmtloop).value;
		document.blackInfo.blackKind.value="U0601";
		document.blackInfo.submit();
	}
	function goBlackListRegC2(loop,cmmtloop){
		frm = document.loopform;
		for(var i=0;i<frm.length;i++){
			if(frm[i].name=="jobKind_"+loop+"_"+cmmtloop){
				document.blackInfo.jobKind.value=frm[i].value;
			}
			if(frm[i].name=="blackConf_"+loop+"_"+cmmtloop){
				document.blackInfo.blackConf.value=frm[i].value;
			}
		}
		document.blackInfo.blackKind.value="U0601";
		document.blackInfo.submit();
	}
	function goBlackListRegB(loop){
		frm = document.loopform;
		document.blackInfo.jobKind.value=eval("frm.jobKind_"+loop+".value");
		document.blackInfo.blackConf.value=eval("frm.blackConf_"+loop+".value");
		document.blackInfo.blackKind.value="U0603";
		document.blackInfo.submit();
	}

	function goBlackListRegV(url){
		var frm = document.forms["blackInfo"];
		if(frm) {
			frm.jobKind.value="U0703";
			frm.blackConf.value=url;
			frm.blackKind.value="U0604";
			frm.submit();
		}
	}

	function goCommentVerify(verifyID,verifyEmail,verifyBlog,articleno){
		frm = document.verifyInfo;
		frm.verifyID.value=verifyID;
		frm.verifyEmail.value=verifyEmail;
		frm.verifyBlog.value=verifyBlog;
		frm.articleno.value=articleno;
		frm.submit();
	}

	function goProfileCommentVerify(verifyID,commentno){
		frm = document.verifyInfo;
		frm.verifyID.value=verifyID;
		frm.verifyNo.value=commentno;
		frm.submit();
	}
	
	function verifyComment(articleno, commentno){
		frm = document.verifyInfo;
		frm.parentVerifyNo.value=articleno;
		frm.verifyNo.value=commentno;
		frm.submit();
	}

	// 블로그가 없을 경우는 만드는 팝업으로 유도 해 줍시다요.
	function makeBlogPopup( menuName, blogid ) {
		var		url = "/_blog/proposeMakeBlog.do?blogid="+blogid+"&menu="+menuName;
		window.open(url, 'addfriend', 'width=400, height=190');
	}


// 전체선택, 전체해제
function setChkboxForm(form,fld) {
	form = eval("document."+form);

	for(i = 0; i < form.elements.length; i++){
		if(form.elements[i].type == "checkbox" && form.elements[i].name == fld){
			if(form.elements[i].checked == true){
				form.elements[i].checked = false;
			}else{
				form.elements[i].checked = true;
			}
		}
	}
}

//공백제거(양쪽)

function both_trim(a)
{
	var search = 0

    a = a.replace(/\r\n$/, "");
    while ( a.charAt(search) == " ")
		search = search + 1

	a = a.substring(search, (a.length))
    search = a.length - 1
   	while (a.charAt(search) ==" ")
		search = search - 1

	return a.substring(0, search + 1)
}

//글자바이트수 제한 체크
function cal_byte(aquery,value)
{    var tmpStr;
    var temp=0;
    var onechar;
    var tcount;
    tcount = 0;

    tmpStr = new String(aquery);
    temp = tmpStr.length;

    for (k=0;k<temp;k++)
    {
        onechar = tmpStr.charAt(k);
        if (escape(onechar) =='%0D') { } else if (escape(onechar).length > 4) { tcount += 2; } else { tcount++; }
    }

    if(tcount>value) {
        reserve = tcount-value;
        return false;
    }

    return true;
}

function goFileUpload(){
	editor_focus();
	curSelection = getSelect();
	var contents = "article";
	if(curEditor == "e_H_L_body"){
		contents = "longArticle";
	}
	var dest = "/_blog/fileUploadPop.do?filePathField=blogFilePath&contents=" + contents;
	var width = "500";
	var height = "320";
	newWin = window.open(dest, "win", "scrollbars=yes,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=no,mebar=no,left=250,top=65");
	newWin.focus();
}

function goFileUploadWithBlogid(blogid){
	editor_focus();
	curSelection = getSelect();
	var contents = "article";
	if(curEditor == "e_H_L_body"){
		contents = "longArticle";
	}
	var dest = "/_blog/fileUploadPop.do?blogid="+blogid+"&filePathField=blogFilePath&contents=" + contents;
	var width = "500";
	var height = "320";
	newWin = window.open(dest, "win", "scrollbars=yes,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=no,mebar=no,left=250,top=65");
	newWin.focus();
}

function openImageUploader( blogid ){
	var agt=navigator.userAgent.toLowerCase();
/*
	오직 explore 인 경우 ie 가 true
*/
	var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
/*
	window 개열중 win95와 win98이 아닌경우 compatibleOS가 true(win2000 or xp)
*/
	var compatibleOS = ((agt.indexOf("win") != -1) && (agt.indexOf("98") == -1) && (agt.indexOf("95") == -1));
	var oneshot = (ie && compatibleOS);
	editor_focus();
	curSelection = getSelect();
	var contents = "article";
	if(curEditor == "e_H_L_body"){
		contents = "longArticle";
	}
	var dest = "/_blog/OpenImageUploader.do?blogid="+blogid+"&filePathField=blogFilePath&contents=" + contents + "&oneshot=" + oneshot;
	var width = "500";
	var height = "320";
	newWin = window.open(dest, "win", "scrollbars=yes,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=no,mebar=no,left=250,top=65");
	newWin.focus();
}

function getCurEditor(){
	return curEditor;
}

function goMultimedia( blogid ){
	editor_focus();
	curSelection = getSelect();
	var dest = "/_blog/MediaLink.do?blogid="+blogid;
	var width = "500";
	var height = "250";
	newWin = window.open(dest, "win", "scrollbars=yes,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=no,mebar=no,left=250,top=65");
	newWin.focus();
	//alert("준비중인 기능입니다.");
	//return;

}

function copyUrl(str) {
	if(copyclipboard(str)) {
		alert('클립보드에 주소가 복사되었습니다.');
	}
}

function copyclipboard(intext) {
	if (window.clipboardData) {
		window.clipboardData.setData("Text", intext);
			return true;
	}
	alert("이 브라우저에서는 주소 복사 기능을 제공하지 않습니다.\n아래 주소를 직접 드래그하여 복사해주세요.\n\n"+intext);
	return false;
}

/* clipboard copy flash call back */
function onClipBoard(isSuccess, title, url){
	
	if(isSuccess) {
		if(/(rss|atom)/gi.test(url)){
			if(/(rss)/gi.test(url)){
				url=url+"/view";
			}
			window.open(url);
		}
		alert(title + " 주소가 복사되었습니다.");
	}
	else { alert(title + " 주소가 복사되지 않았습니다.\n아래 주소를 직접 드래그하여 복사해주세요.\n\n" + url); }
}

function articleopeninit(formname){
	frm = eval("document."+formname);
	for(var i=0;i<frm.articleOpen.length;i++){
		frm.articleOpen[i].disabled=false;
	}
}
function blogopen(formname,open){
	frm = eval("document."+formname);

	if(open!=""){
		articleopeninit(formname);
		if(open=="B0602"){
			frm.articleOpen[0].checked=false;
			frm.articleOpen[0].disabled=true;
		}else if(open=="B0603"){
			frm.articleOpen[0].checked=false;
			frm.articleOpen[0].disabled=true;
			frm.articleOpen[1].checked=false;
			frm.articleOpen[1].disabled=true;
		}
	}
}
function initcmmtwrite(formname){
	frm = eval("document."+formname);
	for(var i=0;i<frm.commentOpen.length;i++){
		frm.commentOpen[i].disabled=false;
	}
}
function initscrapprmt(formname){
	frm = eval("document."+formname);
	for(var i=0;i<frm.scrapPrmtKind.length;i++){
		frm.scrapPrmtKind[i].disabled=false;
	}
}
function openchange(formname){
	frm = eval("document."+formname);
	var article="";
	for(var i=0;i<frm.articleOpen.length;i++){
		if(frm.articleOpen[i].checked==true)
			article = frm.articleOpen[i].value;
	}

	if(article!=""){
		if(article=="B0301"){
			initcmmtwrite(formname);
			initscrapprmt(formname);
			frm.trackBackPrmt.disabled=false;
			frm.searchPrmt.disabled=false;
			if( typeof frm.newsLetterKind != "undefined") {
				frm.newsLetterKind.disabled=false;
			}
		}else if(article=="B0302"){
			initcmmtwrite(formname);
			initscrapprmt(formname);
			frm.trackBackPrmt.disabled=false;

			frm.searchPrmt.checked=false;
			frm.searchPrmt.disabled=true;
			if( typeof frm.newsLetterKind != "undefined"){
				frm.newsLetterKind.disabled=false;
			}
			if( typeof frm.mediadaum != "undefined"){
				frm.mediadaum.checked=false;
			}
			
			if( typeof frm.mappostCheck != "undefined"){
				frm.mappostCheck.checked=false;
			}

			if( typeof frm.tourService != "undefined"){
				frm.tourService.checked=false;
				document.getElementById('tourServicePanel').style.display = "none";
			}			
			
		}else{
			initcmmtwrite(formname);
			initscrapprmt(formname);

			frm.scrapPrmtKind[2].checked=true;
			frm.scrapPrmtKind[0].disabled=true;
			frm.scrapPrmtKind[1].disabled=true;

			frm.trackBackPrmt.checked=false;
			frm.trackBackPrmt.disabled=true;
			frm.searchPrmt.checked=false;
			frm.searchPrmt.disabled=true;
			if( typeof frm.newsLetterKind != "undefined"){
				frm.newsLetterKind.checked=false;
				frm.newsLetterKind.disabled=true;
			}
			if( typeof frm.mediadaum != "undefined"){
				frm.mediadaum.checked=false;
			}
			
			if( typeof frm.mappostCheck != "undefined"){
				frm.mappostCheck.checked=false;
			}
			
			if( typeof frm.tourService != "undefined"){
				frm.tourService.checked=false;
				document.getElementById('tourServicePanel').style.display = "none";
			}			
			
		}

	}

}

function submitComment22(cmmtObj, loopObj, n, pcmmtno, atcno) {
		//http://s1.daumcdn.net/pimg/blog/library/common.js 으로 수정해서 넣기!!!

		if(document.getElementById("cmmtcheck"+n)==undefined || document.getElementById("cmmtcheck"+n).value==undefined){
			cmmtObj.articleno.value	= atcno;
			cmmtObj.pcmmtno.value 	= pcmmtno;
			cmmtObj.cmmtno.value 	= n;
			cmmtObj.name.value 		= document.getElementById("setcmmtname" + n).value;
			cmmtObj.open.value 		= document.getElementById("setcmmtopen" + n).value;
			cmmtObj.texticon.value 		= document.getElementById("setcmmtexticon"+n).value;			
			cmmtObj.password.value 	= document.getElementById("setcmmtpwd" + n).value;
			cmmtObj.contents.value 	= document.getElementById("setcmmttext" + n).value;

			if(document.getElementById("setcmmtopen" + n).checked == true){
				cmmtObj.open.value = "N";
			}else{
				cmmtObj.open.value = "Y";
			}

			if(document.getElementById("setcmmtexticon" + n).checked == true){
				cmmtObj.texticon.value = "Y";
			}else{
				cmmtObj.texticon.value = "N";
			}					
			
			if(cmmtObj.name.value=="" || cmmtObj.name.value=="이름") {
				alert("이름을 입력해주세요.");
				return;
			}
			if(document.getElementById("setcmmtpwd"+n).type!="hidden" && (cmmtObj.password.value=="" || cmmtObj.password.value=="****")){
				alert("비밀번호를 입력해주세요.");
				return;
			}



			var key = document.getElementById("setcmmtcheck"+n).value;

			var bflag = false;
			if(key != '' && key != '블로그 또는 이메일 주소') {
				if( key.indexOf("@") > 0 && key.indexOf("/") < 0 ) {
					cmmtObj.cmmtmail.value = key;
					bflag = true;
				} else if(  key.indexOf(".") > 0 && key.indexOf("@") < 0) {

					if(key.indexOf("http://")<0)
						key = "http://"+key;
					cmmtObj.cmmtblog.value = key;
					bflag = true;
				}
			}else{
				alert("블로그 또는 이메일 주소를 입력해주세요");
				return;
			}

			if(bflag) {
				if(actType=="MOD"){
					cmmtObj.isModify.value = "Y";
					cmmtObj.action = "/_blog/CommentCreate.do";
				}else if(actType=="REP"){
					cmmtObj.action = "/_blog/CommentCreate.do";
				}

			}else{
				alert("블로그/이메일 형태가 잘못되었습니다.");
				return;
			}
			if(cmmtObj.contents.value=="" || cmmtObj.contents.value=="내용") {
				alert("내용을 입력해주세요.");
				return;
			}else{
				cmmtObj.submit();
			}
		}else{
			cmmtObj.articleno.value	= atcno;
			cmmtObj.name.value 		= document.getElementById("cmmtname"+n).value;
			cmmtObj.open.value 		= document.getElementById("cmmtopen"+n).value;
			cmmtObj.texticon.value 		= document.getElementById("cmmtexticon"+n).value;			
			cmmtObj.password.value 	= document.getElementById("cmmtpwd"+n).value;
			cmmtObj.contents.value 	= document.getElementById("cmmttext"+n).value;
			
			if( document.getElementById("cmmtopen"+n).checked ) {
				cmmtObj.open.value = 'N';
			} else {
				cmmtObj.open.value = 'Y';
			}

			//텍스티콘에 대한 설정 여부 확인 
			if( document.getElementById("cmmtexticon"+n).checked ) {
				cmmtObj.texticon.value = 'N';
			} else {
				cmmtObj.texticon.value = 'Y';
			}		
			
			//비로그인시 글남길때 비밀번호 기입여부 체크
			if(document.getElementById("cmmtpwd"+n).type !="hidden" && cmmtObj.password.value ==""){
				alert("비밀번호를 입력해주세요");
				return;
			}
			//비로그인시 글남길때 비밀번호 기입여부 체크
			if(document.getElementById("cmmtpwd"+n).type !="hidden" && cmmtObj.password.value =="****"){
				alert("비밀번호를 입력해주세요");
				return;
			}

			//비로그인시 글남길때 이름 기입여부 체크
			if(document.getElementById("cmmtname"+n).type !="hidden" && cmmtObj.name.value ==""){
				alert("이름을 입력해주세요");
				return;
			}
			//비로그인시 글남길때 이름 기입여부 체크
			if(document.getElementById("cmmtname"+n).type !="hidden" && cmmtObj.name.value =="****"){
				alert("이름을 입력해주세요");
				return;
			}

			if(cmmtObj.contents.value=="" || cmmtObj.contents.value=="내용") {
				alert("내용을 입력해주세요.");
				return;
			}
			if(cmmtObj.name.value=="" ){
				alert("비밀번호를 입력해주세요.");
				return;
			}


			var key = document.getElementById("cmmtcheck"+n).value;
			var bflag = false;


			if(key != '' && key != '둘 중에 하나만 입력하세요.') {

				if( key.indexOf("@") > 0 ) {
					cmmtObj.cmmtmail.value = key;
					bflag = true;
				} else if( key.indexOf(".") >0 ){

					if(key.indexOf("http://")<0)
						key = "http://"+key;

					cmmtObj.cmmtblog.value = key;
					bflag = true;
				}
			}

			if(bflag) {
				cmmtObj.submit();
			}else{
				alert("블로그/이메일 형태가 잘못되었습니다.");
				return;
			}
		}
	}

function submitComment_reply(cmmtObj, loopObj, n, pcmmtno, atcno) {
	cmmtObj.articleno.value = atcno;
    cmmtObj.contents.value  = document.getElementById("cmmttext"+n).value;
    cmmtObj.cmmtloginyn.value=  document.getElementById("cmmtloginyn"+n).value;
     if( document.getElementById("cmmtopen"+n).checked ) {
                cmmtObj.open.value = 'N';
            } else {
                cmmtObj.open.value = 'Y';
     }
     cmmtObj.submit();
}

function calcBytes(obj, charCnt){
    var strCount = 0;
    var tempStr, tempStr2;

    strCount = obj.value.bytes();

    if (strCount > charCnt)
        return false;
    else
        return true;
}

function returnBytes(obj, charCnt, textlimitName){
    var strCount = 0;
    var tempStr, tempStr2;

    strCount = obj.value.bytes();
    if (strCount > charCnt){
        alert("최대 " + charCnt + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
        obj.value = obj.value.cut(charCnt, '');
        strCount = obj.value.bytes();
    }
    if(textlimitName != "")
        document.getElementById(textlimitName).innerHTML = strCount;
}

function calcBytesHtml(obj, charCnt){
    var strCount = 0;
    var tempStr, tempStr2;

    var htmlConvert = obj.value.convertHtml();
    strCount = htmlConvert.bytes();

    if (strCount > charCnt)
        return false;
    else
        return true;
}

function returnBytesHtml(obj, charCnt, textlimitName){
    var strCount = 0;
    var tempStr, tempStr2;
    var htmlConvert = obj.value.convertHtml();
    strCount = htmlConvert.bytes();
    if (strCount > charCnt){
        alert("최대 " + charCnt + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
        tempStr2 = htmlConvert.cutConvertedHtml(charCnt, '');
        obj.value = tempStr2.reformHtml();
        strCount = tempStr2.bytes();
    }
    if(textlimitName != "")
        document.getElementById(textlimitName).innerHTML = strCount;
}

function isNumberic(str) {
    var pattern = /^[0-9]+$/;
    return (pattern.test(str)) ? true : false;
}

function isValidEmail(value) {
    var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    return (pattern.test(value)) ? true : false;
}

function addSelectObj(obj, text, value, label){
	var newOpt = new Option(text, value, label);
	newOpt.text = text;
	newOpt.value = value;
	newOpt.label = label;
	obj.options.add(newOpt);
}

function removeAllOption(obj){
	for (var i=0;i<obj.options.length;i++){
		obj.remove(i);
		i--;
	}
}

function removeSelectedOption(obj){
	for (var i=0;i<obj.options.length;i++){
		if(obj.options[i].selected){
    		obj.remove(i);
    		i--;
		}
	}
}



function viewDivAL2(linkobj, event, topmrg, leftmrg) {
	var xpos=0;
	var ypos=0;
	var mousex=0;
	var mousey=0;
	if(linkobj !=null){
		xpos =findPosX(linkobj);
		ypos =findPosY(linkobj);
		if(window.event){
			mousex = event.clientX;
			mousey = event.clientY;
		}else{
			mousex = event.pageX-document.body.scrollLeft;
			mousey = event.pageY;
		}
		var docX = document.body.clientWidth;
		var docY = document.body.clientHeight;
	}
	var obj = document.getElementById("dashboard");
	if(mousex + leftmrg + 300 > docX) xpos = xpos - (mousex + leftmrg + 300 - docX);
	show_dashboard();
	obj.style.left = xpos + leftmrg;
	var temp = docY - document.getElementById('resultarea').offsetHeight;
	var temp2 = ypos + topmrg;
	if(mousey > temp){
		obj.style.top = temp2 - document.getElementById('resultarea').offsetHeight - 20;
	} else{
		obj.style.top = ypos + topmrg;
	}
}

function show_post(linkobj, target_id, event, topmrg, leftmrg) {
	var resultDiv = document.getElementById('resultarea');
	var content =document.getElementById('source_' + target_id).innerHTML;
	resultDiv.innerHTML = content;
	viewDivAL2(linkobj,event, topmrg, leftmrg);
}

var thumbnum = 0;
var selthumbno = 0;
var isthumbovered = false;
function init_recent_thumbnail(maxnum) {
	thumbnum = maxnum-1;
	show_recent_random_thumbnail();
//		setInterval("show_recent_random_thumbnail()", 3000);
}

function hide_recent_thumbnail() {
	var dis_div = 'recent_thumb_' + selthumbno;
	if(document.getElementById(dis_div)) {
		document.getElementById(dis_div).style.display = 'none';
	}
}

function show_recent_thumbnail() {
	var dis_div = 'recent_thumb_' + selthumbno;
	if(document.getElementById(dis_div)) {
		document.getElementById(dis_div).style.display = 'block';
	}
}

function show_recent_random_thumbnail() {
	if(isthumbovered) return;
	hide_recent_thumbnail();
	try {
		selthumbno = Math.round(Math.random() * (thumbnum));
	}catch(e){
		selthumbno = 0;
	}
	show_recent_thumbnail();
}

function chg_recent_thumbnail_pre(){
	hide_recent_thumbnail();
	if(selthumbno == 0){
		selthumbno = thumbnum;
	} else {
		selthumbno--;
	}
	show_recent_thumbnail();
}

function chg_recent_thumbnail_next(){
	hide_recent_thumbnail();
	if(selthumbno == thumbnum){
		selthumbno = 0;
	} else {
		selthumbno++;
	}
	show_recent_thumbnail();
}

function show_dashboard(){
	var obj = document.getElementById("dashboard");
	obj.style.display="block";
	viewLayer = true;
}

function hide_dashboard(){
	var obj = document.getElementById("dashboard");
	obj.style.display="none";
	viewLayer = false;
}

function directGoUrl() {
	var curURIDOM = document.getElementById("blog_curURI");
	if(curURIDOM){
		var curLocation = curURIDOM.value;
		if(curLocation != null && curLocation != "about:blank"){
			setDomainCookie('M_P2M','Y','.daum.net',1);		
			curLocation = curLocation.replace('.ajax','.do').replace("#.*", "");
			top.document.location.href = curLocation;
		}
	}	
}

function setDomainCookie(name, value, domain, expiredays) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; domain=" + domain + "; expires=" + todayDate.toGMTString() + ";"
}

function deleteDomainCookie(name, domain) {
	var expireDate = new Date();
	expireDate.setDate( expireDate.getDate() - 1 );
	document.cookie = name + "= " + "; path=/; domain=" + domain + "; expires=" + expireDate.toGMTString() + ";";
}

/**
 *	간편 글쓰기
 **/
SimpleWriter = function(targetId, options) {
	this.option = {
		private: options.private || false,
		category: options.category || '0',
		formName: options.formName || null
	};
	this.MAX_IMAGE_COUNT = 10;
	this.message = {
		NEW_ERROR: "간편 에디터 생성에 실패하였습니다.",
		NO_CONTENT: "내용을 입력해주세요.",
		SUBMIT_FAIL: "글등록에 실패하였습니다.",
		EMPTY_URL: "주소를 입력해주세요.",
		NOT_WORK_DURL: "올바르지 않은 URL입니다.",
		FORWARD_EDITOR: "간편 에디터에서 작성된 글이 2,000자를 넘었습니다. 파워에디터로 이어서 작성하세요.",
		MORE_IMAGE: "추가적인 이미지 첨부는 파워에디터에서 가능합니다. 파워에디터에서 이어쓰시겠습니까?",
		MAX_IMAGE: "이미지는 " + this.MAX_IMAGE_COUNT + "개까지 등록이 됩니다.",
		NOT_END_LOADING: "이미지를 첨부하고 있습니다."
	};

	this.id = targetId || 'simpleWriter';
	this.isPrivate = this.option.private;
	this.originText = {};
	this.attachImage = [];
	this.$main = daum.$(targetId);
	if (typeof this.$main === 'undefined') {
		alert(this.message.NEW_ERROR);
		return false;
	}
	this.$container = daum.$C(this.$main, 'smp_container')[0];
	this.$imageWrap = daum.$C(this.$container, 'smp_image_wrap')[0];
	this.$titleWrap = daum.$C(this.$container, 'smp_title_wrap')[0];
	this.$title = daum.$C(this.$container, 'smp_input_title')[0];
	this.$title.id = this.id + "-title";
	this.$content = daum.$C(this.$container, 'smp_input_content')[0];
	this.$content.id = this.id + "-content";
	this.$link = daum.$C(this.$container, 'smp_url')[0];
	this.$link.id = this.id + "-link";
	this.$linkButton = daum.$C(this.$container, 'smp_tools_link')[0];
	this.$linkLayer = daum.$C(this.$container, 'smp_layer_link')[0];
	this.$private = daum.$C(this.$container, 'smp_tools_private')[0];

	this.initDisplay();
	this.initEvent();
};

SimpleWriter.prototype = {
	initDisplay: function() {
		var $uploader = daum.$C(this.$container, 'smp_tools_image')[0];
		$uploader.id = this.id + "-uploader";
		this.cocaId = $uploader.id;
		this.appendCoca($uploader.id, this.imageUploadComplete, 'simpleWriter');
		
		this.$title.disabled = false;
		this.$content.disabled = false;
		this.setPlaceholder(this.$title);
		this.setPlaceholder(this.$content);
		this.setPlaceholder(this.$link);
		this.togglePrivate(this.option.private);
	},
	initEvent: function() {
		var $submit = daum.$C(this.$container, 'smp_submit')[0],
			$subUploader = daum.$C(this.$container, 'smp_tools_image').getLast();
		daum.addEvent($submit, 'click', this.submit.bindAsEventListener(this));
		daum.addEvent(this.$titleWrap, 'mouseover', this.titleWrapHover.bindAsEventListener(this));
		daum.addEvent(this.$titleWrap, 'mouseout', this.titleWrapHover.bindAsEventListener(this));
		daum.addEvent(this.$linkButton, 'click', this.clickLinkButton.bindAsEventListener(this));
		KeyManager.addAction("click", this.globalClickHandler.bindAsEventListener(this, this.$linkLayer, [this.$linkLayer, this.$linkButton] ));
		daum.addEvent(this.$private, 'click', this.clickPrivate.bindAsEventListener(this));
		daum.addEvent(this.$linkLayer, 'click', this.clickLink.bindAsEventListener(this));
		daum.addEvent(this.$imageWrap, 'click', this.deleteImage.bindAsEventListener(this));
		daum.addEvent(this.$title, 'focus', function() {
			checker(this.$title, 70, null, true);
		}.bindAsEventListener(this));
		daum.addEvent(this.$title, 'blur', stopchecker);
		daum.addEvent(this.$content, 'focus', function() {
			checker(this.$content, 2000, null, true, function() {
				if (confirm(this.message.FORWARD_EDITOR)) this.forwardEditor();
			}.bind(this));
		}.bindAsEventListener(this));
		daum.addEvent(this.$content, 'blur', stopchecker);
		daum.addEvent($subUploader, 'click', function(ev) {
			daum.Event.preventDefault(ev);
			//if (confirm(this.message.MORE_IMAGE)) this.forwardEditor();
			alert(this.message.MAX_IMAGE);
		}.bindAsEventListener(this));
		BlogUtil.Form.autoHeight(this.$content);
	},
	setPlaceholder: function($target) {	// need id or class name.
		if (!$target.id) {
			$target.id = this.id + '-' + $target.className.split(' ')[0];
		}
		this.originText[$target.id] = $target.value;
		daum.addEvent($target, 'focus', this.checkPlaceholder.bindAsEventListener(this, $target));
		daum.addEvent($target, 'blur', this.checkPlaceholder.bindAsEventListener(this, $target));
	},
	checkPlaceholder: function(typeOrEvent, $target) {
		var type = typeOrEvent.type || typeOrEvent;
		if (type === 'focus' && $target.value == this.originText[$target.id]) {
			$target.value = "";
			daum.Element.removeClassName($target, 'placeholder');
		} else if (type === 'blur' && $target.value == "") {
			$target.value = this.originText[$target.id];
			daum.Element.addClassName($target, 'placeholder');
		}
	},
	removePlaceholderText: function($target) {
		if (!$target.id) return;
		if ($target.value == this.originText[$target.id]) {
			return "";
		}
		return $target.value;
	},
	appendCoca: function(targetId, callback, ctx) {
		var flashUrl = 'http://editor.daum.net/coca_service/1.1.22/coca.swf',
			flashvars = {
				coca_service: "BlogAttachCoca",
				coca_ctx: ctx || "",
				service: "blog",
				sname: "blog",
				sid: BLOGID || "simplewriter",
				single_selection: true,
				coca_skin: "http://i1.daumcdn.net/pimg/blog4/skin/common/btn_pic.gif",
				coca_over_skin: "http://i1.daumcdn.net/pimg/blog4/skin/common/btn_pic_over.gif",
				coca_down_skin: "http://i1.daumcdn.net/pimg/blog4/skin/common/btn_pic.gif"
			},
			params = { quality: 'high', menu: 'false', swliveconnect: 'true', allowScriptAccess: 'always', wmode: 'transparent', scale: 'noscale', salign: 'LT' };
		swfobject.embedSWF(flashUrl, targetId, '28', '23', '9.0.45', false, flashvars, params, { title:"사진첨부" } );
	},
	showCoca: function() {
		daum.Element.show(daum.$(this.cocaId));
	},
	hideCoca: function() {
		daum.Element.hide(daum.$(this.cocaId));
	},
	imageUploadComplete: function(result) {
		if (!result) return false;
		//this.hideCoca();	// 이미지 한장만 업로드하는 경우.
		if (this.attachImage.length >= this.MAX_IMAGE_COUNT) {
			if (!this.hasAlertMaxImageCount) {
				(daum.Browser.ff ? this.showFFalert : alert)(this.message.MAX_IMAGE);
			}
			this.hasAlertMaxImageCount = true;
			this.hideCoca();
			return false;
		}
		
		var imageUrl = result.imageUrl.replace('/attach/', '/C50x50/'),
			$dummy = daum.createElement('<img src="'+result.imageUrl.replace('/attach/', '/image/')+'" />');
		daum.$$('.smp_image_load_dummy')[0].appendChild($dummy);
		daum.addEvent($dummy, 'load', function(ev) {
			var image = daum.getElement(ev),
				imageUrl = image.src.replace('/image/', '/attach/');
			for (var i=0, len=this.attachImage.length; i<len; i++) {
				if (this.attachImage[i].url == imageUrl) {
					this.attachImage[i].fwidth = Math.min(image.width, sContentWidth);
				}
			}
			this.isImageLoading = false;
		}.bindAsEventListener(this));
		
		this.attachImage.push({
			element: this.attachToImageWrap(imageUrl),
			name: result.imageName,
			url: result.imageUrl,
			size: result.size,
			fhandle: [result.imageUrl.replace(/(http:\/\/)/gi, '').replace(/\.(com|net)\/.+\//, "\.$1/"), result.size, result.imageName].join('&')
		});
		
		if (this.originText[this.$content.id] == this.$content.value) {
			this.setContentText('');
		}
		this.isImageLoading = true;
	},
	attachToImageWrap: function(url) {
		var $frame = daum.createElement('<div class="smp_image_slot"><span class="smp_image_border"></span><img class="smp_image" src="' + url + '" width="50" height="50" alt="" /><a href="#" class="smp_image_delete">삭제</a></div>');
		if (this.attachImage.length == 0) {
			this.$imageWrap.insertBefore($frame, daum.$$('em', this.$imageWrap)[0]);
			daum.Element.removeClassName(this.$imageWrap, 'hidden');
		} else {
			this.$imageWrap.appendChild($frame);
			daum.Element.addClassName(this.$imageWrap, 'hidden_desc');
		}
		return $frame;
	},
	deleteImage: function(ev) {
		var $el = daum.getElement(ev),
			$wrap = daum.Element.getParent($el);
		if (!daum.Element.hasClassName($el, 'smp_image_delete')) return;
		daum.Event.preventDefault(ev);
		
		var index = this.attachImage.map(function(x) { return x.element; } ).indexOf($wrap);
		this.$imageWrap.removeChild($wrap);
		this.attachImage[index] = null;
		this.attachImage = this.attachImage.compact();
		if (this.attachImage.length == 0) {
			daum.Element.addClassName(this.$imageWrap, 'hidden');
			this.attachImage.length = 0;
			this.showCoca();
		} else if (this.attachImage.length == 1) {
			daum.Element.removeClassName(this.$imageWrap, 'hidden_desc');
		}
		if (this.attachImage.length < this.MAX_IMAGE_COUNT) {
			this.hasAlertMaxImageCount = false;
			this.showCoca();
		}
	},
	removeAllUploadImage: function() {
		daum.$(this.id + "-uploader").removeAll();
	},
	getAttachCount: function() {
		return this.attachImage.length;
	},
	titleWrapHover: function(ev) {
		if (ev.type === 'mouseover') {
			daum.Element.addClassName(this.$titleWrap, 'smp_title_over');
		} else if (ev.type === 'mouseout') {
			daum.Element.removeClassName(this.$titleWrap, 'smp_title_over');
		}
	},
	togglePrivate: function(isPrivate) {
		if (isPrivate) {
			daum.Element.addClassName(this.$private, 'smp_lock');
		} else {
			daum.Element.removeClassName(this.$private, 'smp_lock');
		}
		this.isPrivate = isPrivate;
	},
	globalClickHandler: function(ev, layer, ignoreElems) {
		var $target = daum.getElement(ev),
			passEvent = true;
		for (var i=ignoreElems.length-1; i>=0; i--) {
			if (BlogUtil.Element.hasParentNode($target, ignoreElems[i])) {
				passEvent = false;
				break;
			}
		}
		if (passEvent) {
			this.hideLayer(layer);
		}
	},
	showLayer: function($target) {
		daum.Element.show($target);
	},
	hideLayer: function($target) {
		daum.Element.hide($target);
	},
	clickLinkButton: function(ev) {
		daum.Event.preventDefault(ev);
		this.$link.value = "";
		this.checkPlaceholder('blur', this.$link);
		this.showLayer(this.$linkLayer);
	},
	clickPrivate: function(ev) {
		daum.Event.preventDefault(ev);
		if (!this.option.private) {
			this.togglePrivate(!this.isPrivate);
		}
	},
	clickLink: function(ev) {
		daum.Event.preventDefault(ev);
		var $target = daum.getElement(ev),
			url = this.$link.value.replace('http://', '');
		
		if (daum.Element.hasClassName($target, 'smp_durl')) {
			if (!url) {
				alert(this.message.EMPTY_URL);
				return;
			}
			BlogUtil.Tool.Durl.makeShort(url, function(result) {
				if (result) {
					this.$link.value = result;
				} else {
					alert(this.message.NOT_WORK_DURL);
				}
			}.bind(this));
		} else if (daum.Element.hasClassName($target, 'smp_link_ok')) {
			if (url) {
				this.setContentText('http://' + url + ' ', true);
				this.hideLayer(this.$linkLayer);
			}
		} else if (daum.Element.hasClassName($target, 'smp_link_cancel')) {
			this.hideLayer(this.$linkLayer);
		}
	},
	setContentText: function(text, isAppend) {
		this.checkPlaceholder('focus', this.$content);
		this.$content.value = isAppend ? (this.$content.value + text) : text;
		daum.Element.removeClassName(this.$content, 'placeholder');
	},
	getFhandle: function(encodeFilter) {
		var fhandle = [];
		for (var i=0, len=this.attachImage.length; i<len; i++) {
			if (encodeFilter) {
				fhandle.push(encodeFilter(this.attachImage[i].fhandle));
			} else {
				fhandle.push(this.attachImage[i].fhandle);
			}
		}
		return fhandle;
	},
	getFwidth: function() {
		var fwidth = [];
		for (var i=0, len=this.attachImage.length; i<len; i++) {
			fwidth.push(this.attachImage[i].fwidth);
		}
		return fwidth;
	},
	getParam: function(encodeFilter) {
		var title = this.$title.value,
			content = this.removePlaceholderText(this.$content),
			fhandle = this.getFhandle(),
			fwidth = this.getFwidth();
		if (encodeFilter) {
			title = encodeFilter(title);
			content = encodeFilter(content);
			fhandle = this.getFhandle(encodeFilter);
		}
		
		return {
			articleTitle: title,
			article: content,
			articleOpen: this.isPrivate ? 'B0303' : 'B0301',
			categoryID: this.option.category,
			formName: this.option.formName,
			fhandle: fhandle,
			fwidth: fwidth
		};
	},
	validateForm: function() {
		if (this.$content.value == this.originText[this.$content.id] && this.attachImage.length == 0) {
			alert(this.message.NO_CONTENT);
			return false;
		}
		if (this.isImageLoading == true) {
			alert(this.message.NOT_END_LOADING);
			return false;
		}
		return true;
	},
	submit: function(ev) {
		daum.Event.preventDefault(ev);
		if (!this.validateForm()) return false;
		var url = '/_blog/SimpleEditor.do?blogid=' + BLOGID;
		var param = this.getParam(encodeURIComponent);
		var option = {
			method: 'POST',
			paramString: BlogUtil.String.toQueryStr(param),
			onsuccess: this.submitCompleteHandler.bind(this),
			onfailure: function() {
				alert(this.message.SUBMIT_FAIL);
			}
		};
		new daum.Ajax().request(url, option);
	},
	submitCompleteHandler: function() {
		var category = this.option.category,
			$total = daum.$('totC'),
			$count = daum.$('totC' + category);
		if ($total) {
			$total.innerHTML = parseInt($total.innerHTML) + 1;
		}
		if ($count) {
			$count.innerHTML = parseInt($count.innerHTML) + 1;
		}
		
		setTimeout(function() { goPage(1); }, 10);
	},
	forwardEditor: function() {
		var param = this.getParam(),
			createInputHidden = function(name, val) {
				var el = daum.createElement('<input type="hidden" />');
				el.name = name;
				el.value = val;
				this.$main.appendChild(el);
			}.bind(this);
		for (var name in param) {
			var value = param[name];
			if (name == 'fhandle') {
				for (var i=0, len=value.length; i<len; i++) {
					createInputHidden('fhandle', value[i]);
				}
			} else if (name == 'fwidth') {
				for (var i=0, len=value.length; i<len; i++) {
					createInputHidden('fwidth', value[i]);
				}
			} else {
				createInputHidden(name, value);
			}
		}
		this.$main.submit();
	},
	showFFalert: function(msg) {
		var $alert = $('ff-alter-alert'),
			reposition = function() {
				$alert.style.left = (daum.$("darkLayer").offsetWidth - ($alert.offsetWidth)) / 2 + "px";
				$alert.style.visibility = "visible";
			};
		if (!$alert) {
			$alert = daum.createElement('<div style="position:absolute;left:0;top:320px;width:240px;border:1px solid #000;border-radius:5px;padding:20px 10px 15px;text-align:center;z-index:1001;background:#fff;"><p style="margin:0 0 18px 0;">' + msg + '</p><button onclick="DarkLayer.hideDark();" style="font-size:12px;">확인</button></div>');
			document.body.appendChild($alert);
		}
		if (typeof DarkLayer === 'undefined') return false;
		DarkLayer.showDark($alert, reposition);
	}
};
var loadedDynamicContent = new Array();
// 20050509	textMapping data	by boss
var textMapping = new Array();

// 20070130 profile image size check & resize	by An Do Young
// used in commonMenu.vm && shortInfo.vm && basicInfo.vm 
// Do not resize when img.width is greater than 150px
function profileImgResize (img) {
	img.style.display = "none";
	if (img.width > 150) {
		img.width=150;
	}
	img.style.display = "";
}

function loadAct() {

	// 20050509 set default text input data by boss
	ConvertTVKIT();
	setDefaultText();
}
function ConvertTVKIT(){
	var elem = document.getElementsByName("TVKIT");
	if(elem !=null){
		for(var i=0 ; i < elem.length;i++){
			if(elem[i].nodeName=="P"){
				var url = elem[i].title;
				var str='<OBJECT ID="TVkitPlayCtrl" CLASSID="CLSID:38923956-29D8-4573-A549-2366D5610325" codebase="TVkitPlay.cab#version=0,0,0,1">';
				str+='<param name=movie value="'+url+'">';
				str+='</OBJECT>';
				elem[i].innerHTML=str;
			}
		}
	}
}
function deleteTemplate(objId, pos) {
	document.getElementById(objId).style.display = 'none';
	if(pos == "prev"){
		if(document.getElementById(objId).previousSibling) {
			var tagName = "";
			var obj = document.getElementById(objId).previousSibling;
			while(obj.tagName != "DIV" && obj.className != "right_line_n"){
				obj = obj.previousSibling;
			}
			obj.style.display = 'none';
		}
	}else{
		if(document.getElementById(objId).nextSibling) {
			var tagName = "";
			var obj = document.getElementById(objId).nextSibling;
			while(obj.tagName != "DIV" && obj.className != "right_line_n"){
				obj = obj.nextSibling;
			}
			obj.style.display = 'none';
		}

	}
}

function isLoadedContent(target, num) {
	for(i = 0;i < loadedDynamicContent.length;i++) {
		if(loadedDynamicContent[i] == target + num) {
			return true;
		}
	}
	return false;
}

function setLoadedContent(target, num) {
	loadedDynamicContent[loadedDynamicContent.length] = target + num;
}

function loadDynamicContent(source) {
	if(navigator.userAgent.toLowerCase().indexOf('msie') > -1) {
		if(document.getElementById("dynamicContent")) {
			document.getElementById("dynamicContent").setAttribute("src", source);				
		} else {
			document.write("<script type='text/javascript' id='dynamicContent'" + " src='" + source + "'><" + "/script>");
		}
	} else {
		sc = document.createElement("script");
		sc.src = source;
		document.body.appendChild(sc);
	}
}

function skin_sizeFix() {
	var max_w = 0;
	if (document.getElementById("cT_wrap"))
		max_w = parseInt(document.getElementById("cT_wrap").style.left) + document.getElementById("cT_wrap").offsetWidth;
	else if (document.getElementById("cMainBody")) 
		max_w = 25 + document.getElementById("cMainBody").offsetWidth;

	if (max_w > document.body.offsetWidth)
		document.getElementById("top_skin_img").style.width = max_w;
	else {
		if (document.all)
			document.getElementById("top_skin_img").style.width = document.body.offsetWidth - 20;
		else
			document.getElementById("top_skin_img").style.width = document.body.offsetWidth;
	}
}

function fixLargeSizeElements() {

	if(navigator.userAgent.indexOf("MSIE") ==-1 && document.getElementsByTagName) {
		imgElements = document.getElementsByTagName("img");
			
		for(var j = 0;j < imgElements.length;j++) {
			imgElements[j].onload = fixSize(imgElements[j]);
		}
	}
}

function fixSize(img) {
	while(img.src.indexOf("i1.daumcdn.net/pimg") == -1 && img.name != 'titleImage' && img.width > 546) {
		img.width = 546;
	}	
}

// 20050509	input box set default data		by boss
function setDefaultText() {
	var obj;
	if (typeof(textMapping) != "undefined") {
		for (var i in textMapping) {
			if (document.getElementById(i)) {
				obj = document.getElementById(i);
				if (obj.value == "") {
					obj.value = textMapping[i];
					if(i.indexOf("pwd") > -1) {
						obj.onfocus = focusPasswdBox;
						obj.onblur = blurPasswdBox;
					}else{
						obj.onfocus = focusCommentBox;
						obj.onblur = blurCommentBox;
					}
				}
			}
		}
	}
}
// 20050509	focused input box delete default data	by boss
function delDefaultText() {
	if (this.value == textMapping[this.id]) {
		this.value = "";
	}
}

function focusCommentBox() {
	var obj;
	if(textMapping == null) return;
	if(textMapping[this.id] == null) return;
	if((obj = document.getElementById(this.id))) {
		if (obj.value == textMapping[this.id]) {
			obj.value = "";
		}
	}
}

function blurCommentBox(id) {
	var obj;
	if(textMapping == null) return;
	if(textMapping[this.id] == null) return;
	if((obj = document.getElementById(this.id))) {
		if (obj.value == "") {
			obj.value = textMapping[this.id];
		}
	}
}

function focusPasswdBox() {
	var obj;
	if(textMapping == null) return;
	if(textMapping[this.id] == null) return;
	if((obj = document.getElementById(this.id))) {
		if (obj.value == "") {
			obj.style.background = "#ffffff";
		}
	}
}

function blurPasswdBox(id) {
	var obj;
	if(textMapping == null) return;
	if(textMapping[this.id] == null) return;
	if((obj = document.getElementById(this.id))) {
		if (obj.value == "") {
			obj.style.background = "url(http://i1.daumcdn.net/pimg/blog3/f_pass_1.gif) no-repeat #FFF";
		}
	}
}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// ajax common
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var blogMainAjax=null;
var submitAjax=null;
var messageAjax=null;
var onloadMapping = new Array();
var onUnLoadMapping = new Array();
var historyIndex=0;
var isFirstAjaxCall = true;
var arrHistoryUrl = new Array();
function historySetUrl(idx, url){
	arrHistoryUrl[idx] = url;
}
function historyGetUrl(idx){
	return arrHistoryUrl[idx];
}	

function createCommonAjax(target, loadingArea){
	if(!is_ie3 && !is_ie4){
		onUnLoadExecute();
		
		onloadMapping = null;
		onloadMapping = new Array();
		onUnLoadMapping = null;
		onUnLoadMapping = new Array();
		if(target == null) target="contentArea";
		checkTargetArea(target);
		checkTargetArea(loadingArea);
				
		blogMainAjax = new AjaxObject("blogMainAjax", target, "contents");
		if(loadingArea != null) blogMainAjax.msgArea = loadingArea;
		blogMainAjax.finalProcessFunc = finalLoadAjax;
	}
}

function createMainAjax(target, bNotContentInit){
	if(typeof(ContentViewer) != 'undefined') {
		if( bNotContentInit != null && typeof( bNotContentInit ) && 'undefined' && bNotContentInit == true ) {
			;// Content 초기화가 필요없음
		} else {
			ContentViewer.movePage();
		}
	}
	createCommonAjax(target, "ajax_layer_load");
}

function sendSubmitAjax(formRef, finalFunc, target, paramValues, isMessageAlert){
	if(!is_ie3 && !is_ie4){
		if(target ==null) target="ajax_submit_layer";
		checkTargetArea(target);
		document.getElementById(target).style.display = "none";
		
		submitAjax = new AjaxObject("submitAjax", target, "contents", null);
		if(isMessageAlert != null) submitAjax.isMessageAlert = isMessageAlert;
		if(finalFunc != null) submitAjax.finalProcessFunc = finalFunc;
		if(paramValues!= null) submitAjax.paramValues = paramValues;
		submitAjax.submit(formRef, true);
	}
}

function sendMessageAjax(url, finalFunc, target, paramValues, isMessageAlert){
	if(!is_ie3 && !is_ie4){
		if(target ==null) target="ajax_message_layer";
		checkTargetArea(target);
		document.getElementById(target).style.display = "none";
		
		messageAjax = new AjaxObject("messageAjax", target, "contents", null);
		if(isMessageAlert != null) messageAjax.isMessageAlert = isMessageAlert;
		if(finalFunc != null) messageAjax.finalProcessFunc = finalFunc;
		if(paramValues!= null) messageAjax.paramValues = paramValues;
		messageAjax.message(url, true);
	}
}

function checkTargetArea(target){
	if(!document.getElementById(target)){
		var targetDiv = document.createElement("DIV");
		targetDiv.id = target;
		document.body.appendChild(targetDiv);
	}
}

function addOnUnLoadMapping(param){
	onUnLoadMapping[onUnLoadMapping.length] = param;
}

function addOnLoadMapping(param){
	onloadMapping[onloadMapping.length] = param;
}

function onUnLoadExecute(){
	for(var i=0; i<onUnLoadMapping.length; i++){
		eval(onUnLoadMapping[i]);
	}
}

function onloadExecute(){
	for(var i=0; i<onloadMapping.length; i++){
		eval(onloadMapping[i]);
	}
}
var ftop=0;
function finalLoadAjax(isSuccess, url){
	if(isSuccess || isSuccess == "true"){
		onloadExecute();
		if (typeof Blog !== 'undefined') {
			Blog.Ready.trigger();
		}
//		loadAct();
//		historyInsert(url);
		if( (url.indexOf('ArticleCateList') < 0 || url.indexOf('refequery=') < 0) && url.indexOf('&scroll=no') < 0 ) {
			window.scrollTo(0, ftop);
		}
	}else{
		if(url && url.indexOf(".ajax")>0){
			url = url.substr(0, url.indexOf(".ajax")) + ".do" + url.substr(url.indexOf("?"));
			document.location.href = url;
		}
	}	
}

function historyInitailize() {
	try {
		dhtmlHistory.initialize();
		dhtmlHistory.addListener(historyChange);
	
//		if (dhtmlHistory.isFirstLoad()) {
//			console.log("historyInitailize ajax_history_home");
//			dhtmlHistory.add("ajax_history_home", location);
//		} 
	}catch(e) {}
}

function historyInsert(url) {
	if (url && url.indexOf("&___historyGo__daumBlog") < 0) {
//		if (dhtmlHistory.isFirstLoad()) {
			historySetUrl(historyIndex, url);
			dhtmlHistory.add("ajax_history_"+historyIndex, "historyGetUrl("+historyIndex+")");
			historyIndex++;
//		}
	}
}

function historyChange(newLocation, historyData) {

	if (newLocation == 'ajax_history_home') {
		var firstURL = historyStorage.get("ajax_history_home");
		if (firstURL == document.location.href) {
			document.location.reload();
		}
	} else if (historyData != null) {
		var url = eval(historyData);
		if (url != undefined) {
			createMainAjax();	
			locationAjax(blogMainAjax, url + "&___historyGo__daumBlog");
			window.scrollTo(0, 0);
		}
	} 
}


// 히스토리에는 들어가지 않으나 PV가 잡혀야 할 경우 사용

function PvGenerator(sCheckUrl) {
	this.defaultGeneratorHtml = "/_hdn/action.html";
	this.sCheckUrl = "";
	if( sCheckUrl != null && sCheckUrl.length > 0 ) {
		this.sCheckUrl = sCheckUrl
	}
	else {
		this.sCheckUrl = this.defaultGeneratorHtml;
	}
	document.write("<iframe style='border: 0px; width: 0px; "
						+ "height: 0px; position: absolute; bottom: 0px; "
						+ "right: 0px; visibility: visible;' "
						+ "name='PVGenFrame' id='PVGenFrame' "
						+ "src=''>"
						+ "</iframe>");
}

PvGenerator.prototype.setCheckUrl = function( sCheckUrl ) {
	if( sCheckUrl != null && sCheckUrl.length > 0 ) {
		this.sCheckUrl = sCheckUrl
	}
	else {
		this.sCheckUrl = this.defaultGeneratorHtml;
	}
}

PvGenerator.prototype.generate = function( sRequestQuery, sCheckUrl ) {
	try {
		var sUrl = "";
		if( sCheckUrl != null && sCheckUrl.length > 0 ) {
			sUrl = sCheckUrl;
		}
		else {
			sUrl = this.sCheckUrl;
		}
		if (this.oIframeArea == null) {
			this.oIframeArea = window.frames["PVGenFrame"];
		}
		if (this.oIframeArea != null) {
			this.oIframeArea.location.replace(sUrl+"?" + sRequestQuery);
			
		}		
	} catch( e ) {
	}
}

function	requestAjaxCheck( sRequestQuery, sCheckUrl ) {
	if( oPvGen != null ) {
		oPvGen.generate( sRequestQuery, sCheckUrl );
	}
}

var		oPvGen = new PvGenerator();

function ResizeLoadImage(obj, maxwidth, maxheight) {

	var oTmpImg = new Image();
	if( is_ie ) {
		oTmpImg.onreadystatechange = function() {
			if(this.readyState == "complete") {
				if( this.width < maxwidth && this.height < maxheight ) {
					obj.width = this.width;
					obj.height = this.height;
				}else {
					heightEst = maxwidth*this.height/this.width;
					widthEst = maxheight*this.width/this.height;
					if( heightEst <= maxheight ) {
						obj.width = maxwidth;
						obj.height = heightEst;
					}
					else {
						obj.width = widthEst;
						obj.height = maxheight;
					}
				}
			}
		};
	} else {
		oTmpImg.onload = function() {
			if( this.width < maxwidth && this.height < maxheight ) {
				obj.width = this.width;
				obj.height = this.height;
			}else {
				heightEst = maxwidth*this.height/this.width;
				widthEst = maxheight*this.width/this.height;
				if( heightEst <= maxheight ) {
					obj.width = maxwidth;
					obj.height = heightEst;
				}
				else {
					obj.width = widthEst;
					obj.height = maxheight;
				}
			}
		};
	}
	oTmpImg.src = obj.src;
}

var fade_timer;
var opacity = 0.2;
function fade_effect(){
	clearTimeout(fade_timer);
	var viewObj = document.getElementById('image_view');
	if( viewObj == null ) {
		return;
	}
	viewObj.style.filter = "alpha(opacity:"+opacity*100+")";
	viewObj.style.opacity = opacity;
	if( opacity < 1 ){
		opacity += 0.2;
		fade_timer = setTimeout(fade_effect, 10)
	}
	else{
		opacity = 0.2;
	}
}
GetX = function(object) {
	if(object == null) return 0;
	var nLeft = 0;
    do {
      nLeft += object.offsetLeft || 0;
	  if(object == document.body) break;
      object = GetOffsetParent(object);
    } while(object);
	return nLeft;
};

GetY = function(object) {
	if(object == null) return 0;
	var nTop = 0;
    do {
      nTop += object.offsetTop || 0;
	  if(object == document.body) break;
      object = GetOffsetParent(object);
    } while(object);
    return nTop;
};


GetOffsetParent = function(object)
{
	try{
		if(object.offsetParent)
			return object.offsetParent;
	}catch(e){ return document.body; }

	if (object == document.body) return object;

	while ((object = object.parentNode) && object != document.body) {
		try{
		if (object.style.position == "absolute" || object.style.position == "relative")
			return object;
		}catch(e){ return document.body; }
	}
	return document.body;
};

function goListImage(isNext) {
	var	f = document.getElementById("moreRequest");
	var blogid = f.blogid.value;
	var categoryid = f.categoryid.value;
	var minseq = f.minseq.value;
	var minarticleno = f.minarticleno.value;
	var minregdt = f.minregdt.value;
	var maxseq = f.maxseq.value;
	var maxarticleno = f.maxarticleno.value;
	var maxregdt = f.maxregdt.value;
	
	createCommonAjax("preview_list_box", null);
	
	if( isNext ) {
		var currentPage = f.currentPage.value;
		var beforePage = parseInt(currentPage)-1;
		locationAjax(blogMainAjax, "/_blog/photoList.do?blogid="+blogid+"&isSlide=1&categoryid="+categoryid+"&currentPage="+currentPage+"&beforePage="+beforePage+"&minseq="+minseq+"&minarticleno="+minarticleno+"&minregdt="+minregdt+"&___historyGo__daumBlog");
		if( typeof(requestAjaxCheck) == 'function' ) {
			requestAjaxCheck("action=photoList&blogid="+blogid+"&currentPage="+currentPage);
		}
	}
	else {
		var beforePage = f.beforePage.value;
		var currentPage = parseInt(beforePage)-1;
		locationAjax(blogMainAjax, "/_blog/photoList.do?blogid="+blogid+"&isSlide=1&categoryid="+categoryid+"&currentPage="+currentPage+"&beforePage="+beforePage+"&maxseq="+maxseq+"&maxarticleno="+maxarticleno+"&maxregdt="+maxregdt+"&___historyGo__daumBlog");
		if( typeof(requestAjaxCheck) == 'function' ) {
			requestAjaxCheck("action=photoList&blogid="+blogid+"&currentPage="+currentPage);
		}
	}
}

/* MSN messenger */
function chgMsnSkin(code){
	document.getElementById('MSNL').style.backgroundImage = 'url(http://i1.daumcdn.net/pimg/blog3/admin/msn_' + code + '01.gif)'
	document.getElementById('MSNR').style.backgroundImage = 'url(http://i1.daumcdn.net/pimg/blog3/admin/msn_' + code + '03.gif)'
	document.getElementById('innerMSN').style.backgroundImage = 'url(http://i1.daumcdn.net/pimg/blog3/admin/msn_' + code + '02.gif)'
	document.getElementById('innerpMSN').style.backgroundImage = 'url(http://i1.daumcdn.net/pimg/blog3/admin/msn_' + code + '01.gif)'		
	document.msnForm.color.value=code;
}

// Copyright (c) Microsoft Corporation. All rights reserved.
function Microsoft_Live_Messenger_PresenceButton_startConversation(conversationUrl)
{
	window.open(conversationUrl, '_blank', 'height=300px,width=300px');
}

function Microsoft_Live_Messenger_PresenceButton_onStyleChange(element) {
	if (element && element.presence) {
		Microsoft_Live_Messenger_PresenceButton_onPresence(element.presence);
	}
}

function Microsoft_Live_Messenger_PresenceButton_onPresence(presence)
{
	var idx = presence.id.indexOf('@');
	if (idx >= 0) {
	
		var msnTitle = 	cutStr(presence.displayName,20);
		
		if(!presence.statusText || presence.statusText == '' || presence.statusText == 'Offline' || presence.statusText == '오프라인') {
			msnTitle = "로그아웃 상태입니다.";
		}
	
		if(document.all) {
			document.getElementById("nameid").innerText =  msnTitle;
		} else {
			document.getElementById("nameid").innerHTML =  msnTitle;
		}
		document.getElementById("msnIconImg").src = presence.icon.url;
	}
}

function releaseResting(type, isMaster){
	var chk = true;
	if(type=="minidaum" || type=="profile"){
		chk = confirm("회원님의 블로그는 지난 1년간 작성된 게시물이 없어 휴면되었습니다.\n휴면을 해제하시겠습니까?");
	}
	if(!chk) return;	
	var url = "/_blog/DormancyReset.ajax";
	var successFn = "successReleaseResting";
	window[successFn] = function(req){
		var result = req.responseXML.getElementsByTagName("contents");
		var resultText = "";
		if(result && result[0] && result[0].firstChild){
			resultText = result[0].firstChild.nodeValue;	
		}
		if(resultText=="SUCCESS"){
			if(type=="top"){
				var btn = document.getElementById("restBtnTop");
				if(btn){
					btn.parentNode.removeChild(btn);
				}
			}else{
				//미니다음영역 우선제외
				/*
				var btn = document.getElementById("restBtnMinidaum");
				if(btn){
					if(isMaster){
						btn.href = "javascript:goPostNewEditor();";	
					}else{
						btn.href = "/_blog/blogDesignRedirect.do?viewWriteform=p";
						btn.target = "_top";
					}
					btn.innerHTML = "글쓰기";
					btn = null;					
				}
				*/
				//프로필 영역
				var btn = document.getElementById("restBtnProfile");
				if(btn){
					btn.href = "javascript:goPostNewEditor();";
					btn.innerHTML = "<span class=\"kr\">글쓰기</span><span class=\"en\">Write</span>";
					btn = null;					
				}
			}
		}else{
			failReleaseResting();	
		}
	}
	var failFn = "failReleaseResting";
	loadXMLDoc("POST", url, "", successFn, failFn, true);
}


function failReleaseResting(){
	alert("휴면해제에 실패하였습니다. 잠시 후 시도해주세요.");
}

function isDormancy(obj){
	alert("이 블로그는 장기간 회원활동이 없어 친구 외에는 글을 남기실 수 없습니다.");
	if(obj && obj.blur) obj.blur();
}

function useSimpleID(obj){
	//if(confirm("간편 아이디로는 글을 작성하실 수 없습니다. 회원 인증을 하시겠습니까?")){
	//	window.location = "https://user.daum.net/checkidentity/namecheck/authsimpleid.daum?rtnURL=" + encodeURIComponent(window.location);
	//}else{
	//	if(obj && obj.blur) obj.blur();		
	//}
}

function readyToWrite(obj, idx){
	ready = daum.$("readytowrite"+idx);
	if(ready.value != "Y") {
		ready.value = "Y";
		obj.style.color = "#666666";
		obj.value = "";
	} 
	
}
/*
Copyright (c) 2007 Brian Dillard and Brad Neuberg:
Brian Dillard | Project Lead | bdillard@pathf.com | http://blogs.pathf.com/agileajax/
Brad Neuberg | Original Project Creator | http://codinginparadise.org
   
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
(the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
	dhtmlHistory: An object that provides history, history data, and bookmarking for DHTML and Ajax applications.
	
	dependencies:
		* the historyStorage object included in this file.

*/
window.dhtmlHistory = {
	
	/*Public: User-agent booleans*/
	isIE: false,
	isOpera: false,
	isSafari: false,
	isKonquerer: false,
	isGecko: false,
	isSupported: false,
	
	/*Public: Create the DHTML history infrastructure*/
	create: function(options) {
		
		/*
			options - object to store initialization parameters
			options.debugMode - boolean that causes hidden form fields to be shown for development purposes.
			options.toJSON - function to override default JSON stringifier
			options.fromJSON - function to override default JSON parser
		*/

		var that = this;

		/*set user-agent flags*/
		var UA = navigator.userAgent.toLowerCase();
		var platform = navigator.platform.toLowerCase();
		var vendor = navigator.vendor || "";
		if (vendor === "KDE") {
			this.isKonqueror = true;
			this.isSupported = false;
		} else if (typeof window.opera !== "undefined") {
			this.isOpera = true;
			this.isSupported = true;
		} else if (typeof document.all !== "undefined") {
			this.isIE = true;
			this.isSupported = true;
		} else if (vendor.indexOf("Apple Computer, Inc.") > -1) {
			this.isSafari = true;
			this.isSupported = (platform.indexOf("mac") > -1);
		} else if (UA.indexOf("gecko") != -1) {
			this.isGecko = true;
			this.isSupported = true;
		}

		/*Set up the historyStorage object; pass in init parameters*/
		window.historyStorage.setup(options);

		/*Execute browser-specific setup methods*/
		if (this.isSafari) {
			this.createSafari();
		} else if (this.isOpera) {
			this.createOpera();
		}
		
		/*Get our initial location*/
		var initialHash = this.getCurrentLocation();

		/*Save it as our current location*/
		this.currentLocation = initialHash;

		/*Now that we have a hash, create IE-specific code*/
		if (this.isIE) {
			this.createIE(initialHash);
		}

		/*Add an unload listener for the page; this is needed for FF 1.5+ because this browser caches all dynamic updates to the
		page, which can break some of our logic related to testing whether this is the first instance a page has loaded or whether
		it is being pulled from the cache*/

		var unloadHandler = function() {
			that.firstLoad = null;
		};
		
		this.addEventListener(window,'unload',unloadHandler);		

		/*Determine if this is our first page load; for IE, we do this in this.iframeLoaded(), which is fired on pageload. We do it
		there because we have no historyStorage at this point, which only exists after the page is finished loading in IE*/
		if (this.isIE) {
			/*The iframe will get loaded on page load, and we want to ignore this fact*/
			this.ignoreLocationChange = true;
		} else {
			if (!historyStorage.hasKey(this.PAGELOADEDSTRING)) {
				/*This is our first page load, so ignore the location change and add our special history entry*/
				this.ignoreLocationChange = true;
				this.firstLoad = true;
				historyStorage.put(this.PAGELOADEDSTRING, true);
			} else {
				/*This isn't our first page load, so indicate that we want to pay attention to this location change*/
				this.ignoreLocationChange = false;
				/*For browsers other than IE, fire a history change event; on IE, the event will be thrown automatically when its
				hidden iframe reloads on page load. Unfortunately, we don't have any listeners yet; indicate that we want to fire
				an event when a listener is added.*/
				this.fireOnNewListener = true;
			}
		}

		/*Other browsers can use a location handler that checks at regular intervals as their primary mechanism; we use it for IE as
		well to handle an important edge case; see checkLocation() for details*/
		var locationHandler = function() {
			that.checkLocation();
		};
		setInterval(locationHandler, 100);
	},	
	
	/*Public: Initialize our DHTML history. You must call this after the page is finished loading.*/
	initialize: function() {
		/*IE needs to be explicitly initialized. IE doesn't autofill form data until the page is finished loading, so we have to wait*/
		if (this.isIE) {
			/*If this is the first time this page has loaded*/
			if (!historyStorage.hasKey(this.PAGELOADEDSTRING)) {
				/*For IE, we do this in initialize(); for other browsers, we do it in create()*/
				this.fireOnNewListener = false;
				this.firstLoad = true;
				historyStorage.put(this.PAGELOADEDSTRING, true);
			}
			/*Else if this is a fake onload event*/
			else {
				this.fireOnNewListener = true;
				this.firstLoad = false;   
			}
		}
	},

	/*Public: Adds a history change listener. Note that only one listener is supported at this time.*/
	addListener: function(listener) {
		this.listener = listener;
		/*If the page was just loaded and we should not ignore it, fire an event to our new listener now*/
		if (this.fireOnNewListener) {
			this.fireHistoryEvent(this.currentLocation);
			this.fireOnNewListener = false;
		}
	},
	
	/*Public: Generic utility function for attaching events*/
	addEventListener: function(o,e,l) {
		if (o.addEventListener) {
			o.addEventListener(e,l,false);
		} else if (o.attachEvent) {
			o.attachEvent('on'+e,function() {
				l(window.event);
			});
		}
	},
	
	/*Public: Add a history point.*/
	add: function(newLocation, historyData) {
		
		if (this.isSafari) {
			
			/*Remove any leading hash symbols on newLocation*/
			newLocation = this.removeHash(newLocation);

			/*Store the history data into history storage*/
			historyStorage.put(newLocation, historyData);

			/*Save this as our current location*/
			this.currentLocation = newLocation;
	
			/*Change the browser location*/
			window.location.hash = newLocation;
		
			/*Save this to the Safari form field*/
			this.putSafariState(newLocation);

		} else {
			
			/*Most browsers require that we wait a certain amount of time before changing the location, such
			as 200 MS; rather than forcing external callers to use window.setTimeout to account for this,
			we internally handle it by putting requests in a queue.*/
			var that = this;
			var addImpl = function() {

				/*Indicate that the current wait time is now less*/
				if (that.currentWaitTime > 0) {
					that.currentWaitTime = that.currentWaitTime - that.waitTime;
				}
			
				/*Remove any leading hash symbols on newLocation*/
				newLocation = that.removeHash(newLocation);

				/*IE has a strange bug; if the newLocation is the same as _any_ preexisting id in the
				document, then the history action gets recorded twice; throw a programmer exception if
				there is an element with this ID*/
				if (document.getElementById(newLocation) && that.debugMode) {
					var e = "Exception: History locations can not have the same value as _any_ IDs that might be in the document,"
					+ " due to a bug in IE; please ask the developer to choose a history location that does not match any HTML"
					+ " IDs in this document. The following ID is already taken and cannot be a location: " + newLocation;
					throw new Error(e); 
				}

				/*Store the history data into history storage*/
				historyStorage.put(newLocation, historyData);

				/*Indicate to the browser to ignore this upcomming location change since we're making it programmatically*/
				that.ignoreLocationChange = true;

				/*Indicate to IE that this is an atomic location change block*/
				that.ieAtomicLocationChange = true;

				/*Save this as our current location*/
				that.currentLocation = newLocation;
		
				/*Change the browser location*/
				window.location.hash = newLocation;

				/*Change the hidden iframe's location if on IE*/
				if (that.isIE) {
					that.iframe.src = "blank.html?" + newLocation;
				}

				/*End of atomic location change block for IE*/
				that.ieAtomicLocationChange = false;
			};

			/*Now queue up this add request*/
			window.setTimeout(addImpl, this.currentWaitTime);

			/*Indicate that the next request will have to wait for awhile*/
			this.currentWaitTime = this.currentWaitTime + this.waitTime;
		}
	},

	/*Public*/
	isFirstLoad: function() {
		return this.firstLoad;
	},

	/*Public*/
	getVersion: function() {
		return "0.6";
	},

	/*Get browser's current hash location; for Safari, read value from a hidden form field*/

	/*Public*/
	getCurrentLocation: function() {
		var r = (this.isSafari
			? this.getSafariState()
			: this.getCurrentHash()
		);
		return r;
	},
	
	/*Public: Manually parse the current url for a hash; tip of the hat to YUI*/
    getCurrentHash: function() {
		var r = window.location.href;
		var i = r.indexOf("#");
		return (i >= 0
			? r.substr(i+1)
			: ""
		);
    },
	
	/*- - - - - - - - - - - -*/
	
	/*Private: Constant for our own internal history event called when the page is loaded*/
	PAGELOADEDSTRING: "DhtmlHistory_pageLoaded",
	
	/*Private: Our history change listener.*/
	listener: null,

	/*Private: MS to wait between add requests - will be reset for certain browsers*/
	waitTime: 200,
	
	/*Private: MS before an add request can execute*/
	currentWaitTime: 0,

	/*Private: Our current hash location, without the "#" symbol.*/
	currentLocation: null,

	/*Private: Hidden iframe used to IE to detect history changes*/
	iframe: null,

	/*Private: Flags and DOM references used only by Safari*/
	safariHistoryStartPoint: null,
	safariStack: null,
	safariLength: null,

	/*Private: Flag used to keep checkLocation() from doing anything when it discovers location changes we've made ourselves
	programmatically with the add() method. Basically, add() sets this to true. When checkLocation() discovers it's true,
	it refrains from firing our listener, then resets the flag to false for next cycle. That way, our listener only gets fired on
	history change events triggered by the user via back/forward buttons and manual hash changes. This flag also helps us set up
	IE's special iframe-based method of handling history changes.*/
	ignoreLocationChange: null,

	/*Private: A flag that indicates that we should fire a history change event when we are ready, i.e. after we are initialized and
	we have a history change listener. This is needed due to an edge case in browsers other than IE; if you leave a page entirely
	then return, we must fire this as a history change event. Unfortunately, we have lost all references to listeners from earlier,
	because JavaScript clears out.*/
	fireOnNewListener: null,

	/*Private: A variable that indicates whether this is the first time this page has been loaded. If you go to a web page, leave it
	for another one, and then return, the page's onload listener fires again. We need a way to differentiate between the first page
	load and subsequent ones. This variable works hand in hand with the pageLoaded variable we store into historyStorage.*/
	firstLoad: null,

	/*Private: A variable to handle an important edge case in IE. In IE, if a user manually types an address into their browser's
	location bar, we must intercept this by calling checkLocation() at regular intervals. However, if we are programmatically
	changing the location bar ourselves using the add() method, we need to ignore these changes in checkLocation(). Unfortunately,
	these changes take several lines of code to complete, so for the duration of those lines of code, we set this variable to true.
	That signals to checkLocation() to ignore the change-in-progress. Once we're done with our chunk of location-change code in
	add(), we set this back to false. We'll do the same thing when capturing user-entered address changes in checkLocation itself.*/
	ieAtomicLocationChange: null,
	
	/*Private: Create IE-specific DOM nodes and overrides*/
	createIE: function(initialHash) {
		/*write out a hidden iframe for IE and set the amount of time to wait between add() requests*/
		this.waitTime = 400;/*IE needs longer between history updates*/
		var styles = (historyStorage.debugMode
			? 'width: 800px;height:80px;border:1px solid black;'
			: historyStorage.hideStyles
		);
		var iframeID = "rshHistoryFrame";
		var iframeHTML = '<iframe frameborder="0" id="' + iframeID + '" style="' + styles + '" src="blank.html?' + initialHash + '"></iframe>';
		document.write(iframeHTML);
		this.iframe = document.getElementById(iframeID);
	},
	
	/*Private: Create Opera-specific DOM nodes and overrides*/
	createOpera: function() {
		this.waitTime = 400;/*Opera needs longer between history updates*/
		var imgHTML = '<img src="javascript:location.href=\'javascript:dhtmlHistory.checkLocation();\';" style="' + historyStorage.hideStyles + '" />';
		document.write(imgHTML);
	},
	
	/*Private: Create Safari-specific DOM nodes and overrides*/
	createSafari: function() {
		var formID = "rshSafariForm";
		var stackID = "rshSafariStack";
		var lengthID = "rshSafariLength";
		var formStyles = historyStorage.debugMode ? historyStorage.showStyles : historyStorage.hideStyles;
		var inputStyles = (historyStorage.debugMode
			? 'width:800px;height:20px;border:1px solid black;margin:0;padding:0;'
			: historyStorage.hideStyles
		);
		var safariHTML = '<form id="' + formID + '" style="' + formStyles + '">'
			+ '<input type="text" style="' + inputStyles + '" id="' + stackID + '" value="[]"/>'
			+ '<input type="text" style="' + inputStyles + '" id="' + lengthID + '" value=""/>'
		+ '</form>';
		document.write(safariHTML);
		this.safariStack = document.getElementById(stackID);
		this.safariLength = document.getElementById(lengthID);
		if (!historyStorage.hasKey(this.PAGELOADEDSTRING)) {
			this.safariHistoryStartPoint = history.length;
			this.safariLength.value = this.safariHistoryStartPoint;
		} else {
			this.safariHistoryStartPoint = this.safariLength.value;
		}
	},
	
	/*Private: Safari method to read the history stack from a hidden form field*/
	getSafariStack: function() {
		var r = this.safariStack.value;
		return historyStorage.fromJSON(r);
	},

	/*Private: Safari method to read from the history stack*/
	getSafariState: function() {
		var stack = this.getSafariStack();
		var state = stack[history.length - this.safariHistoryStartPoint - 1];
		return state;
	},			
	/*Private: Safari method to write the history stack to a hidden form field*/
	putSafariState: function(newLocation) {
	    var stack = this.getSafariStack();
	    stack[history.length - this.safariHistoryStartPoint] = newLocation;
	    this.safariStack.value = historyStorage.toJSON(stack);
	},

	/*Private: Notify the listener of new history changes.*/
	fireHistoryEvent: function(newHash) {
		/*extract the value from our history storage for this hash*/
		var historyData = historyStorage.get(newHash);
		/*call our listener*/
		this.listener.call(null, newHash, historyData);
	},
	
	/*Private: See if the browser has changed location. This is the primary history mechanism for Firefox. For IE, we use this to
	handle an important edge case: if a user manually types in a new hash value into their IE location bar and press enter, we want to
	to intercept this and notify any history listener.*/
	checkLocation: function() {
		
		/*Ignore any location changes that we made ourselves for browsers other than IE*/
		if (!this.isIE && this.ignoreLocationChange) {
			this.ignoreLocationChange = false;
			return;
		}

		/*If we are dealing with IE and we are in the middle of making a location change from an iframe, ignore it*/
		if (!this.isIE && this.ieAtomicLocationChange) {
			return;
		}
		
		/*Get hash location*/
		var hash = this.getCurrentLocation();

		/*Do nothing if there's been no change*/
		if (hash == this.currentLocation) {
			return;
		}

		/*In IE, users manually entering locations into the browser; we do this by comparing the browser's location against the
		iframe's location; if they differ, we are dealing with a manual event and need to place it inside our history, otherwise
		we can return*/
		this.ieAtomicLocationChange = true;

		if (this.isIE && this.getIframeHash() != hash) {
			this.iframe.src = "blank.html?" + hash;
		}
		else if (this.isIE) {
			/*the iframe is unchanged*/
			return;
		}

		/*Save this new location*/
		this.currentLocation = hash;

		this.ieAtomicLocationChange = false;

		/*Notify listeners of the change*/
		this.fireHistoryEvent(hash);
	},

	/*Private: Get the current location of IE's hidden iframe.*/
	getIframeHash: function() {
		var doc = this.iframe.contentWindow.document;
		var hash = String(doc.location.search);
		if (hash.length == 1 && hash.charAt(0) == "?") {
			hash = "";
		}
		else if (hash.length >= 2 && hash.charAt(0) == "?") {
			hash = hash.substring(1);
		}
		return hash;
	},

	/*Private: Remove any leading hash that might be on a location.*/
	removeHash: function(hashValue) {
		var r;
		if (hashValue === null || hashValue === undefined) {
			r = null;
		}
		else if (hashValue === "") {
			r = "";
		}
		else if (hashValue.length == 1 && hashValue.charAt(0) == "#") {
			r = "";
		}
		else if (hashValue.length > 1 && hashValue.charAt(0) == "#") {
			r = hashValue.substring(1);
		}
		else {
			r = hashValue;
		}
		return r;
	},

	/*Private: For IE, tell when the hidden iframe has finished loading.*/
	iframeLoaded: function(newLocation) {
		/*ignore any location changes that we made ourselves*/
		if (this.ignoreLocationChange) {
			this.ignoreLocationChange = false;
			return;
		}

		/*Get the new location*/
		var hash = String(newLocation.search);
		if (hash.length == 1 && hash.charAt(0) == "?") {
			hash = "";
		}
		else if (hash.length >= 2 && hash.charAt(0) == "?") {
			hash = hash.substring(1);
		}
		/*Keep the browser location bar in sync with the iframe hash*/
		window.location.hash = hash;

		/*Notify listeners of the change*/
		this.fireHistoryEvent(hash);
	}

};

/*
	historyStorage: An object that uses a hidden form to store history state across page loads. The mechanism for doing so relies on
	the fact that browsers save the text in form data for the life of the browser session, which means the text is still there when
	the user navigates back to the page. This object can be used independently of the dhtmlHistory object for caching of Ajax
	session information.
	
	dependencies: 
		* json2007.js (included in a separate file) or alternate JSON methods passed in through an options bundle.
*/
window.historyStorage = {
	
	/*Public: Set up our historyStorage object for use by dhtmlHistory or other objects*/
	setup: function(options) {
		
		/*
			options - object to store initialization parameters - passed in from dhtmlHistory or directly into historyStorage
			options.debugMode - boolean that causes hidden form fields to be shown for development purposes.
			options.toJSON - function to override default JSON stringifier
			options.fromJSON - function to override default JSON parser
		*/
		
		/*process init parameters*/
		if (typeof options !== "undefined") {
			if (options.debugMode) {
				this.debugMode = options.debugMode;
			}
			if (options.toJSON) {
				this.toJSON = options.toJSON;
			}
			if (options.fromJSON) {
				this.fromJSON = options.fromJSON;
			}
		}		
		
		/*write a hidden form and textarea into the page; we'll stow our history stack here*/
		var formID = "rshStorageForm";
		var textareaID = "rshStorageField";
		var formStyles = this.debugMode ? historyStorage.showStyles : historyStorage.hideStyles;
		var textareaStyles = (historyStorage.debugMode
			? 'width: 800px;height:80px;border:1px solid black;'
			: historyStorage.hideStyles
		);
		var textareaHTML = '<form id="' + formID + '" style="' + formStyles + '">'
			+ '<textarea id="' + textareaID + '" style="' + textareaStyles + '"></textarea>'
		+ '</form>';
		document.write(textareaHTML);
		this.storageField = document.getElementById(textareaID);
		if (typeof window.opera !== "undefined") {
			this.storageField.focus();/*Opera needs to focus this element before persisting values in it*/
		}
	},
	
	/*Public*/
	put: function(key, value) {
		this.assertValidKey(key);
		/*if we already have a value for this, remove the value before adding the new one*/
		if (this.hasKey(key)) {
			this.remove(key);
		}
		/*store this new key*/
		this.storageHash[key] = value;
		/*save and serialize the hashtable into the form*/
		this.saveHashTable();
	},

	/*Public*/
	get: function(key) {
		this.assertValidKey(key);
		/*make sure the hash table has been loaded from the form*/
		this.loadHashTable();
		var value = this.storageHash[key];
		if (value === undefined) {
			value = null;
		}
		return value;
	},

	/*Public*/
	remove: function(key) {
		this.assertValidKey(key);
		/*make sure the hash table has been loaded from the form*/
		this.loadHashTable();
		/*delete the value*/
		delete this.storageHash[key];
		/*serialize and save the hash table into the form*/
		this.saveHashTable();
	},

	/*Public: Clears out all saved data.*/
	reset: function() {
		this.storageField.value = "";
		this.storageHash = {};
	},

	/*Public*/
	hasKey: function(key) {
		this.assertValidKey(key);
		/*make sure the hash table has been loaded from the form*/
		this.loadHashTable();
		return (typeof this.storageHash[key] !== "undefined");
	},

	/*Public*/
	isValidKey: function(key) {
		return (typeof key === "string");
	},
	
	/*Public - CSS strings utilized by both objects to hide or show behind-the-scenes DOM elements*/
	showStyles: 'border:0;margin:0;padding:0;',
	hideStyles: 'left:-1000px;top:-1000px;width:1px;height:1px;border:0;position:absolute;',
	
	/*Public - debug mode flag*/
	debugMode: false,
	
	/*- - - - - - - - - - - -*/

	/*Private: Our hash of key name/values.*/
	storageHash: {},

	/*Private: If true, we have loaded our hash table out of the storage form.*/
	hashLoaded: false, 

	/*Private: DOM reference to our history field*/
	storageField: null,

	/*Private: Assert that a key is valid; throw an exception if it not.*/
	assertValidKey: function(key) {
		var isValid = this.isValidKey(key);
		if (!isValid && this.debugMode) {
			throw new Error("Please provide a valid key for window.historyStorage. Invalid key = " + key + ".");
		}
	},

	/*Private: Load the hash table up from the form.*/
	loadHashTable: function() {
		if (!this.hashLoaded) {	
			var serializedHashTable = this.storageField.value;
			if (serializedHashTable !== "" && serializedHashTable !== null) {
				this.storageHash = this.fromJSON(serializedHashTable);
				this.hashLoaded = true;
			}
		}
	},
	/*Private: Save the hash table into the form.*/
	saveHashTable: function() {
		this.loadHashTable();
		var serializedHashTable = this.toJSON(this.storageHash);
		this.storageField.value = serializedHashTable;
	},
	/*Private: Bridges for our JSON implementations - both rely on 2007 JSON.org library - can be overridden by options bundle*/
	toJSON: function(o) {
		return o.toJSONString();
	},
	fromJSON: function(s) {
		return s.parseJSON();
	}
};


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



function goPage(page){
	if(document.getElementsByName("cateList").length>0 ){
		goCatePage(page);
	}else if(document.getElementsByName("articleTypeList").length>0){
		goTypeMainPage(page);
	}else if(document.getElementsByName("lastList").length>0){
		goLastPage(page);
	}else if(document.getElementsByName("boardList").length>0 ){
		goBoardPage(page);
	}else if(document.getElementsByName("themeList").length>0){
		goThemePage(page);
	}else if(document.getElementsByName("articleList").length>0){
		goAllPage(page);
	}else if(document.getElementsByName("movieList").length>0){
		goMoviePage(page);
	}else if(document.getElementsByName("photoList").length>0){
		goPhotoPage(page);
	}else if(document.getElementsByName("articleTemp").length>0){
		goTempPage(page);
	}else if(document.getElementsByName("referList").length>0){
		goReferSearchPage(page);
	}else if(document.getElementsByName("travelArticleList").length>0){
		goTravelPage(page);
	}else if(document.getElementsByName("search_result").length>0){
		goSearchPage(page);
	}else if(document.getElementsByName("ebookList").length>0){
		goEbookList(page);
	}else if(document.getElementsByName("cmmtRegForm").length>0 ){
		goProfilePage(page);		
	}else{
		goAllPage(page);
	}
}

	function goSearchPage(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		var obj;
		var f = document.frm;

    		f.page.value=page;
    		obj = getForm(f);

		locationAjax(blogMainAjax,"/_blog/search.do?"+ obj);
	}


function goPageAjax(url){
		createMainAjax();
		loadedDynamicContent = new Array();
		locationAjax(blogMainAjax, url);
		setLastPageUrl(url);
}
	
function goBoardPage(page){
    	createMainAjax();
    	var search ="";
    	var sword = document.getElementById("boardsearchword");
		var is_boardcnt_exist = false;
		if(document.getElementById("boardcount")){
			is_boardcnt_exist = true;
		}
		if (typeof(page) == "undefined") {
			is_boardcnt_exist = false;
			page = 0;
		}
		if (page == 0){
    		if(sword !=null)  document.getElementById("boardsearchword").innerHTML="";
    		page =1;
    	}
    	if( sword !=null){
    		var swsw = sword.innerHTML;
    		var pot = swsw.indexOf("=");
    		swk = swsw.substring(0,pot);
    		sww = swsw.substring(pot+1)
    		search = "&"+swk+"="+encodeURIComponent(sww);
    	}
    	if (is_boardcnt_exist){
    		var count = document.getElementById("boardcount").innerHTML;
	    	locationAjax(blogMainAjax, "/_blog/BoardView.do?currentPage="+page+"&blogid="+BLOGID+"&totalcount="+count+search);
		}else{
			locationAjax(blogMainAjax, "/_blog/BoardView.do?currentPage="+page+"&blogid="+BLOGID+search);
		}
}

function goThemePage(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		if(document.getElementsByName("themeList").length>0){
    	 	frm = document.themeList;
    		frm.currentPage.value=page;
    		//var totcnt = document.getElementById("totT").innerHTML;
    		var obj = getForm(frm);//+"&totalcnt="+totcnt;
		}
		locationAjax(blogMainAjax, "/_blog/ThemeList.do?"+obj);
}

function goTempPage(page){
	createMainAjax();
	loadedDynamicContent = new Array();
	if(document.getElementsByName("articleTemp").length>0){
		frm = document.articleTemp;
		var url = "/_blog/ArticleTempList.do?blogid=" + frm.blogid.value;
		url += "&currentPage=" + page + "&beforePage=" + frm.currentPage.value;
		url += "&maxregdt=" + frm.maxregdt.value + "&minregdt=" + frm.minregdt.value;
		locationAjax(blogMainAjax, url);
	}
	
}

function goCatePage(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		if(document.getElementsByName("cateList").length>0){
    	 	frm = document.cateList;
    		frm.currentPage.value=page;
    		var cate = frm.CATEGORYID.value
				if(cate == "0") { 
					cate = ""; 
				}     		
   			var totcnt = document.getElementById("totC"+cate).innerHTML;
			frm.articleno.value = "";
			frm.regdt.value = "";
    		var obj = getForm(frm)+"&totalcnt="+totcnt;
		}
		locationAjax(blogMainAjax,"/_blog/ArticleCateList.do?"+ obj);
}

function goMoviePage(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		var obj;
		frm = document.movieList;
		
		if(document.getElementsByName("movieList").length>0){
    		frm.currentPage.value=page;
    		if(document.getElementById("totC")!=null)
    		var totcnt = document.getElementById("totC").innerHTML;
    		var categoryid = document.getElementById("categoryid") ? document.getElementById("categoryid").innerHTML : "";
    		var obj = getForm(frm)+"&totalcnt="+totcnt+"&categoryid="+categoryid;
		}else{
			obj = "blogid="+BLOGID+"&categoryid="+categoryid;
		}
		locationAjax(blogMainAjax,"/_blog/movieList.do?"+ obj);
}

function goPhotoPage(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		var obj;
		frm = document.photoList;
		if(document.getElementsByName("photoList").length>0){
    		frm.currentPage.value=page;
    		if(document.getElementById("totC")!=null){
	    		var totcnt = document.getElementById("totC").innerHTML;
	    	}
    		if(document.getElementById("categoryid")!=null){
    			var categoryid = document.getElementById("categoryid").innerHTML;
    		}
    		var obj = getForm(frm)+"&totalcnt="+totcnt+"&categoryid="+categoryid;
		}else{
			obj = "blogid="+BLOGID+"&categoryid="+categoryid;
		}
		locationAjax(blogMainAjax,"/_blog/photoList.do?"+ obj);
}

// neouser 
function goReferSearchPage(page, init){
	var count = 1;
	if (page != null) { count = page; } 

	document.referList.dispkind.value="B2204";
	
	createMainAjax("bC_refer_search_list_box", true);
 	loadedDynamicContent = new Array();
	var obj;
	frm = document.referList;
	if(document.getElementsByName("referList").length>0){
	 	frm.currentPage.value=count;
		obj = getForm(frm);
	}
	else{
		obj = "blogid="+BLOGID;
	}
	if( init != null ) {
		locationAjax(blogMainAjax, "/_blog/hdn/ArticleCateList.do?"+obj);
		window.isAjax=false;
	} else {
		locationAjax(blogMainAjax, "/_blog/ArticleCateList.do?"+obj);
		if( typeof(requestAjaxCheck) == 'function' ) {
			requestAjaxCheck("action=ArticleCateList&"+obj);
		}
	}
}

function goAllPage(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		var obj;
		frm = document.articleList;
    		
		if(document.getElementsByName("articleList").length>0){
    	 	frm.currentPage.value=page;
    		if(document.getElementById("totC")!=null)
    		var totcnt = document.getElementById("totC").innerHTML;
    		obj = getForm(frm)+"&totalcnt="+totcnt;
		} 
		else{
			obj = "blogid="+BLOGID;
		}
		locationAjax(blogMainAjax, "/_blog/blogMain.do?"+obj);
}

function goProfilePage(page){
	createMainAjax("pCont_comm_list", true);
	locationAjax(blogMainAjax, "/_blog/ProfileCommentsList.ajax?blogid="+BLOGID+"&currentPage="+page);
}

function goTravelPage(page, code, totalCount, area){
	createMainAjax();
	loadedDynamicContent = new Array();
	var obj;
	
	if(document.getElementsByName("travelArticleList").length>0){
		frm = document.travelArticleList;
	 	frm.currentPage.value = page;
	 	if (code) frm.code.value = code;
	 	if (totalCount) frm.totalCount.value = totalCount;
	 	if (area) frm.area.value = area;
	 	obj = getForm(frm);
	} 
	else{
		obj = "blogid=" + BLOGID + "&code=" + code + "&totalCount=" + totalCount + "&area=" + area;
	}
	locationAjax(blogMainAjax, "/_blog/PostingmapList.do?"+obj);
}

function goTypeMainPage(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		var obj;
		frm = document.articleTypeList;
		if(document.getElementsByName("articleTypeList").length>0){
    	 	frm.currentPage.value=page;
    		if(document.getElementById("totC")!=null){
    			var cate = frm.CATEGORYID.value
				if(cate == "0"){ cate = ""; }    		
    			var totcnt = document.getElementById("totC"+cate).innerHTML;
    		}
			if(page != 0){
				frm.articleno.value = "";
				frm.regdt.value = "";
			}
    		obj = getForm(frm)+"&totalcnt="+totcnt;
		} 
		else{
			obj = "blogid="+BLOGID;
		}
		locationAjax(blogMainAjax, frm.action+"?"+obj);
}

function goLastPage(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		if(document.getElementsByName("lastList").length>0 ){
    	 	frm = document.lastList;
    		frm.currentPage.value=page;
    		var totcnt = 0;// document.getElementById("totC"+frm.CATEGORYID.value).innerHTML;
    		var obj = getForm(frm)+"&totalcnt="+totcnt;
		}
		locationAjax(blogMainAjax,"/_blog/ArticleLastList.do?"+ obj);
}

function goListInView(page) {
		createMainAjax("bC_article_list_box", true);
	 	loadedDynamicContent = new Array();
		if(document.getElementsByName("inViewList").length>0){
    	 	frm = document.inViewList;
    		frm.currentPage.value=page;
    		var obj = getForm(frm);
		}
		locationAjax(blogMainAjax, "/_blog/ArticleListInView.do?"+obj+"&___historyGo__daumBlog");
		if( typeof(requestAjaxCheck) == 'function' ) {
			requestAjaxCheck("action=ArticleListInView&"+obj);
		}
}

function goListTitle(page){
			if(document.getElementsByName("cateList").length>0 ){
				document.cateList.dispkind.value="B2202";
			}
			else if(document.getElementsByName("lastList").length>0 ){
				document.lastList.dispkind.value="B0802";
			}
			else if(document.getElementsByName("articleTypeList").length > 0){
				document.articleTypeList.viewKind.value="T";
				document.articleTypeList.dispkind.value="B2202";
				document.articleTypeList.action="/_blog/ArticleCateList.do";
			}
			else if(document.getElementsByName("articleList").length > 0){
				document.articleList.dispkind.value="B0802";
			}
					
			if(page==0) {
				goPage(0);
			} else { 
				goPage(1);
			}
}

function goListBody(page){
			if(document.getElementsByName("cateList").length>0){
				document.cateList.dispkind.value="B2201";
			}else if(document.getElementsByName("lastList").length>0 ){
				document.lastList.dispkind.value="B0802";
			}else if(document.getElementsByName("articleTypeList").length > 0){
				document.articleTypeList.viewKind.value="V";
				document.articleTypeList.dispkind.value="B2201";
				document.articleTypeList.action="/_blog/ArticleCateList.do";
			}else if(document.getElementsByName("articleList").length > 0){
				document.articleList.dispkind.value="B0801";
			}
			if(page==0) {
				goPage(0);
			} else { 
				goPage(1);
			}
}

function goListWebzine(page){
			if(document.getElementsByName("cateList").length>0){
				document.cateList.dispkind.value="B2203";
			}else if(document.getElementsByName("lastList").length>0 ){
				document.lastList.dispkind.value="B0802";
			}else if(document.getElementsByName("articleTypeList").length > 0){
				document.articleTypeList.viewKind.value="S";
				document.articleTypeList.dispkind.value="B2203";
				document.articleTypeList.action="/_blog/ArticleCateList.do";
			}else if(document.getElementsByName("articleList").length > 0){
				document.articleList.dispkind.value="B0803";
			}
			if(page==0) {
				goPage(0);
			} else { 
				goPage(1);
			}
}

function goEbookList(page){
		createMainAjax();
		loadedDynamicContent = new Array();
		var obj;
		frm = document.ebookList;
		if(document.getElementsByName("ebookList").length>0){
    		frm.currentPage.value=page;
			var obj = getForm(frm);
		}else{
			obj = "blogid="+BLOGID;
		}
		locationAjax(blogMainAjax,"/_blog/EbookList.do?"+ obj);
}

function viewEbook(location){
	createMainAjax();
	loadedDynamicContent = new Array();
	locationAjax(blogMainAjax, location);
}

function openerReloadSelfClose(reloadUrl, popWin){
	createMainAjax();
	blogMainAjax.finalProcessFunc = function (){if(popWin){popWin.close();}};
	locationAjax(blogMainAjax, reloadUrl);	
}

function viewAjaxCateArticle(link, cate, menuIndex){
		// change title menu item class
		if (typeof changeMenuOn == "function" && typeof menuIndex != "undefined") changeMenuOn(menuIndex);
		createMainAjax();
	 	loadedDynamicContent = new Array();
	 	
	 	if(cate=="0"){ cate = ""; }
	 	
		if(document.getElementById("totC"+cate)){
    		var totcnt = document.getElementById("totC"+cate).innerHTML;
    		link+="&totalcnt="+totcnt;
		}

		locationAjax(blogMainAjax, link);
		if(document.getElementById("linkCategory_"+cate)){
			if(document.getElementById("linkCategory_"+cate).style)
			document.getElementById("linkCategory_"+cate).style.textDecoration="underline";
			addOnUnLoadMapping("document.getElementById(\"linkCategory_"+cate+"\").style.textDecoration=\"\";");
		}
}

function viewAjaxArticle(link, curObj, menuIndex){
		// change title menu item class
		if (typeof changeMenuOn == "function" && typeof menuIndex != "undefined") changeMenuOn(menuIndex);
		
		createMainAjax();
	 	loadedDynamicContent = new Array();
		if(document.getElementById("totC")){
    		var totcnt = document.getElementById("totC").innerHTML;
    		link+="&totalcnt="+totcnt;
		}
		locationAjax(blogMainAjax, link);
		if(curObj){
			if(curObj.style)
			curObj.style.textDecoration="underline";
			addOnUnLoadMapping("document.getElementById(\""+curObj.id+"\").style.textDecoration=\"\";");
		}
}

function viewAjaxThemeList(link,count,cate, menuIndex){
		// change title menu item class
		if (typeof changeMenuOn == "function" && typeof menuIndex != "undefined") changeMenuOn(menuIndex);
		
		createMainAjax();
	 	loadedDynamicContent = new Array();
		link+="&totalcnt="+count;
		locationAjax(blogMainAjax, link);
		if(document.getElementById("linkCategory_"+cate)){
			if(document.getElementById("linkCategory_"+cate).style)
			document.getElementById("linkCategory_"+cate).style.textDecoration="underline";
			addOnUnLoadMapping("document.getElementById(\"linkCategory_"+cate+"\").style.textDecoration=\"\";");
		}
}

function viewLastDayAjaxArticle(link, menuIndex){
		// change title menu item class
		if (typeof changeMenuOn == "function" && typeof menuIndex != "undefined") changeMenuOn(menuIndex);
		
		createMainAjax();
	 	loadedDynamicContent = new Array();
		//var totcnt = document.getElementById("totC").innerHTML;
		//link+="&totalcnt="+totcnt;
		locationAjax(blogMainAjax, link);
}

var lastPageUrl;
function setLastPageUrl(link){
	lastPageUrl = link;
}
function getLastPageUrlEncoded(){
	return encodeURIComponent(lastPageUrl);
}

var lastElementId;
function viewAjaxCollection(link, elementId){
		createMainAjax();

		locationAjax(blogMainAjax, link);
		setLastPageUrl(link);
		if(document.getElementById(lastElementId)){			
			document.getElementById(lastElementId).style.textDecoration ="none";
		}
		if(document.getElementById(elementId)){				
			document.getElementById(elementId).style.textDecoration ="underline";
			lastElementId = elementId;
		}
}
function ToogleListInView(bIsHelpClose) {
		var oOpenAnchor = document.getElementById("open_list");
		var oInViewDiv = document.getElementById("bC_article_list_box");

		if( oOpenAnchor == null || oInViewDiv == null ) {
			return;
		}

		if(oOpenAnchor.className == 'closed_list'){
			oOpenAnchor.className = 'open_list';
			oInViewDiv.style.display = 'block';
			goListInView("");
			oOpenAnchor.innerHTML = "목록닫기" ;
		}
		else{
			if( typeof(bIsHelpClose) != 'undefined' && bIsHelpClose  ) {
				return ;
			}
			oOpenAnchor.className = 'closed_list';
			oInViewDiv.style.display = 'none';
			oOpenAnchor.innerHTML = "목록열기" ;
		}
}
/*
메뉴 (photo/movie/theme) 클릭했을때 언더라인 그어 주는 펑션 
*/
function toggleunderline(type){
	var omenuphoto = document.getElementById("cate_photo");
	var omenumovie = document.getElementById("cate_movie");
	var omenutheme = document.getElementById("cate_theme");
	if(omenuphoto == null || omenumovie == null || omenutheme == null){
		return ;
	}
	if(type == 'P'){
	  omenuphoto.childNodes[0].className = "under";
	  omenumovie.childNodes[0].className = "";
	  omenutheme.childNodes[0].className = "";
	}else if (type=="M"){
	  omenuphoto.childNodes[0].className = "";
	  omenumovie.childNodes[0].className = "under";
	  omenutheme.childNodes[0].className = "";
	}else{
	  omenuphoto.childNodes[0].className = "";
	  omenumovie.childNodes[0].className = "";
	  omenutheme.childNodes[0].className = "under";
	}
}function loadXMLDoc(method,url,data,func,funcfail, isSync) {
    var xmlhttp=null;
    var vf = function(){
      if (xmlhttp.readyState==4) {
        if (xmlhttp.status==200) {
        	if(func !=null)
          		eval(func+'(xmlhttp)');
        } else {
        	if(funcfail !=null)
          		eval(funcfail+'(xmlhttp)');
        }
      }
    }
	try{
    	if (window.XMLHttpRequest) {
        	xmlhttp=new XMLHttpRequest();
    	} else if (window.ActiveXObject) {
        	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    	}
	}catch(err){
		return false;
	}
	if(xmlhttp!=null){
		if(isSync == null) {
			isSync = true;
		}
		try{
    		xmlhttp.onreadystatechange=vf;
    		if(method=="POST" && (data !=null || data !="")){
      			xmlhttp.open("POST",url,isSync);
	  			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	  			xmlhttp.setRequestHeader("Content-Length", data.length);
	  			xmlhttp.setRequestHeader("Connetion","close");
      			xmlhttp.send(data);
    		}else{
      			xmlhttp.open("GET",url,isSync);
      			xmlhttp.send(null);
    		}
		}catch(e){
			return false;
		}
		return true;
	}else{
		return false;
	}
}
function loadXMLDocWithParam(method,url,data,func,funcfail,obj) {
    var xmlhttp=null;
    var vf = function(){
      if (xmlhttp.readyState==4) {
        if (xmlhttp.status==200) {
        	if( func != null )
          		eval(func+'(xmlhttp,obj)');
        } else {
        	if(funcfail !=null)
          		eval(funcfail+'(xmlhttp)');
        }
      }
    }
	try{
    	if (window.XMLHttpRequest) {
        	xmlhttp=new XMLHttpRequest();
    	} else if (window.ActiveXObject) {
        	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    	}
	}catch(err){
		return false;
	}
	if(xmlhttp!=null){
		try{
    		xmlhttp.onreadystatechange=vf;
    		if(method=="POST" && (data !=null || data !="")){
      			xmlhttp.open("POST",url,true);
	  			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	  			xmlhttp.setRequestHeader("Content-Length", data.length);
	  			xmlhttp.setRequestHeader("Connetion","close");
      			xmlhttp.send(data);
    		}else{
      			xmlhttp.open("GET",url,true);
      			xmlhttp.send(null);
    		}
		}catch(e){
			return false;
		}
		return true;
	}else{
		return false;
	}
}
var tsleep = 0;
var mopac=0;
var viewLayer = false;
var lastClickUrl="";
function sleep(){
	var obj = document.getElementById("dashboard");
	if(!viewLayer){
		if(mopac<100){
			mopac+=30;
			obj.style.filter="alpha(opacity="+mopac+")";
			obj.style.MozOpacity= mopac*0.05;
		}else{
			clearTimeout(tsleep);
			tsleep=0;
			mopac=100;
			viewLayer = true;
		}
	}else{
		if(mopac> 0){
			mopac-=30;
			obj.style.filter="alpha(opacity="+mopac+")";
			obj.style.MozOpacity= mopac*0.05;
		}else{
			clearTimeout(tsleep);
			tsleep=0;
			mopac=0;
			viewLayer = false;
			obj.style.display="none";	
		}
	}
	
}
function sleep2(){
	var obj = document.getElementById("dashboard");
	if(!viewLayer){
		obj.style.display="block";
		viewLayer = true;
	}else{
		obj.style.display="none";
		viewLayer = false;
	}
}
function fncom_chk_strlength_cut(vn_maxlength, vn_str) {
	var vn_sumlength=0;
	var vn_restr='';
	for(var i= 0;i < vn_str.length; i++) {
		if( escape(vn_str.charAt(i)).length > 3 ) { vn_length = 2; }
		else if (vn_str.charAt(i) == '<' || vn_str.charAt(i) == '>') { vn_length = 4; }
		else { vn_length = 1 ; }
		if ( vn_maxlength < (vn_sumlength + vn_length) ) { break; }
		vn_sumlength += vn_length;
		vn_restr += vn_str.charAt(i);
	}
	return (vn_restr);
}
function cutStr(str,limit){ 
  var tmpStr = str; 
  var byte_count = 0; 
  var len = str.length; 
  var dot = ""; 
   
  for(var i=0; i<len; i++){ 
    byte_count += chr_byte(str.charAt(i)); 
    if(byte_count == limit-1){ 
      if(chr_byte(str.charAt(i+1)) == 2){ 
        tmpStr = str.substring(0,i+1); 
        dot = "..."; 
      }else { 
        if(i+2 != len) dot = ".."; 
        tmpStr = str.substring(0,i+2); 
      } 
      break; 
    }else if(byte_count == limit){ 
      if(i+1 != len) dot = ".."; 
      tmpStr = str.substring(0,i+1); 
      break; 
    } 
  } 
  return (tmpStr+dot); 
  //return true; 
} 
function chr_byte(chr){ 
  if(escape(chr).length > 4) 
    return 2; 
  else 
    return 1; 
} 

function viewDiv(linkobj,event){
	var xpos=0;
	var ypos=0;
	var mousex=0;
	var mousey=0;
	if(linkobj !=null){
		xpos =findPosX(linkobj);
		ypos =findPosY(linkobj);
		if(window.event){
			mousex = event.clientX;
			mousey = event.clientY;
		}else{
 			mousex = event.pageX-document.body.scrollLeft;
        //    mousey = event.pageY-document.body.scrollTop;
            mousey = event.pageY;
		}
		var docX = document.body.clientWidth;
		var docY = document.body.clientHeight;
	}
	var obj = document.getElementById("dashboard");
	if(!viewLayer){
		if(mousex+200 > docX) xpos= xpos - 300;
		if(mousey+200 > docY) ypos= ypos - 200;
		obj.style.top = ypos;
		obj.style.left = xpos+100;
	//	obj.style.MozOpacity= 0;
		obj.style.display="block";	
	}
sleep2();
//	if(tsleep==0)
//		tsleep  = setInterval("sleep()", 50); 
}
function checkOut(e){
		if(!e) var e = window.event;
		var tg = (window.event)? e.srcElement:e.target;
		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
		if(tg.nodeName !='DIV') return;
		while( reltg != tg && reltg.nodeName !='BODY'){
				reltg = reltg.parentNode;
				if(reltg == tg) return;
		}
		if(reltg.nodeName=='BODY'){
				viewDiv(null,null);
		}
}
function findPosX(obj){
		var curleft = 0;
		if(obj != null && obj.offsetParent){
				while(obj.offsetParent){
						curleft +=obj.offsetLeft;
						obj = obj.offsetParent;
				}
		}else if(obj !=null && obj.x){
				curleft += obj.x;
		}
		return curleft;
}
function findPosY(obj){
		var curtop = 0;

		if(obj != null && obj.offsetParent){
				while(obj.offsetParent){
						curtop +=obj.offsetTop;
						obj = obj.offsetParent;
				}
		}else if(obj != null && obj.y){
				curtop += obj.y;
		}
		return curtop;
}
function viewBlogList(linkobj,url,event){
		if(url.indexOf("http://blog.daum.net") > -1){
			url = url.substring(url.lastIndexOf("/")+1);
		}
		if(lastClickUrl != url){ // .. .....
			viewLayer = false;
		}
		lastClickUrl = url;
		if(!viewLayer){
			clickAreaCheck = true;
			var rtn = false;
			document.getElementById("resultarea").innerHTML = "<BR><BR><BR><CENTER><B> RSS를 읽는 중입니다.<br /> 잠시만 기다려 주세요</B></CENTER>";
			viewDiv(linkobj,event);
			rtn = loadXMLDoc("GET","/xml/rss/"+url,null,"WriteRSS","RSSFAIL");
			if(rtn ==false){
				RSSFAIL(null);
				return ;
			}
		}else{
			viewDiv(null,null);
			clickAreaCheck = false;
		}
}
function RSSFAIL(xmlhttp){
	xmlhttp = null;
	if(lastClickUrl.indexOf("http://")>-1){
		location.href=lastClickUrl;
	}else{
		location.href="/"+lastClickUrl;
	}
}
function WriteRSS(xmlhttp) {
	if ( xmlhttp ) {
		try{
			var xmldoc = getXMLDocument(xmlhttp);

			resultDiv = document.getElementById("resultarea");
			var items = xmldoc.getElementsByTagName('item');
			var channel = xmldoc.getElementsByTagName('channel');
			var webmaster = channel[0].getElementsByTagName('webMaster')[0].firstChild.nodeValue;
			var bloglink = channel[0].getElementsByTagName('link')[0].firstChild.nodeValue;
			var blogtitle = channel[0].getElementsByTagName('title')[0].firstChild.nodeValue;
			blogtitle =cutStr(blogtitle,26);	
			var head="<table width='200' border='0' cellpadding='0' cellspacing='0' background='http://i1.daumcdn.net/pimg/blog/p_img/visit_box_top_new.gif'><tr><td height=28>";
			head+="<a href='"+bloglink+"' class='bd_12_161615' style='margin:0 2 0 7' target='_top'>"+blogtitle+"</td></tr> </table>";
			var content="<table width='200' border='0' cellpadding='0' cellspacing='0' background='http://i1.daumcdn.net/pimg/blog/p_img/visit_box_bg_new.gif'><tr> <td height='10'></td></tr>";
			if(items.length> 10)
					tlen = 10;
			else
					tlen = items.length;
			for(var i = 0; i < tlen; i++) {
				var title = items[i].getElementsByTagName('title')[0];
				var title_text = title.firstChild.nodeValue
				var link = items[i].getElementsByTagName('link')[0];
				var link_text = link.firstChild.nodeValue;
				title_text = cutStr(title_text,26);
				content = content + "<tr><td><img src=http://i1.daumcdn.net/pimg/blog/p_img/visit_dot.gif align=absmiddle style='margin:0 4 0 7'><a href='" + link_text + "' class='d_12_6D6765' target='_blank'>" + title_text + "</a></td></tr><tr><td height='4'></td></tr>";
			}
			content+="<tr><td height='10'></td></tr></table><table width='200' border='0' cellpadding='0' cellspacing='0' background='http://i1.daumcdn.net/pimg/blog/p_img/visit_box_bottom_new.gif'><tr><td height='1'></td></tr></table>";
			resultDiv.innerHTML = head+content;
		}catch(e){
			location.href="/"+lastClickUrl;
		}
		xmlhttp = null;
	}
}

function getForm(frm){
		var len = frm.length;
		
		var obj="";
		for(i = 0 ; i < len; i++){
			if(frm[i].type =="radio" && !frm[i].checked)
				continue;
			if(frm[i].type =="checkbox" && !frm[i].checked)
				continue;
			if(frm[i].tagName =="SELECT") {
				for( j=0; j < frm[i].length; j++ ) {
					if( frm[i][j].selected ) {
						obj+="&"+frm[i].name+"="+encodeURIComponent(frm[i][j].value);
					}
				}
			} else {
				try {
					obj+="&"+frm[i].name+"="+encodeURIComponent(frm[i].value);
				}catch(e) {
					obj+="&"+frm[i].name+"="+frm[i].value;
				}
			}
		}
		return obj.substr(1);
}
function getSimpleResponse(oXmlHttp){
	var oXmlDoc = getXMLDocument(oXmlHttp);

	var items = oXmlDoc.getElementsByTagName('contents');
	if(items !=null)
		return items[0].firstChild.nodeValue;
	else
		return "";
}

function getXMLDocument(xmlhttp){
	var response;
	try{
		var is_ie = ((navigator.userAgent.toLowerCase().indexOf("msie") != -1) && (navigator.userAgent.toLowerCase().indexOf("opera") == -1));
		if (!is_ie){
			response = (new DOMParser()).parseFromString(xmlhttp.responseText, "text/xml");
		}else{
			response = xmlhttp.responseXML;
		}
	}catch(e){}	
	return response;
}/* 관리를 위한 암전 */
var DarkLayer = {
	initDarkLayer: function() {
		this.isInit = false;
		this.isDark = false;

		this.oPopLayer = null;
		this.oDarkNode = document.createElement("DIV");
		this.oDarkNode.id = "darkLayer";
		this.oDarkNode.className = "inBright";
		this.nReloadStat = 0; // 0이 바꾼것 없음, 1이면 카테고리, 2면 전체 리로드
		
		this.sLastUrl = "";

		var oBody = document.getElementsByTagName("body").item(0);
		if( oBody != null ) {
			oBody.appendChild(this.oDarkNode);
		}
		else {
			document.write(this.oDarkNode.outerHTML);
		}

		this.nDarkWidth = 0;
		this.nDarkHeight = 0;

		this.oInterval = null;
		this.nCheckTime = 1000;
		
		this.aCheckList = new Array();

		KeyManager.addAction("keydown", function(eEvent) {
			if(!DarkLayer.isDark) return;
			if(eEvent.keyCode == 27) {
				if( typeof( hideAdmin ) != null && typeof( hideAdmin ) !='undefined' ) {
					hideAdmin();
				}
			}
		});
	},
	showDark: function(oPopLayer, fAction, isWidget) {
		if(!this.isInit) {
			this.initDarkLayer();
			this.isInit = true;
		}
		this.aCheckList.length = 0; //페이지변경시마다 초기화
		this.initCheckBoxs("object");
		this.initCheckBoxs("embedt");
		this.initCheckBoxs("select");
		if(!isWidget){
			this.initCheckBoxs("iframe");
		}
		this.oPopLayer = oPopLayer;
		this.change(true, fAction);
	},
	showDarkDeco: function(oPopLayer, fAction, isWidget) {
		if(!this.isInit) {
			this.initDarkLayer();
			this.isInit = true;
		}
		this.aCheckList.length = 0; //페이지변경시마다 초기화
		this.initCheckBoxs("select");
		if(!isWidget){
			this.initCheckBoxs("iframe");
		}
		this.oPopLayer = oPopLayer;
		this.change(true, fAction);
	},
	hideDark: function() {
		this.change(false);
	},
	initCheckBoxs: function(sTagName) {
		var aCheckList = document.getElementsByTagName(sTagName);
		for(var i=0; i<aCheckList.length; i++) {
			if( aCheckList.item(i).getAttribute("id") != "adminFrame" ) { // Admin 를 위한 프레임은 제외
				this.aCheckList.push(aCheckList.item(i));
			}
		}
	},
	getHeight: function() {
		var nHeight = 0;

		if (window.innerHeight && window.scrollMaxY) {
			nHeight = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){
			nHeight = document.body.scrollHeight;
		} else {
			nHeight = document.body.offsetHeight;
		}
		
		var nWHeight;
		if (self.innerHeight) {
			nWHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.scrollHeight && document.documentElement.clientHeight ) { 
			if( document.documentElement.scrollHeight > document.documentElement.clientHeight ) {
				nWHeight = document.documentElement.scrollHeight;
			}
			else {
				nWHeight = document.documentElement.clientHeight;
			}
		} else if (document.body) {
			nWHeight = document.body.clientHeight;
		}	

		if(nHeight < nWHeight){
			return nWHeight;
		} else { 
			return nHeight;
		}
	},
	getWidth: function() {
		var nWidth = 0;

		if (window.innerWidth && window.scrollMaxX) {
			nWidth = window.innerWidth + window.scrollMaxX;
		} else if (document.body.scrollWidth > document.body.offsetWidth){
			nWidth = document.body.scrollWidth;
		} else {
			nWidth = document.body.offsetWidth;
		}
		
		var nWWidth;
		if (self.innerWidth) {
			nWWidth = self.innerWidth;
		} else if (document.documentElement && document.documentElement.scrollWidth && document.documentElement.clientWidth ) { 
			if( document.documentElement.scrollWidth > document.documentElement.clientWidth ) {
				nWWidth = document.documentElement.scrollWidth;
			}
			else {
				nWWidth = document.documentElement.clientWidth;
			}
		} else if (document.body) {
			nWWidth = document.body.clientWidth;
		}	

		if(nWidth < nWWidth){
			return nWWidth;
		} else { 
			return nWidth;
		}
	},
	change: function(isDark, fAction) {
		if( this.isDark == isDark ) {
			return;
		}
		if( isDark ) {
			this.nDarkWidth = this.getWidth();
			this.nDarkHeight = this.getHeight();
			this.oDarkNode.style.width = this.nDarkWidth+"px";
			this.oDarkNode.style.height = this.nDarkHeight+"px";
			this.oDarkNode.className = "inDark";
			this.oPopLayer.className = "inDark";

			if(fAction != null) {
				fAction();
			}
			this.hideCheckBox();
			this.startCheckingResize();
		} else {
			clearInterval(this.oInterval);
			
			this.oDarkNode.className = "inBright";
			this.oPopLayer.className = "inBright";

			this.showCheckBox();
			this.stopCheckingResize();
		}
		this.isDark = isDark;
	},
	hideCheckBox: function() {
		for(var i=0; i<this.aCheckList.length; i++) {
			this.aCheckList[i].style.visibility = "hidden";
		}
	},
	showCheckBox: function() {
		for(var i=0; i<this.aCheckList.length; i++) {
			this.aCheckList[i].style.visibility = "visible";
		}
	},
	startCheckingResize: function() {
		this.oInterval = setInterval("DarkLayer.checkResize()", this.nCheckTime);
	},
	stopCheckingResize: function() {
		clearInterval(this.oInterval);
	},
	checkResize: function() {
		if(!this.isDark) return;

		var nDarkWidth = this.getWidth();
		var nDarkHeight = this.getHeight();
		
		if(!((navigator.userAgent.toLowerCase().indexOf("msie") != -1) && (navigator.userAgent.toLowerCase().indexOf("opera") == -1)) ) {
			nDarkWidth -= 16;
			nDarkHeight -= 16;
		}
		
		var nDarkWidth_diff = Math.abs(nDarkWidth - this.nDarkWidth);
		var nDarkHeight_diff = Math.abs(nDarkHeight - this.nDarkHeight);
		if( nDarkWidth_diff > 1 || nDarkHeight_diff > 1 ) {
			this.nDarkWidth = nDarkWidth;
			this.nDarkHeight = nDarkHeight;
			this.oDarkNode.style.width = this.nDarkWidth+"px";
			this.oDarkNode.style.height = this.nDarkHeight+"px";
		}
	},
	setLastUrl: function(sLastUrl) {
		this.sLastUrl = sLastUrl;
	},
	getLastUrl: function() {
		return this.sLastUrl;
	},
	setReloadStat: function(nReloadStat) {
		this.nReloadStat = nReloadStat;
	}
}

var blogSheetRemove = false;
function showAdmin(type, nil) {
	var nilTag = (!nil) ? "" : "&" + nil;
		if( type == null || typeof(type)=='undefined' || type == 0) {
			location.href = "/_blog/adminTop.do?blogid="+BLOGID+nilTag;
		} else if( type == 1 ) { //bloginfo
			location.href = "/_blog/basicInfo.do?blogid="+BLOGID;
		} else if( type == 2 ) { //category
			location.href = "/_blog/menuCategory.do?blogid="+BLOGID;
		} else if( type == 3 ) { //ccl
			location.href = "/_blog/protectAdmin.do?blogid="+BLOGID;
		} else if( type == 4 ) { //즐겨찾기
			location.href = "/_blog/bookmark/bookmarkFolderManageForm.do?blogid="+BLOGID;
		} else if( type == 5 ) { //배경음악
			location.href = "/_blog/adminBlogBgm.do?blogid="+BLOGID;
		} else if( type == 6 ) { //배경음악
			location.href = "/_blog/adminCafeBanner.do?blogid="+BLOGID;
		} else if( type == 7 ) { //댓글관리 
			location.href = "/_blog/contentOpinion.do?blogid="+BLOGID;
		} else if( type == 8 ) { //친구 블로그 
			location.href = "/_blog/friendList.do?blogid="+BLOGID+nilTag;
		} else if( type == 9 ) { //방문자 
			location.href = "/_blog/visitorCount.do?blogid="+BLOGID;	
		}else if( type == 10 ) { //나를 즐겨찾기 한 사람 
			location.href = "/_blog/adminYourFavorite.do?blogid="+BLOGID;	
		}else if( type == 11 ) { //RSS
			location.href = "/_blog/rss/ManagerFolderUpdateForm.do?blogid="+BLOGID;	
		}else if( type == 12 ) { //글보내기(ccl)
			location.href = "/_blog/protectAdmin.do?blogid="+BLOGID;	
		}else if( type == 13 ) { //엮인글
			location.href = "/_blog/contentTrackback.do?blogid="+BLOGID;	
		}else if( type == 14 ) { //친구 신청관리
			location.href = "/_blog/friendCalledList.do?blogid="+BLOGID;
		}else if( type == 15) { // 글 관리
			location.href = "/_blog/contentStmt.do?blogid="+BLOGID;
		}else if( type == 16) { // 기본정보
			location.href = "/_blog/basicInfo.do?blogid="+BLOGID;
		}else if( type == 17) { // 블로그북
			location.href = "/_blog/ebook.do?blogid="+BLOGID;
		}else if( type == 18) {	// 내글 지도
			location.href = "/_blog/mapPosting.do?blogid="+BLOGID;
		}else if(type == 19){
			location.href = "/_blog/bookmark/bookmarkListManage.do?blogid="+BLOGID;
		} else {
			location.href = "/_blog/adminTop.do?blogid="+BLOGID+nilTag;
		}
}

function showWidgetControl(retUrl) {
/* 임시 봉인
	if(navigator.userAgent.indexOf("MSIE")!=-1){
		var blogSheet=document.styleSheets[0]
		for (i=0; i<blogSheet.rules.length; i++){
			if (blogSheet.rules[i].selectorText.toLowerCase()=="html"){
				blogSheet.removeRule(i);
				break;
			}
			if(i>5) break;
		}
		document.body.scroll = 'no';
		document.body.style.marginRight = 18 + "px";
	}else{
		//thinking
	}
*/
	var oViewFrame = document.getElementById("displayWidget");
	oViewFrame.style.display = 'block';
	oViewFrame.style.left = (document.documentElement.scrollWidth/2 - 315) + 'px';
	if(document.all && document.documentElement.offsetHeight > 630){
		oViewFrame.style.top = document.documentElement.scrollTop + (document.documentElement.offsetHeight - 630)/2
	}
	else{
		oViewFrame.style.top = (document.documentElement.scrollTop + 20) + 'px';
	}
	if(!document.all){
		document.getElementById('widgetLayerShadow').style.background = "url(http://i1.daumcdn.net/pimg/blog3/admin/widget_bg.png) no-repeat";
	}
	DarkLayer.showDark(document.getElementById("displayWidget"), function() {
		document.getElementById("displayWidgetF").src = retUrl;
	}, true);
}

function setReloadStat(nReloadStat) {
	if( DarkLayer != null ) {
		if( DarkLayer.nReloadStat < nReloadStat ) {
			DarkLayer.setReloadStat(nReloadStat);
		}
	}
}

function hideAdmin(bIsReload) {
	DarkLayer.setLastUrl("");
	if( bIsReload == null || bIsReload == true ) {		
		var url = top.location.href;
		if(url.indexOf("admin=4") > 0) {
			DarkLayer.nReloadStat = 0;
			url = url.replace("&admin=4", "");
			setTimeout(function (){top.location.href = url}, 10);
		} else if( DarkLayer.nReloadStat == 1 ) {
			DarkLayer.nReloadStat = 0;
			var obj = new Object();
			obj.blogid = BLOGID;
			UcateCallbackDelay(null, obj);
		} else if( DarkLayer.nReloadStat == 2 ) {
			DarkLayer.nReloadStat = 0;
			setTimeout(function (){top.location.href = url}, 10);
		} else if( DarkLayer.nReloadStat == 3 ) {
			DarkLayer.nReloadStat = 0;
			setTimeout(function (){top.location.href = url}, 10);
		}
	}	
	
	DarkLayer.hideDark();
	
	try {
		if(navigator.userAgent.indexOf("MSIE")!=-1){
			if(blogSheetRemove == true){
				document.styleSheets[0].addRule("html", "overflow: scroll;	overflow-x: auto;")
			}
			document.body.scroll = 'yes';
			document.body.style.marginRight = 0 + "px";
		}else{
			//thinking
		}
	} catch( e ) {
	}
}

function hideWidgetControl() {
/* 임시봉인
	if(navigator.userAgent.indexOf("MSIE")!=-1){
		document.styleSheets[0].addRule("html", "overflow: scroll;	overflow-x: auto;")
		document.body.scroll = 'yes';
		document.body.style.marginRight = 0 + "px";
	}else{
		//thinking
	}
*/
	DarkLayer.hideDark();
}

function setDrakLastUrl(sLastUrl) {
	if( DarkLayer != null ) {
		DarkLayer.setLastUrl(sLastUrl);
	}
}

function getDarkLastUrl() {
	if( DarkLayer != null ) {
		return DarkLayer.getLastUrl();
	} else {
		return "";
	}
}function daumActiveX(obj,div){
	// generate html code
	// for ie obejct
	var html = '<object ';
	if (!obj.id && !obj.name){
		var r = Math.round(Math.random()*100);
		html += 'id="daumActiveXObject'+r+'" name="daumActiveXObject'+r+'" ';
	} else {
		if (obj.id) html += 'id="'+obj.id+'" ';
		else html += 'id="'+obj.name+'" ';
		if (obj.name) html += 'name="'+obj.name+'" ';
		else html += 'name="'+obj.id+'" ';
	}
	if (obj.type) html += 'type="'+obj.type+'" ';
	if (obj.classid) html += 'classid="'+obj.classid+'" ';
	if (obj.width) html += 'width="'+obj.width+'" ';
	if (obj.height) html += 'height="'+obj.height+'" ';
	if (obj.codebase) html += 'codebase="'+obj.codebase+'" ';
	// append events
	for (var i in obj.events){
		if (obj.events[i]){
			html += obj.events[i][0]+'="'+obj.events[i][1]+'" ';
		}
	}
	// end of object tag
	html += '>\n';
	// append params
	for (var i in obj.param){
		html += '<param name="'+obj.param[i][0]+'" value="'+obj.param[i][1]+'"/>\n';
	}

	// for ns embed
	html += '<embed ';
	if (!obj.id && !obj.name){
		var r = Math.round(Math.random()*100);
		html += 'id="daumActiveXObject'+r+'" name="daumActiveXObject'+r+'" ';
	} else {
		if (obj.id) html += 'id="'+obj.id+'" ';
		if (obj.name) html += 'name="'+obj.name+'" ';
	}
	if (obj.type) html += 'type="'+obj.type+'" ';
	if (obj.width) html += 'width="'+obj.width+'" ';
	if (obj.height) html += 'height="'+obj.height+'" ';
	// append params
	for (var i in obj.param){
		if (obj.param[i]){
			if (obj.param[i][0]=='movie' || obj.param[i][0]=='src'){
				var _src = obj.param[i][1];
			}
			html += obj.param[i][0]+'="'+obj.param[i][1]+'" ';
		}
	}
	html += '/>\n';
	html += '</object>';

	var isIE = (document.all)?true:false;
	if (isIE){
		if( document.getElementById(div) != null ) {
			document.getElementById(div).innerHTML = html;
		}
	} else if (obj.type=='application/x-shockwave-flash' || obj.classid=='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'){
		// ie외의 브라우저에서 activex가 flash인 경우만 노출
		if( document.getElementById(div) != null ) {
			document.getElementById(div).innerHTML = html;
		}
	}
}



// 한페이지에 한종류의 activeX가 복수개 삽입되는 경우 하단과 같이 function을 만들어서 사용
function daumFlash_general(src,width,height,div){	//카페탑 - 실시간 급등 정보카페	
	var obj = new Object();
	obj.type = 'application/x-shockwave-flash';
	obj.classid = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
	obj.codebase = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,23,0';
	obj.wmode = 'transparent';
	obj.width = width;
	obj.height = height;

	var param = [
		['movie',src],
		['src',src],
		['quality','high'],
		['wmode','transparent'],
		['allowScriptAccess', 'always'],
		['allowFullScreen', 'true'],
		['bgcolor','#FFFFFF'],
		['pluginspage','http://www.macromedia.com/go/getflashplayer'],
	];
	obj.param = param;

	var events = [
		['onmouseover','test1()'],
		['onmouseout','test2()'],
	];
	obj.events = events;

	daumActiveX(obj,div);
}

function daumFlash_general_forMovie(src,width,height,div){	//카페탑 - 실시간 급등 정보카페	
	var obj = new Object();
	obj.type = 'application/x-shockwave-flash';
	obj.classid = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
	obj.codebase = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,23,0';
	obj.wmode = 'transparent';
	obj.width = width;
	obj.height = height;
	src+="&loc=blog";
	var param = [
		['movie',src],
		['src',src],
		['quality','high'],
		['allowScriptAccess', 'always'],
		['allowFullScreen', 'true'],
		['bgcolor','#FFFFFF'],
		['pluginspage','http://www.macromedia.com/go/getflashplayer'],
	];
	obj.param = param;

	var events = [
		['onmouseover','test1()'],
		['onmouseout','test2()'],
	];
	obj.events = events;

	daumActiveX(obj,div);
}

function test1(){
//	alert(1);
}
function test2(){
//	alert(2);
}
function LoadThemeListImage(listWidth, listHeight, imgNode, src) {
	var oTmpImg = new Image();
	oTmpImg.onreadystatechange = function() {
		if(this.readyState == "complete") {
			width = this.width;
			height = this.height;
			if( width < listWidth && height < listHeight ) {
			} else if( width < height) {
				heightEst = listHeight;
				widthEst = listHeight*(width/height);
				imgNode.height = heightEst;
				imgNode.width = widthEst;
			} else {
				widthEst = listWidth;
				heightEst = listWidth*(height/width);
				imgNode.height = heightEst;
				imgNode.width = widthEst;
			}
			oTmpImg = null;
		}
	}
	oTmpImg.src = src;
}

function goPrintArticle(articleno) {
	var clintAgent = navigator.userAgent;
	//if ( clintAgent.indexOf("MSIE") != -1 ) {
		window.open("/printView.html?articlePrint_"+articleno, "", "width=815, height=680, scrollbars=yes, resizable=no");
	//}else {
	//	window.open("/printViewF.html?articlePrint_"+articleno, "", "width=604, height=680, scrollbars=yes, resizable=no");
	//}
}
function articleFix(blogid,curartno,articleno, blogMainUrl){
	var obj = new Object();
	obj.curatno=curartno;
	obj.blogid=blogid;
	if(blogMainUrl.indexOf("BlogTypeView.do") > -1){
		loadXMLDocWithParam("GET","/_blog/ArticleFix.ajax?blogid="+blogid+"&articleno="+articleno,null,"newAfterFix",null,obj);
	}else{
		loadXMLDocWithParam("GET","/_blog/ArticleFix.ajax?blogid="+blogid+"&articleno="+articleno,null,"afterFix",null,obj);
	}
	if (articleno == 0) {
		alert ("이 글의 대문 등록이 해제되었습니다.");
	} else {
		alert ("이 글이 대문으로 등록되었습니다.");
	}
	window.location.href = blogMainUrl;
}
function newAfterFix(xmlhttp,obj){
	var code =  getSimpleResponse(xmlhttp);
	code = both_trim(code);
	
	if(code.indexOf("true") > 0) {
		viewAjaxArticle("/_blog/BlogTypeView.do?blogid="+obj.blogid+"&articleno="+obj.curatno);
	}
	xmlhttp=null;
}
function afterFix(xmlhttp,obj){
	var code =  getSimpleResponse(xmlhttp);
	code = both_trim(code);
	
	if(code.indexOf("true") > 0) {
		viewAjaxArticle("/_blog/BlogView.do?blogid="+obj.blogid+"&articleno="+obj.curatno);
	}
	xmlhttp=null;
}


/* theme action */
	function Star(blogid, articleno, score) {
		loadDynamicContent("/_blog/LoginCheck.do?type=theme&score="+score);
		loadXMLDoc("GET","/_blog/ThemeScoreSave.do?blogid="+blogid+"&articleno="+articleno+"&score="+score,null,"ScoreSave","ScoreFail");
	}
	
	function sendDataSubmitTheme(isLoginCheck, score){
		if(isLoginCheck){
		} else {
			if(confirm('로그인하셔야 별점 평가를 이용하실 수 있습니다.')) {
				var curl = 	window.location.href;
				this.location.href='http://login.daum.net/accounts/loginform.do?daumauth=1&category=blog&url=' + escape(curl);

			};
		}
	}

	function ShowStar(point, img_id)
	{
		var img_obj = document.getElementById(img_id);
		img_obj.style.backgroundImage = "url('http://i1.daumcdn.net/pimg/blog/theme/star0"+point+".gif')";
	}

	function ShowDefaultStar(img_id)
	{
		var img_obj = document.getElementById(img_id);
		img_obj.style.backgroundImage = "url('http://i1.daumcdn.net/pimg/blog/theme/star00.gif')";
	}

	function ScoreFail(){
	}

	function ScoreSave(xmlhttp) {
		if ( xmlhttp ) {
			xmldoc = getXMLDocument(xmlhttp);

			var channel = xmldoc.getElementsByTagName('channel');
			var articleno = channel[0].getElementsByTagName('articleno')[0].firstChild.nodeValue;
			var score = channel[0].getElementsByTagName('score')[0].firstChild.nodeValue;
			var myscore = channel[0].getElementsByTagName('myscore')[0].firstChild.nodeValue;
			var count = channel[0].getElementsByTagName('count')[0].firstChild.nodeValue;
			var content ='전체평가('+score+'점) : <img src="http://i1.daumcdn.net/pimg/blog/theme/star0'+ Math.round(score) +'.gif" style="vertical-align:middle; margin-bottom:3px;">';
			resultDiv = document.getElementById("iLLStar_" + articleno);
			var content2 ='<img src="http://i1.daumcdn.net/pimg/blog/theme/star0'+ Math.round(myscore) +'.gif" style="vertical-align:middle; margin-bottom:3px;">';
			resultDiv2 = document.getElementById("vote_img_" + articleno);

			if (score == 0) {
				alert('이미 평가를 하셨습니다.');
			} else {
				alert('평가하셨습니다.');
				resultDiv.innerHTML = content;
				resultDiv2.innerHTML = content2;
			}

			xmlhttp = null;
		}
	}
	
	function viewScrapHistory(bid, ano) {
		var scpwin = window.open("/_blog/ScrapHistoryList.do?blogid="+bid+"&articleno="+ano, "_scraphistory", "width=530, height=430, scrollbars=1");
		scpwin.focus();
	}
	
	/* 동영상 관련 스크립트 */
	function copyMovieUrl(blogid, key) {
		BgmPlayManager.allStop();
        var winObj = window.open("/_blog/CopyMovieUrl.do?blogid="+blogid+"&key="+key, "", "scrollbars=no, resizable=no, top=0, left=0,width=450,height=240");
        winObj.focus();
    }
	function openMovie(blogid, key, isEnableScrap) {
		BgmPlayManager.allStop();
		if( typeof(isEnableScrap) != 'undefined' && isEnableScrap != null && isEnableScrap ) {
			var winObj = window.open("http://tvpot.daum.net/clip/ClipViewBigByVid.do?vid="+key+"&scrapable=no", "", "scrollbars=no, resizable=no, top=0, left=0,width=775,height=625");
		}
		else
		{
			var winObj = window.open("http://tvpot.daum.net/clip/ClipViewBigByVid.do?vid="+key, "", "scrollbars=no, resizable=no, top=0, left=0,width=850,height=650");
		}
        winObj.focus();
    }
    
    function goRegist() {
    	if( confirm('엮인글을 보내시려면 다음 블로그를 개설해야 합니다. 개설하시겠습니까?')) {
    		top.location.href = "/_blog/redirect.do?redirect=register";
    	}
    }
    
    function goTrackbackSend2(blogid, turl) {
    	window.open("/_blog/ArticleRegisterEnter2.do?blogid="+blogid+"&turl="+turl);
    }
    
    function toUcc(blogid, articleid) {
		var params = 'blogid='+blogid+'&articleno='+articleid;
		var page = '/_blog/hdn/sendUcc.do';
		if(params != '') {
		        page = page+"?"+params;
		}
		var opts = "scrollbars=no,status=no,toolbar=no,resizable=1,location=no,menu=no,width=530,height=350";
		window.open(page,"winopen",opts);
	}
	
	function setViralAdComment(blogid, articleno){
		var urlpath = "/_blog/viralAdComment.ajax?blogid="+blogid+"&articleNo="+articleno;
		loadXMLDocWithParam("GET",urlpath,null,"afterViralAdComment","failViralAdComment",null);
	}

	function afterViralAdComment(xmlhttp,obj){
		var oXmlDoc = getXMLDocument(xmlhttp);
		var content = getXmlContent(oXmlDoc, 'contents');
		var url = getXmlContent(oXmlDoc, 'url');
		var articleno = getXmlContent(oXmlDoc, 'articleno');

		var tmp = document.getElementById("viral_ad_comment_" + articleno);
		
		if (tmp && content != null && content != "") {
			tmp.innerHTML = '<div><a target="_blank" href="'+ url +'" class="" style="text-decoration:none;"><span>' + content + '</span> 에 참여한 글입니다.</a></div>';
		}
		xmlhttp = null;
	}

	function failViralAdComment (){
		xmlhttp = null;
	}
	
	function getXmlContent(oXmlDoc,tagname){
		var content = oXmlDoc.getElementsByTagName(tagname);
		var res = "";
		if(content !=null && content[0] != null){
			return content[0].firstChild.nodeValue;
		}else{
			return "";
		}
	}
    
	function goArticleReport(permLink, title, isLogin, isCmt){
		if(isLogin && isLogin=="true"){
			if(isCmt == 'cmt'){
				var oNewWin = window.open("http://spam119.daum.net/rainbow/report_cmt_popup?docurl="+permLink+"&title="+encodeURIComponent(title),"articleReport","scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=450,height=450");
			}else{
				var oNewWin = window.open("http://spam119.daum.net/rainbow/report_popup?docurl="+permLink+"&title="+encodeURIComponent(title),"articleReport","scrollbars=no,status=no,toolbar=no,resizable=yes,location=no,menu=no,width=450,height=450");
			}
		}else{
			if(confirm("로그인 하시겠습니까?")){
				window.LastCallFn = function(){
					goArticleReport(permLink, title, "true");
					top.location.href=permLink;
				}
				var sUrl = "http://login.daum.net/accounts/loginform.do?popup=1&daumauth=1&category=blog&url=http://" + document.location.host + "/openerAdminDo.html";
				var oNewWin = window.open(sUrl, "btwlogin", "scrollbars=no,toolbar=no,location=no,directories=no,width=400,height=250,resizable=no,mebar=no,left=250,top=65");				
			}
			
		}
		oNewWin.focus();
	}
	var BgmPlayManager = {
	existArticleBgm: false,
    init: function() {
        if(is_ie) {
            KeyManager.addAction("keydown", function(eEvent) {
                if(eEvent.keyCode == 27) {
                    BgmPlayManager.allStop();
                }
            });
        }
    },
    allStop: function() {  
        BlogBgm.stop();
        ArticleBgm.stop();
    },
    movePage: function() {
        ArticleBgm.stop();
    }
}

function BlogBGMPlayList(bgmno) {
    var owin = window.open("/_blog/BgmPlayList.do?blogid="+BLOGID+"&bgmno="+bgmno+"&ayn=N", "bgmplaylist",     "width=525,height=331,scrolling=no,resize=no");
    owin.focus();
}

function ArticleBGMPlayList(bgmno) {
    var owin = window.open("/_blog/BgmPlayList.do?blogid="+BLOGID+"&bgmno="+bgmno+"&ayn=Y", "bgmplaylist", "width=515,height=331,scrolling=no,resize=no");
    owin.focus();
}

var LastPlayState_STOP = 0;
var LastPlayState_PLAY = 1;		

var BlogBgm = {
    isPlaying: false,
	isSlideInit: false,
	artiStopCnt: 0,
    init: function() {
        this.mTtlLyr = document.getElementById("bgmTitle");
        this.mBtnLyr = document.getElementById("bgmPlayStop");
        this.mBgmFrm = parent.frames["BlogTop"];
        this.isRepeat = false;
    },
    load: function(bgmNo, existArticleBgm) {
        if(!is_ie){
        	document.getElementById('BGM').innerHTML = '';
        	return;
        }else{
        	document.getElementById('BGM').style.display = 'block';
        }
        if(!parent.document.getElementById('BlogTop')) return;
        this.init();

		if(!this.isSlideInit) form_widget_amount_slider('slider_target',document.formBGM1.vol,42,0,100,"BlogBgm.setVolume()",5,12);
		
		try{
			BlogBgm.initVolume(this.mBgmFrm.getVolume());
		}catch(e) {
//			window.setTimeout("BlogBgm.initVolume(30)",10);
		}
		
		if(BgmPlayManager.existArticleBgm) { //게시글 배경음악 재생
        	if(parent.document.getElementById('BlogTop').src == "") {
				parent.document.getElementById('BlogTop').src = "/_blog/hdn/BlogBgm.do?blogid=" + BLOGID + "&blogUseYn=Y&BgmNo=" + bgmNo + "&blogbgm=N";
			}
		} else {
			var mBtnChk = true;
			try{
				if(!this.mBgmFrm.isPlaying){
					this.stop();
				}
			}catch(e){  }
			if(parent.document.getElementById('BlogTop').src == "") {
			    this.isPlaying = true;
				parent.document.getElementById('BlogTop').src = "/_blog/hdn/BlogBgm.do?blogid=" + BLOGID + "&blogUseYn=Y&BgmNo=" + bgmNo + "&blogbgm=Y";
			} else {
		        var bgmctrl = this.mBgmFrm.getBGMCtrl();
		        if(bgmctrl && bgmctrl.LastPlayState == '1'){
					this.changeTitle(this.mBgmFrm.GetTitle());
					if(this.mBgmFrm.isStopByArti == true || !this.mBgmFrm.inInit){
						this.play();
						this.mBgmFrm.isStopByArti = false;
					}
				}else{
					mBtnChk = false;
					this.stop();
					this.mBgmFrm.isStopByArti = false;
			        if(this.mTtlLyr) {
			            this.mTtlLyr.innerHTML = "<marquee direction=\"left\" behavior=\"scroll\" scrollamount=\"10\" scrolldelay=\"400\" class=\"new_bgm_marquee\">다시 음악을 들으시려면  ▶ 을 눌러주세요.</marquee>";
			        }
//					return;
				}
			}
			if(this.mBtnLyr && mBtnChk) {
				this.mBtnLyr.className = "btn_bgm_06 hand";
				this.mBtnLyr.alt = "멈춤";
				document.getElementById('btn_bgmPlayList_dim').style.display = 'none';
				document.getElementById('btn_bgmPlayList').style.display = 'block';
			}
		}
    },
	setVolume: function() {
		var vol = document.formBGM1.vol.value.replace(/[^\d]/,'');
        this.mBgmFrm.BGMSetVol(vol);
	},
	initVolume: function(value) {
		this.mBgmFrm.BGMSetVol(value);
		document.getElementById('slider_handle1').style.left = (36 * value/100) + 'px';
		window.setTimeout("BlogBgm.initVolumeBg('"+value+"')",10);
	},
	initVolumeBg: function(value) {
		document.getElementById('slider_slider1').style.width = (36 * value/100) + 'px';
	},
    play: function() {
        if(!is_ie) return;
        if(this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        ArticleBgm.stop();
        try{
        	var bgmctrl = this.mBgmFrm.getBGMCtrl();
        	this.mBgmFrm.BGMPlay();
        	if(this.mBtnLyr) {
//			this.mBtnLyr.src = "http://i1.daumcdn.net/pimg/blog3/btn_music_pause.gif";
        		this.mBtnLyr.className = "btn_bgm_06 hand";
        		this.mBtnLyr.alt = "멈춤";
        		document.getElementById('btn_bgmPlayList_dim').style.display = 'none';
        		document.getElementById('btn_bgmPlayList').style.display = 'block';
        	}
        	//changeTitle <- this.mBgmFrm에서 실행
        }catch(e){
        	// window.location.href = "";
        }
        //changeTitle <- this.mBgmFrm에서 실행
    },
    stop: function() {	    
        if(!is_ie) return;
        if(!this.isPlaying) {
            return;
        }
        this.isPlaying = false;
        try{
	        var bgmctrl = this.mBgmFrm.getBGMCtrl();
	        this.mBgmFrm.BGMStop();
	        if(this.mBtnLyr) {
	            this.mBtnLyr.className = "btn_bgm_03 hand";
				this.mBtnLyr.alt = "재생";
	        }
	        if(this.mTtlLyr) {
	            this.mTtlLyr.innerHTML = "<marquee direction=\"left\" behavior=\"scroll\" scrollamount=\"10\" scrolldelay=\"400\" class=\"new_bgm_marquee\">다시 음악을 들으시려면  ▶ 을 눌러주세요.</marquee>";
	        }
        }catch(e){
        
        }
    },
    ArtiStop: function() {	  
        if(!is_ie) return;
        if(this.mBgmFrm){
			try{
				var bgmctrl = this.mBgmFrm.getBGMCtrl();
	        	this.mBgmFrm.BGMStop2();
	        	this.isPlaying = false;
	        	this.mBgmFrm.isStopByArti = true;				
			}catch(e){
				if (this.artiStopCnt > 4) {
					this.artiStopCnt = 0;
					return;
				}
				this.artiStopCnt++;
				var me = this;
				setTimeout(function(){
					me.ArtiStop();					
				},500)
				return;
			}
			this.artiStopCnt = 0;
        }
        
       if(this.mBtnLyr) {
            this.mBtnLyr.className = "btn_bgm_03 hand";
			this.mBtnLyr.alt = "재생";
        }
        if(this.mTtlLyr) {
            this.mTtlLyr.innerHTML = "<marquee direction=\"left\" behavior=\"scroll\" scrollamount=\"10\" scrolldelay=\"400\" class=\"new_bgm_marquee\">다시 음악을 들으시려면  ▶ 을 눌러주세요.</marquee>";
        }
        
    },
    repeat: function(no) {
        if(!is_ie) return;
        this.isPlaying = true;
        ArticleBgm.stop();
        this.mBgmFrm.BGMRepeat(no);
    },
    playNstop: function() {
        if(!is_ie) return;
        if(this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
    },
    playPrev: function() {
        if(!is_ie) return;
        ArticleBgm.stop();
        this.isPlaying = true;
        try{
        	this.mBgmFrm.BGMPrev();
        	if(this.mBtnLyr) {
        		this.mBtnLyr.className = "btn_bgm_06 hand";
        		this.mBtnLyr.alt = "멈춤";
        	}        
        }catch(e){
        	
        }
    },
    playNext: function() {
        ArticleBgm.stop();
        this.isPlaying = true;
        try{
        	this.mBgmFrm.BGMNext();
        	if(this.mBtnLyr) {
        		this.mBtnLyr.className = "btn_bgm_06 hand";
        		this.mBtnLyr.alt = "멈춤";
        	}
        }catch(e){
        
        }
    },
    playGoto: function(songId) {
	    if(!is_ie) return;
        this.isPlaying = true;
        this.mBgmFrm.BGMPlayGoto(songId);
        if(this.mBtnLyr) {
            this.mBtnLyr.className = "btn_bgm_06 hand";
			this.mBtnLyr.alt = "멈춤";
        }
    },
    changeTitle: function(sBgmTitle) {   
        if(this.mTtlLyr == null) return;
        var bgmctrl = this.mBgmFrm.getBGMCtrl();    
        
        if(bgmctrl && bgmctrl.LastPlayState == '1') {
       		this.mTtlLyr.innerHTML = "<marquee direction=\"left\" behavior=\"scroll\" scrollamount=\"10\" scrolldelay=\"400\" class=\"new_bgm_marquee\">" + sBgmTitle + "</marquee>"
  		} else {
  		 	this.stop();
 		}
    }
}
var oldBgmNo = '';
var ArticleBgm = {
    isPlaying: false,
    init: function(bgmNo, frmId) {
        this.mBgmNo = bgmNo;
		this.isRepeat = false;
        
        this.mTtlLyr = document.getElementById(frmId).contentWindow.document.getElementById("abgm"+bgmNo+"Title");
        this.mPlay = document.getElementById(frmId).contentWindow.document.getElementById("playBtn"+bgmNo);
		this.Bslider = document.getElementById(frmId).contentWindow.document.getElementById("slider_target"+bgmNo);
		this.Tslider = document.getElementById(frmId).contentWindow.document.getElementById("big_slider_slider"+bgmNo);
		this.big_handleImg = document.getElementById(frmId).contentWindow.document.getElementById("big_slider_handle"+bgmNo);
		this.eventF = document.getElementById(frmId).contentWindow;
		
		this.playerA = document.getElementById(frmId).contentWindow.document.getElementById("abgm"+bgmNo);
		this.playerD = document.getElementById(frmId).contentWindow.document.getElementById("abgmImg"+bgmNo);
		this.playBox = document.getElementById(frmId).contentWindow.document.getElementById("playerBox"+bgmNo);
		this.mBgmFrm = document.frames["ArticleBgmPlay"];
		this.artNo = '';
		this.frmId = '';
    },
    play: function(artNo, bgmNo, frmId) {
        if(!is_ie) return;
        BlogBgm.ArtiStop();
        if(this.mBgmNo != bgmNo) {
            if(this.isPlaying) {
                this.stop();
            }
            this.init(bgmNo, frmId);
    	    if(oldBgmNo != '' && document.getElementById(frmId).contentWindow.document.getElementById("abgm"+oldBgmNo)){
				document.getElementById(frmId).contentWindow.document.getElementById("abgm"+oldBgmNo).style.display = 'none';
				document.getElementById(frmId).contentWindow.document.getElementById("abgmImg"+oldBgmNo).style.display = 'block';
			}
            this.isPlaying = true;
            document.getElementById('ArticleBgmPlay').src = "/_blog/hdn/ArticleBgm.do?blogid="+BLOGID+"&articleno="+artNo+"&bgmno="+bgmNo;
	        this.playerA.style.display = 'block';
    	    this.playerD.style.display = 'none';
    	    oldBgmNo = bgmNo;
        } else {
            if(this.isPlaying) {
                return;
            }
            this.init(bgmNo, frmId);
            this.isPlaying = true;
            this.mBgmFrm.BGMPlay();
	        this.playerA.style.display = 'block';
    	    this.playerD.style.display = 'none';
        }
        
        //play button
        this.mPlay.className = 'playerOff';
        this.mPlay.alt = '멈춤';
        this.mPlay.onclick = new Function('ArticleBgm.stop('+ bgmNo + ')');

		//volume slider
		this.eventF.form_widget_amount_slider_big('slider_target' + bgmNo,document.formBGM2.vol,30,0,100,"setVolume2()",15,15,bgmNo);
		try{
			ArticleBgm.initVolume(this.mBgmFrm.getVolume());
		}catch(e) {
			ArticleBgm.initVolumeBg(30);
		}

		this.artNo = artNo;
		this.frmId = frmId;
    },
    stop: function(bgmNo) {
        if(bgmNo == null) {
            bgmNo = this.mBgmNo;
            if(bgmNo == null) {
                return;
            }
        }
        if(this.mBgmNo != bgmNo) {
            return;
        } else {
            if(!this.isPlaying) {
                return;
            }
            this.isPlaying = false;
            this.mBgmFrm.BGMStop();
            if(this.mTtlLyr) {
                this.mTtlLyr.innerHTML = "<marquee behavior=\"scroll\" direction=\"left\" scrollamount=\"2\"></marquee>";;
            }
            this.mPlay.className = 'playerOn';
            this.mPlay.alt = '재생';
            this.mPlay.onclick = new Function('ArticleBgm.play("' + this.artNo + '","' + bgmNo + '", "' + this.frmId +'")');
            
	        this.playerA.style.display = 'none';
    	    this.playerD.style.display = 'block';
		}
    },
    playPrev: function() {
        if(!is_ie) return;
        this.isPlaying = true;
        this.mBgmFrm.BGMPrev();
    },
    playNext: function() {
	    if(!is_ie) return;
        this.isPlaying = true;
        this.mBgmFrm.BGMNext();
    },
    playGoto: function(songId) {
	    if(!is_ie) return;
        this.isPlaying = true;
        this.mBgmFrm.BGMPlayGoto(songId);
    },
    changeTitle: function(sBgmTitle) {
        if(this.mTtlLyr == null) return;
        this.mTtlLyr.innerHTML = "<marquee behavior=\"scroll\" direction=\"left\" scrollamount=\"2\">" + sBgmTitle + "</marquee>";
    },
	setVolume: function() {
		var vol = document.formBGM2.vol.value.replace(/[^\d]/,'');
        this.mBgmFrm.BGMSetVol(vol);
	},
	initVolume: function(value) {
		this.mBgmFrm.BGMSetVol(value);
		this.big_handleImg.style.left = (30 * value/100) + 'px';
		window.setTimeout("ArticleBgm.initVolumeBg('"+value+"')",10);
	},
	initVolumeBg: function(value) {
		this.Tslider.style.width = (30 * value/100) + 'px';
	}
}

BgmPlayManager.init();


var form_widget_amount_slider_handle = 'http://i1.daumcdn.net/pimg/blog4/skin/common/img_blank.gif';
var slider_handle_image_obj = false;
var sliderObjectArray = new Array();
var slider_counter = 0;
var slideInProgress = false;
var handle_start_x;
var event_start_x;
var currentSliderIndex;

function form_widget_cancel_event(){
	return false;
}

function getImageSliderHeight(){
	if(!slider_handle_image_obj){
		slider_handle_image_obj = new Image();
		slider_handle_image_obj.src = form_widget_amount_slider_handle;
	}
	if(slider_handle_image_obj.width>0){
		return;
	}else{
		setTimeout('getImageSliderHeight()',50);
	}
}

function positionSliderImage(e,theIndex){
	if(!theIndex)theIndex = this.getAttribute('sliderIndex');
	var theValue = sliderObjectArray[theIndex]['formTarget'].value;
	if(!theValue.match(/^[0-9]*$/g))theValue=sliderObjectArray[theIndex]['min'] +'';
	if(theValue/1>sliderObjectArray[theIndex]['max'])theValue = sliderObjectArray[theIndex]['max'];
	if(theValue/1<sliderObjectArray[theIndex]['min'])theValue = sliderObjectArray[theIndex]['min'];
	sliderObjectArray[theIndex]['formTarget'].value = theValue;
	var handleImg = document.getElementById('slider_handle' + theIndex);
	var ratio = sliderObjectArray[theIndex]['width'] / (sliderObjectArray[theIndex]['max']-sliderObjectArray[theIndex]['min']);
	var currentValue = sliderObjectArray[theIndex]['formTarget'].value-sliderObjectArray[theIndex]['min'];
	handleImg.style.left = Math.round(currentValue * ratio) + 'px';
	document.getElementById('slider_slider1').style.width = Math.round(currentValue * ratio) + 'px';
}

function adjustFormValue(theIndex){
	var handleImg = document.getElementById('slider_handle' + theIndex);
	var ratio = sliderObjectArray[theIndex]['width'] / (sliderObjectArray[theIndex]['max']-sliderObjectArray[theIndex]['min']);
	var currentPos = handleImg.style.left.replace('px','');
	sliderObjectArray[theIndex]['formTarget'].value = Math.round(currentPos / ratio) + sliderObjectArray[theIndex]['min'];
}

function initMoveSlider(e){
	if(document.all)e = event;
	slideInProgress = true;
	event_start_x = e.clientX;
	handle_start_x = this.style.left.replace('px','');
	currentSliderIndex = this.id.replace(/[^\d]/g,'');
	return false;
}

function startMoveSlider(e){
	if(document.all)e = event;
	if(!slideInProgress)return;
	var leftPos = handle_start_x/1 + e.clientX/1 - event_start_x;
	if(leftPos<0)leftPos = 0;
	if(leftPos/1>sliderObjectArray[currentSliderIndex]['width'])leftPos = sliderObjectArray[currentSliderIndex]['width'];
	document.getElementById('slider_handle' + currentSliderIndex).style.left = leftPos + 'px';
	document.getElementById('slider_slider1').style.width = leftPos + 'px';

	adjustFormValue(currentSliderIndex);
	if(sliderObjectArray[currentSliderIndex]['onchangeAction']){
		eval(sliderObjectArray[currentSliderIndex]['onchangeAction']);
	}
}

function stopMoveSlider(){
	slideInProgress = false;
}

function form_widget_amount_slider(targetElId,formTarget,width,min,max,onchangeAction,sliderHandleWidth,sliderHeight){
	if(!slider_handle_image_obj){
		getImageSliderHeight();
	}

	slider_counter = slider_counter +1;
	sliderObjectArray[slider_counter] = new Array();
	sliderObjectArray[slider_counter] = {"width":width - sliderHandleWidth,"min":min,"max":max,"formTarget":formTarget,"onchangeAction":onchangeAction};

	formTarget.setAttribute('sliderIndex',slider_counter);
	formTarget.onchange = positionSliderImage;

	var handleImg = document.createElement('IMG');
	handleImg.style.position = 'absolute';
	handleImg.style.left = '0';
	handleImg.style.top = '0';
	handleImg.style.zIndex = 5;
	handleImg.src = slider_handle_image_obj.src;
	handleImg.id = 'slider_handle' + slider_counter;
	handleImg.className = "ic_bgmControl hand";
	handleImg.onmousedown = initMoveSlider;

	if(document.body.onmouseup){
		if(document.body.onmouseup.toString().indexOf('stopMoveSlider')==-1){
			//alert('You allready have an onmouseup event assigned to the body tag');
		}
	}else{
		document.body.onmouseup = stopMoveSlider;
		document.body.onmousemove = startMoveSlider;
	}
	handleImg.ondragstart = form_widget_cancel_event;
	document.getElementById(targetElId).appendChild(handleImg);
	positionSliderImage(false,slider_counter);

	document.getElementById(targetElId).style.width = document.getElementById('slider_slider1').offsetWidth + 'px';
	this.isSlideInit = true;		
}// Tag
var isIEVersion = ((navigator.userAgent.toLowerCase().indexOf("msie") != -1) && (navigator.userAgent.toLowerCase().indexOf("opera") == -1));

function tagAdd( articleno) {
	if(document.getElementById("tagListEdit_"+articleno).style.display == 'block') {
		document.getElementById("tagListLayer_"+articleno).style.display='block';
		document.getElementById("tagAddLayer_"+articleno).style.display='block';
		document.getElementById("tagListEdit_"+articleno).style.display='none';
	}
	else {
		document.getElementById("tagListLayer_"+articleno).style.display='none';
		document.getElementById("tagAddLayer_"+articleno).style.display='none';
		document.getElementById("tagListEdit_"+articleno).style.display='block';
		document.getElementById("tagname_"+articleno).focus();
	}
}
function tagCancel(blogid, articleno) {
	document.getElementById("tagListEdit_"+articleno).style.display='none';
	document.getElementById("tagListLayer_"+articleno).style.display='block';
	document.getElementById("tagAddLayer_"+articleno).style.display='block';
}
function tagAddSave(blogid, articleno) {
	var tagname = document.getElementById("tagname_"+articleno).value;
	var arr = tagname.split(",");
	var strLength = 0;

	for(var i=0; i < arr.length;i++){
		strLength = 0;

		for ( var j = 0; j < arr[i].length ; j++) {
			if (escape(arr[i].charAt(i)).length > 3) {
				strLength +=2;
			} else {
				strLength++;
			}
		}
		
		if(strLength > 40) {
			alert(arr[i]+"의 태그가 너무 깁니다. 40bytes 이하로 해주세요 ");
			return;
		}
	}


	var tagObj = new Object();
	tagObj.articleno = articleno;
	tagObj.blogid = blogid;
	tagObj.tagname = tagname;

	loadXMLDocWithParam("POST","/_blog/ArticleTagRegister.do","blogid="+blogid+"&articleno="+articleno+"&tagname="+encodeURIComponent(tagname),"TagCallBack","",tagObj);
}
function TagCallBack(xmlhttp, tagObj) {
	xmlhttp = null;
	loadTagList("/_blog/ArticleTagAjax.ajax?blogid="+tagObj.blogid+"&articleno="+tagObj.articleno, tagObj.articleno);
}

function loadTagList(url, articleno){
	var tagAddAjax;
	tagAddAjax = new AjaxObject("tagAddAjax", "tagListLayer_"+articleno, "contents", "ajax_layer_load");
	tagAddAjax.load(url, true);
	tagCancel(null, articleno);
}

function submitEnterTag(e, blogid, articleno) {

    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (keycode == 13)
    {
        tagAddSave(blogid, articleno)
        return false;
    }
    else return true;
}

function trackBackCancel(blogid, articleno) {
	document.getElementById("trackBackListLayer_"+articleno).style.display="none";
}
function trackBackDelete(blogid, articleno, seq) {
	var tbObj = new Object();
	tbObj.articleno = articleno;
	tbObj.blogid = blogid;
	tbObj.seq = seq;

	loadXMLDocWithParam("POST","/_blog/ArticleTrackBackDelete.do","blogid="+blogid+"&articleno="+articleno+"&seq="+seq,"TrackBackCallBack","",tbObj);
}
function trackBackAddSave(blogid, articleno) {
	var trackbackurl = document.getElementById("trackbackurl_"+articleno).value;
	if(trackbackurl.indexOf("http") < 0){
		alert("잘못된 엮인글 주소입니다") ;
		return ;
	}

	var tbObj = new Object();
	tbObj.articleno = articleno;
	tbObj.blogid = blogid;
	tbObj.trackbackurl = trackbackurl;

	loadXMLDocWithParam("POST","/_blog/ArticleTrackBackRegister.do","blogid="+blogid+"&articleno="+articleno+"&trackbackurl="+trackbackurl,"TrackBackCallBack",null,tbObj);
}
function TrackBackCallBack(xmlhttp, tbObj) {
	loadTrackBackList("/_blog/ArticleTrackBackAjax.ajax?blogid="+tbObj.blogid+"&articleno="+tbObj.articleno, tbObj.articleno);
	xmlhttp = null;
}
function TrackBackHist(blogid, articleno) {
	if(document.getElementById("trackBackListLayer_"+articleno).style.display=="none")
		loadTrackBackList("/_blog/ArticleTrackBackAjax.ajax?blogid="+blogid+"&articleno="+articleno, articleno);
	else
		document.getElementById("trackBackListLayer_"+articleno).style.display="none";
}
var trackBackAddAjax;
function loadTrackBackList(url, articleno){
	trackBackAddAjax = new AjaxObject("trackBackAddAjax", "trackBackListLayer_"+articleno, "contents", "ajax_layer_load");
	trackBackAddAjax.load(url, true);
}

// 태그로 섹션 검색 조회
function tagsearch(tagName) {
	window.open("http://search.daum.net/search?w=blog&m=tag&lpp=10&DocType=100&q=" + tagName + "&_top_daumsearh=search&f=section");
}
function goTagOrder(tagOrder, type) {
	var blogid = document.getElementById("blogid").value;
	var url="/_blog/tagTotalList.do?blogid="+blogid+"&tagOrder="+ tagOrder + "&navigationType=" + type;
	viewAjaxArticle(url);
}
function goTagArticleList(tagName){
	var blogid = document.getElementById("blogid").value;
	var url ="/_blog/tagArticleList.do?blogid="+blogid+"&tagName="+tagName;
	viewAjaxArticle(url);
}

function tagNameSearch(tag, blogId){
	parent.location.href = "/_blog/tagArticleList.do?blogid=" + blogId + "&tagName=" + encodeURIComponent(tag);
}

var tagResult = "";
var tagResultNum = 0;
var exitLastInput = 1;
function checkover(){
	//alert('checkover()');
}
function changeCheckBox(str)
{}
function checkValidation()
{
	tagResult  = "";
	tagResultNum = 0;
	var tagNum = document.getElementById("articleTag").instance.tagList.childNodes.length;
	var validBlank = true;
	var temp = "";
	var ccount = 0;
	for(var j = 0; j < tagNum; j++){

		validBlank = true;
		var targetChild = document.getElementById("articleTag").instance.tagList.childNodes[j].innerHTML;

		if(targetChild.toUpperCase().substring(0,6)!="<INPUT"){
			temp = targetChild;
			for(var i = 0; i < targetChild.length; i++)
			{
				var chr = targetChild.substr(i,1);

				if(chr == ' '){
					if(!validBlank){
						temp = temp.substr(0,i-ccount) + temp.substr(i-ccount+1);
						ccount = ccount + 1;
					}
					validBlank = false;
				}else{
					validBlank = true;
				}
/*
				if(isSpecialCharacter(chr)){
					alert("특수 문자를 입력하실 수 없습니다.");
					return false;
				}
 */
			}

		document.getElementById("articleTag").instance.tagList.childNodes[j].innerHTML = temp;
		tagResult = tagResult + temp + ",";
		tagResultNum = tagResultNum + 1;
		}
	}
	//alert("tagResult : " + tagResult);

	return true;
}

function isSpecialCharacter(chr){
	if((chr != '.') &&(chr != '~') &&(chr != '!') &&(chr != '@') &&(chr != '^') &&(chr != '*')
		&&(chr != '(')&&(chr != ')')&&(chr != '-')&&(chr != '+')&&(chr != '=')&&(chr != '|')
		&& (chr != ' ') && (chr < '0' || chr > '9') && (chr < 'a' || chr > 'z')
		&& (chr < 'ㄱ' || chr > '힣') && (chr < 'A' || chr > 'Z'))
	{
		return true;
	}
}

function checkSpecialCharacter(str){
	for(var i = 0; i < str.length; i++){
		var chr = str.substr(i,1);
		if(isSpecialCharacter(chr)){
			alert("특수 문자를 입력하실 수 없습니다.");
			return false;
		}
	}

	return true;
}

function getTagResult(){
	return tagResult;
}

function deleteCommonTag(str)
{

	var kids = document.getElementById("articleTag").instance.tagList.childNodes;
	var tagNum = document.getElementById("articleTag").instance.tagList.childNodes.length;

	for(var j = 0; j < tagNum; j++){

		validBlank = true;
		var targetChild = document.getElementById("articleTag").instance.tagList.childNodes[j].innerHTML;

		if(document.getElementById("articleTag").instance.tagList.childNodes[j].innerHTML != null){
			if(targetChild == str){
				document.getElementById("articleTag").instance.tagList.removeChild(kids[j]);
				changeCheckBox(false);
				break;
			}
		}

	}

}
function insertCommonTag(str, isInit)
{
	var strLength = 0;
	for ( var i = 0; i < str.length ; i++) {
		if (escape(str.charAt(i)).length > 3) {
			strLength +=2;
		} else {
			strLength++;
		}
	}

	if(strLength > 41){
		alert('태그의 길이를 줄여주세요. (40 bytes)');
		document.getElementById("articleTag").instance.isSettingValue = false;
		return;
	}
	if(document.getElementById("articleTag").instance.isSettingValue)
		return;
	else
		document.getElementById("articleTag").instance.isSettingValue = true;
	document.getElementById("articleTag").instance.hideSuggestion();
	if(document.getElementById("articleTag").instance.isTemporaryEditing())
	{//이미 입력한 중간 테그를 다시 변경할때
		document.getElementById("articleTag").instance.inputTemporary.parentNode.onclick = this.tagListMouseClick;
		if(str.trim() == ""){
			document.getElementById("articleTag").instance.inputTemporary.parentNode.parentNode.removeChild(this.inputTemporary.parentNode);
			changeCheckBox(false);
		}else{
			document.getElementById("articleTag").instance.inputTemporary.parentNode.innerHTML = str;
		}
		document.getElementById("articleTag").instance.typingText = "";
		document.getElementById("articleTag").instance.inputTemporary = null;
	}
	else if(str.trim() != "")
	{

		var inputContainer = document.getElementById("articleTag").instance.tagList.lastChild;
		inputContainer.className = "";
		var listItem = document.createElement("li");
		listItem.onclick = document.getElementById("articleTag").instance.tagListMouseClick;
		listItem.appendChild(document.createTextNode(str));
		document.getElementById("articleTag").instance.tagList.removeChild(inputContainer);
		changeCheckBox(false);
		document.getElementById("articleTag").instance.tagList.appendChild(listItem);
		//	document.getElementById("articleTag").instance.tagList.children(0).insertAdjacentElement("BeforeBegin",listItem);
		if(document.getElementById("articleTag").instance.tagList.childNodes.length >= 20 ){
			if(!isInit){
				alert('최대 20개까지 입력가능합니다.');
			}
			changeCheckBox(true);
			document.getElementById("articleTag").instance.isSettingValue = false;
			return;
		}
		document.getElementById("articleTag").instance.tagList.appendChild(inputContainer);
		document.getElementById("articleTag").instance.typingText = "";
		document.getElementById("articleTag").instance.inputOnLast.value = "";
		document.getElementById("articleTag").instance.focusOnInput();

	}

	document.getElementById("articleTag").instance.tagList.firstChild.className = "firstChild";

	document.getElementById("articleTag").instance.isSettingValue = false;

}


// 입력창을 10ms마다 체크하면서 값이 변했으면 request를 보낸다.
// 파이어폭스에서는 한글을 입력할때 keydown 이벤트가 발생하지 않기 때문에
// 값이 변하는지 계속 보고있어야 한다.
function raputaTagFunction_WatchInputBox(id)
{
	try
	{
		var instance = document.getElementById(id).instance;
		var input = instance.getInput();

		// 값이 달라졌는지 체크
		if(input.value != instance.typingText)
		{
			//alert('!=');
			instance.typingText = input.value;
			instance.requestSuggestion();
		}
	}
	catch(e) { }

}

function Tag(container, language, disable)
{
	this.name = "Raputa Tag Object";

	this.allowRaputaSuggestion = (typeof(disable) == "undefined") ? false : !disable;

	this.isSettingValue = false;	// setValue가 짧은 시간에 여러번 실행될때 Safari가 죽어버리는 문제 해결

	this.instance = this;	// requestSuggestion() 함수에서 참조한다
	this.cursor = 0;		// 비동기로 전송되는 스크립트의 짝을 맞추기 위한 커서

	this.isTyping = false;			// input box에 포커스가 있는지 여부
	this.isSuggestionShown = false;	// suggest window가 보여지고 있는지의 여부

	this.typingText = "";			// raputaTagFunction_WatchInputBox에서 input box의 값을 감시하기 위한 변수

	this.inputClassName = "";

	this.language = "ko";
	if(typeof language != "undefined")
		this.language = language;

	this.container = container;		// tag list가 들어갈 container
	this.container.instance = this;

	// suggestion window ^^
	this.suggestBox = document.createElement("div");
	this.suggestBox.instance = this;
	this.suggestBox.className = "raputaSuggestBox";
	this.suggestBox.style.position = "absolute";
	this.suggestBox.style.zIndex = "9999";

	this.suggestBoxScroll = document.createElement("div");
	this.suggestBoxScroll.id = "suggestBoxScroll";;
	this.suggestBoxScroll.instance = this;
	this.suggestBoxScroll.className = "raputaSuggestBoxScroll";
	this.suggestBoxScroll.style.zIndex = "9999";

	this.suggestion = document.createElement("ul");
	this.suggestion.instance = this;
	this.suggestion.selectedIndex = 0;
	this.suggestion.className = "raputaSuggest";
	this.suggestion.style.listStyleType = "none";
	this.suggestion.className = "raputaSuggest";
	this.suggestion.style.zIndex = "99999";

	//this.suggestBox.appendChild(this.suggestion);
	//this.container.appendChild(this.suggestBox);

//	this.suggestBox.appendChild(this.suggestion);
	// 10ms마다 input box의 값이 변했는지 체크
	setInterval("raputaTagFunction_WatchInputBox('" + this.container.id + "')", 10);

	// 마지막 노드에 들어가는 input box
	this.inputOnLast = this.createSuggestInput();
	this.inputTemporary = null;

	// tag list
	this.tagList = document.createElement("ul");
	this.tagList.instance = this;
	this.tagList.id = "tagul";

	// tag list first child
	var listItem = document.createElement("li");
	listItem.className = "firstChild"
	listItem.appendChild(this.inputOnLast);
	this.tagList.appendChild(listItem);
	this.container.appendChild(this.tagList);
	//document.getElementById("tttt").instance.focusOnInput();
	this.inputOnLast.focus();
}

// 마지막노드의 input box를 편집중인지 중간의 list item을 눌러 편집중인지를 리턴
Tag.prototype.isTemporaryEditing = function()
{
	return (this.inputTemporary != null);
}

Tag.prototype.setInputClassName = function(str)
{
	this.inputClassName = str;
	this.inputOnLast.className = str;
	if(this.inputTemporary) this.inputTemporary.className = str;
}

// 현재 편집중인 input box
Tag.prototype.getInput = function()
{
	return (this.inputTemporary == null) ? this.inputOnLast : this.inputTemporary;
}

// cross browser event
Tag.prototype.adjustEventCompatibility = function(event)
{
	if(navigator.appName == "Microsoft Internet Explorer")
	{
		event = window.event;
		event.target = event.srcElement;
	}

	return event;
}

// input box를 생성한다
Tag.prototype.createSuggestInput = function()
{
	var input = document.createElement("input");
	input.instance = this;
	input.className = this.inputClassName;
	input.setAttribute("autocomplete", "off");
	input.onblur = function() {
		var instance = this.instance;

		instance.isTyping = false;
		instance.hideSuggestion();
		instance.setValue(this.value);
	}
	//input.onclick = this.requestSuggestion; //input box click시 서제스트 나오는거 hidden
	input.onkeydown = function(event) {
		var instance = this.instance;

		instance.isTyping = true;

		event = instance.adjustEventCompatibility(event);
		switch(event.keyCode)
		{
//			case 37:		// pre
//				ControlRangeSelect();
//				var curCursor = instance.getCurCursor(document.tagtag.tag); //현재 커서의 위치index
//				var curCursor = instance.getCurCursor(this); //현재 커서의 위치index
//				if(curCursor == 0){
//					instance.moveBack();
//				}else
//					return event.keyCode;
//				break;
			case 8:		// BackSpace
				if(this.value != "")
					return event.keyCode;
				else
					instance.moveBack();
				break;
			case 13:	// Enter
				instance.setValue(this.value);
				break;
			case 188:	// ,
			//	instance.setValue(this.value);
				break;
			case 27:	// ESC
				instance.hideSuggestion();
				break;
			case 38:	// Key Up
				instance.moveUp();
				break;
			case 40:	// Key Down
				instance.moveDown();
				break;
			default:
				return event.keyCode;
		}

		event.returnValue = false;
		event.cancelBubble = true;

		try { event.preventDefault(); } catch(e) { }

		return false;
	}
	input.onkeyup = function(event) {
		var instance = this.instance;

		instance.isTyping = true;

		event = instance.adjustEventCompatibility(event);
		switch(event.keyCode)
		{
			case 13:	// Enter
				break;
			case 188:	// ,
				instance.setValue(this.value);
				break;
			case 27:	// ESC
				break;
			case 38:	// Key Up
				break;
			case 40:	// Key Down
				break;
			default:
				return event.keyCode;
		}

		event.returnValue = false;
		event.cancelBubble = true;

		try { event.preventDefault(); } catch(e) { }

		return false;
	}

	input.onkeypress = function(event) {
		var instance = this.instance;

		instance.isTyping = true;

		event = instance.adjustEventCompatibility(event);
		switch(event.keyCode)
		{
			case 8:		// BackSpace
				if(this.value == "")
					instance.moveBack();
				else
					return event.keyCode;
				break;
			case 13:	// Enter
				break;
			case 188:	// ,
				//instance.setValue(this.value);
				break;
			case 44:	// ,
				instance.setValue(this.value);
				break;
			case 27:	// ESC
				break;
			case 38:	// Key Up
				break;
			case 40:	// Key Down
				break;
			default:
				return event.keyCode;
		}

		event.returnValue = false;
		event.cancelBubble = true;

		try { event.preventDefault(); } catch(e) { }

		return false;
	}

	return input;
}

// suggestion window의 항목을 클릭하면 값을 세팅한다
Tag.prototype.suggestionMouseClick = function(obj)
{
	var input = this.getInput();
	this.hideSuggestion();
	this.setValue(obj.innerHTML.replace(new RegExp("</?strong>", "gi"), "").replaceAll("&amp;", "&"));
}

// script의 src를 변경해 서버로부터 tag 리스트를 전송받는다
Tag.prototype.requestSuggestion = function()
{

	var instance = this.instance;

	instance.isTyping = true;
	instance.cursor++;
	return;
	debug("Request " + instance.cursor);

}

// tag list의 이전 항목으로 이동
Tag.prototype.moveBack = function()
{
	var prevNode = this.getInput().parentNode.previousSibling;

	if(this.tagList.childNodes.length > 1 && prevNode)
	{
		this.hideSuggestion();

		var text = prevNode.innerHTML.unhtmlspecialchars();

		prevNode.parentNode.removeChild(prevNode);
		changeCheckBox(false);
		this.tagList.firstChild.className = "firstChild";
		this.getInput().value = text;
		updatetime();
	}
}

// suggestion window 커서를 위로 이동
Tag.prototype.moveUp = function()
{
	if(this.isSuggestionShown)
	{
		this.cursor++;
		this.suggestion.selectedIndex--;

		if(this.suggestion.selectedIndex < 1)
			this.suggestion.selectedIndex = this.suggestion.childNodes.length;

		this.highlightRow();
	}
}

// suggestion window 커서를 아래로 이동
Tag.prototype.moveDown = function()
{
	if(this.isSuggestionShown)
	{
		this.cursor++;
		this.suggestion.selectedIndex++;

		if(this.suggestion.selectedIndex > this.suggestion.childNodes.length)
			this.suggestion.selectedIndex = 1;

		this.highlightRow();
	}
}

// 이동 후에 현재 열의 style class를 변경한다
Tag.prototype.highlightRow = function()
{
	// suggest window가 보이지 않는 상태거나 전송받은 내용이 없으면 제낌
	if(this.isSuggestionShown && this.suggestion.childNodes[0].className != "disabled")
	{
		for(var i=0; i<this.suggestion.childNodes.length; i++)
			this.suggestion.childNodes[i].className = (i == this.suggestion.selectedIndex - 1) ? "hover" : "";

		// 선택된 열의 값을 input box에 채운다
		this.getInput().value = this.typingText = this.suggestion.childNodes[this.suggestion.selectedIndex-1].innerHTML.replace(new RegExp("</?strong>", "gi"), "").unhtmlspecialchars();
	}
}

// 노드의 값을 배열로 반환한다
Tag.prototype.getValues = function()
{
	var values = new Array();

	for(var i=0; i<this.tagList.childNodes.length-1; i++)
		values[i] = this.tagList.childNodes[i].innerHTML.trim().unhtmlspecialchars();

	return values;
}
Tag.prototype.getCurCursor = function(input)
{
    return getCursorPos(input);
}
// 마지막 노드의 input box에 값을 추가하거나 임시 input box의 값을 tag list에 세팅한다
Tag.prototype.setValue = function(str)
{ //important
	str = this.deleteComma(str);


	var strLength = 0;
	for ( var i = 0; i < str.length ; i++) {
		if (escape(str.charAt(i)).length > 3) {
			strLength +=2;
		} else {
			strLength++;
		}
	}

	if(strLength > 40){
		//alert('최대 40 byte이므로 초과된 글자수는 자동으로 삭제됩니다.');
		strCount = 0;
		var tempStr2 = "";
		var tempStr = "";
		for(i = 0; i < str.length; i++)
		{
			tempStr = str.charAt(i);
			if(escape(tempStr).length > 4) strCount += 2;
			else strCount += 1 ;
			if (strCount > 40)
			{
				if(escape(tempStr).length > 4) strCount -= 2;
				else strCount -= 1 ;
				break;
			}
			else tempStr2 += tempStr;
		}
		str = tempStr2;
		//document.writeForm.mentents.value = tempStr2;

		//this.isSettingValue = false;
		//return;
	}
	if(this.isSettingValue)
		return;
	else
		this.isSettingValue = true;
	this.hideSuggestion();
	if(this.isTemporaryEditing())
	{//이미 입력한 중간 테그를 다시 변경할때

		/*if(exitLastInput == 1 ){
			this.tagList.removeChild(this.tagList.lastChild);
			exitLastInput = 0;
		}*/
		this.inputTemporary.parentNode.onclick = this.tagListMouseClick;
		if(str.trim() == ""){
			this.inputTemporary.parentNode.parentNode.removeChild(this.inputTemporary.parentNode);
		}else{
			this.inputTemporary.parentNode.innerHTML = str;
		}
		this.typingText = "";
		this.inputTemporary = null;
		if(exitLastInput == 0  && this.tagList.childNodes.length < 10 ){
			// 마지막 노드에 들어가는 input box
			this.inputOnLast = this.createSuggestInput();
			this.inputTemporary = null;
			// tag list first child
			var listItem = document.createElement("li");
			listItem.className = "firstChild"
			listItem.appendChild(this.inputOnLast);
			this.tagList.appendChild(listItem);
			//this.container.appendChild(this.tagList);
			exitLastInput = 1;
			changeCheckBox(false);
		}
	}
	else if(str.trim() != "")
	{

		var inputContainer = this.tagList.lastChild;
		inputContainer.className = "";
		var listItem = document.createElement("li");
		listItem.onclick = this.tagListMouseClick;
		listItem.appendChild(document.createTextNode(str));
		this.tagList.removeChild(inputContainer);
		//alert('b'); //몽땅 사라짐.
		this.tagList.appendChild(listItem);
		//alert('c');  //글자.
		if(this.tagList.childNodes.length >= 20 ){
			exitLastInput = 0;
			alert('최대 20개까지 입력가능합니다.');
			changeCheckBox(true);
			this.typingText = "";
			this.inputOnLast.value = "";
			this.suggestBox.style.display = "none";
			this.tagList.firstChild.className = "firstChild";
			this.isSettingValue = false;
			return;
		}
		updatetime();
		//alert('a'); //input박스 없어집
		this.tagList.appendChild(inputContainer);
		//alert('b'); //input박스 안에 앞에 입력한거
		this.typingText = "";
		//alert('c');
		this.inputOnLast.value = "";
		//alert('d');//input박스 안에 공백
		this.focusOnInput();
		exitLastInput = 1;

	}else if(str.trim() == ""){
		this.inputOnLast.value = "";
	}

	this.suggestBox.style.display = "none";
	this.tagList.firstChild.className = "firstChild";

	this.isSettingValue = false;
	if(strLength > 40){
		alert('최대 40byte이므로 초과된 글자수는 자동으로 삭제됩니다');
	}

}

// tag list를 마우스로 클릭하면 input box로 변신시키기 위한 이벤트 핸들러
Tag.prototype.tagListMouseClick = function()
{
	var instance = this.parentNode.instance;
	instance.inputTemporary = instance.createSuggestInput();
	instance.inputTemporary.value = this.innerHTML.unhtmlspecialchars();
	instance.typingText = this.innerHTML;
	this.innerHTML = "";
	this.onclick = null;
	this.appendChild(instance.inputTemporary);
	//tag modification시 마지막 inputbox삭제. start
	//alert(this.parentNode.childNodes.length + ' : ' +this.parentNode.instance.tagList.childNodes.length + ' : ' + this.parentNode.instance);
	if(this.parentNode.childNodes.length < 10 && exitLastInput == 1){
		this.parentNode.removeChild(this.parentNode.lastChild);
		exitLastInput = 0;
	}
	//tag modification시 마지막 inputbox삭제. end
	instance.focusOnInput();
	instance.requestSuggestion();

}

// suggestion window를 숨긴다
Tag.prototype.hideSuggestion = function()
{
	this.isSuggestionShown = false;
	this.suggestion.style.display = "none";
	this.suggestion.selectedIndex = 0;

	/* TODO : temporary code */
	try {
		if(document.getElementById("fileList") 
		&& document.getElementById("fileList").style
		&& document.getElementById("fileList").style.visibility){
			document.getElementById("fileList").style.visibility = "visible";
		}
	} catch(e) { }
}

// 적절한 input box로 포커스를 이동시킨다
Tag.prototype.focusOnInput = function()
{
	this.getInput().focus();
	this.getInput().select();
}

Tag.prototype.deleteComma = function(str)
{
	var tempStr1 = ""
	var tempStr3 = ""
	for(var i = 0; i < str.length; i++)
	{
		tempStr1 = str.substr(i,1);

		if(tempStr1 == ','){
				tempStr3 += "";
		}else{
			 tempStr3 += tempStr1;
		}
	}
	str = tempStr3;
	return str;
}

// 이하 잡 유틸들

function getOffsetTop(obj)
{ return obj ? obj.offsetTop + getOffsetTop(obj.offsetParent) : 0; }

function getOffsetLeft(obj)
{ return obj ? obj.offsetLeft + getOffsetLeft(obj.offsetParent) : 0; }

var StringBuffer = function()
{ this.buffer = new Array(); }

StringBuffer.prototype.append=function(str)
{ this.buffer[this.buffer.length] = str; }

StringBuffer.prototype.toString = function()
{ return this.buffer.join(""); }

if(!String.prototype.trim) {
	String.prototype.trim = function()
	{ return this.replace(new RegExp("(^\\s*)|(\\s*$)", "g"), ""); }
}

if(!String.prototype.htmlspecialchars) {
	String.prototype.htmlspecialchars = function()
	{ return this.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll("<", "&gt;"); }
}

if(!String.prototype.unhtmlspecialchars) {
	String.prototype.unhtmlspecialchars = function()
	{ return this.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">"); }
}
function prepareTag(tagname, frm) {
	//var orginal_tagname = frm.tagName.value;
	//var sep = "";
	//if(orginal_tagname != "") sep =", ";
	//frm.tagName.value = orginal_tagname + sep + tagname;

	insertCommonTag(tagname, false);
	updatetime();
}

function blogtaginit(){

	var originTag = document.dataInfo.tagName.value;
	var preIndex = -1;
	var count = 0;
	for(var i = 0; i < originTag.length; i++)
	{
		var chr = originTag.substr(i,1);
		if(chr == ','){
			insertCommonTag(originTag.substr(preIndex+1,count), true);
			preIndex = i;
			count = 0;
		}else{
			count = count + 1;
		}

		if(originTag.length == i+1){
			insertCommonTag(originTag.substr(preIndex+1,count), true);
			preIndex = i;
			count = 0;
		}

	}
}

var x=0;
function debug(s){try{document.getElementById("debug").innerHTML=++x+")"+s+"<br />"+document.getElementById("debug").innerHTML}catch(e){}}

function limitTagCount(obj) {
	var str = obj.value;

	if(str.split(",").length >= 20) {
		alert('최대 20개까지 입력가능합니다.');
		obj.value = str.substring(0, str.length-1);
		return;
	}
}






var actType="";
var hidden_cmtopen="";
var hidden_pcmmtno="";
var hidden_Desc="";
var commentMaxLength = 4000;
var isSubmit = false;

function regComment(cmmtObj, n, pcmmtno, atcno) {
	//http://s1.daumcdn.net/pimg/blog/library/common_v2.0.js 으로 수정해서 넣기!!!
	id = atcno;
	if(n != atcno) id = n; 
	readytowrite = daum.$("readytowrite" + id);
	if(readytowrite.value == "Y"){
		readytowrite.value = "N";
	} else {
		cmmtObj.contents.value = "";
		alert("내용을 입력해주세요.");
		return;
	}
	if(document.getElementById("setcmmtcheck"+n) == null){
		// 여기는 이미 있는 그냥 댓글을 달때 호출됩니다.
		cmmtObj.articleno.value	= atcno;
		cmmtObj.name.value 		= document.getElementById("cmmtname"+n).value;
		cmmtObj.open.value 		= document.getElementById("cmmtopen"+n).value;
		cmmtObj.texticon.value 		= document.getElementById("cmmtexticon"+n).value;
		cmmtObj.password.value 	= document.getElementById("cmmtpwd"+n).value;
		cmmtObj.contents.value 	= document.getElementById("cmmttext"+n).value;

		// 댓글 max는 1300으로 제한되어있습니다.
		if (cmmtObj.contents.value.length > commentMaxLength) {
			alert ("댓글은 "+commentMaxLength+"자 까지 작성하실 수 있습니다.");
			return false;
		} 

		if( document.getElementById("cmmtopen"+n).checked ) {
			cmmtObj.open.value = 'N';
		} else {
			cmmtObj.open.value = 'Y';
		}

		//텍스티콘에 대한 설정 여부 확인 
		if( document.getElementById("cmmtexticon"+n).checked ) {
			cmmtObj.texticon.value = 'Y';
		} else {
			cmmtObj.texticon.value = 'N';
		}		
		

		//비로그인시 글남길때 이름 기입여부 체크
		if(document.getElementById("cmmtname"+n).type != "hidden" 
		&& ( cmmtObj.name.value == "" || cmmtObj.name.value == "이름" || cmmtObj.name.value == "****" || cmmtObj.name.value.replace(/(^\s*)|(\s*$)/g, "")=="") ){
			alert("이름을 입력해주세요");
			return;
		}

		//비로그인시 글남길때 비밀번호 기입여부 체크
		if(document.getElementById("cmmtpwd"+n).type != "hidden" 
		&& (cmmtObj.password.value=="" || cmmtObj.password.value=="****" || cmmtObj.password.value.replace(/(^\s*)|(\s*$)/g, "")=="")){
			alert("비밀번호를 공백이 아닌 값으로 입력해주세요");
			return;
		}

		if(cmmtObj.contents.value== "" || cmmtObj.contents.value== "내용") {
			alert("내용을 입력해주세요.");
			return;
		}

		var key = document.getElementById("cmmtcheck"+n).value;
		var bflag = false;

		// 비로긴 상태에서 블로그 주소를 입력했을 경우에 아래와 같이 처리한다.
		if(document.getElementById("cmmtcheck"+n).type != "hidden") {
			if( new RegExp(/^(http:\/\/)?(blog|b)\.daum\.net\/[^.][a-z0-9_\-.]{1,}[^.]\/?\d*$/).test(key) ) {
				alert("Daum블로그 주소는 입력할 수 없습니다. \nDaum블로그 이용자께서는 로그인 후 사용해 주세요.	");
				return;
			}
		}

		if(key != '' && key != '블로그 또는 이메일 주소') {

			if( key.indexOf("@") > 0 ) {
				cmmtObj.cmmtmail.value = key;
				cmmtObj.cmmtblog.value = "";
				bflag = true;
			} else if( key.indexOf(".") > 0 ){

				if(key.indexOf("http://")<0)
					key = "http://"+key;

				cmmtObj.cmmtblog.value = key;
				cmmtObj.cmmtmail.value = "";
				bflag = true;
			}
		}
		
		//등록버튼을 이미 눌렀을경우
		if (isSubmit) {
			alert("등록중입니다 잠시만 기다려주세요.");
			return;
		}
		
		if(bflag) {
			isSubmit = true;
			cmmtObj.pcmmtno.value = "";
			cmmtObj.isModify.value = "N";

			cmmtObj.action = "/_blog/CommentCreate.ajax";

//			document.getElementById("stop"+n).style.display = "none";
			var obj = new Object();
			obj.articleno=atcno;
			obj.blogid=cmmtObj.blogid.value;
			obj.commentType = 2;
			obj.commentNumber = n;
	        obj.currentPage= documentValueCheck(document.getElementById("cmtCurrentPage").value, "");
	        obj.prevPage= documentValueCheck(document.getElementById("cmtPrevPage").value, "");
	        obj.maxParentno= documentValueCheck(document.getElementById("cmtMaxParentno").value, "");
	        obj.minParentno= documentValueCheck(document.getElementById("cmtMinParentno").value, "");
					
			loadXMLDocWithParam("POST",cmmtObj.action,getForm(cmmtObj),"afterCommentInsert",null,obj);
			if (typeof(requestAjaxCheck) == 'function') {
				requestAjaxCheck("action=regComment&blogid="+obj.blogid);
			}
		}else{
			alert("블로그/이메일 형태가 잘못되었습니다.");
			return;
		}
	}
	else if(document.getElementById("setcmmtcheck"+n)!= undefined || document.getElementById("setcmmtcheck"+n).value != undefined){
		// 여기는 이미 있는 댓글에 답글을 달때 호출됩니다. 
		cmmtObj.articleno.value	= atcno;
		cmmtObj.pcmmtno.value 	= pcmmtno;
		cmmtObj.cmmtno.value 	= n;
		cmmtObj.name.value 		= document.getElementById("setcmmtname" + n).value;
		cmmtObj.open.value 		= document.getElementById("setcmmtopen" + n).value;
		cmmtObj.texticon.value 		= document.getElementById("setcmmtexticon"+n).value;	
		cmmtObj.password.value 	= document.getElementById("setcmmtpwd" + n).value;
		cmmtObj.contents.value 	= document.getElementById("setcmmttext" + n).value;

		// 댓글 max는 1300으로 제한되어있습니다.
		if (cmmtObj.contents.value.length > commentMaxLength) {
			alert ("댓글은 "+commentMaxLength+"자 까지 작성하실 수 있습니다.");
			return false;
		} 

		if(document.getElementById("setcmmtopen" + n).checked == true){
			cmmtObj.open.value = "N";
		}else{
			cmmtObj.open.value = "Y";
		}

		if(document.getElementById("setcmmtexticon" + n).checked == true){
			cmmtObj.texticon.value = "Y";
		}else{
			cmmtObj.texticon.value = "N";
		}		
		
		if(document.getElementById("setcmmtname"+n).type != "hidden" 
		&& (cmmtObj.name.value == "" || cmmtObj.name.value == "이름" || cmmtObj.name.value == "****" || cmmtObj.name.value.replace(/(^\s*)|(\s*$)/g, "")=="") ) {
			alert("이름을 입력해주세요.");
			return;
		}
		
		if(document.getElementById("setcmmtpwd"+n).type!="hidden" 
		&& (cmmtObj.password.value=="" || cmmtObj.password.value=="****" || cmmtObj.password.value.replace(/(^\s*)|(\s*$)/g, "")=="")){
			alert("비밀번호를 공백이 아닌 값으로 입력해주세요.");
			return;
		}

		var key = document.getElementById("setcmmtcheck"+n).value;

		var bflag = false;
		if(key != '' && key != '블로그 또는 이메일 주소') {
			if( key.indexOf("@") > 0 && key.indexOf("/") < 0 ) {
				cmmtObj.cmmtmail.value = key;
				cmmtObj.cmmtblog.value = "";	
				bflag = true;
			} else if(  key.indexOf(".") > 0 && key.indexOf("@") < 0) {

				if(key.indexOf("http://")<0)
					key = "http://"+key;
				cmmtObj.cmmtblog.value = key;
				cmmtObj.cmmtmail.value = "";
				bflag = true;
			}
		}else{
			alert("블로그 또는 이메일 주소를 입력해주세요");
			return;
		}

		//등록버튼을 이미 눌렀을경우
		if (isSubmit) {
			alert("등록중입니다 잠시만 기다려주세요.");
			return;
		}
		
		if(bflag) {
			isSubmit = true;
			if(actType=="MOD"){
				cmmtObj.isModify.value = "Y";
				cmmtObj.action = "/_blog/CommentCreate.ajax";
			}else if(actType=="REP"){
				cmmtObj.isModify.value = "N";
				cmmtObj.action = "/_blog/CommentCreate.ajax";
			}

		}else{
			alert("블로그/이메일 형태가 잘못되었습니다.");
			return;
		}
					
		if(cmmtObj.contents.value=="" || cmmtObj.contents.value=="내용") {
			alert("내용을 입력해주세요.");
			return;
		}else{
			var obj = new Object();
			obj.articleno=atcno;
			obj.blogid=cmmtObj.blogid.value;
			obj.commentType = 1;
			obj.commentNumber = n;
			
	        obj.currentPage= documentValueCheck (document.getElementById("cmtCurrentPage").value, "");
	        obj.prevPage= documentValueCheck (document.getElementById("cmtPrevPage").value, "");
	        obj.maxParentno= documentValueCheck (document.getElementById("cmtMaxParentno").value, "");
	        obj.minParentno= documentValueCheck (document.getElementById("cmtMinParentno").value, "");
			
			if(actType=="MOD"){
				loadXMLDocWithParam("POST",cmmtObj.action,getForm(cmmtObj),"afterCommentModify",null,obj);

			} else {
				loadXMLDocWithParam("POST",cmmtObj.action,getForm(cmmtObj),"afterCommentInsert",null,obj);
			}
		}
	}else{
	}
}

function conditionalValueClear(oInput, isChecked, defaultValue) {
	if( oInput != null && typeof(oInput) != 'undefined' && oInput.type != "hidden" ) {
		if( isChecked ) {
			oInput.checked = false;
		} else {
			oInput.value = defaultValue;
		}
	}
}

function clearCommentInput(type, n)
{
	var header = "";
	if( type == 1 ) {
		header = "set";
	}
	
	conditionalValueClear(document.getElementById(header+"cmmtname"+n), false, "이름");
	conditionalValueClear(document.getElementById(header+"cmmtopen"+n), true, "");
	conditionalValueClear(document.getElementById(header+"cmmtexticon"+n), false, "");
	var oPasswd = document.getElementById(header+"cmmtpwd"+n);
	conditionalValueClear(oPasswd, false, "");
	if( oPasswd != null && typeof(oPasswd) != 'undefined' && oPasswd.type != 'hidden' ) {
		oPasswd.style.background = "url(http://i1.daumcdn.net/pimg/blog3/f_pass_1.gif) no-repeat #FFF";
	}
	conditionalValueClear(document.getElementById(header+"cmmttext"+n), false, "");
	conditionalValueClear(document.getElementById(header+"cmmtexticon" + n), true, "");
	conditionalValueClear(document.getElementById(header+"cmmtcheck"+n), false, "블로그 또는 이메일 주소");
}

//댓글 등록후 해줘야되는것들
function afterCommentInsert(xmlhttp,obj){
	var res = getSimpleResponse(xmlhttp);
	var tmp = document.createElement("DIV");
	tmp.innerHTML=res;
	var script = tmp.getElementsByTagName("SCRIPT");
	
	if(script.length>0){
		eval(script[0].innerHTML);
	} else {
		articleno = obj.articleno;
		currentPage = obj.currentPage;
		prevPage = obj.prevPage;
		maxParentno = obj.maxParentno;
		minParentno = obj.minParentno;
		
		var returnUrl ="";
		// obj.commentType = 1은 댓글의 답글, 2는 그냥 댓글 
		if ((currentPage=="" && prevPage =="") || obj.commentType == 2) {
			returnUrl = '/_blog/commentList.ajax?blogid='+obj.blogid+'&articleno='+articleno;
		} else {
			returnUrl = '/_blog/commentList.ajax?blogid='+obj.blogid+'&articleno='+articleno+'&prevPage='+prevPage+'&minParentno='+minParentno+'&maxParentno='+maxParentno+'&currentPage='+currentPage;
		}
	    loadCommentList(returnUrl, articleno);
	    
		if( typeof(requestAjaxCheck) == 'function' ) {
			requestAjaxCheck("action=commentList");
		}
	}
	
	tmp=null;
	
	flgSpace = "";
	flgMode = "";

	type = obj.commentType;
	n = obj.commentNumber;
	
	// success = reserved 면 금칙어로, 아래 댓글을 비우는 부분은 처리하지 않는다.
	if (xmlhttp.responseText.indexOf("success=\"reserved\"") < 0) {
		if (type == 1) {
			if(document.getElementById('setcmmttext' + n)) {
				document.getElementById('setcmmttext' + n).style.height = '34px';
				clearCommentInput(type, n);
			}
		} else if (type == 2) {
			if(document.getElementById('cmmttext' + n)) {
				document.getElementById('cmmttext' + n).style.height = '34px';
				clearCommentInput(type, n);
			}
		}
		if( document.loopform != null ) {
			document.loopform.reset();
		}
	}
	
	xmlhttp = null;
	isSubmit = false;
}
//댓글목록을 불러온다
function loadCommentList(url,atno){
	commentAjax = new AjaxObject("commentAjax", "commentListBlock_"+atno, "contents", "ajax_layer_load");
	commentAjax.finalProcessFunc = function(isSuccess) {
		var cmtcnt, prevcnt,
			$commentCounter = daum.$("cmmtcnt" + atno),
			$commentNew = daum.$("newcmmt" + atno);
		if (isSuccess != "true") return;
		
		prevcnt = parseInt($commentCounter.innerHTML);
		cmtcnt = parseInt(daum.$$('input[name=cmtCount' + atno + ']')[0].value);
		$commentCounter.innerHTML = cmtcnt.toString();
		
		if (cmtcnt == 0) {
			$commentNew.innerHTML = "";
		} else if (prevcnt < cmtcnt) {
			$commentNew.innerHTML = ' <img src="http://i1.daumcdn.net/pimg/blog/p_img/b_new.gif" width="8" height="9" alt="" />';
		}
	}
	commentAjax.load(url, true);
}
function loadProfileCommentList(url){
	commentAjax = new AjaxObject("commentAjax", "pCont_comm_list", "contents", "ajax_layer_load");
	commentAjax.load(url, true);
}

// 주인이 글을 지운다.
function deleteCommentAjax(blogid, atno, cmmtno, url, open, cntdt) {
	if(confirm("삭제하시겠습니까?	")){
       	var frm = document.delFrm;
		frm.blogid.value = blogid;
		frm.articleno.value = atno;
        frm.cmmtno.value = cmmtno;
		frm.mode.value = "D";
        frm.open.value = open;
        frm.regdt.value= cntdt;

        if(document.getElementById("password2") && document.getElementById("password2").value !=""){
        	frm.password.value=document.getElementById("password2").value;
        }
        var obj = new Object();
        obj.articleno=atno;
        obj.blogid= blogid;
        obj.currentPage= documentValueCheck (document.getElementById("cmtCurrentPage").value, "");
        obj.prevPage= documentValueCheck (document.getElementById("cmtPrevPage").value, "");
        obj.maxParentno=documentValueCheck (document.getElementById("cmtMaxParentno").value, "");
        obj.minParentno=documentValueCheck (document.getElementById("cmtMinParentno").value, "");
        
        loadXMLDocWithParam("POST","/_blog/CommentDelete.ajax",getForm(frm),"afterCommentDelete",null,obj);
        if( typeof(requestAjaxCheck) == 'function' ) {
			requestAjaxCheck("action=deleteCommentAjax&blogid="+blogid);
		}
	}
}

// 주인이 아닌 로그인 사용자의 댓글을 지운다.
function goCmmtLoginDelAjax(blogid, atno, cmmtno, url, open, cntdt, euserid){
    var frm = document.delFrm;
    frm.blogid.value=blogid;
    frm.articleno.value=atno;
    frm.cmmtno.value=cmmtno;
    frm.mode.value="D";
    frm.regdt.value=cntdt;
    frm.open.value=open;
    frm.euserid.value=euserid;
    var obj = new Object();
    obj.articleno=atno;
    obj.blogid= blogid;
    obj.currentPage=documentValueCheck (document.getElementById("cmtCurrentPage").value, "");
    obj.prevPage=documentValueCheck (document.getElementById("cmtPrevPage").value, "");
    obj.maxParentno=documentValueCheck (document.getElementById("cmtMaxParentno").value, "");
    obj.minParentno=documentValueCheck (document.getElementById("cmtMinParentno").value, "");
    
    loadXMLDocWithParam("POST","/_blog/CommentDelete.ajax",getForm(frm),"afterCommentDelete",null,obj);
}
//댓글 삭제후 해줘야되는것들
function afterCommentDelete(xmlhttp,obj){
	articleno = obj.articleno;
	currentPage = obj.currentPage;
	prevPage = obj.prevPage;
	maxParentno = obj.maxParentno;
	minParentno = obj.minParentno;
    
	var returnUrl ="";
	if (currentPage=="" && prevPage =="") {
		returnUrl = '/_blog/commentList.ajax?blogid='+obj.blogid+'&articleno='+articleno;
	} else {
		returnUrl = '/_blog/commentList.ajax?blogid='+obj.blogid+'&articleno='+articleno+'&prevPage='+prevPage+'&minParentno='+minParentno+'&maxParentno='+maxParentno+'&currentPage='+currentPage;
	}
    loadCommentList(returnUrl, articleno);

	flgMode = "";
	xmlhttp=null;
}
//댓글 답변화면
function board_reply(mentNum, pmentNum, popen, articleNo, isLoginUser) {
	var textEl = daum.$("Text"+mentNum);

	if(textEl.style.display == 'none'){
		textEl.style.display = 'block';
	}
	
	actType="REP";
	var mode = "reply";
	
	writeTemplateSetting(mentNum, pmentNum, popen, articleNo, mode, "N");

	var openEl = daum.$("setcmmtopen"+mentNum);
	if (popen=="N") {
		openEl.disabled = true;
	} else {
		openEl.disabled = false;
	}
	if (isLoginUser=="N") {
		daum.addEvent(openEl, "click", function() {
			if (openEl.checked) {
				openEl.checked = false;
				alert("비공개로 등록하시면 작성자가 답글을 확인할 수 없어 설정이 제한됩니다.");
			}
		});
	}
	
	inSpaceDisplay(mentNum,actType);
}
//패스워드 기반으로 댓글 수정 패스워드 입력창을 보여준다.
function goCmmtModi(blogid,articleno,cmmtno,pnum,cmtopen,curObj,YN,obj){
	hidden_open = cmtopen;
	hidden_pcmmtno = pnum;
	    clickAreaCheck = true;
	    var str = "<div style='background:#FFFFFF; border:1px solid #999999;'><div style='margin:10px 10px 6px 10px; text-align:right;'>비밀번호를 입력해주세요.<br />";
	    str += "<input type=password id=password2 id=password2 name=password2 class='box passbg' style='width:139px; margin-bottom:5px;' onkeydown='clickAreaCheck = true' onfocus='clickAreaCheck = true;this.className = \"box\";'><br />";
	    str += "<a href=\"javascript:;\" onclick=\"checkCommentpasswd('"+blogid+"','"+articleno+"','"+cmmtno+"');\"><img src='http://i1.daumcdn.net/pimg/blog/p_img2/btn_ok.gif' width='32' height='18' alt='확인'></a> <a href='javascript:;' ><img src='http://i1.daumcdn.net/pimg/blog/p_img2/btn_cancle03.gif' width='32' height='18' alt='취소'></a><br /></div></div>";
	    setNameLayersPosition(obj, str);

}

function goCmmtDel(blogid,atno,no,url,open,curObj,cntdt){
	actType="DEL";
	frm = document.cmmtform;
	frm.blogid.value=blogid;
	frm.articleno.value=atno;
	frm.no.value=no;
	frm.mode.value="D";
	frm.open.value=open;
	frm.regdt.value=cntdt;
	frm.action=url;
    clickAreaCheck = true;
    var str = "<div style='background:#FFFFFF; border:1px solid #999999;' id='pwdinput'><div style='margin:10px 10px 6px 10px; text-align:right;'>비밀번호를 입력해주세요.<br />";
    str += "<input type=password id=password2 name=password2 class='box passbg' style='width:139px; margin-bottom:5px;' onkeydown='clickAreaCheck = true' onfocus='clickAreaCheck = true;this.className = \"box\";'><br>";
    str += "<a href=\"javascript:;\" onClick=\"checkCommentpasswd('"+blogid+"','"+atno+"','"+no+"');\"><img src='http://i1.daumcdn.net/cafeimg/blog/p_img2/btn_ok.gif' width='32' height='18' alt='확인'></a> <a href='javascript:;' ><img src='http://i1.daumcdn.net/cafeimg/blog/p_img2/btn_cancle03.gif' width='32' height='18' alt='취소'></a><br></div></div>";
    setNameLayersPosition(curObj, str);
}


//입력받은 패스워드 체크
function checkCommentpasswd(blogid,articleno,cmmtno){
	var passwd = document.getElementById("password2").value;
	if(passwd==""){
		alert("비밀번호를 입력해주세요!");
		return;
	}
	clickAreaCheck=false;
	var qry = "/_blog/CommentCheckPwd.ajax?type=2&blogid="+blogid+"&articleno="+articleno+"&cmmtno="+cmmtno+"&password="+passwd;
	loadXMLDocWithParam("GET",qry,null,"checkedCommentPasswd",null,null);
}
//패스워드 검사후 해줘야되는것들
function checkedCommentPasswd(xmlhttp,obj){
	var res = getSimpleResponse(xmlhttp);
	eval(res);
	xmlhttp=null;
}
//수정뒤에 해줘야될것들
function afterCommentModify(xmlhttp,obj){
	var res = getSimpleResponse(xmlhttp);
	var tmp = document.createElement("DIV");
	tmp.innerHTML=res;
	var script = tmp.getElementsByTagName("SCRIPT");
	if(script.length>0){
		eval(script[0].innerHTML);
	} else {
		articleno = obj.articleno;
		currentPage = obj.currentPage;
		prevPage = obj.prevPage;
		maxParentno = obj.maxParentno;
		minParentno = obj.minParentno;
	    
		var returnUrl ="";
		if (currentPage=="" && prevPage =="") {
			returnUrl = '/_blog/commentList.ajax?blogid='+obj.blogid+'&articleno='+articleno;
		} else {
			returnUrl = '/_blog/commentList.ajax?blogid='+obj.blogid+'&articleno='+articleno+'&prevPage='+prevPage+'&minParentno='+minParentno+'&maxParentno='+maxParentno+'&currentPage='+currentPage;
		}
	    loadCommentList(returnUrl, articleno);
	    
		flgSpace = "";
		flgMode = "";
	}
	xmlhttp=null;
	isSubmit = false;
}

//수정화면
function board_modify(mentNum, pmentNum, cmmt_open, articleNo, commitYn, notLoginComm) {
		if(commitYn=="Y" && document.getElementById("Text"+mentNum).style.display == 'none'){
			document.getElementById("Text"+mentNum).style.display = 'block';
		}
		else{
			if(actType!="DEL"){
				document.getElementById("Text"+mentNum).style.display = 'none';
			}
		}

		hidden_cmtopen="";
		hidden_pcmmtno="";

		if(actType=="DEL"){
			frm = document.cmmtform;
			blogid=frm.blogid.value;
			atno=frm.articleno.value;
			cmmtno = frm.no.value;
			copen = frm.open.value;
			cntdt = frm.regdt.value;
			deleteCommentAjax(blogid, atno, cmmtno, '/_blog/CommentDelete.ajax', copen, cntdt);
			actType="";
			return;
		}

		actType="MOD";
		var mode = "modify";
		
		writeTemplateSetting(mentNum, pmentNum, cmmt_open, articleNo, mode, notLoginComm);

	    if(mentNum != pmentNum){
			var obj = document.getElementById("open"+pmentNum);
			if(obj){
				if(obj.innerText=="N"){
					if(document.getElementById("setcmmtopen"+mentNum)){
						document.getElementById("setcmmtopen"+mentNum).checked=true ;
						document.getElementById("setcmmtopen"+mentNum).disabled=true ;
					}
				}
			}
		}

		if(navigator.userAgent.toLowerCase().indexOf('msie')>-1){
			if(document.getElementById("Text"+mentNum)){
				document.getElementById("setcmmttext"+mentNum).value =  TexticonCheck.checkedComments(document.getElementById("Text"+mentNum).innerHTML);
				document.getElementById("setcmmttext"+mentNum).style.background = '#fff';
			}else{
				document.getElementById("setcmmttext"+mentNum).value = replaceHTML(hiddenDesc);
			}
			document.getElementById("setcmmtname"+mentNum).value =  document.getElementById("uname"+mentNum).innerText;
		}else{
			if(document.getElementById("Text"+mentNum)){
				document.getElementById("setcmmttext"+mentNum).value =  TexticonCheck.checkedComments(document.getElementById("Text"+mentNum).innerHTML);
			}else{
				document.getElementById("setcmmttext"+mentNum).value =replaceHTML(hiddenDesc);
			}
			document.getElementById("setcmmtname"+mentNum).value =  document.getElementById("uname"+mentNum).innerHTML;
		}
		if(document.getElementById("password2")){
			document.getElementById("setcmmtpwd"+mentNum).value =  document.getElementById("password2").value;
			document.getElementById("setcmmtpwd"+mentNum).style.background='#FFFFFF';
		}
		
		if(document.getElementById("setcmmtcheck"+mentNum)){
			document.getElementById("setcmmtcheck"+mentNum).value =  document.getElementById("emailblog"+mentNum).getAttribute("name");
		}
		inSpaceDisplay(mentNum, actType);

		hiddenDesc="";
		window.setTimeout("resizeArea(document.getElementById('setcmmttext'+" + mentNum + "), '34', '1000')", 10);
		resizeArea(document.getElementById("setcmmttext"+mentNum), '34', '1000');
}

function innertxt(mentNum, pmentNum, cmmt_open, articleNo, mode, notLoginComm,islogin){
		var innerWrite = "";

		var cmtopen = document.getElementById("commentOpen_"+articleNo).innerHTML;
    	var onlyloginuser = "N";
    	if(cmtopen =="B0402" && USERINFO.islogin=="N"){
    		onlyloginuser = "Y"
    	}
    	innerWrite = innerWrite + "<table class=\"writeTable\"><colgroup><col /><col width=\"70\" /></colgroup><tr><td class=\"textareaBlock\">";
		if( onlyloginuser == "Y"){
		
		}else if(notLoginComm == "Y"){
			innerWrite = innerWrite + " <input type=\"text\" size=\"15\" name=\"setcmmtname\" id=\"setcmmtname"+mentNum+"\" value=\"이름\" class=\"box\" onfocus=\"if(this.value=='이름')this.value=''\"> &nbsp;";
            innerWrite = innerWrite + " <input type=\"password\" size=\"12\" name=\"setcmmtpwd\" id=\"setcmmtpwd"+mentNum+"\" value=\"\" class=\"box passbg\" onfocus=\"this.style.background='#FFFFFF'\"> &nbsp;";
            innerWrite = innerWrite + " <input type=\"text\" name=\"setcmmtcheck\" id=\"setcmmtcheck"+mentNum+"\" size=\"27\" value=\"블로그 또는 이메일 주소\" class=\"box\" onfocus=\"if(this.value=='블로그 또는 이메일 주소')this.value=''\"><br style=\"font-size:3px;\">";
		}else if( USERINFO.isHidden == "N"){
            innerWrite = innerWrite + " <input type=\"text\" size=\"15\" name=\"setcmmtname\" id=\"setcmmtname"+mentNum+"\" value=\""+USERINFO.blogname+"\" class=\"box\" onfocus=\"if(this.value=='이름')this.value=''\"> &nbsp;";
            innerWrite = innerWrite + " <input type=\"password\" size=\"12\" name=\"setcmmtpwd\" id=\"setcmmtpwd"+mentNum+"\" value=\"\" class=\"box passbg\" onfocus=\"this.style.background='#FFFFFF'\"> &nbsp;";
            innerWrite = innerWrite + " <input type=\"text\" name=\"setcmmtcheck\" id=\"setcmmtcheck"+mentNum+"\" size=\"27\" value=\""+USERINFO.blogCheck+"\" class=\"box\" onfocus=\"if(this.value=='블로그 또는 이메일 주소')this.value=''\"><br style=\"font-size:3px;\">";
		}else{
		    innerWrite = innerWrite + " <input type=\"hidden\" name=\"setcmmtname\" id=\"setcmmtname"+mentNum+"\" value=\""+USERINFO.blogname+"\" class=\"box\">";
            innerWrite = innerWrite + " <input type=\"hidden\" name=\"setcmmtpwd\" id=\"setcmmtpwd"+mentNum+"\"  value=\""+USERINFO.blogPwd+"\" class=\"box\">";
            innerWrite = innerWrite + " <input type=\"hidden\" name=\"setcmmtcheck\" id=\"setcmmtcheck"+mentNum+"\"  value=\""+USERINFO.blogCheck+"\" class=\"box\" value=\"\">";
		}
		if( onlyloginuser == "Y" ){
        	innerWrite = innerWrite + " <textarea rows=\"3\" cols=\"57\" name=\"setcmmttext\" id=\"setcmmttext"+mentNum+"\" class=\"box\" style=\"\"  disabled>Daum 회원에게만 댓글을 허용하고 있습니다.</textarea>";
		}else{
			if(mode == "modify"){
				innerWrite = innerWrite + " <textarea rows=\"3\" cols=\"57\" name=\"setcmmttext\" id=\"setcmmttext"+mentNum+"\"  class=\"box\" style=\"\" onkeyup=\"resizeArea(this, '34', '1000')\" onfocus=\"if(this.value=='내용')this.value='';\" >내용</textarea>";
	        	innerWrite = innerWrite + " <input type=\"hidden\" id=\"readytowrite" + mentNum +"\" id=\"readytowrite" + mentNum +"\" value=\"Y\">";				
			} else {
				innerWrite = innerWrite + " <textarea rows=\"3\" cols=\"57\" name=\"setcmmttext\" id=\"setcmmttext"+mentNum+"\"  class=\"box\" style=\"\" onkeyup=\"resizeArea(this, '34', '1000')\" onfocus=\"if(this.value=='내용')this.value=''; readyToWrite(this, '"+ mentNum +"')\" style=\"color:#BEBEBE\"> 인터넷은 우리가 함께 만들어가는 소중한 공간입니다. 댓글 작성 시 타인에 대한 배려와 책임을 담아주세요.</textarea>";
	        	innerWrite = innerWrite + " <input type=\"hidden\" id=\"readytowrite" + mentNum +"\" id=\"readytowrite" + mentNum +"\" value=\"N\">";
			}
		}
		if(onlyloginuser == "N"){
			innerWrite = innerWrite + "</td><td class=\"buttonBlock\"><a href=\"#\" onclick=\"regComment(document.cmmtform,  '" + mentNum + "', '" + pmentNum + "', '"+articleNo+"'); return false;\" class=\"gbButton sSubmitBtn\">등록</a>";
			innerWrite = innerWrite + "<a href=\"#\" onclick=\"board_reply('" + mentNum + "', '" + pmentNum + "', '" + cmmt_open + "', '"+articleNo+"'); return false;\" class=\"gbButton sCancelBtn\">취소</a></td></tr></table>";
		}
		innerWrite = innerWrite + "<div style=\"height:25px; margin:3px 0 0 0;\">";
		var checkOption = "";
		var checkOptionicon = "";

		if(cmmt_open == "N"){
			checkOption = "checked";
		}
		if (TexticonCheck.isTexticon(document.getElementById("Text"+mentNum).innerHTML)) {
			checkOptionicon = "checked";
		}	

		if(onlyloginuser == "Y"){

		}else if(notLoginComm == "Y"){
			innerWrite = innerWrite + "<div class=\"fl\"><input type=\"hidden\" name=\"setcmmtopen\" id=\"setcmmtopen"+mentNum+"\" value=\"N\" class=\"checkbox\" style=\"vertical-align: middle; margin-bottom: 2px\">";
			innerWrite = innerWrite + "<input type=\"checkbox\" name=\"setcmmtexticon\" id=\"setcmmtexticon"+mentNum+"\" value=\"Y\" class=\"checkbox\" " + checkOptionicon + " style=\"vertical-align: middle; margin-bottom: 2px\">텍스티콘";
			innerWrite = innerWrite + "<a href=\"javascript:popUp('/_help/popup_texticon.html', '520', '516')\"><img src=\"http://i1.daumcdn.net/pimg/blog/theme/btn_question02.gif\" width=\"12\" height=\"11\" alt=\"텍스티콘\" style=\"margin-bottom: 1px; vertical-align: middle;\" /></a>";	        
			if(cmtopen == "B0403")
				innerWrite+="<font class='p11'>(등록 후 승인으로 설정되어 있습니다. 블로그 주인이 승인하면 글이 보입니다.)</font>";
			innerWrite +="</div>";
		}else if(USERINFO.islogin == "Y"){
	        innerWrite = innerWrite + "<div class=\"fl p11\"><input type=\"checkbox\" name=\"setcmmtopen\" id=\"setcmmtopen"+mentNum+"\" value=\"N\" class=\"checkbox\" " + checkOption + " style=\"vertical-align: middle; margin-bottom: 2px\"> 비공개";
			innerWrite = innerWrite + "<input type=\"checkbox\" name=\"setcmmtexticon\" id=\"setcmmtexticon"+mentNum+"\" value=\"Y\" class=\"checkbox\" " + checkOptionicon + " style=\"vertical-align: middle; margin-bottom: 2px\"> 텍스티콘";
			innerWrite = innerWrite + "<a href=\"javascript:popUp('/_help/popup_texticon.html', '520', '516')\"><img src=\"http://i1.daumcdn.net/pimg/blog/theme/btn_question02.gif\" width=\"12\" height=\"11\" alt=\"텍스티콘\" style=\"margin-bottom: 1px; vertical-align: middle;\" /></a>";
			if(cmtopen == "B0403")
				innerWrite+="<font class='p11'>(등록 후 승인으로 설정되어 있습니다. 블로그 주인이 승인하면 글이 보입니다.)</font>";

			innerWrite +="</div>";

		}else{
	        innerWrite = innerWrite + "<div class=\"fl\"><input type=\"hidden\" name=\"setcmmtopen\" id=\"setcmmtopen"+mentNum+"\" value=\"N\" class=\"checkbox\" style=\"vertical-align: middle; margin-bottom: 2px\">";
			innerWrite = innerWrite + "<input type=\"checkbox\" name=\"setcmmtexticon\" id=\"setcmmtexticon"+mentNum+"\" value=\"Y\" class=\"checkbox\" " + checkOptionicon + " style=\"vertical-align: middle; margin-bottom: 2px\">텍스티콘";
			innerWrite = innerWrite + "<a href=\"javascript:popUp('/_help/popup_texticon.html', '520', '516')\"><img src=\"http://i1.daumcdn.net/pimg/blog/theme/btn_question02.gif\" width=\"12\" height=\"11\" alt=\"텍스티콘\" style=\"margin-bottom: 1px; vertical-align: middle;\" /></a>";	        
			if(cmtopen == "B0403")
				innerWrite+="<font class='p11'>(등록 후 승인으로 설정되어 있습니다. 블로그 주인이 승인하면 글이 보입니다.)</font>";
			innerWrite +="</div>";
		}

		innerWrite = innerWrite + "</div></div>";
		return(innerWrite);
}
	var flgSpace = "";
	var flgMode = "";

	function inSpaceDisplay(mentNum, actType){

		var viewOff = document.getElementById("inWrite"+flgSpace);
		var viewOn = document.getElementById("inWrite"+mentNum);

		if(flgSpace != mentNum){

			if(flgSpace != ""){

				viewOff.style.display = "none";
				if(navigator.userAgent.toLowerCase().indexOf('msie')>-1){
					viewOff.innerHTML =  null;
				}else{
					viewOff.innerHTML =  null;
				}
			}

			viewOn.style.display="";
			flgSpace = mentNum;
			flgMode = actType;

		}else{

			if(flgMode == actType){
				viewOn.style.display="none";
			}else{
				viewOn.style.display="";
			}
			if(flgMode==""){
				viewOn.style.display="none";
			}

			flgSpace="";
			flgMode="";
		}
	}

	function writeTemplateSetting(mentNum, pmentNum, cmmt_open, articleNo, mode, notLoginComm) {
		var writeTemplate = document.getElementById("inWrite"+mentNum);	
		writeTemplate.innerHTML = innertxt(mentNum, pmentNum, cmmt_open, articleNo, mode, notLoginComm);
	}

function setNameLayersPosition(curObj, str) {
	var name = "nameLayer";
	if (!document.getElementById(name)) {
        var cElement = document.createElement("DIV");
        cElement.id = name;
        cElement.style.position = 'absolute';
		cElement.style.zIndex = 50;
        document.body.appendChild(cElement);
	}
	document.getElementById(name).style.top = (getAbsoluteTop(curObj) + curObj.offsetHeight + 3)+"px";
	document.getElementById(name).style.left = getAbsoluteLeft(curObj)+"px";
	document.getElementById(name).innerHTML = str;
	divDisplay(name, 'block');
}
function checkChild(key){
		y= confirm('삭제하시겠습니까?');
		if(y)
		return true;
		else
		return false;
}
function gocmmtcheck(cmmtpwd){
		if(document.getElementById(cmmtpwd).value==""){
			alert("비밀번호를 입력해주세요");
			return;
		}
		document.cmmtform.password.value=document.getElementById(cmmtpwd).value;
		document.cmmtform.submit();
}
var showContentAjax;
var oldTarget = '';
var oldTargetId = '';
function showContent(target, articleNum, blogId, isSingleView) {
	if(!isSingleView && !isLoadedContent(target, articleNum) && target != 'A') {
		showContentAjax = new AjaxObject("showContentAjax", null, null, "ajax_layer_load");
		var sAction = "";
		if(target == "O") {
			showContentAjax.callbackFunc = printComment;
			source = "/_blog/commentList.do?blogid=" + blogId + "&articleno=" + articleNum + "&contentid=commentListBlock_"+articleNum;
			sAction = "commentList";
		} else if(target == "T"){
			showContentAjax.callbackFunc = printTrackback;
			source = "/_blog/getTrackbacks.do?blogid=" + blogId + "&articleno=" + articleNum + "&contentid=" + "iL"+target+"_"+articleNum;
			sAction = "getTrackbacks";
		}
		setLoadedContent(target, articleNum);
		source = source.replace(".do",".ajax");
		//loadXMLDoc("GET",source,null,func,"CommentFail");
		showContentAjax.load(source, true);
		if( typeof(requestAjaxCheck) == 'function' ) {
			requestAjaxCheck("action="+sAction);
		}
	}else{
		var cstate = document.getElementById("iL"+target+"_"+articleNum).style.display;
		if(cstate == "block"){
			document.getElementById("iL"+target+"_"+articleNum).style.display="none";
		}else{
			document.getElementById("iL"+target+"_"+articleNum).style.display="block";
		}
	}
	makebold('i'+target+'Text'+articleNum, 'cB_Amp');
	if(oldTargetId == articleNum && document.getElementById("iL"+oldTarget+"_"+articleNum).style.display=='none'){
		makebold('i'+oldTarget+'Text'+articleNum, '');
	}else if(oldTarget != target && document.getElementById("iL"+oldTarget+"_"+articleNum)){
		document.getElementById("iL"+oldTarget+"_"+articleNum).style.display='none';
		makebold('i'+oldTarget+'Text'+articleNum, '');
	}
	oldTarget = target;
	oldTargetId = articleNum;
}
//댓글 출력
function printComment(xmldoc){
		if(xmldoc !=null){
			var lastloadObject = loadedDynamicContent[loadedDynamicContent.length-1];
			var num = lastloadObject.substring(1);
			var obj = document.getElementById("commentListBlock_"+num);
            document.getElementById("iLO_"+num).style.display='block';
			if (typeof(xmldoc) != "string"){
				var items = xmldoc.getElementsByTagName('contents');
	            obj.innerHTML=items[0].firstChild.nodeValue;
			}else{
				obj.innerHTML=xmldoc;
			}            
			var commentScript = document.getElementById ? document.getElementById("commentScriptParse"+num) :  (document.all ? document.all["commentScriptParse"+num] : null)
			commentScript.innerHTML = obj.innerHTML;
			 //스크립트 실행
	        scriptParse(commentScript);
		}
}
//엮인글 출력
function printTrackback(xmldoc){
		if(xmldoc !=null){
			var lastloadObject = loadedDynamicContent[loadedDynamicContent.length-1];
			var num = lastloadObject.substring(1);
			var obj = document.getElementById("trackbackListBlock_"+num);
		    document.getElementById("iLT_"+num).style.display='block';
			if (typeof(xmldoc) != "string"){
				var items = xmldoc.getElementsByTagName('contents');
	            obj.innerHTML=items[0].firstChild.nodeValue;
			}else{
				obj.innerHTML=xmldoc;
			}            

		}
}
function makebold(target, cName){
	if(document.getElementById(target)){
		document.getElementById(target).className = cName;
		if(cName == 'cB_Amp'){
			document.getElementById(target).parentNode.className = 'bold';
		}else{
			document.getElementById(target).parentNode.className = '';
		}
	}
}


/* 댓글 리사이징 */
function resizeArea(curObj, min, max){
	if (navigator.userAgent.indexOf("Chrome") > 0 || navigator.userAgent.indexOf("Safari") > 0 || isIE11() === true) {
		var scrollheight = curObj.scrollHeight - 4;
	} else {
		var scrollheight = curObj.scrollHeight;
	}

	if (scrollheight < min) {
		curObj.style.height = min + 'px';
		curObj.style.overflowY = "hidden";
	} else if(scrollheight > max) {
		curObj.style.overflowY = "auto";
	} else if (parseInt(curObj.style.height) != scrollheight) {
		curObj.style.height = scrollheight + 'px';
		curObj.style.overflowY = "hidden";
	}
}


function isIE11() {
    var match = /(?:mozilla.*?)(?:trident)(?:.*?)rv:11.([\w.]+)?/.test( navigator.userAgent.toLowerCase() );
    return match;
}


function documentValueCheck(objValue, defValue) {
	if (typeof(objValue) != 'undefined') {	
		return objValue;
	} else {
		return defValue;
	}
}

/* loginForComment */
function loginForComment(blogname, articleno) {
	top.location.href = "http://login.daum.net/accounts/loginform.do?url=http://blog.daum.net/"+blogname+"/"+articleno+"&category=blog";
}

/* loginForProfileComment */
function loginForProfileComment(blogid) {
	top.location.href = "http://login.daum.net/accounts/loginform.do?url=http://blog.daum.net/_blog/ProfileView.do%3Fblogid="+blogid+"&category=blog";
}

/* loginForBoard */
function loginForBoard(blogid) {
	top.location.href = "http://login.daum.net/accounts/loginform.do?url=http://blog.daum.net/_blog/BoardView.do%3FcurrentPage=1%26blogid="+blogid+"&category=blog";
}

var verifyObj = null;
function verifyComments (articleno, commentno, curObj){
	var frm = document.verifyInfo;
	frm.returnURL.value='';
	frm.parentVerifyNo.value=articleno;
	frm.verifyNo.value=commentno;
	verifyObj = curObj;
	var obj = getForm(frm);
	loadXMLDoc("POST", "/_blog/VerifyRegister.ajax", obj, "verifyCommentSuccess", "verifyCommentFail");
}
function verifyCommentSuccess(xmlhttp) {
	var xmldoc = getXMLDocument(xmlhttp);
	var result = xmldoc.getElementsByTagName('contents');
	var resultMsg = result[0].firstChild.nodeValue;
	if(resultMsg.indexOf('COMMENT_VERIFY_SUCCESS') > -1){
		alert("승인 되었습니다.");
		verifyObj.style.display = 'none';
		xmlhttp = null;
	}else if(resultMsg.indexOf('승인 되었습니다.') > -1){
		alert("승인 되었습니다.");
		verifyObj.style.display = 'none';
		xmlhttp = null;
	}else if(resultMsg.indexOf('ARTICLE_BY_NOAUTHORITY') > -1){
		alert('권한이 없습니다.');
	}else{
		verifyCommentFail();
	}
	verifyObj = null;
}
function verifyCommentFail(){
	alert('승인중 오류가 발생하였습니다. 다시 시도해 주세요.');
}
	/**
이게 뭐냐면 .. 뭔 줄 알지?

주인으로 로그인 했을때 목록보기 형태에서 체크박스로 선택한 글의 공개 설정이나 / 카테고리 변경할때 쓰이는거지..
속성이 변경되면 메뉴의 카테고리 정보도 한번 갱신을 해줘..  
**/
var newWin = null;
function cate_select_open_old(type) {
	var form = document.titleviewloop;
	if(checkItemNum(form) == 0) {
		alert("선택하신 항목이 없습니다. ");
		return;
	}
	var obj = getForm(form);
	var dest = "/_blog/popupCategoryChangeForm.do?"+obj+"&type="+type;
	var width = "466";
	var height = "300";
	newWin = window.open(dest, "win", "scrollbars=yes,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=no,mebar=no,left=250,top=65");
	newWin.focus();
}

function checkSelectRestrictedArticle(){
	var chkRest = document.getElementsByName("chkRestrictArticle");
	var itemBoxes = document.getElementsByName("itemBox");
	var countRest = 0;
	
	for(i = 0 ; i < chkRest.length ; i++){
		if(chkRest[i].value == "1" && itemBoxes[i].checked == true){
			itemBoxes[i].checked = false;
			countRest++;
		}
	}
	return countRest;
} 

function cate_select_open(type) {
   	var form = document.titleviewloop;
   	if(checkItemNum(form) == 0) {
   		alert(" 선택하신 항목이 없습니다");
   		return;
   	}
	
	var countRest = checkSelectRestrictedArticle();
	if(countRest > 0){
		alert("선택한 글 중 규제된 "+ countRest + "개의 글은 카테고리를 이동할 수 없으므로 해제됩니다.");
	}
	
	if(checkItemNum(form) == 0){
		return;
	}
	
	var width = "470";
   	var height = "300";
	
	// post 방식
	form.action = "/_blog/popupCategoryChangeForm.do";
	// post 라면서.. method 빼먹은 사람은 뉴규?
	form.method = "post";
   	newWin = window.open('about:blank', "win", "scrollbars=yes,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=no,mebar=no,left=250,top=65");
	form.target = "win";
	form.submit();
	newWin.focus();
}


function cate_select() {
		var inx = document.titleviewloop.hidCategory.selectedIndex;
		if(inx !=0){
			updateCate(document.titleviewloop);
		}
}
function open_select() {
		var inx= document.titleviewloop.hidOpen.selectedIndex;
		if(inx !=0 ){
			updateOpen(document.titleviewloop);
		}
}

function open_select_open(type) {
	var form = document.titleviewloop;
	if(checkItemNum(form) == 0) {
		alert(" 선택하신 항목이 없습니다. ");
		return;
	}
	
	var width = "466";
	var height = "300";
	
	// get 방식
	/*var obj = getForm(form);
	var dest = "/_blog/popupConfigChangeForm.do?"+obj+"&type="+type;
	newWin = window.open(dest, "win", "scrollbars=yes,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=no,mebar=no,left=250,top=65");
	newWin.focus();*/
	
	// post 방식
	form.action = "/_blog/popupConfigChangeForm.do";
   	form.target = "win";
	newWin = window.open('', "win", "scrollbars=no,toolbar=no,location=no,directories=no,width="+width+",height="+height+",resizable=no,mebar=no,left=250,top=65");
	newWin.focus();
	form.submit();
}
	
function updateCate(form){
	if(checkItemNum(form) == 0) {
		alert(" 선택하신 항목이 없습니다. ");
		return;
	}
	if(confirm("선택된  글을  해당 카테고리로 변경 하시겠습니까?")){
		var obj = getForm(form);
		var param = new Object();
		param.blogid = form.blogid.value;
		loadXMLDocWithParam("POST","/_blog/contentStmtPopUpdate.do",obj,"UcateCallback","CommentFail",param);
	}
}
function UcateCallback(xmlhttp,obj){
		return UcateCallbackById(xmlhttp, obj.blogid);
}
function UcateCallbackById(xmlhttp,blogid){
	 	var link ="/_blog/hdn_categorylist.ajax?blogid="+blogid;
		loadXMLDoc("GET",link,null,"refreshMenu","CommentFail");
		xmlhttp = null;
		return true;
}
function UcateCallbackByIdNoReload(xmlhttp,blogid){
	 	var link ="/_blog/hdn_categorylist.ajax?blogid="+blogid;
		loadXMLDoc("GET",link,null,"refreshMenuNoReload","CommentFail");
		xmlhttp = null;
		return true;
}
function UcateCallbackDelay(xmlhttp,obj){
	xmlhttp = null;
	setTimeout("UcateCallbackByIdNoReload(null, '"+obj.blogid+"')", (window.opera ? 2500 : 1000));
}

function refreshMenu(xmlhttp){
	if(xmlhttp !=null){
			goPage(1);
			var menu =getSimpleResponse(xmlhttp);
			var obj = document.getElementById("Category");
		    obj.innerHTML=menu;
		   
		xmlhttp = null;	
	}
}
function refreshMenuNoReload(xmlhttp){
	if(xmlhttp !=null){
			var menu =getSimpleResponse(xmlhttp);
			var obj = document.getElementById("Category");
			if(obj){
		    	obj.innerHTML=menu;
		    }
		   
		xmlhttp = null;	
	}
}
function updateOpen(form){
	if(checkItemNum(form) == 0) {
		alert(" 선택하신 항목이 없습니다. ");
		return;
	}

	if(confirm("선택된 글의 공개설정을 변경 하시겠습니까?")){
		var obj = getForm(form);
		loadXMLDoc("POST","/_blog/contentStmtPopUpdate.ajax",obj,"UopenCallback","CommentFail");
	}
}
function UopenCallback(xmlhttp){
		xmlhttp= null;
		goPage(1);
}
function alertBeforeDelete(form){
	if(checkItemNum(form) == 0) {
		alert(" 선택하신 항목이 없습니다. ");
		return;
	}

	if(confirm("선택하신 글을 삭제하시겠습니까?\r\n글을 삭제하시면 댓글과 엮인글도 함께 삭제됩니다.")){
		var param = new Object();
		param.blogid=form.blogid.value;
		var obj = getForm(form);
		loadXMLDocWithParam("POST","/_blog/contentStmtDelete.ajax",obj,"UcateCallback","CommentFail",param);
	}
}
function removeTemp(form){
	if(checkItemNum(form) == 0) {
		alert(" 선택하신 항목이 없습니다. ");
		return;
	}
	if(confirm("선택하신 임시저장 글을 삭제하시겠습니까?")){
		var param = new Object();
		param.blogid=form.blogid.value;
		var obj = getForm(form);
		loadXMLDocWithParam("POST","/_blog/ArticleTempDel.ajax",obj,"UcateCallback","CommentFail",param);
	}
}

var disappearNewsArticleGuideDiv = false;
function setOpenOpt(blogid, sOpenDivName, sArticleno, sOpenKind, newsarticleid, ismappost) {
	disappearNewsArticleGuideDiv = false;
	if(newsarticleid > 0 && sOpenKind != "B0301"){
		if(!confirm("공개 설정을 전체 공개로 하지 않으시면 Daum view에 송고된 글이 삭제됩니다. 계속하시겠습니까?")){
			return;
		}
		disappearNewsArticleGuideDiv = true;
	}else if(ismappost == "Y" && sOpenKind != "B0301"){
		if(!confirm("공개 설정을 전체 공개로 하지 않으시면 Daum 지도에 포스트 된것이 삭제됩니다. 계속하시겠습니까?")){
			return;
		}
	}
	
	var param = new Object();
	param.blogid=blogid;
	param.divName=sOpenDivName;
	param.openKind=sOpenKind;
	var data = "blogid="+blogid;
	data += "&itemBox="+sArticleno+">"+sOpenKind+">0";
	data += "&type=1";
	data += "&articleOpen="+sOpenKind;
	
	loadXMLDocWithParam("POST","/_blog/popupConfigChange.ajax",data,"OpenOptSuccess","OpenOptFail",param);}

function CommentFail(){
	loadedDynamicContent[loadedDynamicContent.length]=null;
}

function OpenOptSuccess(xmlhttp, obj) {
	var oDiv = document.getElementById(obj.divName);
	if( obj.openKind == "B0301" ) {
		oDiv.innerHTML = "공개";
	} else if( obj.openKind == "B0302" ) {
		oDiv.innerHTML = '친구 블로그';
	} else if( obj.openKind == "B0303" ) {
		oDiv.innerHTML = '비공개';
	}
	
	if(disappearNewsArticleGuideDiv){
		document.getElementById("div_news_article_guide").style.display = "none";
		document.getElementById("div_news_article_image").style.display = "none";
	}
	xmlhttp = null;
}

function OpenOptFail(){
	alert('공개 여부 설정중 오류가 발생하였습니다.');
}//Global BLOGID, BLOGNAME

//Article Contents Iframe View
var ContentViewer = {
	initViewer: function(iArticleStyle) {
		this.aLoadedDoc = [];
		this.aContents = {};
		this.iArticleStyle = iArticleStyle;
		
		this.sBodyTags = "<script type=\"text/javascript\" language=\"javascript\" src=\"" + iArticleStyle.sViewJs + "\"><\/script>";
	},
	movePage: function() {
		if(typeof(BgmPlayManager) != 'undefined') {
			BgmPlayManager.movePage();
		}
		try {
			for(var s=0; s<this.aLoadedDoc.length; s++) {
				this.aLoadedDoc[s].body.innerHTML = "";
			}
			this.aLoadedDoc.length = 0;
		} catch(e) {}
		
	},
	setParameter_frame: function(sContentId,sDocInx) {
		var oFrameDoc = document.getElementById("if_" + sContentId).contentWindow.document;
		if(oFrameDoc) {
			this.aContents[sContentId] = { //For Js Parsing Sync & Frame Resize
				sContentId: sContentId,
				oFrameDoc: oFrameDoc,
				aScript: null,
				nScriptInx: 0,
				sDocInx: sDocInx,
				nDocHeight: 0,
				nResizeNum: 0,
				nConfirmNum: 0,
				nResizeImageNum: 0,
				isWorking: false
			};
		}
		this.aLoadedDoc.push(oFrameDoc);
	},
	drawContent: function(sContentId, sDocInx, reCall) {
		var oFrameDoc = document.getElementById("if_" + sContentId).contentWindow.document;
		if (oFrameDoc) {
			this.setParameter_frame(sContentId, sDocInx);
			if(is_ie) { 
				var sContent = document.getElementById("pa_" + sContentId).innerHTML;
				if( sContent.length == 0 ) {
					if( reCall == 'undefined' || reCall == null || reCall < 100) {
						if( reCall == 'undefined' || reCall == null ) {
							reCall = 0 ;
						}
						reCall = reCall+1;
						setTimeout("ContentViewer.drawContent('" + sContentId + "', '" + sDocInx + "', "+reCall+")", 100); // 다시 시도
						return;
					}
				}
				
				sContent = sContent.replace(/<textarea style="display:none" start>/g,"");
				sContent = sContent.replace(/<\/textarea end>/g,"");

				sContent = "<s"+"cript></s"+"cript>" + sContent;
				sContent = sContent.split("<SCRIPT").join("<textarea style=\"display: none\" class=\"scripts\"").split("</SCRIPT").join("</textarea");
				sContent = sContent.split("<script").join("<textarea style=\"display: none\" class=\"scripts\"").split("</script").join("</textarea");
				var appendHTML = sContent + "<div style=\"clear:both;\"></div><script type=\"text/javascript\">parent.ContentViewer.parseScript('" + sContentId + "');<\/script>";
				oFrameDoc.body.insertAdjacentHTML("afterBegin", appendHTML);
				//ContentViewer.parseScript(sContentId);
				//scriptParse(oFrameDoc.body);
				
				setTimeout(function() { ContentViewer.confirmResize.apply(ContentViewer, [sContentId]); }, 1); //혹시나 리사이즈 안되었을까봐..
 
				//this.fDocWrite = oFrameDoc.write;
			} else {
				var oXml = document.getElementById("pa_" + sContentId);
				var sContent = "";
				if( oXml.childNodes.length < 2 ) {
					if( reCall == 'undefined' || reCall == null || reCall < 100) {
						if( reCall == 'undefined' || reCall == null ) {
							reCall = 0 ;
						}
						reCall = reCall+1;
						setTimeout("ContentViewer.drawContent('" + sContentId + "', '" + sDocInx + "', "+reCall+")", 100); // 다시 시도
						return;
					}
				}
				var aContents = oXml.childNodes[1].childNodes;
				var nContLen = aContents.length;
				for(var k=0; k<nContLen; k++) {
					sContent += aContents[k].nodeValue;
				}
				
				//var appendHTML = sContent + "<script type=\"text/javascript\">setTimeout(function(){parent.ContentViewer.sizeFrame('" + sContentId + "','999');}, 0);<\/script>";
				var appendHTML = sContent + "<div style=\"clear:both;\"></div><script type=\"text/javascript\">parent.ContentViewer.sizeFrame('" + sContentId + "','999');<\/script>";

				var r = oFrameDoc.body.ownerDocument.createRange();
				r.setStartBefore(oFrameDoc.body);
				var f = r.createContextualFragment(appendHTML);
				oFrameDoc.body.appendChild(f);
				if(is_safari){ // when browser is safari 
					var func = document.getElementById("if_" + sContentId).contentWindow.scriptParseBody;
					setTimeout(func,500);
				}
				//scriptParse(oFrameDoc.body);
				
			}
		}
	},
	parseScript: function(sContentId) {
		var iContent = this.aContents[sContentId];
		if(iContent == null) return;
		if(iContent.aScript == null) {
			iContent.isWorking = true;
			var aScript = new Array();
			var aDescendants = iContent.oFrameDoc.body.getElementsByTagName("textarea");
			for(var i=0; i<aDescendants.length; i++) {
				if(aDescendants[i].className == "scripts") {
					aScript.push(aDescendants[i]);
				}
			}
			iContent.aScript = aScript;
		}

		if(iContent.nScriptInx >= iContent.aScript.length) {
			ContentViewer.sizeFrame(sContentId, iContent.sDocInx);
			return;
		}

		var oWrapDiv = iContent.oFrameDoc.createElement("span");
		iContent.oFrameDoc.write = function(str){
			oWrapDiv.innerHTML += str;
		};
		
		var oScript = iContent.aScript[iContent.nScriptInx];
		var oDynamic = iContent.oFrameDoc.createElement("SCRIPT");
		if(oScript.src && oScript.src.length > 0) {
			if(oScript.src.indexOf("http://") < 0) { //절대경로아니면...
				oDynamic = null;
				iContent.nScriptInx++;
				ContentViewer.parseScript(sContentId);
			} else {
				try {
					oDynamic.onreadystatechange = function() {
						if(this.readyState == "loaded") {
							iContent.oFrameDoc.write = ContentViewer.fDocWrite;
							if(oScript.parentNode) {
								oScript.parentNode.replaceChild(oWrapDiv, oScript);// ??? why
							}
							oDynamic.onreadystatechange = null;
							iContent.nScriptInx++;
							ContentViewer.parseScript(sContentId);
						}
					};
					oDynamic.type = "text/javascript";
					oScript.parentNode.insertBefore(oDynamic, oScript);
					oDynamic.src = oScript.src;
				} catch(e) {
					oDynamic = null;
					iContent.nScriptInx++;
					ContentViewer.parseScript(sContentId);
				}
			}
		} else {
			try {
				oDynamic.onreadystatechange = function() {
					if(this.readyState == "complete") {  
						iContent.oFrameDoc.write = ContentViewer.fDocWrite;
						if(oScript.parentNode) {
							oScript.parentNode.replaceChild(oWrapDiv, oScript);// ??? why
						}
						oDynamic.onreadystatechange = null;
						iContent.nScriptInx++;
						ContentViewer.parseScript(sContentId);
					}
				};
				oDynamic.type = "text/javascript";
				oScript.parentNode.insertBefore(oDynamic, oScript);
				
				oDynamic.text = getScriptText(oScript);
			} catch(e) {
				oDynamic = null;
				iContent.nScriptInx++;
				ContentViewer.parseScript(sContentId);
			}
		}
	},
	sizeFrame: function(sContentId, sDocInx) {
		this.resizeImage(sContentId); //컨텐츠 이미지 리사이징
		this.resizeFrame(sContentId);
		if(is_ie && sDocInx != "999") { //배경음악
			this.redefineBgm(sContentId, sDocInx);
		}
		this.redefineLink(sContentId);
	},
	resizeFrame: function(sContentId) {
		var iContent = this.aContents[sContentId];
		if(iContent == null) return;

		if(iContent.oFrameDoc == null) {
			ContentViewer.aContents[sContentId] = null;
		}
		try{
			var nFrameHeight = 0;
			if( iContent != null && typeof(iContent) != 'undefined' &&
				iContent.oFrameDoc != null && typeof(iContent.oFrameDoc) != 'undefined' &&
				iContent.oFrameDoc.body != null && typeof(iContent.oFrameDoc.body) != 'undefined' ) {
				var oHeight = iContent.oFrameDoc.body.offsetHeight;
				var sHeight = iContent.oFrameDoc.body.scrollHeight;
				
				if(sHeight == 350){
					nFrameHeight = iContent.oFrameDoc.getElementById("cContent").scrollHeight;
				}else{
					if(is_ie && !is_ie10){
						nFrameHeight = sHeight;
					}
					else{
						nFrameHeight = oHeight;
//						if(sHeight > oHeight){
//							nFrameHeight = sHeight;
//						}
					}
				}
			} else {
				return;
			}
		}catch(e){
			return;
		}		
		
		if(iContent.nResizeNum > 20)  return; //10번이상 돌리지마라 height:100% 경우
		
		if(iContent.nDocHeight == nFrameHeight && iContent.nDocHeight > 0) {
			if( iContent.nConfirmNum > 2 ) {
				// may be load complete
				//oDebug.innerHTML += "may be complete : ["+sContentId+"]["+iContent.nConfirmNum+"]["+iContent.nResizeNum+"]<br />\n";
				ContentViewer.aContents[sContentId] = null;
			} else {
				//oDebug.innerHTML += "retry complete size : ["+sContentId+"]["+iContent.nConfirmNum+"]["+iContent.nResizeNum+"]<br />\n";
				iContent.nConfirmNum++;
				setTimeout("ContentViewer.resizeFrame('" + sContentId + "')", 1000);
			}
		} else {
			iContent.nConfirmNum = 0;
			var oFrame = document.getElementById("if_" + sContentId);
			if( oFrame != null && typeof(oFrame) != 'undefined'){
				oFrame.style.height = nFrameHeight + "px";
				iContent.nDocHeight = nFrameHeight;
				iContent.nResizeNum++;
				setTimeout("ContentViewer.resizeFrame('" + sContentId + "')", 1000); //컨텐츠 이미지 리사이징
			}
		}
	},
	resizeImage: function(sContentId) {
		/* 컨텐츠 이미지 리사이징  <- util.js */
		try{
			if(document.getElementById("if_" + sContentId)){
				var oFrameDoc = document.getElementById("if_" + sContentId).contentWindow.document;
				var aImage = oFrameDoc.getElementsByTagName("img");
				
				var iContent = this.aContents[sContentId];
				var resizeRecall = false;
				for(var i=0; i<aImage.length; i++){
					if(aImage[i].offsetWidth < sContentWidth && iContent != null && iContent.nResizeImageNum < 5){
						resizeRecall = true;
					}
					if(aImage[i].src.indexOf("http://blogimg.daum-img.net/") > -1 || aImage[i].src.indexOf("http://i1.daumcdn.net/pimg/") > -1 || aImage[i].src.indexOf("http://i1.daumcdn.net/cafeimg") > -1) {
					} else {
						if (aImage[i].className == "tx-daum-image" || aImage[i].className == "txc-image") { //NOTE: inserted by daum editor
							var _imageWidth = aImage[i].style.width || aImage[i].width;
							var _actualWidth = aImage[i].getAttribute("actualwidth");
							if(_actualWidth && !isNaN(_actualWidth)){
								_actualWidth = parseInt(_actualWidth,10);
							}else{
								_actualWidth = 0;
							}
							if (_imageWidth) {
								if (aImage[i].offsetWidth > sContentWidth) {
									aImage[i].style.width = (sContentWidth) + 'px';
								}
							} else {
								var realWidth = aImage[i].offsetWidth;
								var realHeight = aImage[i].offsetHeight;
								if( _actualWidth < sContentWidth ) {
									if(_actualWidth!=0){
										aImage[i].style.width = _actualWidth + 'px';
										aImage[i].style.height = (realHeight * _actualWidth)/realWidth + 'px';										
									}
								} else {
									aImage[i].style.width = (sContentWidth) + 'px';
									aImage[i].style.height = (realHeight * (sContentWidth))/realWidth + 'px';
								}
							}
							var setOnclick = false;
							if (!aImage[i].getAttribute("isset")) {
								setOnclick = true;
							}else if(iContent.nResizeImageNum == 0){	// 게시글을 바로 복사해서 붙여넣기로 글을 등록했을때에 해당 그림을 클릭할 수 있도록 
								setOnclick = true;
							}
							if(setOnclick){
								aImage[i].setAttribute("isset", "true");
								if(!aImage[i].getAttribute("popup") || aImage[i].getAttribute("popup") != "no") {
									aImage[i].style.cursor = "pointer";
									aImage[i].onclick = function(){
										realImgView(this.src.replace("/image/", "/original/"));
									};
								}
							}
						} else if ((aImage[i].className.indexOf("tx-blog-sns-img") > -1 || aImage[i].className.indexOf("tx-blog-simple-img") > -1) && aImage[i].src.indexOf(".uf.daum.net/") > -1) {
							aImage[i].setAttribute("isset", "true");
							aImage[i].style.cursor = "pointer";
							aImage[i].onclick = function(){
								realImgView(this.src.replace(new RegExp("/(R400x0|T400x400|R450x0|R320x0|image)/"), "/original/"));
							};
						} else {
							if (aImage[i].offsetWidth > sContentWidth - 5) {
								aImage[i].style.width = (sContentWidth - 5) + 'px';
							}
						}
					}
				}
			}
						
			if(resizeRecall){
				iContent.nResizeImageNum++;
				setTimeout("ContentViewer.resizeImage('" + sContentId + "')", 1000); //컨텐츠 이미지 리사이징
			}
		}catch(e){}
	},
	redefineLink: function(sContentId) {
		var oFrameDoc = document.getElementById("if_" + sContentId).contentWindow.document;
		
		var _search_new_url = "http://search.daum.net/search?w=tot&q=";
		var _search_old_url = "http://search.daum.net/cgi-bin/nsp/search.cgi?q=";
		var redefineLinkHandler = function(elLink, useTargetBoundary) {
			var sLinkUrl = elLink.getAttribute("href");
			if (!sLinkUrl) {
				return;
			} 
			if (sLinkUrl.indexOf("javascript") > -1 || sLinkUrl.indexOf("#footnote_link_") > -1) {
				return;
			}
			if (elLink.id && elLink.id.indexOf("footnote_") > -1) {
				return;
			}
			if (is_ie&& !is_ie7) { //IE6 search encoding
				var sQuery = null;
				if(sLinkUrl.indexOf(_search_new_url) > -1) {
					sQuery = sLinkUrl.substring(_search_new_url.length);
				} else if(sLinkUrl.indexOf(_search_old_url) > -1) {
					sQuery = sLinkUrl.substring(_search_old_url.length);
				}
				if(sQuery) {
					elLink.setAttribute("href", _search_new_url + encodeURIComponent(sQuery.replace(/\(.+\)/g, "").replace(/\+/g, " ")));
				}
			}
			var sLinkTarget = elLink.getAttribute("target");
			if(sLinkTarget) {
				if(sLinkTarget.indexOf("_top") > -1) {
					return;
				}
				if(sLinkTarget.indexOf("_parent") > -1) {
					elLink.setAttribute("target", "_top");
					return;
				}
			}
			if(useTargetBoundary && sLinkUrl.indexOf("blog.daum.net") > -1) {
				elLink.setAttribute("target", "_parent");
			} else {
				elLink.setAttribute("target", "_blank");
			}
		};
		
		var aLinks = oFrameDoc.getElementsByTagName("a");
		for(var i=0; i<aLinks.length; i++) {
			redefineLinkHandler(aLinks[i], false);
		}
		aLinks = oFrameDoc.getElementsByTagName("area");
		for(var i=0; i<aLinks.length; i++) {
			redefineLinkHandler(aLinks[i], true);
		}
	},
	redefineBgm: function(sContentId, sDocInx) { 
		var oFrameDoc = document.getElementById("if_" + sContentId).contentWindow.document;
		var aBgmImgs = oFrameDoc.getElementsByName("abgmact");
		if(aBgmImgs != null) {
			for(var i=0; i<aBgmImgs.length; i++){
				var fClick = aBgmImgs[i].getAttributeNode("onclick");
				if(fClick != null && fClick.nodeValue != null) {
					var sClick = fClick.nodeValue.split("@FRAME@").join("if_" + sContentId).split("parent.").join("");
					aBgmImgs[i].onclick = new Function(sClick);
					if((sDocInx == "" || sDocInx == "0") && (i == 0)) { //첫번째글의 sDocInx 0, ''일때만 자동 재생
						aBgmImgs[i].className = 'playerOff';
						aBgmImgs[i].onclick = new Function('ArticleBgm.stop()');
						setTimeout("eval(" + sClick + ")", 100); // 다시 시도
//						eval(sClick);
					}
					else{
						aBgmImgs[i].className = 'playerOn';
					}
				}
			}
		}
	},
	confirmResize: function(sContentId) {
		var iContent = this.aContents[sContentId];
		if(iContent == null) return;
		if(iContent.isWorking) return;

		iContent.oFrameDoc.body.onload = function() { return false; };
		this.parseScript(sContentId);
	}, 
	articleFileViewGeneration: function(sContentId) {
		//첨부파일화된 본문에서 파일미리보기 지원 koyoungmin
		try{			
			var articleno = sContentId.substring(2,sContentId.length);			
			var oFrameDoc = document.getElementById("if_" + sContentId).contentWindow.document;
			var aLinks = oFrameDoc.getElementsByTagName("a");

			if(document.getElementById("if_" + sContentId)){
				for(var i=0; i < aLinks.length; i++) {

					var aLinkString = aLinks[i].innerHTML;
					var aLinkStringLow = aLinkString.toLowerCase();
					
					// 본문에 첨부아이콘 중앙에 위치시키기 
					if (aLinkStringLow.indexOf("http://blogimg.daum-img.net/") > -1 
							|| aLinkStringLow.indexOf("http://i1.daumcdn.net/pimg/") > -1
							|| aLinkStringLow.indexOf("http://i1.daumcdn.net/icon") > -1) {

						oFrameDoc.getElementsByTagName("a")[i].setAttribute("target", "");
						
						if (oFrameDoc.getElementsByTagName("a")[i].parentNode.getElementsByTagName("img").length > 0) {
							oFrameDoc.getElementsByTagName("a")[i].parentNode.getElementsByTagName("img")[0].style.verticalAlign="middle";
						}
					}

					// 진본 파일 URL을 가져옵니다.
					var orgFileUrl = oFrameDoc.getElementsByTagName("a")[i].getAttributeNode("href").nodeValue;

					if (aLinkStringLow.indexOf("p_jpg_s.gif") > -1 || aLinkStringLow.indexOf("p_gif_s.gif") > -1 
							|| aLinkStringLow.indexOf("p_png_s.gif") > -1 ) {
						var aLinkAdd =oFrameDoc.getElementsByTagName("a")[i].parentNode.innerHTML 
									+" <img src=\"http://cafeimg.hanmail.net/cf_img2/bbs2/btn_imageview.gif\" alt=\"첨부이미지 미리보기\" style=\"vertical-align:middle;cursor:pointer;\" onclick=\"PhotoImagePopup('"+BLOGID+"', '"+orgFileUrl+"');\">";					
						oFrameDoc.getElementsByTagName("a")[i].parentNode.innerHTML =aLinkAdd;
					} 
					// 첨부된 파일은 파일 미리 보기 등록 
					else if(aLinkStringLow.indexOf(".ppt<") > -1 || aLinkStringLow.indexOf(".doc<") > -1 
							 || aLinkStringLow.indexOf(".xls<") > -1 || aLinkStringLow.indexOf(".pptx<") > -1 
							 || aLinkStringLow.indexOf(".docx<") > -1  || aLinkStringLow.indexOf(".xlsx<") > -1
							 || aLinkStringLow.indexOf(".hwp<") > -1) {
						
						if (orgFileUrl.indexOf(".daum.net") > -1) {		// onlyDaumService
							oFrameDoc.getElementsByTagName("a")[i].setAttribute("href", "javascript:fileFilterViewer_dc('"+orgFileUrl+"','"+orgFileUrl+"','','"+BLOGID+"','"+articleno+"');");
							oFrameDoc.getElementsByTagName("a")[i].setAttribute("class", "p11");
						}						
					} 
				}
			}
		} 
		catch(e){ }
	}
}

function getScriptText(oScript) {
	if(oScript == null) return "";
	var aContents = new Array();
	var oChilds = oScript.childNodes;
	var nChildLen = oChilds.length;
	for(var j=0; j<nChildLen; j++) {
		if(oChilds[j].nodeType == 3) { //Element
			aContents.push(oChilds[j].nodeValue);
		} else {
			aContents.push(oChilds[j].outerHTML.replace(/\n/,"").replace(/\r/,""));
		}
	}
	return aContents.join("");
}


/* Layer Show/Hide */
function showSubLayer(sTarget) {
	var oArea = document.getElementById(sTarget+'Area');
	if(oArea == null) return;
	var oIcon = document.getElementById(sTarget+'Icon');
	if(oArea.style.display != 'none') {
		oArea.style.display = 'none';
		oIcon.className = 'alimListPlus';
	} else {
		oArea.style.display = 'block';
		oIcon.className = 'alimListMinus';
	}
}

function togglePlusMinus(sTarget) {
	var	oImage = document.getElementById(sTarget+'Icon');
	
	if( oImage.src == "http://i1.daumcdn.net/pimg/blog3/ic_plus.gif" ) {
		document.getElementById(sTarget+'Area').style.display = 'block';
		oImage.src = "http://i1.daumcdn.net/pimg/blog3/ic_minus.gif" ;
	} else {
		document.getElementById(sTarget+'Area').style.display = 'none';
		oImage.src = "http://i1.daumcdn.net/pimg/blog3/ic_plus.gif" ;
	}
}

function showGlobalLayer(oAnchor, sCntsId, event){
	var layer = document.getElementById('globalLayer');
	layer.innerHTML = (document.getElementById(sCntsId)? document.getElementById(sCntsId).innerHTML : "");
	
	if(oAnchor == null) return;
	var position = getPosition(oAnchor);
	var nAncX = position.x;
	var nAncY = position.y;
	
	var nAncHeight = oAnchor.offsetHeight;

	layer.style.display = "block";
	
	var nDashX = nAncX;
	var nDashY = nAncY + nAncHeight;
	
	layer.style.left = (nDashX) + "px";
	layer.style.top = (nDashY) + "px";
}

function hideGlobalLayer(){
	var obj = document.getElementById("globalLayer");
	obj.style.display="none";
}

function showPostLayer(oAnchor, sCntsId, event) {
	var oResultDiv = document.getElementById('resultarea');
	oResultDiv.innerHTML = (document.getElementById(sCntsId)? document.getElementById(sCntsId).innerHTML : "");
	
	if(oAnchor == null) return;
	var position = getPosition(oAnchor);
	var nAncX = position.x;
	var nAncY = position.y;
	var nAncWidth = oAnchor.offsetWidth;
	var nAncHeight = oAnchor.offsetHeight;

	var nDocX =  (document.documentElement.clientWidth || document.body.clientWidth);
	var nDocY = (document.documentElement.scrollHeight || document.body.scrollHeight);

	var oDashBoard = document.getElementById("dashboard");
	oDashBoard.style.display = "block";


	var nDashX = nAncX;
	var nDashY = nAncY;
	var nCntsHeight = oResultDiv.offsetHeight;
	var oResultBox = document.getElementById('resultBox');
	if(nAncX > nDocX/2) { //right
		nDashX -= 309 + 3;
		if(nAncY > nDocY - 200) { //예상 bot
			nDashY -= nCntsHeight + Math.ceil(nAncHeight/2);
			oResultBox.className = "rightbot";
		} else { //top
			nDashY += Math.ceil(nAncHeight/2);
			oResultBox.className = "righttop";
		}
	} else { //left
		nDashX += nAncWidth + 3;
		if(nAncY > nDocY - 200) { //예상 bot
			nDashY -= nCntsHeight + Math.ceil(nAncHeight/2);
			oResultBox.className = "leftbot";
		} else { //top
			nDashY += Math.ceil(nAncHeight/2);
			oResultBox.className = "lefttop";
		}
	}
	
	oDashBoard.style.left = (nDashX) + "px";
	oDashBoard.style.top = (nDashY) + "px";
}
	
function showDashBoard(){
	var obj = document.getElementById("dashboard");
	obj.style.display="block";
	viewLayer = true;
}

function hideDashBoard(){
	var obj = document.getElementById("dashboard");
	obj.style.display="none";
	viewLayer = false;
}

/****************** 메인타이틀 높이 계산 *****************************************************************/
function getStyle(oLayer, sStyle) {
	var sValue = null;
	if (document.defaultView && document.defaultView.getComputedStyle) {
		var oCss = document.defaultView.getComputedStyle(oLayer, null);
		sValue = oCss ? oCss[sStyle] : null;
	} else if (oLayer.currentStyle) {
		sValue = oLayer.currentStyle[sStyle];
	}
	return sValue;
}
function setMainTitleHeight() {

	var oMainTitle = document.getElementById("mainTitle");
	var nDocHeight = getStyle(oMainTitle, "height");
	if(nDocHeight != null) {
		if(is_nav && nDocHeight != "79px") { //FF
			return;
		} else if(!is_nav && nDocHeight.indexOf("px") > -1) {
			return;
		}
	}

	var sBackImage;
	if(is_ie && !is_ie7) { //IE6 why filter
		sBackImage = getStyle(oMainTitle, "filter");
		if(sBackImage == null || sBackImage.length < 5) { //기본높이
			oMainTitle.style.height = "107px"; 
			return;
		} 
		sBackImage = sBackImage.substring(sBackImage.indexOf("src='")+5);
		if(sBackImage.indexOf("\'") > -1) {
			sBackImage = sBackImage.substring(0, sBackImage.indexOf("\'"));
		}
		
	} else {
		sBackImage = getStyle(oMainTitle, "backgroundImage");
		if(sBackImage == null || sBackImage.length < 5) { //기본높이
			oMainTitle.style.height = "107px"; 
			return;
		} 
		sBackImage = sBackImage.substring(4, sBackImage.length-1);
		if(sBackImage.indexOf("\"") > -1) {
			sBackImage = sBackImage.substring(1, sBackImage.length-1);
		}
	}
	var oTmpImg = new Image();
	if(is_ie) {
		oTmpImg.onreadystatechange = function() {
			if(this.readyState == "complete") {
				oMainTitle.style.height = this.height + "px"; 
				oTmpImg = null;
			}
		}
	} else {
		oTmpImg.onload= function () { 
			oMainTitle.style.height = this.height + "px"; 
			oTmpImg = null;
		}
	}
	oTmpImg.src = sBackImage;
}


/***************** Navi, Menu *******************************************************************/
/***************** Menu Fold *****************************************************************/
function foldMenuBoxTitle(targetId){
	foldMenuBox(document.getElementById(targetId));
}
function foldMenuBox(oFlodBtn){
	var sFoldCss = oFlodBtn.className;
	var oMenuBody = oFlodBtn.parentNode;
	while((oMenuBody = oMenuBody.nextSibling)) {
		if(oMenuBody.className && oMenuBody.className.indexOf("menuBody") != -1) {
			if(sFoldCss == "arrowdown") {
				oMenuBody.style.display = "block";
			} else {
				oMenuBody.style.display = "none";
			}
		} else if(oMenuBody.className && oMenuBody.className.indexOf("menuFooter") > -1) {
			if(sFoldCss == "arrowdown") {
				oMenuBody.style.display = "block";
			} else {
				oMenuBody.style.display = "none";
			}
		} 
	}
	if(sFoldCss == "arrowdown") {
		oFlodBtn.className = "arrowup";
	} else {
		oFlodBtn.className = "arrowdown";
	}
}

function folderToggle(sGrpId) {
	var aGrpUl = document.getElementById("folderGrp_"+sGrpId);
	var oArrowInput = document.getElementById("arrow_"+sGrpId);
	if( aGrpUl !=  null && oArrowInput != null ) {
		if( aGrpUl.style.display != "none" ) {
			aGrpUl.style.display = "none" ;
			oArrowInput.className = "arrowdown sideListClr";
		} else {
			aGrpUl.style.display = "block" ;
			oArrowInput.className = "arrowup sideListClr";
		}
	}
}

/***************** Image Size *****************************************************************/
function myconImgResize (img) {
	img.style.display = "none";
	if (img.width > 20) {
		img.width = 20;
		if (img.height > 21) {
			img.height = 21;
		}
	}
	img.style.display = "";
}

function LoadPhotoSlideImage(listWidth, listHeight, imgNode, src, exif) {
	var oTmpImg = new Image();
	if( is_ie ) {
		oTmpImg.onreadystatechange = function() {
			if(this.readyState == "complete") {
				width = this.width;
				height = this.height;
				if( width < listWidth && height < listHeight ) {
				} else {
					heightEst = listHeight;
					widthEst = listHeight*(width/height);
					if( widthEst > listWidth) {
						widthEst = listWidth;
						heightEst = listWidth*(height/width);
					}
					imgNode.height = heightEst;
					imgNode.width = widthEst;
				}
				imgNode.src = src;
				oTmpImg = null;
			}
		}
	} else {
		oTmpImg.onload = function() {
			width = this.width;
			height = this.height;
			if( width < listWidth && height < listHeight ) {
			} else {
				heightEst = listHeight;
				widthEst = listHeight*(width/height);
				if( widthEst > listWidth) {
					widthEst = listWidth;
					heightEst = listWidth*(height/width);
				}
				imgNode.height = heightEst;
				imgNode.width = widthEst;
			}
			imgNode.src = src;
			oTmpImg = null;
		}
	}
	oTmpImg.src = src;
	if( document.getElementById('pvframe') != null ) {
		document.getElementById('pvframe').src="/photoslide.html?type=photolist&src="+src;
	}
	if(exif != null && exif != "") {
		loadXMLDoc("GET", exif, null,"loadImageExif","failImgeExif", true);
	}
}

function LoadFixHeightImage(listWidth, listHeight, imgNode, src) {
	var oTmpImg = new Image();
	oTmpImg.onreadystatechange = function() {
		if(this.readyState == "complete") {
			var widthEst, heightEst;
			var width = this.width;
			var height = this.height;
			if( width < listWidth && height < listHeight ) {
			} else {
				heightEst = listHeight;
				widthEst = listHeight*(width/height);
				if( widthEst > listWidth) {
					widthEst = listWidth;
					heightEst = listWidth*(height/width);
				}
				imgNode.height = heightEst;
				imgNode.width = widthEst;
			}
			oTmpImg = null;
		}
	}
	oTmpImg.src = src;
}

/******************* 최근글 ************************************************************/
function loadRecentImage(listWidth, listHeight, imgNode, src) {
	var oTmpImg = new Image();
	if(is_ie) {
		oTmpImg.onreadystatechange = function() {
			if(this.readyState == "complete") {
				var widthEst, heightEst;
				var width = this.width;
				var height = this.height;
				if( width < listWidth && height < listHeight ) {
				} else if( width < height) {
					heightEst = listHeight;
					widthEst = listHeight*(width/height);
					imgNode.height = heightEst;
					imgNode.width = widthEst;
				} else {
					widthEst = listWidth;
					heightEst = listWidth*(height/width);
					imgNode.height = heightEst;
					imgNode.width = widthEst;
				}
				oTmpImg = null;
			}
		}
	} else {
		oTmpImg.onload = function() {
			var widthEst, heightEst;
			var width = this.width;
			var height = this.height;
			if( width < listWidth && height < listHeight ) {
			} else if( width < height) {
				heightEst = listHeight;
				widthEst = listHeight*(width/height);
				imgNode.height = heightEst;
				imgNode.width = widthEst;
			} else {
				widthEst = listWidth;
				heightEst = listWidth*(height/width);
				imgNode.height = heightEst;
				imgNode.width = widthEst;
			}
			oTmpImg = null;
		}
	}
	oTmpImg.src = src;
}

var thumbnum = 0;
var selthumbno = 0;
var isthumbovered = false;
function initRecentThumbnail(maxnum) {
	thumbnum = maxnum-1;
	showRecentRandomThumbnail();
}

function hideRecentThumbnail() {
	var dis_div = 'recent_thumb_' + selthumbno;
	if(document.getElementById(dis_div)) {
		document.getElementById(dis_div).style.display = 'none';
	}
}

function showRecentThumbnail() {
	var dis_div = 'recent_thumb_' + selthumbno;
	if(document.getElementById(dis_div)) {
		document.getElementById(dis_div).style.display = 'block';
	}
}

function showRecentRandomThumbnail() {
	if(isthumbovered) return;
	hideRecentThumbnail();
	try {
		selthumbno = Math.round(Math.random() * (thumbnum));
	}catch(e){
		selthumbno = 0;
	}
	showRecentThumbnail();
}

function chgRecentThumbnailPre(){
	hideRecentThumbnail();
	if(selthumbno == 0){
		selthumbno = thumbnum;
	} else {
		selthumbno--;
	}
	showRecentThumbnail();
}

function chgRecentThumbnailNext(){
	hideRecentThumbnail();
	if(selthumbno == thumbnum){
		selthumbno = 0;
	} else {
		selthumbno++;
	}
	showRecentThumbnail();
}

/**********************  알리미  ******************************************/
function alarmyFail(){ }

function goAlarmy(blogurl){
	var form = document.alarmyForm;
	form.action = blogurl;
	form.method = "POST";
	form.target = "_blank";
	form.submit();
}

function writeAlarmyNew(oXmlHttp) {
    if ( oXmlHttp ) {
        try{
            var oXmlDoc;
            
			oXmlDoc = getXMLDocument(oXmlHttp);
            var oResultDiv = document.getElementById("cAlim0AreaContent_list");

            var items = oXmlDoc.getElementsByTagName('item');
            var channel = oXmlDoc.getElementsByTagName('channel');
            var webmaster = channel[0].getElementsByTagName('webMaster')[0].firstChild.nodeValue;
            var bloglink = channel[0].getElementsByTagName('link')[0].firstChild.nodeValue;
            var blogtitle = channel[0].getElementsByTagName('title')[0].firstChild.nodeValue;
            var content = new Array();
            var nn = parseInt(getNow());
            var newItem = false;
		    for(var i = 0; i < items.length; i++) {
                var title = items[i].getElementsByTagName('title')[0];
                var title_text_org = title.firstChild.nodeValue;
                var link = items[i].getElementsByTagName('link')[0];
                var imgurl = items[i].getElementsByTagName('enclosure')[0].getAttributeNode("url").nodeValue;
                var link_text = link.firstChild.nodeValue;
                var wdate = items[i].getElementsByTagName('pubDate')[0].firstChild.nodeValue;
                var author = items[i].getElementsByTagName('author')[0].firstChild.nodeValue;
                var desc = items[i].getElementsByTagName('description')[0].firstChild.nodeValue;
            
              	var tag = "";
              	var dts = desc.split("<!--|-->");
         		var ats  = author.split("<!--|-->");
         		tag = dts[0];
         		desc = dts[1];
                var blogtitle = ats[0];
                author = ats[1];
               
                desc=parseAlamyData(desc);
              
                if(author=="null") author="";
                else author+="<br />";
                wn  = parseInt(wdate);
                
                if( (nn-wn) < 10000000) newItem = true;
                wdate = wdate.substring(0,4)+"."+wdate.substring(4,6)+"."+wdate.substring(6,8)+" "+wdate.substring(8,10)+":"+wdate.substring(10,12);
                var title_text = cutStr(title_text_org,20);
				
				var url = "'"+link_text+"'";
                content.push('<li><span class="txt_bul sideListClr">&bull;</span><a style="cursor:pointer;" onclick="goAlarmy('+url+');" target="alarmyArticle" onmouseover="showPostLayer(this, \'rss_'+i+'\',event);" onmouseout="hideDashBoard()" class="sideListClr">'+ title_text + '</a></li>');
                var url = link_text.substring(0, link_text.indexOf("/",7));
                var site_img="noti_i_etc.gif";
                if(url.indexOf(".daum.")>0){ site_img="noti_i_daum.gif";
                }else if(url.indexOf(".naver.")>0){ site_img="noti_i_naver.gif";
                }else if(url.indexOf(".blo.")>0){ site_img="noti_i_blo.gif";
                }else if(url.indexOf(".blogin.")>0){ site_img = "noti_i_blogin.gif";
                }else if(url.indexOf(".empas.")>0){ site_img="noti_i_empas.gif";
                }else if(url.indexOf(".egloos.")>0){ site_img="noti_i_egloos.gif";
                }else if(url.indexOf(".intizen.")>0){ site_img="noti_i_intizen.gif";
                }else if(url.indexOf(".nate.")>0){ site_img="noti_i_nate.gif";
                }else if(url.indexOf(".onblog.")>0){ site_img="noti_i_onblog.gif";
                }else if(url.indexOf(".yahoo.")>0){ site_img="noti_i_yahoo.gif";
                }
                content.push('<div id="rss_'+i+'" style="display:none">');
                content.push('<div class="previewContent">');
                content.push('<img src="http://i1.daumcdn.net/pimg/blog/p_img/'+site_img+'" align="middle" alt="" style="margin-bottom:6px;" /> '+blogtitle);
                content.push('<div style="padding-bottom:3px;"><b>'+title_text_org+'</b></div>');
                if(imgurl!="")
                    content.push('<img src="'+imgurl+'" width="110" height="83" align="right" alt="" style="margin:0 0 0 5px;">');
	         	content.push(cutStr(desc,150));
         		content.push(tag);
                content.push("<div style='clear:both; padding-top:4px;' class='p11 g_999'>"+wdate+" - " + author +"</div></div></div>");
            }
            if(newItem){
                aim2 = document.getElementById("alim0new");
                aim2.innerHTML='<img src="http://i1.daumcdn.net/pimg/blog/p_img/b_new.gif" alt="" />';
            }
            if(items.length > 0 ){
                oResultDiv.innerHTML = content.join("");
                //showSubLayer('cAlim0');
            }else{
                content.push('<li class="sideListClr">새로운 글이 없습니다.</li>');
                oResultDiv.innerHTML = content.join("");
                //showSubLayer('cAlim1');
            }
        }catch(e){

        }
        oXmlHttp = null;
    }
}


function toggleBlogzone(tab){
	var blogzone = daum.$("Blogzone");
	if(blogzone){
		if(tab=="blog"){
			daum.Element.replaceClassName(blogzone, "blogzone_new", "blogzone_blog");
		}else if(tab=="article"){
			daum.Element.replaceClassName(blogzone, "blogzone_blog", "blogzone_new");		
		}
	}
}


function writeAlarmyCMT(oXmlHttp, fAfter) {
	if ( oXmlHttp ) {
		try{
			var oXmlDoc = getXMLDocument(oXmlHttp);
			
			var oResultDiv = document.getElementById("cAlim2AreaContent_list");
			var items = oXmlDoc.getElementsByTagName('item');
			var channel = oXmlDoc.getElementsByTagName('channel');
			var webmaster = channel[0].getElementsByTagName('webMaster')[0].firstChild.nodeValue;
			var bloglink = channel[0].getElementsByTagName('link')[0].firstChild.nodeValue;
			var blogtitle = channel[0].getElementsByTagName('title')[0].firstChild.nodeValue;
			var content = new Array();
			var nn = parseInt(getNow());
			var newItem = false;
			var tempL = ((items.length > 10)? 10 : items.length)
			for(var i = 0; i < tempL; i++) {
				var title = items[i].getElementsByTagName('title')[0];
				var title_text_org = title.firstChild.nodeValue
				var link = items[i].getElementsByTagName('articleno')[0];
				var link_text = link.firstChild.nodeValue;
				var wdate = items[i].getElementsByTagName('pubDate')[0].firstChild.nodeValue;
				var writer = items[i].getElementsByTagName('author')[0].firstChild.nodeValue;
				var desc = items[i].getElementsByTagName('description')[0].firstChild.nodeValue;
				wn  = parseInt(wdate);
				if( (nn-wn) < 10000) newItem = true;
				wdate = wdate.substring(0,4)+"."+wdate.substring(5,7)+"."+wdate.substring(8,10)+" "+wdate.substring(11,13)+":"+wdate.substring(14,16);

				var title_text=title_text_org.replace(/<[\\/\\!]*?[^<>]*?>|&nbsp;/, "");
				var title_text_sum = cutStr(title_text,4);
				var ctype="";
				if(items[i].getElementsByTagName('type')[0].firstChild.nodeValue == "T"){
					ctype="[엮인글]";
				} else if(items[i].getElementsByTagName('type')[0].firstChild.nodeValue == "C") {
					ctype="[댓글]";
				} else if(items[i].getElementsByTagName('type')[0].firstChild.nodeValue == "B"){
					ctype="[방명록]";
				} else {
					ctype="[친구신청]";
				}
				var url;
				if(ctype=="[방명록]"){
					content.push('<li><span class="txt_bul sideListClr">&bull;</span><a href="/_blog/BoardView.do?blogid='+BLOGID+'" target="alarmyArticle" onmouseover="showPostLayer(this, \'rss_my_'+i+'\',event);" onmouseout="hideDashBoard()" class="sideListClr">'+ctype+' '+ title_text_sum + '</a>');
				} else if(ctype=="[댓글]"){
					title_text_sum = cutStr(desc,10);
					url = "'http://blog.daum.net/"+BLOGNAME+"/"+link_text+"'";
					content.push('<li><span class="txt_bul sideListClr">&bull;</span><a style="cursor:pointer;" onclick="goAlarmy('+url+');" target="alarmyArticle" onmouseover="showPostLayer(this, \'rss_my_'+i+'\',event);" onmouseout="hideDashBoard()" class="sideListClr">'+ctype+' '+ title_text_sum + '</a>');
				} else if(ctype=="[엮인글]"){
					title_text_sum = cutStr(writer,10);
					url = "'http://blog.daum.net/"+BLOGNAME+"/"+link_text+"'";
					content.push('<li><span class="txt_bul sideListClr">&bull;</span><a style="cursor:pointer;" onclick="goAlarmy('+url+');"  target="alarmyArticle" onmouseover="showPostLayer(this, \'rss_my_'+i+'\',event);" onmouseout="hideDashBoard()" class="sideListClr">'+ctype+' '+ title_text_sum + '</a>');
				} else {
					title_text_sum = cutStr(writer,8);
					content.push('<li><span class="txt_bul sideListClr">&bull;</span><a href="'+link_text+' " onmouseover="showPostLayer(this, \'rss_my_'+i+'\',event);" onmouseout="hideDashBoard()" class="sideListClr">'+ctype+' '+ title_text_sum + '</a>');
				}
				content.push('<div id="rss_my_'+i+'" style="display:none">');
				content.push('<div class="previewContent">');
				title_text=title_text.replace(/\n/, "<br />");
				content.push('<font class="p11 txt_point1">'+ctype+'</font> '+title_text_org+' <font class="p11"></font><br /> '+desc+' <div style="padding-top:3px;" class="p11 g_666">'+wdate+' - ' +writer+'</div></div></div>');
			}
			if(newItem){
				aim2 = document.getElementById("alim2new");
				aim2.innerHTML=' <img src="http://i1.daumcdn.net/pimg/blog/p_img/b_new.gif" alt="" />';
			}
			if(items.length > 0 ){
				content.push("");
				oResultDiv.innerHTML = content.join("");
			}else{
				content.push('<li class="sideListClr">반응이 없습니다.</li>');
				oResultDiv.innerHTML = content.join("");
		  }
		}catch(e){}
		oXmlHttp = null;
		if(fAfter != null && (typeof fAfter == 'function')) {
			fAfter();
		}
	}
}

function parseAlamyData(data){
	data=data.replace(/</g, "&lt;" );
	data=data.replace(/>/g, "&gt;" );
	return data;
}

function getNow(){
	var str="";
	now = new  Date();
	year = now.getYear();
	if(year < 2000) year=year+1900;
	str+=""+year;
	month = now.getMonth()+1;
	day = now.getDate();
	hour= now.getHours();
	min= now.getMinutes();
	sec= now.getSeconds();
	str+=getVa(month);
	str+=getVa(day);
	str+=getVa(hour);
	str+=getVa(min);
	str+=getVa(sec);
	return str;
}

function getVa(val){
  if(val<10)
    return "0"+val;
  else
    return val;
}

/**********************  지난글들  ******************************************/
/* calendar 시작  */
var lastday= new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var lunarInfo=new Array(
	0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,
	0x4ae0,0xa5b6,0xa4d0,0xd250,0xd295,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,
	0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,
	0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,
	0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,
	0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,
	0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,
	0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,
	0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,
	0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,
	0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,
	0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,
	0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,
	0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,
	0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,
	0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,
	0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,
	0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,
	0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,
	0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,
	0xd520);

function lYearDays(y) {
	var i, sum = 348;
	for(var i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
	return(sum+leapDays(y));
}

function leapDays(y) {
	if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
	else return(0);
}

function leapMonth(y) {
	var lm = lunarInfo[y-1900] & 0xf;
	return(lm==0xf?0:lm);
}

function monthDays(y,m) {
	return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}

function Lunar(objDate) {
	var i, leap=0, temp=0;
	var offset = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - ( -2206396800000))/86400000;
	for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }
	if(offset<0) { offset+=temp; i--; }
	this.year = i;
	leap = leapMonth(i); //윤몇月
	this.isLeap = false;
	for(i=1; i<13 && offset>0; i++) {
		//윤月
		if(leap>0 && i==(leap+1) && this.isLeap==false) {
			--i; this.isLeap = true; temp = leapDays(this.year);
		}
		else {
			temp = monthDays(this.year, i);
		}

		//解除윤月
		if(this.isLeap==true && i==(leap+1)) {
			this.isLeap = false;
		}
		offset -= temp;
	}

	if(offset==0 && leap>0 && i==leap+1) {
		if(this.isLeap) {
			this.isLeap = false;
		}
		else {
			this.isLeap = true; --i;
		}
	}

	if(offset<0) {
		offset += temp; --i;
	}

	this.month = i;
	this.day = offset + 1;
}

function holiday(month,day,comment,lunar){
	this.month=month;
	this.day=day;
	this.comment=comment;
	this.lunar = lunar;
}

var Holidays = new Array();
Holidays[0] = new holiday(1,1,"신정",false);
Holidays[1] = new holiday(3,1,"삼일절",false);
Holidays[2] = new holiday(5,5,"어린이날",false);
Holidays[3] = new holiday(6,6,"현충일",false);
Holidays[4] = new holiday(7,17,"제헌절",false);
Holidays[5] = new holiday(8,15,"광복절",false);
Holidays[6] = new holiday(10,3,"개천절",false);
Holidays[7] = new holiday(12,25,"크리스마스",false);
Holidays[8] = new holiday(1,1,"설날",true);
Holidays[9] = new holiday(1,2,"설날",true);
Holidays[10] = new holiday(4,8,"부처님오신날",true);
Holidays[11] = new holiday(8,14,"추석" ,true);
Holidays[12] = new holiday(8,15,"추석" ,true);
Holidays[13] = new holiday(8,16,"추석" ,true);

function checkHolyDay(year,month){
	var obj = new Lunar(new Date(year,month,1));
	l_year = obj.year;
	l_month = obj.month;
	var startday =obj.day;
	var l_month_len=monthDays(l_year,l_month);
	var hday = new Array();
	l_day=startday;
	for(i=1 ; i< lastday[month];i++){
		if(l_day > l_month_len){
			if(l_month==12){
				l_month=1;
				l_year++;
			}else{
				l_month++;
			}
			l_day=1;
		}	
		for(h=0;h<Holidays.length;h++){
			var obj = Holidays[h];
			if(month+1==obj.month && i==obj.day && obj.lunar==false ){
				hday[i]=obj;
			}else if(l_month==obj.month && l_day ==obj.day && obj.lunar==true ){
				if(l_month==1 && l_day==1){
					hday[i-1]=obj;
				}hday[i]=obj;
			}
		}
		l_day++;
	}
	return hday;
}

/*
CALENDAR FOR MENU
*/
function drawCalendar(year,month){
	month--;
	var maxday=0;
	if(month !=1){
		maxday = lastday[month];
	}else{
		if(((year % 4 == 0) && ( year % 100 != 0)) || ( year % 400 == 0) ){
		  maxday=29;
		} else{
		  maxday=28;
		}
	}
	var currday=1;
	var day = new Date(year,month, 1);
	var hday = checkHolyDay(year,month);
	var startday = day.getDay();
	var isHday = false;
	var HdayComment="";
	var today = new Date();
	var today_day = today.getDate();
	var isToday = false;
	if(day.getYear()==today.getYear() && day.getMonth() == today.getMonth()) {
	   isToday=true;
	}
	var cont = new Array();
	cont.push('<table cellspacing="0" cellpadding="0" border="0" id="tab_cal">');
	cont.push('<tr><th class="sideListClr">일</th><th class="sideListClr">월</th><th class="sideListClr">화</th><th class="sideListClr">수</th><th class="sideListClr">목</th><th class="sideListClr">금</th><th class="sideListClr">토</th></tr>');
	for(var i =0 ; i< 6;i++){
		if(i !=0 && currday > maxday) break;
		cont.push('<tr>');
		for(var j=0 ; j < 7 ; j++){
			if(j==0){
		 		isHday = true;
			}
			if( hday[currday] !=null){
				isHday = true;
				HdayComment=hday[currday].comment;
			}
			ubs="";
			ube="";	
			if(i==0 && j < startday || currday > maxday){
				cont.push('<td></td>');
			}else{
				if(isToday && currday == today_day){
					ubs="<font class='under'>";
					ube="</font>";				
				}
				cont.push('<td id="cM'+currday+'" class="sideListClr');
				if(isToday && currday == today_day) {
					cont.push(' under');
				}
				cont.push('" title="'+HdayComment+'">');
				cont.push(''+currday+'');
				cont.push('</td>');
				currday++;
			}
	    	isHday = false;
	    	HdayComment="";
		}
		cont.push('</tr>');
	}
	cont.push('</table>');
	document.getElementById("calendar").innerHTML = cont.join("");
}

function goMonthList(){
	divDisplay('cCal', 'none'); divDisplay('cMCal', 'block');
}

function goDayList(){
	divDisplay('cMCal', 'none'); divDisplay('cCal', 'block');
}

function viewCalendar(s_year, s_month) {
	var arrow_icon = '&nbsp;<img src="http://i1.daumcdn.net/pimg/blog3/admin/ic_fulldown_arrow.gif" width="5" height="4" alt="arrow" />';
	if(document.getElementById('calSelYear')){
		document.getElementById('calSelYear').innerHTML = s_year + arrow_icon;
		document.getElementById('calSelMonth').innerHTML = ((s_month<10)?"0":"") + s_month + arrow_icon;
		drawCalendar(s_year,s_month);
	
		var url = "/_blog/hdn/ArticleWriteDayList_V2.do?blogid="+BLOGID+"&date="+s_year+"-"+((s_month<10)?"0":"")+s_month;
	 	loadXMLDoc("GET",url,null,"WriteDayList","alarmyFail", true);
	
		divDisplay('cCal', 'block'); 
		divDisplay('cMCal', 'none');
	}
}

function WriteDayList(oXmlHttp, fAfter) {
	if ( oXmlHttp ) {
		var WriteDayArray = new Array();
		var WriteMonthArray = new Array();
		try{
			var oXmlDoc;
			oXmlDoc = getXMLDocument(oXmlHttp);

			var pubDate = oXmlDoc.getElementsByTagName('pubDate');
			for(var i = 0; i < pubDate.length; i++) {
				WriteDayArray[parseFloat((pubDate[i].firstChild.nodeValue).substring(8,10))]={
					date: pubDate[i].firstChild.nodeValue.substring(0, 10)
				};
			}
			var archive = oXmlDoc.getElementsByTagName('item');
			for(i = 0 ; i < archive.length ; i++){
				WriteMonthArray.push({
					month: archive[i].getElementsByTagName('month')[0].firstChild.nodeValue,
					monthV: archive[i].getElementsByTagName('monthV')[0].firstChild.nodeValue,
					count: archive[i].getElementsByTagName('count')[0].firstChild.nodeValue
				});
			}
		}catch(e){}
		updateCalendar(WriteDayArray);
		drawArchive(WriteMonthArray);
		oXmlHttp = null;
		if(fAfter != null && (typeof fAfter == 'function')) {
			fAfter();
		}
	}
}

function drawArchive(WriteMonthArray) {
	var monthdata = new Array();
	if(WriteMonthArray.length == 0) {
		monthdata.push("<br /><br style='line-height:9px;'><span class='sideListClr'>지난 글들이 아직 없습니다.</span>");
	} else {
		for(var i=0; i<WriteMonthArray.length; i++){
			monthdata.push('<li class="withCount">');
			monthdata.push('<a href="javascript:viewLastDayAjaxArticle(\'/_blog/ArticleLastList.do?blogid='+BLOGID+'&date='+WriteMonthArray[i].month+'\')" class="sideListClr">');
			monthdata.push(WriteMonthArray[i].monthV+'</a>');
			monthdata.push('<span class="p11 sideListClr bold">'+WriteMonthArray[i].count+'</span></li>');
		}		
	}
	var alist = document.getElementById("archivelist");
	alist.innerHTML = monthdata.join("");
}

function updateCalendar(WriteDayArray) {
	var dateBoxs = document.getElementById("calendar").getElementsByTagName("td");
	var boxId, currday, writeDate;
	for(var i =0 ; i< dateBoxs.length;i++){
		boxId = dateBoxs[i].id;
		if(boxId) {
			currday = parseInt(boxId.substring(2));
			if(WriteDayArray[currday]) {
				writeDate = WriteDayArray[currday].date;
				dateBoxs[i].innerHTML = '<a href="javascript:viewLastDayAjaxArticle(\'/_blog/ArticleLastList.do?blogid='+BLOGID+'&date='+writeDate+'&calview='+writeDate+'\')" class="b '+dateBoxs[i].className+'">'+currday+'</a>';
			}
		}
	}
}

function cal_selY(s_year) {
	divDisplay('calYearList', 'none');
	viewCalendar(parseInt(s_year), parseFloat(document.getElementById('calSelMonth').innerHTML));
}

function cal_selM(s_month){
	if(document.getElementById('calSelYear')){
		divDisplay('calMonthList', 'none');
		viewCalendar(parseInt(document.getElementById('calSelYear').innerHTML), parseFloat(s_month));
	}
}

function bookmark(blogname, blogtitle, nil){
	createBookmark('/_blog/bookmark/bookmarkRegisterForm.do', blogname, blogtitle, nil);
}

function createBookmark(action, blogname, blogtitle, nil) {
		var nilTag = (!nil) ? "" : "&" + nil;
		var url = action+"?link=" + encodeURIComponent("http://blog.daum.net/" + blogname) + "&title=" + encodeURIComponent(blogtitle) + nilTag;
		var opts = "scrollbars=yes,status=no,toolbar=no,resizable=1,location=no,menu=no,width=580,height=450";
		window.open(url, "bookmark", opts);
}

/****Header***************************************************************************/


function show_div_select(divId){
	document.getElementById(divId).style.visibility = 'visible';
}
function hide_div_select(divId){
	if ( document.getElementById(divId) ){
		document.getElementById(divId).style.visibility = 'hidden';
	}
}

function div_select(value, ahref, id, target){

	document.loop.hidCategory.value = value;
	var temp = ahref.childNodes[0].innerHTML;
	if ( temp.length > 7 ){
		temp = temp.substring(0, 7) + '..';
	}
	document.getElementById(id).innerHTML = temp;
	hide_div_select(target);
}

function realImgView(img) {
	PhotoImagePopup(BLOGID,img);
}

function showList(curObj, targetObj){
	var listUL = document.getElementById(targetObj);
	var articleNo = targetObj.substring(targetObj.indexOf("_")+1,targetObj.length);

	if (document.getElementById("tagname_"+articleNo) != "undefined" 
				&& document.getElementById("tagname_"+articleNo) != null) {
		document.getElementById("tagname_"+articleNo).style.position="static";
	}
	
	if(listUL.style.display == 'none'){
		listUL.style.display = 'block';
	} else {
		listUL.style.display = 'none';
	}
	
	if (document.getElementById("tagname_"+articleNo) != "undefined" 
				&& document.getElementById("tagname_"+articleNo) != null) {	
		document.getElementById("tagname_"+articleNo).style.position="relative";
	}
}   

function getExtImg(ext) {
	switch(ext) {
		case "doc": return "http://i1.daumcdn.net/icon/editor/p_word_s.gif";
		case "xls": return "http://i1.daumcdn.net/icon/editor/p_xls_s.gif";
		case "ppt": return "http://i1.daumcdn.net/icon/editor/p_ppt_s.gif";
		case "pdf": return "http://i1.daumcdn.net/icon/editor/p_pdf_s.gif";
		case "txt": return "http://i1.daumcdn.net/icon/editor/p_txt_s.gif";
		case "hwp": return "http://i1.daumcdn.net/icon/editor/p_hwp_s.gif";
		case "jpg": return "http://i1.daumcdn.net/icon/editor/p_jpg_s.gif";
		case "gif": return "http://i1.daumcdn.net/icon/editor/p_gif_s.gif";
		case "png": case "bmp": return "http://i1.daumcdn.net/icon/editor/p_png_s.gif";
		case "zip": case "alz": return "http://i1.daumcdn.net/icon/editor/p_zip_s.gif";
		case "mp3": case "wav": return "http://i1.daumcdn.net/icon/editor/p_mp3_s.gif";
		case "avi": case "mpeg": case "wmv": return "http://i1.daumcdn.net/icon/editor/p_movie_s.gif";
		case "swf": return "http://i1.daumcdn.net/icon/editor/p_swf_s.gif";
		case "html": return "http://i1.daumcdn.net/icon/editor/p_html_s.gif";
		default: return "http://i1.daumcdn.net/icon/editor/p_etc_s.gif";
	}
}

// 첨부파일 이미지 아이콘 출력
function setFileTypeImg(filename, idx, articleno) {
	var firstpos = filename.lastIndexOf('.')
	var ext = '';

	if (firstpos != -1) {
		ext = filename.substring(firstpos + 1);
		ext = ext.toLowerCase();
	}

	var imgUrl = getExtImg(ext);
	document.getElementById('fileExt_'+ idx+'_'+articleno).style.backgroundImage = 'url(' + imgUrl + ')';
}

function PhotoImagePopup(blogid,imageurl) {
	var winObj = window.open("/_blog/photoImage.do?blogid="+blogid+"&imgurl="+imageurl, "b_img_viewer", "width=800px, height=744px, resizable=yes, scrollbars=yes");
	winObj.focus();
}

var viewObj = '';
function show_img_detail(obj, seq, title, cpage, bminseq, bmaxseq, bminarticleno, bmaxarticleno, bminregdt, bmaxregdt, categoryid, bpage, blogid, articleno , regdt){

	if(viewObj == ''){
		viewObj = document.createElement('div');
		viewObj.id = 'image_view';
		document.body.appendChild(viewObj);
	}
	divDisplay ('image_view', 'block', true);
	var viewObj = document.getElementById('image_view');
	var html = '';
	var url = '/_blog/BlogTypeView.do?blogid='+blogid +'&articleno='+articleno+"&categoryId="+categoryid+"&regdt="+regdt;
	var oncl = "viewAjaxCateArticle('"+url+"','"+categoryid+"');return false;";
	html = '<div id=\"image_view_img\" align=\"center\"><a href=\"javascript:PhotoImagePopup(\''+blogid+'\', \''+obj.src+'\');\"><img id=\"viewObjimg_src\" src=\"' + obj.src + '\"/></a></p>';
	html += '<p id=\"imgview_title\"><a href=\"'+ url +'\" onclick=\"'+oncl+'\"><b class=\"g_333\">' + title + '</b></a><a href=\"'+ url +'\" onclick=\"'+oncl+'\" class=\"p11\" style=\"color:#666;\">[글보기]</a></p>';
	html += '<p class=\"sDateTime\" style=\"color:#999;\">'+regdt+'</p>';
	viewObj.innerHTML = html;
	var viewObjimg_src = document.getElementById('viewObjimg_src');
	ResizeImage2(240, 240, viewObjimg_src);

	var posParent = getPosition(obj.parentNode.parentNode.parentNode);
	var posSelf = getPosition(obj);
	viewObj.style.left = posParent.x - 50 + 'px';
	if(viewObjimg_src.height < 285){
		viewObj.style.top = (posSelf.y - (viewObjimg_src.offsetHeight/2) + 40) + 'px';
	}
	else{
		viewObj.style.top = (posSelf.y - (viewObjimg_src.offsetHeight/2)*0.5 - 30) + 'px';
	}
	fade_effect();

}
function ResizeImage2( maxwidth, maxheight, obj){
	if( obj.width < obj.height) {
		heightEst = maxheight;
		widthEst = maxheight*(obj.width/obj.height);
		obj.height = heightEst;
		obj.width = widthEst;
	}
	else {
		widthEst = maxwidth;
		heightEst = maxwidth*(obj.height/obj.width);
		obj.height = heightEst;
		obj.width = widthEst;
	}
}

function photoviewBycategory(categoryid,maxseq){
	location.href = "/_blog/photoList.do?blogid="+BLOGID+"&isSlide=1&isSelect=1&categoryid="+categoryid+"&selSeq="+maxseq;
}
function draw_img(src, title, articleno){
	document.getElementById('ori_img_src').src = src;
	if( document.getElementById('pvframe') != null ) {
		document.getElementById('pvframe').src="/photoslide.html?type=photolist&src="+src;
	}
}

function goArticleLink(articleno) {
	var link = "/"+BLOGNAME+"/"+articleno;
	window.open(link, "articlelink", "");
}

function getPosition(object) {
  var valueT = 0, valueL = 0;
    do {
      valueT += object.offsetTop  || 0;
      valueL += object.offsetLeft || 0;
      object = object.offsetParent;
      if (object) {
        if(object.tagName.toUpperCase()=='BODY') break;
      }
    } while (object);
    return {x: valueL, y:valueT};
}

var		oSelImg = null;
var		nOverSeq = 0;
var		oOverSmallImg = null;

function show_ori_img(ori_img, title, articleno, seq, regdt, exif){
	document.getElementById('articlelink').innerHTML = '<a href="/'+BLOGNAME+'/'+articleno+'" class="g_fff"><b class="g_fff">\''+title+'\' </b>[글보기]</a>&nbsp;&nbsp;';
	document.getElementById('articleregdt').innerHTML = regdt;
	LoadPhotoSlideImage(500, 500, document.getElementById('ori_img_src'),ori_img, exif);
	if( oSelImg != null ) {
		oSelImg.className = 'out';
		oSelImg = null;
	}
	if( oOverSmallImg != null ) {
		oOverSmallImg.className = 'over';
		oSelImg = oOverSmallImg;
	}
	var str = HOST+"/"+BLOGNAME+"/"+articleno+"/"+seq;
	//document.getElementById('perm').innerHTML ='<a href=\"javascript:copyUrl(\''+str+'\');\" id=\"imgPostUrl\" class=\"t11\">'+str+'</a> <a href=\"javascript:copyUrl(\''+str+'\');\"><img src=\"http://i1.daumcdn.net/pimg/blog3/btn_copy.gif\" width=\"22\" height=\"13\" alt=\"복사\" style=\"vertical-align:middle;  margin:0 0 1px 0\" /></a>';
	document.getElementById('perm').innerHTML = '<span style="color:#999;">' + str + '</span> <embed id="imgCopyPostUrl" style="vertical-align:middle;" height="13" width="22" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowscriptaccess="always" wmode="transparent" id="UrlCopyButton$!{article.articleNo}" flashvars="url=' + str +'&amp;urlName=이미지" src="http://i1.daumcdn.net/cafecj/flash/copyClipboard.swf" />';
}

function bigger_img(img_obj, nSeq){
	if( is_ie ) {
    	oOverDiv = document.getElementById('overDiv');
    	oOverImg = document.getElementById('overImg');

    	var pos = getPosition(img_obj);
    	oPreviewDiv = document.getElementById("preview_list_box");
    	scrollOffset = oPreviewDiv.scrollLeft;
    	
    	oOverDiv.style.top = (pos.y-5) + "px";
    	if( scrollOffset > 0 ) {
    		oOverDiv.style.left = (pos.x-scrollOffset-10) + "px";
    	}
    	else {
    		oOverDiv.style.left = (pos.x-10) + "px";
    	}
    	oOverImg.src = img_obj.src;
    	oOverImg.onclick = img_obj.onclick;
    	oOverImg.alt = img_obj.alt;	
    	oOverDiv.style.display = "block";
		oOverSmallImg = img_obj;
		nOverSeq = nSeq;
	}
	else {
		img_obj.className = 'over';
	}
}

function smaller_img(img_obj){
	img_obj.className = 'out';
	oOverDiv = document.getElementById('overDiv');
	oOverDiv.style.display = "none";
}

function resize_viewer(main_div){
	var Wsize = document.body.offsetHeight;
	main_div.style.height = Wsize - 143;
	document.getElementById('ori_img_view').style.height = Wsize - 148;
	oMainFrame = document.getElementById("main_frame");
	oMainFrame.style.width = (document.body.offsetWidth - 30) + "px";
}

function smaller_img2(img_obj){
	if( !is_ie ) {
		img_obj.className = 'out';
	}
}

function goSort(sort) {
	createMainAjax();
	var themecode;
	if(document.getElementsByName("themeList").length>0 ){

    	frm = document.themeList;
		themecode = frm.themecode.value;
    	frm.sorttype.value = sort;
	}
	locationAjax(blogMainAjax, "/_blog/ThemeList.do?blogid="+BLOGID+"&themecode="+themecode+"&sorttype="+sort);

}

function goThemeCate(theme, categoryid) {
	if(categoryid ==null){
		categoryid = "";
	}
	createMainAjax();

	var link = "/_blog/ThemeList.do?blogid="+BLOGID+"&themecode="+theme+"&totalcnt=0&categoryid="+categoryid;
	if(document.getElementById("totT")){
    	var totcnt = document.getElementById("totT").innerHTML;
    	link="/_blog/ThemeList.do?blogid="+BLOGID+"&themecode="+theme+"&totalcnt="+totcnt+"&categoryid=";
	}
	locationAjax(blogMainAjax, link);

}
function failImgeExif() {
}
function loadImageExif(oXmlHttp) {
	if ( oXmlHttp ) {
		try{
			var oXmlDoc = getXMLDocument(oXmlHttp);
			var aItems = oXmlDoc.getElementsByTagName('item');
			var aExif = aItems[0].getElementsByTagName('exif');
			var aProperty = aExif[0].getElementsByTagName('property');
			var oAttrVal;
			var sMaker = "", sModel = "", sExposureTime = "", sFNumber = "", sISOSpeedRating = "";
			for(var i=0; i<aProperty.length;i++) {
				oAttrVal = aProperty[i].getAttributeNode("name").nodeValue
				if(oAttrVal == "Maker" || oAttrVal=="Manufacturer") {
					sMaker = aProperty[i].firstChild.nodeValue;
					if (sMaker.indexOf("http://") > -1 || sMaker == null || sMaker=='' || sMaker == "undefined")
						sMaker = "&nbsp;";
				} else if(oAttrVal == "Model") {
					sModel = aProperty[i].firstChild.nodeValue;
					if (sModel.indexOf("http://") > -1 || sModel == null || sModel=='')
						sModel = "&nbsp;";
				} else if(oAttrVal == "ExposureTime" || oAttrVal=="Exposure Time") {
					if( aProperty[i].firstChild.nodeValue.indexOf("sec") > -1 ) {
						sExposureTime = aProperty[i].firstChild.nodeValue;
					}  else {
						sExposureTime = "1/"+parseInt(1/eval(aProperty[i].firstChild.nodeValue))+"s";
					}
					if (sExposureTime.indexOf("http://") > -1 || sExposureTime == null || sExposureTime=='')
						sExposureTime = "&nbsp;";
				} else if(oAttrVal == "ApertureFNumber" || oAttrVal == "FNumber") {
					sFNumber = aProperty[i].firstChild.nodeValue;
					if (sFNumber.indexOf("http://") > -1 || sFNumber == null || sFNumber=='')
						sFNumber = "&nbsp;";
				} else if(oAttrVal == "ISO Speed Ratings" || oAttrVal == "ISOSpeedRatings") {
					sISOSpeedRating = aProperty[i].firstChild.nodeValue;
					if (sISOSpeedRating.indexOf("http://") > -1 || sISOSpeedRating == null || sISOSpeedRating=='')
						sISOSpeedRating = "&nbsp;";
				} else if(oAttrVal == "DateTimeOriginal" || oAttrVal == "Date and Time (original)") {
					sDate = aProperty[i].firstChild.nodeValue;
					if (sDate.indexOf("http://") > -1 || sDate == null || sDate=='')
						sDate = "&nbsp;";
				} 
			}
		}catch(e){ }
		oXmlHttp = null;
		if(typeof sMaker == "undefined"){ sMaker ="";}
		if(typeof sModel == "undefined"){ sModel ="";}
		if(typeof sExposureTime == "undefined"){ sExposureTime ="";}
		if(typeof sFNumber == "undefined"){ sFNumber ="";}
		if(typeof sISOSpeedRating == "undefined"){ sISOSpeedRating ="";}
		if(typeof sDate == "undefined"){ sDate ="";}
		document.getElementById("exifMaker").innerHTML = sMaker;
		document.getElementById("exifModel").innerHTML = sModel;
		document.getElementById("exifExposureTime").innerHTML = sExposureTime;
		document.getElementById("exifFNumber").innerHTML = sFNumber;
		document.getElementById("exifISOSpeedRating").innerHTML = sISOSpeedRating;
		if (sDate != '') {
			if (sDate.indexOf(":") == 4)
				sDate = sDate.replace(":","."); // 년
			if (sDate.indexOf(":") == 7)
				sDate = sDate.replace(":","."); // 월
		}
		document.getElementById("exif").innerHTML = sDate;
	}
}

function moveSideEbook(isNext){
	var ul = document.getElementById("sideEbookList");
	if(ul){
		var list = ul.getElementsByTagName("li");
		var size = list.length-1;
		var ind = -1;
		for(var i=size;i>=0;i--){
			var li = list[i];
			if(li.style.display != "none"){
				ind = i;
				li.style.display = "none";
				break;
			}
		}
		if(ind!=-1){
			if(isNext){
				ind++;
				if(ind>size){
					ind = 0;
				}
			}else{
				ind--;
				if(ind<0){
					ind = size;
				}
			}
			list[ind].style.display = "";
		}
		
	}
}// 교감게시판

	var boardActType="";
    var boardno=0;
    var boardHiddenThread=0;
    var boardInNum=0;
    var boardModiNum=0;
    var boardHiddenDesc="";
	var commentMaxLength = 4000;
	var orgBoardActType = "";
	var isSubmit = false;

    function boardResetVariable(){
        boardActType="";
		orgBoardActType = boardActType;
        boardno=0;
        boardHiddenThread=0;
        boardInNum=0;
    	boardModiNum=0;
        boardHiddenDesc="";
    }

	function boardSendData(seqnum){
		var vblogid = document.getElementById("vblogid").value.trim();		//방문자의 로그인 여부 체크??
		var blogid = document.getElementById("blogid").value.trim();		//Ajax 호출시 필요한 값
		var myblogid = document.getElementById("myblogid").value.trim(); 	//''
		var isSearch = document.getElementById("isSearch").value.trim(); 	//''
		
		frm = document.boardList;
		
		var writerNameId = "writername";
		var passId = "password";
		var blogemailId = "blogemail";
		var boardDescId = "boarddesc";
		var openKindId = "X_openkind";

		if(boardActType != "MOD"){
			id = "readytowrite";
			if(seqnum != null)	id = id + seqnum;
			readytowrite = daum.$(id);
			if(readytowrite.value == "Y"){
				readytowrite.value = "N";
			} else {
				alert("내용을 입력해주세요!");
				return;
			}
		}
		
		if(seqnum != null)
		{
			writerNameId = "add" + writerNameId + "_" + seqnum;
			passId = "add" + passId + "_" + seqnum;
			blogemailId = "add" + blogemailId + "_" + seqnum;
			boardDescId = "add" + boardDescId + "_" + seqnum;
			openKindId = "addopenkind"+ "_" + seqnum;
			if(boardActType=="REP")
			{
				writerNameId = "Re" + writerNameId;
				passId = "Re" + passId;
				blogemailId = "Re" + blogemailId;
				boardDescId = "Re" + boardDescId;
				openKindId = "Re" + openKindId;
			}
		}
		var chkOpenKind = document.getElementById(openKindId);
		if(chkOpenKind && chkOpenKind.checked){
			if(boardActType=="INSERT") { frm.openkind.value="N"; }
			else { frm.mr_openkind.value="N"; }
		}
		else
		{
			frm.openkind.value="";
			frm.mr_openkind.value="";
		}

		//이름, 패스워드, 이메일은  로그인안했거나, 블로그 없을 때만..
		if(!vblogid) {
			var txtWriterName = document.getElementById(writerNameId);
			var txtPass;
				if(boardActType=="INSERT") txtPass = eval("frm."+passId);
				else txtPass = document.getElementById(passId);
			var txtBlogemail = document.getElementById(blogemailId);
			var errMsg = "";
			var errField = null;
			if(txtWriterName.value.trim() == "" || txtWriterName.value.trim() == "이름")
			{
				errMsg = "이름을";
				errField = txtWriterName;
			}
			else if(txtPass.value.trim() == "" || txtPass.value.trim() == "비밀번호")
			{
				errMsg = "비밀번호를";
				errField = txtPass;
			}
			else if(txtBlogemail.value.trim() == "" || txtBlogemail.value.trim() == "블로그 또는 이메일 주소")
			{
				errMsg = "블로그/이메일 둘 중에 하나를";
				errField = txtBlogemail;
			}
			
			if(errMsg != "")
			{
				alert(errMsg + " 입력해주세요!");
				errField.value="";
				errField.focus();
				return;
			}
			// 이메일인지 블로그주소인지를 구분한다.
			var be = txtBlogemail.value;
			if( be.indexOf("@") > 0 ){
				frm.writeremail.value=be;
			}else{
				if(be.indexOf("http://")<0)	be = "http://"+be;
				frm.writerblog.value=be;
			}
		}
	
		//내용
		var txtBoardDesc = document.getElementById(boardDescId);
		if(txtBoardDesc.value=="" ||  txtBoardDesc.value=="내용"){
    		alert("내용을 입력해주세요!");
    		txtBoardDesc.focus();
			if(boardActType=="INSERT")	boardActType = orgBoardActType;
    		return;
		}
		
		/* 전송 부분 */
		var obj = {};
		obj.blogid = blogid;
		obj.myblogid = myblogid;
		obj.isSearch = isSearch;

		//등록버튼을 이미 눌렀을경우
		if (isSubmit) {
			alert("등록중입니다 잠시만 기다려주세요.");
			return;
		}

		// 이메일인지 블로그주소인지를 구분한다.
		if (!vblogid) {
			frm.writeremail.value = txtBlogemail.value;
			var be = txtBlogemail.value;
			if (be.indexOf("@") > 0) {
				frm.writeremail.value = be;
			}
			else {
				if (be.indexOf("http://") < 0) 
					be = "http://" + be;
				frm.writerblog.value = be;
			}
		}
	   	if(boardActType=="INSERT"){
	   		isSubmit = true;
	   		obj.currentPage = 1;
			loadXMLDocWithParam("POST","/_blog/BoardRegister.ajax",getForm(frm),"after",null,obj);
    	}else{
    		obj.currentPage = frm.currentPage.value;
    		frm.boardno.value=seqnum;
    		if(!vblogid){
	    		frm.writername.value= txtWriterName.value;
				frm.password.value=txtPass.value;
//				frm.writeremail.value= txtBlogemail.value;
    		}
    		frm.boarddesc.value = txtBoardDesc.value;
    	} 
    	if(boardActType=="MOD"){
			loadXMLDocWithParam("POST","/_blog/BoardModify.ajax",getForm(frm),"afterModify",null,obj);
        }else if(boardActType=="REP") {
        	isSubmit = true;
			loadXMLDocWithParam("POST","/_blog/BoardReplyRegister.ajax",getForm(frm),"after",null,obj);
    	}
    }

	// 방명록등록과 댓글등록
	function after(xmlhttp,obj) {
    	var res = getSimpleResponse(xmlhttp);
    	var tmp = document.createElement("DIV");
		tmp.innerHTML=res;
		var script = tmp.getElementsByTagName("SCRIPT");
		if(script.length>0){
			eval(script[0].innerHTML);
		}else{		
			if (obj.myblogid == "" && obj.isSearch=="N") {
				loadBoardView('/_blog/BoardView.ajax?blogid='+obj.blogid+'&currentPage='+obj.currentPage);
			} else {
				loadBoardView('/_blog/BoardView.ajax?blogid='+obj.blogid+'&currentPage='+obj.currentPage+'&myblogid='+obj.myblogid+'&isSearch='+obj.isSearch);
			}
		}
		xmlhttp = null;
		isSubmit = false;
	}
	
	function afterModify(xmlhttp,obj) {
   		var res = getSimpleResponse(xmlhttp);
    	var tmp = document.createElement("DIV");
		tmp.innerHTML=res;
		var script = tmp.getElementsByTagName("SCRIPT");
		if(script.length>0){
			eval(script[0].innerHTML);
		}else{		
			if (obj.myblogid == "" && obj.isSearch =="N") {
				loadBoardView('/_blog/BoardView.ajax?blogid='+obj.blogid+'&currentPage='+obj.currentPage);
			} else {
				loadBoardView('/_blog/BoardView.ajax?blogid='+obj.blogid+'&currentPage='+obj.currentPage+'&myblogid='+obj.myblogid+'&isSearch='+obj.isSearch);
			}
		}
		xmlhttp=null;
		isSubmit = false;
	}

	function loadBoardView(url) {
		boardAjax = new AjaxObject("boardAjax", "contentArea", "contents", "ajax_layer_load");
    	boardAjax.load(url, true);
    }

	function searchboard() {
		var blogid = document.getElementById("blogid").value;
		var val = document.getElementById("sword").value;
		if(val=="" || val=="블로그 별명") {
		 	 alert("블로그 별명을 넣어주세요");
		 	 return false;
		}else{
			document.location="/_blog/BoardView.do?blogid="+blogid+"&nickname="+encodeURIComponent(val);
		}
	}

	function pressedenter(event){
		var keyValue = event.keyCode ;
		if(keyValue == 13){
			searchboard();
		}
	}

	function boardModifyView(objNum,thread) {
		var isReply = false;
		if(objNum != thread){
			isReply = true;
		}
		var vblogid = document.getElementById("vblogid").value;
		boardWriteTemplateSettingModi(objNum);
		boardActType="MOD";
		orgBoardActType = boardActType;
		boardno=objNum;
		if(!vblogid || vblogid == "") {
		/*
			if(document.getElementById("addpassword"))
				document.getElementById("addpassword").value = document.boardList.pass.value;*/
			document.getElementById("addpassword_"+objNum).value = hiddenDesc;
			document.getElementById("addwritername_"+objNum).value = document.getElementById("cContentWriterName_"+objNum).innerHTML.trim();
			document.getElementById("addblogemail_"+objNum).value = document.getElementById("cContentBlogEmail_"+objNum).innerHTML.trim();
		}
///		if(document.getElementById("addboardtitle_"+objNum))
///			document.getElementById("addboardtitle_"+objNum).value =  replaceHTML(document.getElementById("cContentTitle_"+objNum).innerHTML);
		if(boardHiddenDesc ==""){
			if(isReply){
				document.getElementById("addboarddesc_"+objNum).value =  replaceHTML(document.getElementById("cContentBody_"+objNum).innerHTML.trim());
			}else{
				document.getElementById("addboarddesc_"+objNum).value =  replaceHTML(document.getElementById("cContentBodyReal_"+objNum).innerHTML.trim());
				document.getElementById("addboarddesc_"+objNum).style.background = '#fff';
			}
		}else{
			document.getElementById("addboarddesc_"+objNum).value =  replaceHTML(boardHiddenDesc);
			boardHiddenDesc="";
		}
		if(document.getElementById("cContentOpenKind_"+objNum).innerHTML.trim()=="N"){
			document.getElementById("addopenkind_"+objNum).checked =  true;
		}
		if(objNum != thread){
			if(document.getElementById("cContentOpenKind_"+thread).innerHTML.trim()=="N" && document.getElementById("addopenkind_"+objNum) ){
				document.getElementById("addopenkind_"+objNum).checked =  true;
				document.getElementById("addopenkind_"+objNum).disabled =  true;
			}
		}else{
			//document.getElementById("title_"+objNum).style.display="block";
		}
		window.setTimeout("resizeArea(document.getElementById('addboarddesc_'+" + objNum + "), '34', '1000')", 10);
		resizeArea(document.getElementById("addboarddesc_"+objNum), '34', '1000');
	}

	function boardWriteTemplateSettingModi(objNum) {
    	if(boardModiNum > 0 && boardModiNum != objNum){
    		document.getElementById("cWriteLayer_modi_"+boardModiNum).style.display='none';
    		document.getElementById("cContentBody_"+boardModiNum).style.display='block';
    	}
    	var writeTemplate = document.getElementById("cWriteLayer_modi_"+objNum);
    	var writeTemplateText = document.getElementById("cContentBody_"+objNum);
    	if(writeTemplate.style.display =='block'){
    		writeTemplate.style.display = 'none';
    		writeTemplateText.style.display = 'block';
    	}else{
    		writeTemplate.style.display = 'block';
    		writeTemplateText.style.display = 'none';
    	}
    	boardModiNum = objNum;

		//답글쓰기도 지움
		if(document.getElementById("cWriteLayer_"+boardInNum)){
			document.getElementById("cWriteLayer_"+boardInNum).style.display = 'none';
		}
	}

    function boardReplyView(objNum, boardOpenKind) {
		var vblogid = document.getElementById("vblogid").value;
    	boardWriteTemplateSetting(objNum);
    	boardActType="REP";
		orgBoardActType = boardActType;
    	boardno=objNum;
    	if(document.getElementById("title_"+objNum)){
    		document.getElementById("title_"+objNum).style.display="none";
    	}
		
    	/*if(document.getElementById("Readdboarddesc_"+objNum)){
    		if(document.getElementById("Readdboarddesc_"+objNum).disabled==false)
    			document.getElementById("Readdboarddesc_"+objNum).value ="";
    	}*/
    	
    	if(document.getElementById("cContentOpenKind_"+objNum).innerHTML=="N"){
    		document.getElementById("Readdopenkind_"+objNum).checked =  true;
    		document.getElementById("Readdopenkind_"+objNum).disabled =  true;
    	}
    	if(!vblogid || vblogid == "") {
	    	if(boardOpenKind != "B0402"){
	    		document.getElementById("Readdwritername_"+objNum).value="이름";
	    		document.getElementById("Readdpassword_"+objNum).value="";
	    		document.getElementById("Readdblogemail_"+objNum).value="블로그 또는 이메일 주소";
	    	}
    	}
	}

	function boardWriteTemplateSetting(objNum) {

    	if(boardInNum > 0 && boardInNum != objNum){
    		document.getElementById("cWriteLayer_"+boardInNum).style.display='none';
    	}
    	var writeTemplate = document.getElementById("cWriteLayer_"+objNum);
    	if(writeTemplate.style.display =='block'){
    		writeTemplate.style.display = 'none';
    	}else{
    		writeTemplate.style.display = 'block';
    	}
    	boardInNum = objNum;

    	//수정폼도 지움
    	if(document.getElementById("cWriteLayer_modi_"+boardModiNum)){

        	writeTemplate = document.getElementById("cWriteLayer_modi_"+boardModiNum);
        	//var writeTemplateText = document.getElementById("pCont_comm_cont02_"+boardModiNum);
        	if(writeTemplate.style.display =='block'){
        		writeTemplate.style.display = 'none';
        	//	writeTemplateText.style.display = 'block';
        	}else{
        	//	writeTemplate.style.display = 'block';
        	//	writeTemplateText.style.display = 'none';
        	}
    	}
    }

	function replaceHTML(val){
		var x = val.replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
		x = x.replace(/<BR>\n/g,"\n");

		x = x.replace(/<br>\n/g,"\n");

		x = x.replace(/<BR>/g,"\n");
		x = x.replace(/<br>/g,"\n");
		return x;
	}

	
	//주인이 자신의 스팸함에 스팸필터를 설정합니다.	/ 댓글  
	function blackListReg601Ajax(blogid, atno, cmmtno, url, open, cntdt, jobkind, blackConf) {
		if(confirm("선택하신 글의 작성자를 차단된 사람에 등록하시겠습니까?")){
	       	var frm = document.blackListRegFrm;
	        frm.jobKind.value=jobkind;
	        frm.blackConf.value=blackConf;
	        frm.comment.value="블로그에서 차단";

	        var obj = new Object();
	        obj.blogid= blogid;
	        obj.atno=atno;
	        obj.cmmtno=cmmtno;
	        obj.url=url;
	        obj.open=open;
	        obj.cntdt=cntdt;
	        obj.blackKind="U0601";
	        loadXMLDocWithParam("POST","/_blog/blackListReg.ajax",getForm(frm),"afterblackListReg",null,obj);
		}
	}

	//주인이 자신의 스팸함에 스팸필터를 설정합니다.	/ 엮인글   
	function blackListReg602Ajax(objThis, blogId, atno, tbno, cntdt, jobkind, blackConf) {
		if(confirm("선택하신 글의 작성자를 차단된 사람에 등록하시겠습니까?")){
	       	var frm = document.blackListRegFrm;
	        frm.jobKind.value=jobkind;
	        frm.blackConf.value=blackConf;
	        frm.comment.value="블로그에서 차단";

	        var obj = new Object();
	        obj.objThis= objThis;
	        obj.blogId=blogId;
	        obj.atno=atno;
	        obj.tbno=tbno;
	        obj.cntdt=cntdt;
	        obj.blackKind="U0602";
	        loadXMLDocWithParam("POST","/_blog/blackListReg.ajax",getForm(frm),"afterblackListReg",null,obj);
		}
	}
	
	//주인이 자신의 스팸함에 스팸필터를 설정합니다.	/ 방명록 (교감게시판)  
	function blackListReg603Ajax(boardno,type,currentPage, jobkind, blackConf) {
		if(confirm("선택하신 글의 작성자를 차단된 사람에 등록하시겠습니까?")){
	       	var frm = document.blackListRegFrm;
	        frm.jobKind.value=jobkind;
	        frm.blackConf.value=blackConf;
	        frm.comment.value="블로그에서 차단";

	        var obj = new Object();
	        obj.boardno=boardno;
	        obj.type=type;
	        obj.currentPage=currentPage;
	        obj.blackKind="U0603";
	        loadXMLDocWithParam("POST","/_blog/blackListReg.ajax",getForm(frm),"afterblackListReg",null,obj);
		}
	}
	
	//주인이 자신의 스팸함에 스팸필터를 설정합니다.	/ 프로필 댓글
	function blackListReg605Ajax(cmmtNo, prntNo,jobkind, blackConf) {
		if(confirm("선택하신 글의 작성자를 차단된 사람에 등록하시겠습니까?")){
	       	var frm = document.blackListRegFrm;
	        frm.jobKind.value=jobkind;
	        frm.blackConf.value=blackConf;
	        frm.comment.value="블로그에서 차단";
        
	        var obj = new Object();
	        obj.cmmtNo=cmmtNo;
	        obj.prntNo=prntNo;
	        obj.blackKind="U0605";
	        loadXMLDocWithParam("POST","/_blog/blackListReg.ajax",getForm(frm),"afterblackListReg",null,obj);
		}
	}
	
	function afterblackListReg(xmlhttp,obj){
		var res = getSimpleResponse(xmlhttp);
		
		if (res.indexOf('success') > -1) {
			alert ("블랙리스트에 추가 되었습니다.");
		} else if (res.indexOf('dup') > -1) {
			alert ("이미 추가된 사용자 입니다.");			
		} else if (res.indexOf('over') > -1) {
			alert ("블랙리스트 제한 인원을 초과하여 등록할 수 없습니다.");	
		} else {
			alert ("죄송합니다 블랙리스트로 추가시키지 못했습니다.");
			return;
		}

		if (obj.blackKind == "U0601") {
			deleteCommentAjax (obj.blogid, obj.atno, obj.cmmtno, obj.url, obj.open, obj.cntdt);
		} else if (obj.blackKind == "U0602") {
			if(confirm("역인글을 삭제 하시겠습니까?")){
				delTrackback(obj.objThis, obj.blogId, obj.atno, obj.tbno, obj.cntdt);	// common_v2.0.js 에 선언되어 있습니다.
			}
		} else if (obj.blackKind == "U0603") {
			boardGoAdminDel (obj.boardno, obj.type, obj.currentPage);
		} else if (obj.blackKind == "U0605") {			
			profileShowCommentDelete(obj.cmmtNo, obj.prntNo);
		}		
		xmlhttp=null;
	}
	
	function boardGoAdminDel(boardno,type, currentPage) {
		var blogid = document.getElementById("blogid").value;
		var myblogid = document.getElementById("myblogid").value;
		var isSearch = document.getElementById("isSearch").value;		
//		var chk = document.getElementById("hasChild_"+boardno);
//
//    	if(chk!=null){
//    		alert("답글이 있는 게시글은 삭제할 수 없습니다.");
//    		return;
//    	}
    	if(type==0)
    		y = confirm("해당 게시글을 삭제  하시겠습니까?");
    	else
    		y = confirm("해당 답글을 삭제 하시겠습니까?");
    	if(y) {
    		frm = document.boardList;

    		frm.blogid.value=blogid;
    		frm.boardno.value=boardno;

    		var obj = new Object();
    	    obj.boardno=boardno;
    	    obj.blogid=blogid;
    	    obj.currentPage=currentPage;
    	    obj.myblogid = myblogid;
    	    obj.isSearch = isSearch;
    		
    		loadXMLDocWithParam("POST","/_blog/BoardDelete.do",getForm(frm),"afterDelete",null,obj);
    		if (typeof(requestAjaxCheck) == 'function') {
    			requestAjaxCheck("action=boardGoAdminDel&blogid="+blogid);
    		}
    	}
    }

	function afterDelete(xmlhttp,obj) {
		boardno = obj.boardno;
		if ((obj.myblogid == undefined || obj.myblogid == "") && (obj.isSearch == undefined || obj.isSearch == "N")) {
			loadBoardView('/_blog/BoardView.ajax?blogid='+obj.blogid+'&currentPage='+obj.currentPage);
		} else {
			loadBoardView('/_blog/BoardView.ajax?blogid='+obj.blogid+'&currentPage='+obj.currentPage+'&myblogid='+obj.myblogid+'&isSearch='+obj.isSearch);
		}		
		
		xmlhttp= null;
	}

	function loadBoardList(url){
		boardAjax = new AjaxObject("boardAjax", "contentArea", "contents", "ajax_layer_load");
		boardAjax.load(url, true);
	}

    function boardGoModi(deltype,boardno,thread,curObj){
		var blogid = document.getElementById("blogid").value;
		boardHiddenThread = thread;
		frm = document.boardList;
		var currentPage = frm.currentPage.value;
		var url = "/_blog/BoardDelete.do?blogid="+blogid+"&currentPage="+currentPage+"&boardno="+boardno;
		//	if(deltype=="T") {
		//		location.href=url;
		//	}	else {
		//		url = "/_blog/BoardPwdDelete.do?blogid=$!BLOGID&currentPage="+currentPage+"&boardno="+boardno;
		clickAreaCheck = true;
		var str = "<div onclick='clickAreaCheck = true' style='background:#FFFFFF; border:1px solid #999999;'><div style='margin:10px 10px 6px 10px; text-align:right;'>비밀번호를 입력해주세요.<br />";
		str += "<input type=password id=password2 id=password2 name=password2 class=box maxlength='10' style='width:139px; margin-bottom:5px;' onkeydown='clickAreaCheck = true' onfocus='clickAreaCheck = true'><br />";
		str += "<a href=\"#\" onclick=\"boardModi('"+deltype+"','"+boardno+"');\"><img src='http://i1.daumcdn.net/pimg/blog/p_img2/btn_ok.gif' width='32' height='18' alt='확인'></a> <a href='javascript:;'><img onclick=\"divDisplay('nameLayer', 'none')\" src='http://i1.daumcdn.net/pimg/blog/p_img2/btn_cancle03.gif' width='32' height='18' alt='취소'></a><br /></div></div>";
		setNameLayersPosition(curObj, str);
		var passField = document.getElementById("password2");
		if(passField && passField.focus){ passField.focus(); }
		//   }
	}

	function boardModi(deltype,boardno) {
		if(document.getElementById("password2").value==""){
	    	alert("비밀번호를 입력해주세요!");
	    	return;
		}
		document.boardList.pass.value=document.getElementById("password2").value;
		clickAreaCheck = false;
		var qry = "?blogid="+document.getElementById("blogid").value+"&boardno="+boardno+"&password="+document.getElementById("password2").value;
		loadDynamicContent("/_blog/BoardCheckPassword.do"+qry);
		divDisplay('nameLayer', 'none');
	}

	function boardGoDel(deltype,boardno,type,curObj, currentPage) {
		var blogid = document.getElementById("blogid").value;
//		var chk = document.getElementById("hasChild_"+boardno);
//		if(chk!=null){
//			alert("답글이 있는 게시글은 삭제할 수 없습니다.");
//			return;
//		}
		frm = document.boardList;
		var url = "/_blog/BoardDelete.do?blogid="+blogid+"&currentPage="+currentPage+"&boardno="+boardno;

		if(deltype=="T") {
			location.href=url;
		}	else {
	    	//		url = "/_blog/BoardPwdDelete.do?blogid="+board+"&currentPage="+currentPage+"&boardno="+boardno;
	    	clickAreaCheck = true;
	    	var str = "<div onclick='clickAreaCheck = true' style='background:#FFFFFF; border:1px solid #999999;'><div style='margin:10px 10px 6px 10px; text-align:right;'>비밀번호를 입력해주세요.<br />";
	    	str += "<input type=password id=password2 name=password2 class=box maxlength='10' style='width:139px; margin-bottom:5px;' onkeydown='clickAreaCheck = true' onfocus='clickAreaCheck = true'><br />";
	    	str += "<a href=\"#\" onclick=\"javascript:boardDel('"+blogid+"','"+boardno+"');\"><img src='http://i1.daumcdn.net/pimg/blog/p_img2/btn_ok.gif' width='32' height='18' alt='확인'></a> <a href='javascript:;'><img onclick=\"divDisplay('nameLayer', 'none')\" src='http://i1.daumcdn.net/pimg/blog/p_img2/btn_cancle03.gif' width='32' height='18' alt='취소'></a><br /></div></div>";
	    	setNameLayersPosition(curObj, str);
		}
	}

	function boardDel(blogid, boardno) {
		var password = document.getElementById("password2").value;

    	if(password == "") {
        	alert("비밀번호를 입력해주세요");
        	return;
		}
 		clickAreaCheck = false;
		var qry = "?blogid="+document.getElementById("blogid").value+"&boardno="+boardno+"&password="+password+"&boardacttype=DEL";
		loadDynamicContent("/_blog/BoardCheckPassword.do"+qry);
		divDisplay('nameLayer', 'none');
	}
	
	function boardDel2(blogid, boardno) {
		var password = document.getElementById("password2").value;

    	if(password == "") {
        	alert("비밀번호를 입력해주세요");
        	return;
		}
    	frm = document.boardList;
    	frm.blogid.value=blogid;
    	frm.boardno.value=boardno;
    	frm.pass.value=password;

    	var obj = new Object();
    	obj.blogid = blogid;
		obj.currentPage = frm.currentPage.value;
		
    	if( document.getElementById("nameLayer") ) {
    		document.getElementById("nameLayer").style.display="none";
    	}

    	loadXMLDocWithParam("POST","/_blog/BoardPwdDelete.do",getForm(frm),"afterDelete",null,obj);
	}

	//패스워드 검사후 해줘야되는것들
	function checkedPasswd(xmlhttp, obj) {
		var res = getSimpleResponse(xmlhttp);
		eval(res);
		xmlhttp=null;
	}

	function boardGoVerifyRegister(vemail,vblog,vid){
		var blogid = document.getElementById("blogid").value;
		frm = document.boardList;
		var board_param = "blogid="+blogid+"&currentPage="+frm.currentPage.value;
		board_param += "&verifyBlog="+encodeURIComponent(vblog)+"&verifyEmail="+encodeURIComponent(vemail)+"&verifyID="+vid;
		location.href="/_blog/VerifyRegister.do?"+board_param;
	}
	
	function verifyRegisterBoard(verifyNo){
		var blogid = document.getElementById("blogid").value;
		frm = document.boardList;
		var board_param = "blogid="+blogid+"&currentPage="+frm.currentPage.value;
		board_param += "&verifyNo="+verifyNo;
		location.href="/_blog/boardVerify.do?"+board_param;
	}

	// 일단 board.js 에 붙혀 놓고 댓글쪽이랑 공용으로 빼자.
	function setNameLayersPosition(curObj, str) {
		var name = "nameLayer";

		if (!document.getElementById(name)) {
	        var cElement = document.createElement("DIV");
	        cElement.id = name;
	        cElement.style.position = 'absolute';
			cElement.style.zIndex = 50;
	        document.body.appendChild(cElement);
		}

		document.getElementById(name).style.top = (getAbsoluteTop(curObj) + curObj.offsetHeight + 3)+"px";
		document.getElementById(name).style.left = getAbsoluteLeft(curObj)+"px";

		document.getElementById(name).innerHTML = str;

		divDisplay(name, 'block',  true);
	}
	
	// 비로그인 유저에 대한 답글의 비공개 옵션 처리
	function forceOpenWithMessage(targetEl) {
		if (targetEl.checked) {
			targetEl.checked = false;
			alert("비공개로 등록하시면 작성자가 답글을 확인할 수 없어 설정이 제한됩니다.");
		}
	}

	/** 블로그명 클릭하면 나오는 레이어 기능은 2008년8월1일부터 빠집니다. YM
	function showNameLayer(curObj, link1, link2, link3) {
		clickAreaCheck = true;
		needTargetTop = false;

		if(link2 == "") {
			needTargetTop = true;
			link2 = link3;
			var copyList = new Array("바로가기", "차단하기");
		} else {
			link1 = link2;
			link2 = link3;
			var copyList = new Array("친구등록", "차단하기");
		}

		var str = "<div class='name'><img src=\"http://i1.daumcdn.net/pimg/blog/p_img/im_layerbg_01.gif\" width=\"85\" height=\"1\"><br />";
		str += "<ul>";
		for (var i=0; i < copyList.length; i++) {

			str += "<li onclick='clickAreaCheck = true'>";
			if (eval("link"+Number(i+1)) != "") {
				if( needTargetTop && i==0 )
					str += "<a href="+eval("link"+Number(i+1))+" target=\"_top\" class=\"cLayerLink\">" + copyList[i] + "</a>";
				else
					str += "<a href="+eval("link"+Number(i+1))+" class=\"cLayerLink\">" + copyList[i] + "</a>";
			}else {
				str += copyList[i];
			}
			if (i + 1 < copyList.length)
				str += "<li class=\"line\" onclick='clickAreaCheck = true'>";
		}
		str += "</ul><img src=\"http://i1.daumcdn.net/pimg/blog/p_img/im_layerbg_01.gif\" width=\"85\" height=\"1\"><br /></div>";

		setNameLayersPosition(curObj, str);
	}
**/

//////////////////////////////////////////////////////////////////////////////////////////
// 프로필
//////////////////////////////////////////////////////////////////////////////////////////
	var profileIsCommentLoaded = false;
	var profileCommentAjax;
	function profileShowComment(blogid){	
		if(document.getElementById("pCont_comm").style.display == 'none')
		{
		
			if(!profileIsCommentLoaded)
			{
				//loadDynamicContent("/_blog/ProfileCommentsList.do?blogid="+blogid);
				profileCommentAjax = new AjaxObject("profileCommentAjax", "pCont_comm_list", "contents", "ajax_layer_load");
				profileCommentAjax.load("/_blog/ProfileCommentsList.ajax?blogid="+blogid, true);
				document.getElementById("profileCommentTitle").style.fontWeight = "bold";
				document.getElementById("profileCommentCnt").className = "cB_Amp";
			}

			document.getElementById("pCont_comm").style.display = 'block';

		}else
		{
			document.getElementById("pCont_comm").style.display = 'none';
			document.getElementById("profileCommentTitle").style.fontWeight = "";
				document.getElementById("profileCommentCnt").className = "";
		}
	}

	function profileInit(blogid){
		if(!confirm("초기화를 하면 이전에 프로필에 입력했던 정보가 모두 삭제됩니다. 정말 초기화 하시겠습니까?")) return;
		if(document.getElementById("hideframe")) {
			document.getElementById("hideframe").src = "/_blog/ProfileInit.do?blogid="+blogid;
		}
	}

	function profmod(cmmtNo){
		var cmmtUpdForm = document.cmmtUpdForm;
		var cmmtopen = document.getElementById("profile.getCommentOpen").innerHTML;
		var authority = document.getElementById("authority").innerHTML;
		if(document.getElementById("_open"+cmmtNo)){
			if(document.getElementById("_open"+cmmtNo).checked)
				cmmtUpdForm.cmmtopen.checked=true;
		}
		if(document.getElementById("_txticon"+cmmtNo)){
			if(document.getElementById("_txticon"+cmmtNo).checked)
				cmmtUpdForm.cmmtexticon.checked=true;
		}		
		cmmtUpdForm.cmmtname.value = document.getElementById("_name"+cmmtNo).value;
		cmmtUpdForm.cmmtcheck.value = document.getElementById("_check"+cmmtNo).value;
		cmmtUpdForm.cmmtcomment.value = document.getElementById("_comment"+cmmtNo).value;
				
		if (cmmtUpdForm.cmmtcomment.value.length > commentMaxLength) {
			alert ("댓글은 "+commentMaxLength+"자 까지 작성하실 수 있습니다.");
			return;
		}						
				
		var rtn =profileCheckComment(cmmtUpdForm,authority,cmmtopen);
		if(rtn)
			cmmtUpdForm.submit();
	}
	var preCmmtObj;
	var preCommtHide;
	function profileShowCommentEditForm(cmmtNo, prntNo, cmmtPwd, parentIsLock){

		var cmmtObj = document.getElementById("pLayerCmmtMod"+cmmtNo);
		if(cmmtObj == null) return;

		if(preCmmtObj == cmmtObj){
				cmmtObj.style.display = 'none';
				cmmtObj.innerHTML = '';
				preCommtHide.style.display='block';
				preCmmtObj =null;
				preCommtHide=null;
				return;
		}else{
			if(preCommtHide !=null)
				preCommtHide.style.display='block';
			preCommtHide = document.getElementById("pDataCmmtContent"+cmmtNo);
			preCommtHide.style.display='none';
			 if(preCmmtObj !=null){
			 	preCmmtObj.style.display="none";
			 }
		}

		if(cmmtObj.style.display == 'none')	{
			var cmmtUpdForm = document.cmmtUpdForm;
			cmmtUpdForm.cmmtno.value = cmmtNo;
			cmmtUpdForm.prntno.value = prntNo;
			cmmtUpdForm.cmmtname.value = document.getElementById("pDataCmmtName"+cmmtNo).innerHTML;
			cmmtUpdForm.cmmtcheck.value = document.getElementById("pDataCmmtUrl"+cmmtNo).value;
			cmmtUpdForm.cmmtcomment.value = document.getElementById("pDataCmmtContent"+cmmtNo).innerHTML;
			cmmtUpdForm.mode.value="M";


			if(cmmtPwd != null && document.cmmtUpdForm.cmmtpwd)
				document.cmmtUpdForm.cmmtpwd.value = cmmtPwd;

			if( typeof(document.cmmtUpdForm.cmmtopen) != 'undefined' ) {
				if(parentIsLock=="Y"){
		    		document.cmmtUpdForm.cmmtopen.checked = true;
		    		document.cmmtUpdForm.cmmtopen.disabled = true;
				}else{
					document.cmmtUpdForm.cmmtopen.checked = false;
		    		document.cmmtUpdForm.cmmtopen.disabled = false;
				}
				if(cmmtUpdForm.cmmtopen)
					cmmtUpdForm.cmmtopen.checked = ((document.getElementById("pDataCmmtOpen"+cmmtNo).value == "Y")? false : true);
			}
			cmmtObj.innerHTML=profileCommentModiForm(cmmtNo,parentIsLock);
			cmmtObj.style.display = 'block';

		}else{
			cmmtObj.style.display = 'none';
			cmmtObj.innerHTML = '';
		}
		preCmmtObj = cmmtObj;
		window.setTimeout("resizeArea(document.getElementById('_comment'+" + cmmtNo + "), '60', '1000')", 10);
		resizeArea(document.getElementById("_comment"+cmmtNo), '60', '1000');
	}


	function profileShowCommentReplyForm(cmmtNo, parentIsLock, isLoginUser){
		if(preCommtHide !=null){
				preCommtHide.style.display='block';
				preCommtHide = null;
		}
		if(cmmtObj !=null){
			cmmtObj.style.display="none";
		}
		var cmmtObj = document.getElementById("pLayerCmmtReply"+cmmtNo);
		if(cmmtObj == null) return;

		if(preCmmtObj != null && preCmmtObj != cmmtObj)
		{
			if(preCmmtObj.style.display != 'none')
			{
				preCmmtObj.style.display = 'none';
				preCmmtObj.innerHTML = '';
			}
		}

		if(cmmtObj.style.display == 'none')
		{
			var cmmtReplyForm = document.cmmtReplyForm;
			if(document.cmmtReplyForm[0].prntno){
				cmmtReplyForm = cmmtReplyForm[0];
			}

			cmmtReplyForm.prntno.value = cmmtNo;
			cmmtObj.innerHTML = document.getElementById("pLayerReplyOrg").innerHTML;

			cmmtObj.style.display = 'block';
			var activeForm = daum.$$('form[name=cmmtReplyForm]', cmmtObj)[0];
			activeForm.cmmtcomment.focus();
			if(parentIsLock=="Y"){
	    		activeForm.cmmtopen.checked = true;
	    		activeForm.cmmtopen.disabled = true;
			}
			if (isLoginUser == "N") {
				daum.addEvent(activeForm.cmmtopen, "click", forceOpenWithMessage.bind(this, activeForm.cmmtopen));
			}
		}else
		{
			cmmtObj.style.display = 'none';
			cmmtObj.innerHTML = '';
		}
		preCmmtObj = cmmtObj;
	}

	function profileShowCommentDelete(cmmtNo, prntNo, cmmtPwd)
	{
		if(!confirm('삭제하시겠습니까?'))
			return;
			
		document.cmmtDelForm.cmmtno.value = cmmtNo;
		if(cmmtPwd != null && document.cmmtDelForm.cmmtpwd)
			document.cmmtDelForm.cmmtpwd.value = cmmtPwd;
		document.cmmtDelForm.submit();
	}

	function profileHasChild(cmmtNo, prntNo)
	{
		if(cmmtNo != prntNo) return false;
		if(document.getElementById("pDataCmmtPrnt"+prntNo))
			return true;
		return false;
	}

	function profileCheckComment(frmCmmt, authority, commentOpen)
	{
		if(authority=="D"){
			if(commentOpen == "B0402"){
				return false;
			}else{
	    		if(frmCmmt.cmmtname.value == "" || frmCmmt.cmmtname.value == "이름")
	    		{
	    			alert("이름을 넣어 주세요");
	        		return false;
	    		}

	    		if(frmCmmt.cmmtpwd.value == "")
	    		{
	    			alert("비밀번호를 넣어 주세요");
	        		return false;
	    		}

	    	}
		}
		if(frmCmmt.cmmtcheck.value != "" && frmCmmt.cmmtcheck.value != "블로그 또는 이메일 주소")
		{
			if(isValidEmail(frmCmmt.cmmtcheck.value)){
				frmCmmt.checkkind.value = "E";
			}else if(isValidUrl(frmCmmt.cmmtcheck.value)){
				frmCmmt.checkkind.value = "B";
			}else {
				alert("블로그 또는 이메일 주소를 올바르게 넣어 주세요");
	    		return false;
			}
		}
		if(commentOpen == "B0403"){//자체인증
	    	if(frmCmmt.cmmtcheck.value == "" || frmCmmt.cmmtcheck.value == "블로그 또는 이메일 주소")
	    	{
	    		alert("블로그 또는 이메일 주소를  넣어 주세요");
	    		return false;
	    	}
		}
		if(frmCmmt.cmmtcomment.value == "" || frmCmmt.cmmtcomment.value == "내용")
		{
			alert("내용을 넣어 주세요");
			return false;
		}
	
		if (frmCmmt.cmmtcomment.value.length > commentMaxLength) {
			alert ("댓글은 "+commentMaxLength+"자 까지 작성하실 수 있습니다.");
			return false;
		}		

		if(frmCmmt.cmmtopen && frmCmmt.cmmtopen.checked){
			frmCmmt.mr_openkind.value="N";
		}

		if(frmCmmt.cmmtexticon && frmCmmt.cmmtexticon.checked){
			frmCmmt.mr_texticon.value="Y";
		}
		 
		return true;
	}

	/*
	function isValidEmail(email) {
		var chkExp = /^\s*[\w\-\.]+\@[\w\-]+(\.[\w\-]+)+\s*$/g;
		return chkExp.test(email);
	}*/

	function isValidUrl(urls)
	{
		var chkExp = /http:\/\/([\w\-]+\.)+/g;
		return chkExp.test(urls);
	}

	var profilePrePasswdObj;
	function profileShowPasswdForm(e,cmmtno, mode, parentIsLock)
	{
		var passwdObj = document.getElementById("cLayerPwd");
		if(profilePrePasswdObj != null && profilePrePasswdObj != passwdObj)
		{
			if(profilePrePasswdObj.style.display != 'none')
				profilePrePasswdObj.style.display = 'none';
		}

		if(passwdObj.style.display == 'none')
		{
			var plinkObj = (navigator.userAgent.toLowerCase().indexOf('msie') > -1) ? window.event.srcElement : e.target;
			if(plinkObj == null) return;
			
			clickAreaCheck = true;
			var str = "<div style='background:#FFFFFF; border:1px solid #999999;' id='profilepw'><div style='margin:10px 10px 6px 10px; text-align:right;'>비밀번호를 입력해주세요.<br />";
	        str += "<input type=password id=password2 name=password2 class=box maxlength='10' style='width:139px; margin-bottom:5px;' onkeydown='clickAreaCheck = true' onfocus='clickAreaCheck = true'><br />";
	        str += "<a href=\"javascript:profileChkPasswd('" + USERINFO.blogid + "', '" + cmmtno + "', '" + mode + "', '" + parentIsLock + "');\"><img src='http://i1.daumcdn.net/pimg/blog/p_img2/btn_ok.gif' width='32' height='18' alt='확인'></a>";
	    	str += " <a href=\"javascript:;\" onclick=\"profileShowPasswdForm('" + cmmtno + "', '" + mode + "')\"><img src='http://i1.daumcdn.net/pimg/blog/p_img2/btn_cancle03.gif' width='32' height='18' alt='취소'></a><br /></div></div>";
			setNameLayersPosition(e, str);
			passwdObj.style.display = '';
		}else{
			passwdObj.style.display = 'none';
			passwdObj.innerHTML = '';
		}
	  	profilePrePasswdObj = passwdObj;
	}

	function profileChkPasswd(blogid, cmmtno, mode, parentIsLock)
	{
	  	if(document.getElementById("password2").value == "")
		{
	        alert("비밀번호를 입력해주세요!");
	        return;
	  	}
	  	var qry = "?mode=" + mode + "&blogid=" + blogid + "&cmmtno=" + cmmtno + "&cmmtpwd=" + document.getElementById("password2").value + "&parentIsLock=" + parentIsLock;
		loadXMLDoc ('GET','/_blog/ProfileCommentCheckPwd.ajax'+qry, null, "aftercheckpw", 'dummy');
	}
	function aftercheckpw(xmlhttp){
		var res = getSimpleResponse(xmlhttp);
		var tmp = document.createElement("DIV");
		tmp.innerHTML=res;
		var script = tmp.getElementsByTagName("SCRIPT");
		if(script.length>0){
			eval(script[0].innerHTML);
		}
		xmlhttp = null;
	}
	function profileDefImgResize(imgObj)
	{
		var nImg = new Image();
		nImg.src = imgObj.src;
		imgObj.width = (nImg.width > 566)? 566: nImg.width;
	}

	/** 차단하기 서비스 
function boardGoBlackListReg(blogid,count){
	frm = document.boardList;
	var jobKind = document.getElementById("jobKind_0_"+count).value;
	var blackConf = document.getElementById("blackConf_0_"+count).value;
	if(confirm("차단하시겠습니까?"))
		location.href="/_blog/BlackListRegister.do?blogid="+blogid+"&jobKind="+jobKind+"&blackKind=U0603&blackConf="+blackConf;
}
	**/
function boardGoFriendApp(count,blogid){
	frm = document.boardList;
	var friendBlogID = eval("frm.friendBlogID_"+count+".value");
	addFriend('/_blog/FriendApp.do?blogid='+blogid+'&friendBlogID='+friendBlogID);
}


function profileCommentModiForm(cno,IsLock){

		var popen = document.getElementById("profile.getCommentOpen").innerHTML;
		var frm = document.cmmtUpdForm;
		cmmtno = frm.cmmtno.value ;
		prntno =frm.prntno.value ;
		cmmtname= frm.cmmtname.value;
		cmmtcheck=frm.cmmtcheck.value;
		cmmtcomment= frm.cmmtcomment.value;
		
		var checkOptionicon;
		if (TexticonCheck.isTexticon(cmmtcomment)) {
			checkOptionicon = "checked";
		}	
		
		html='<div class="profileCommentWritefrm" style="margin:0;padding:5 0 8 0px"><div style="margin-left:0px;">';
    		if(USERINFO.islogin=="N"){
        		html+=	'<input type="text" size="15" id="_name'+cno+'" value="'+cmmtname+'" class="box" onfocus="this.value = ((this.value == \'이름\')? \'\' : this.value);" onblur="this.value = ((this.value == \'\')? \'이름\' : this.value);" /> &nbsp;';
        		html+=	'<input type="password" size="12" maxlength="10" id="_pwd'+cno+'" value="' + document.getElementById("password2").value + '" class="box" /> &nbsp;';
        		html+=	'<input type="text" id="_check'+cno+'" size="27" class="box" value="'+cmmtcheck+'" onfocus="this.value = ((this.value == \'블로그 또는 이메일 주소\')? \'\': this.value);" onblur="this.value = ((this.value == \'\')? \'블로그 또는 이메일 주소\' : this.value);" />';
    		}else{
    			html+=	'<input type="hidden" id="_name'+cno+'" value="'+cmmtname+'" /><input type="hidden" id="_check'+cno+'" value="'+cmmtcheck+'" />';
    		}
    		html+='<div style="width:100%"><textarea rows="3" name="comment" id="_comment'+cno+'" class="box" style="margin-top:3px; margin-bottom:5px;" onkeyup="resizeArea(this, \'60\', \'1000\')" onfocus="this.value = ((this.value == \'내용\')? \'\': this.value);" onblur="this.value = ((this.value == \'\')? \'내용\' : this.value);">';
    		html+=TexticonCheck.checkedComments(cmmtcomment);
    		html+='</textarea></div>';
    		html+='<div class="fl">';
			if(USERINFO.islogin=="Y"){
				if(IsLock=="Y"){
					html+='<input type="checkbox" id="_open'+cno+'" value="N" checked disabled style="vertical-align: middle; margin-bottom: 2px" >비공개';
    			}else{
	    			html+='<input type="checkbox" id="_open'+cno+'" value="N" ';
    				if(document.cmmtUpdForm.cmmtopen.checked){
		    			html+=' checked ';
		    			if(document.cmmtUpdForm.cmmtopen.disabled){
		    				html+=' disabled ';
		    			}
	    			}
	    			html+=' style="vertical-align: middle; margin-bottom: 2px" >비공개';
    			}
    				html+='<input type="checkbox" name="cmmtexticon"  id="_txticon'+cno+'" value="Y"  '+checkOptionicon+' style="vertical-align: middle; margin-bottom: 2px" />텍스티콘';
    				html+=' <a href="javascript:popUp(\"/_help/popup_texticon.html\", \"520\", \"516\")"><img src="http://i1.daumcdn.net/pimg/blog/theme/btn_question02.gif" width="12" height="11" alt="텍스티콘" style="margin-bottom: 1px; vertical-align: middle;" /></a>';
    		}
    		html+='</div><div class="fr"><a href="#" onclick="profmod('+cno+'); return false;"><img src="http://i1.daumcdn.net/pimg/blog/p_img2/btn_modify.gif" style="width:34px; height:18px" alt="수정" /></a></div></div></div><div class="clearDiv"></div>';
    		return html;
}/************* jun *****************************************/
String.prototype.chop = function() {
	return this;
}

String.prototype.nl2br = function() {
	return this.split('\n').join('<br \/>\n');
}

String.prototype.replace2 = function(find,replace) {
	return this.split(find).join(replace);
}

String.prototype.convertHtml= function() {
	return this.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;').replace('>', '&gt;');
}

String.prototype.reformHtml = function() {
	return this.replace('&amp;', '&').replace('&quot;', '"').replace('&lt;', '<').replace('&gt;', '>');
}

String.prototype.escapeForDisplay = function() {
	return this.replace('<', '&lt;');
}

String.prototype.space2nbsp = function() {
    return this.replace2('  ', ' &nbsp;');
}

String.prototype.convertHtml2 = function() {
    return this.replace2('&', '&amp;').replace2('"', '&quot;').replace2('<', '&lt;').replace2('>', '&gt;');
}

String.prototype.truncate_with_ellipses = function(chars_allowed) {
	var t = this;
	if (t.length > chars_allowed-3) {
		t = t.substr(0, chars_allowed-3)+'...'
	}
	return t;
}

String.prototype.cut = function(len, tail) 
{
	if(tail == null){tail = '...'}
    var str = this;
    var l = 0;
    var temp = '';
    for (var i=0; i<str.length; i++) 
    {
        if(escape(str.charAt(i)).toLowerCase() != '%0d'){
			l += (escape(str.charAt(i)).charAt(1) == "u")? 2 : 1;
        }
        if (l > len){
        	str = str.trim();
        	return str.substring(0,i) + tail;
        }
	}
    return str;
}

String.prototype.cutConvertedHtml = function(len, tail) 
{
    var str = this;
    var l = 0;
	var compareStr = "";
	var compareIdx = 0;
	
    for (var i=0; i<str.length; i++) 
    {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
		
        if (l > len) {
			if(compareIdx > 0){
    			compareStr = str.substring(compareIdx, compareIdx + 5);	
                if(compareStr == '&amp;')
                	return str.substring(0, compareIdx) + tail;
    				
    			compareStr = str.substring(compareIdx, compareIdx + 6);	
                if(compareStr == '&quot;')
                	return str.substring(0, compareIdx) + tail;
    
    			compareStr = str.substring(compareIdx, compareIdx + 4);					
                if(compareStr == '&lt;')
                	return str.substring(0, compareIdx) + tail;
                else if(compareStr == '&gt;')
                	return str.substring(0, compareIdx) + tail;
			}else{
            	return str.substring(0, i) + tail;
			}
		}
		
		if(str.charCodeAt(i) == 38){ //&
			compareIdx = i;
		}else if(str.charCodeAt(i) == 59){ //;
			compareIdx = -1;
		}
		  
		  
    }
    return str;
}

String.prototype.bytes = function() 
{
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++){
        if(escape(str.charAt(i)).toLowerCase() != '%0d'){
        	l += (escape(str.charAt(i)).charAt(1) == "u")? 2 : 1;
        }
    }
	return l;
}

/******Blog Common String/Number**************************************************************************************/
String.prototype.trim = function() {
	return this.replace(/^[\s\u00a0\u3000]+/,"").replace(/[\s\u00a0\u3000]+$/, "");
};

String.sSpaces = " \t\r\n"+String.fromCharCode(160);
String.prototype.trimPerfect = function() {
	var sTrs = this;
	while(sTrs.length > 0 && String.sSpaces.indexOf(sTrs.charAt(sTrs.length-1)) > -1)
		sTrs = sTrs.substring(0, sTrs.length-1);
	while(sTrs.length > 0 && String.sSpaces.indexOf(sTrs.charAt(0)) > -1)
		sTrs = sTrs.substring(1);
	return sTrs;
};

String.prototype.changeBlank = function() {
	return this.replace(String.fromCharCode(160), " ");
};

String.prototype.toNumber = function() {
	return (isNaN(this)? 0: parseInt(this));
};

String.prototype.parsePx = function() {
	if(this == null || this.length == 0)
		return 0;
	else if(this.indexOf("px") > -1)
		return this.substring(0, this.indexOf("px")).toNumber();
	else
		return this.toNumber();
};

String.prototype.toPx = function() {
	if(this.indexOf("px") > -1) {
		return this + "";
	} else {
		return this + "px";
	}
};

String.prototype.getRealLength = function() {
	var nLen = this.length;
	for(var i=0; i<this.length; i++) {
		if(escape(this.charAt(i)).charAt(1) == "u")
			nLen++;
	}
	return nLen;
};

String.prototype.calTextWidth = function() {
	var nWidth = this.length;
	for(var i=0; i<this.length; i++) {
		if(escape(this.charAt(i)).charAt(1) == "u") {
			nWidth += 2;
		} else if("|!if'\".,^()/?`".indexOf(this.charAt(i)) == -1) {
			nWidth++;
		} else {
		}
	}
	return nWidth;
}

String.prototype.cutRealLength = function(len) {
    var str = this;
    var idx = 0;
    for (var i=0; i<str.length; i++) {
        idx += (escape(str.charAt(i)).charAt(1) == "u")? 2 : 1;
        if(idx > len) {return str.substring(0, i);}
    }
    return str;
}

String.prototype.replaceAll = function(sFrom, sTo) { 
	return this.replace(new RegExp(sFrom, "g"), sTo); 
};

String.prototype.paddingZero = function(nLen) {
	var sStr = "";
	var nMax = Math.min(nLen, this.length);
	for(var i=0; i<nMax; i++) {
		sStr.concat("0");
	}
	return sStr.concat(this);
}

Number.prototype.toPx = function() {
	return this.toString() + "px";
};

Number.prototype.parsePx = function() {
	return this;
};

Number.prototype.toNumber = function() {
	return this;
};

/******Blog Common Array**************************************************************************************/
Array.prototype.shiftElement = function() {
	if(this.length == 0) return;
    for(var i=0; i<this.length-1; i++)
      this[i] = this[i+1];
    this.length--;
};

Array.prototype.last = function() {
	return this[this.length-1];
};

Array.prototype.isEmpty = function() {
	return (this.length == 0);
};

 /***Blog Append*******************************************************************************************************/
 if (!window.Element) var Element = new Object();
  Element.selectChild = function(element, tagname, classname) {
    if(!(element = element.firstChild)) return null;
    while(element && (element.nodeType != 1 || element.tagName.toLowerCase() != tagname || (classname != null && element.className.indexOf(classname) < 0))) element = element.nextSibling;
    if(element && element.nodeType == 1 && element.tagName.toLowerCase() == tagname && (classname == null || element.className.indexOf(classname) > -1)) return element;
    return null;
  }

  Element.selectSibling = function(element, tagname, classname) {
	if(!(element = element.nextSibling)) return null;
    while(element && (element.nodeType != 1 || element.tagName.toLowerCase() != tagname || (classname != null && element.className.indexOf(classname) < 0))) element = element.nextSibling;
    if(element && element.nodeType == 1 && element.tagName.toLowerCase() == tagname && (classname == null || element.className.indexOf(classname) > -1)) return element;
    return null;
  }

  Element.selectDescendants = function(element, tagname, classname) {
  	if (typeof element == "undefined" || !element) return [];
	var descendants = new Array();
	var alldescendants = element.getElementsByTagName(tagname);
	for(var i=0; i<alldescendants.length; i++) {
		if(classname == null || alldescendants[i].className.indexOf(classname) > -1) {
			descendants.push(alldescendants[i]);
		}
	}
	return descendants;
  }

if(typeof(HTMLElement) != "undefined") {
	try{
		HTMLElement.prototype.innerText;
		HTMLElement.prototype.__defineSetter__("innerText", function(sText) {
			this.textContent = sText;
		});
		HTMLElement.prototype.__defineGetter__("innerText", function() {
			try{
				return this.textContent;
			}catch(e){
				return "";
			}
		});		
	}catch(e){}
}if (typeof Blog === 'undefined') Blog = {};
Blog.AlimiManager = {
	applyMessage: { Y: "수락", N: "거부" , V: "삭제" },
	applyMode: "",
	lastPage: 1,
	currentPage: 1,
	articleTemplate: new daum.Template('<li class="box_thumb #{thread}" id="#{threadid}">#{profile}#{photo}<div class="cont"><div class="f_l"></div><div class="tit"><a class="link_tit" removeid="#{removeid}" target="_blank" href="#{link}">#{title}</a></div><div class="desc"><a class="link_desc" removeid="#{removeid}" target="_blank" href="#{link}">#{content}</a></div><div class="info"><a class="append user" target="_blank" href="#{bloglink}">#{nickname}</a><span class="txt_bar"> | </span><span class="append day">#{date}</span>#{child}<div class="cl_b"></div></div></div></div></li>'),
	noticeTemplate: new daum.Template('<li #{isFirst} id="n_#{id}"><div class="line_dotted"></div><div class="inner">#{notice}</div><a class="btn_delete" href="#" onclick="Blog.AlimiManager.deleteNotice(event, \'#{type}\', #{id});">삭제</a></li>'),
	friendTemplate: new daum.Template('<li id="wrapFriend_#{id}"><a target="_blank" class="thumb" href="#{link}" #{click} onmouseover="showGlobalLayer(this, \'updatedFriend_#{id}\', event);" onmouseout="hideGlobalLayer()"><img width="50" height="50" src="#{thumbnail}" alt="#{title}" /><span class="frame"></span></a><a class="txt" #{click} href="#{link}">#{nickname}</a><div id="updatedFriend_#{id}" class="wrap_update_friend"><div class="lay_update_friend"><p class="cont"><a href="#{link}" target="_blank">#{fullnickname}</a></p></div></div></li>'),
	requestTemplate: new daum.Template('<li class="#{rPadding}"><div class="info"><a href="/_blog/notification/redirectBlogURL.do?blogid=#{friendId}&ntyp=a" target="_blank" class="txt"><strong>#{nickname}</strong>님이 친구신청을 보냈습니다.</a><span class="data">#{date}</span></div><div class="btn"><a class="link" onclick="javascript:Blog.AlimiManager.decideRequest(\'#{friendId}\', \'Y\');return false;" href="#">수락</a><span class="txt_bar">|</span><a class="link" onclick="javascript:Blog.AlimiManager.decideRequest(\'#{friendId}\', \'N\');return false;" href="#">거부</a><span class="txt_bar">|</span><a class="btn_delete" href="#" onclick="Blog.AlimiManager.deleteRequest(\'#{friendId}\');return false;">삭제</a></div></li>'),
	init: function(lastId_All, isLastPage_All, lastId_Article, isLastPage_Article, blogid, lastDate_Friend, alimi_type, moreFriend){
		BlogUtil.Dwr.load("Notification");
		BlogUtil.Dwr.load("FriendAdmin");
		this.articles = daum.$("AlimiMore_All");
		this.blogid = blogid;
		this.lastId_All = lastId_All;
		this.isLastPage_All = isLastPage_All;
		this.lastId_Article = lastId_Article;
		this.isLastPage_Article = isLastPage_Article;
		this.lastDate_Friend = lastDate_Friend; // 업데이트 친구
		if(alimi_type == "type1"){
			this.alimi_width = -840;
			this.friendSize = 12;
		}else if(alimi_type == "type2"){
			this.alimi_width = -700;
			this.friendSize = 10;
		}else if(alimi_type == "type3"){
			this.alimi_width = -512;
			this.friendSize = 8;
		}
		this.friendWrap = daum.$("updatedfriendList");
		this.moreFriend = moreFriend; // 더 이상 호출을 안 한다.
		this.totalPage = moreFriend ? -1 : 1; // 지금이 마지막 페이지이다. - (업데이트된 친구) 지금 로딩된 페이지 중 마지막 페이지인가
		this.friendPrevBtn = daum.$("updateFriendPrevBtn");
		this.friendNextBtn = daum.$("updateFriendNextBtn");
		
		// init events
		daum.Event.addEvent(daum.$("noticeTabBtn"), "click", this.getNoticeTab.bind(this));
		daum.Event.addEvent(daum.$("articleTabBtn"), "click", this.getArticleTab.bind(this));
		daum.Event.addEvent(daum.$("checkBlogChange"), "click", this.setIncludeBlogChange.bind(this));
		daum.Event.addEvent(daum.$("checkNewArticle"), "click", this.setIncludeNew.bind(this));
		daum.Event.addEvent(daum.$("alimiArticleList"), "click", function(ev){
			//daum.Event.stopEvent(ev);
			var el = daum.Event.getElement(ev);
			if(el.getAttribute("removeid")){
				var id = el.getAttribute("removeid");
				var ids = id.split("_");
				if(ids.length == 3){
					var article_id = ids[1];
					Notification.deleteNotification("T1N", article_id, Blog.AlimiManager.lastId_Article, function(data){
						if(data.isDeleteSuccess) {
							Blog.AlimiManager.deleteArticle(id);
							return true;
						}
					});
				}
			}
		});
	},
	setIncludeBlogChange: function(){
		var isChecked = daum.$("checkBlogChange").checked ? "Y" : "N";
		Notification.setIncludeBlogChange(this.blogid, isChecked, function(data){
			isChecked == "Y" ? alert("친구 블로그 변경 알림 받기가 설정되었습니다.") : alert("친구 블로그 변경 알림 받기가 해제되었습니다.");
			Blog.AlimiManager.refresh();
		});
	},
	setIncludeNew: function(){
		var isChecked = daum.$("checkNewArticle").checked ? "Y" : "N";
		Notification.setIncludeNewPost(this.blogid, isChecked, function(data){
			isChecked == "Y" ? alert("친구 새글 알림 받기가 설정되었습니다.\n미니다음에서 친구 새글 알림도 확인하실 수 있으며,\n프로필 알림으로도 친구 새글 알림이 보내집니다.") : alert("친구 새글 알림 받기가 해제되었습니다.\n미니다음에서 기본 알림만 보여지며,\n프로필 알림에 친구 새글 알림을 보내지 않습니다.");
		});
	},
	getNotiLen: function(){
		return daum.$$("#alimiAllList li").length;
	},
	getRequestLen: function(){
		return daum.$$("#requestList li").length;
	},

	/*
	 * 알림 가져오기 호출  - 알림 탭 클릭시
	 */
	getNoticeTab: function() {
		if(daum.Element.hasClassName(daum.$("myAlimi"), "alimi_article")){
			daum.Element.replaceClassName(daum.$("myAlimi"), "alimi_article", "alimi_notice");
			this.getNotice(false);
		}
		this.reportClick("d");
		return false;
	},
	
	/*
	 * 알림 가져오기 - 더보기 버튼 클릭시 or 새로고침 클릭시
	 */
	getNotice: function(isMore){
		try { //버튼이 딤드시 더이상 호출 안되도록 수정
			if(!isMore || daum.Element.visible(daum.$("wrapMoreNoticeBtn"))){
				var lastId = isMore ? this.lastId_All : '';
				Notification.getNotificationAllList(this.blogid, lastId, false, this.appendAllList.bind(this, isMore));
				BlogUtil.Action.reportKoreanClick("http://blog.daum.net/_blog/notificationArticleList.do?blogid=" + this.blogid  + "&dummy=" + this.getDummy());
				if(isMore){
					this.reportClick("f");
				}
			}
		} catch(e) {
			console.error(e);
		}
	},
	getArticleTab: function(){
		if(daum.Element.hasClassName(daum.$("myAlimi"), "alimi_notice")){
			daum.Element.replaceClassName(daum.$("myAlimi"), "alimi_notice", "alimi_article");
			this.getArticle(false);
		}
		this.reportClick("h");
		return false;
	},
	getArticle: function(isMore){
		try{ //버튼이 딤드시 더이상 호출 안되도록 수정
			if(!isMore || daum.Element.visible(daum.$("wrapMoreArticleBtn"))){
				var lastId = isMore ? this.lastId_Article : "";
				Notification.getNotificationArticleList(this.blogid, lastId, this.appendArticleList.bind(this, isMore));
				BlogUtil.Action.reportKoreanClick("http://blog.daum.net/_blog/notificationArticleList.do?blogid=" + this.blogid + "&dummy=" + this.getDummy());
				if(isMore){
					this.reportClick("j");
				}
			}
		}catch(e){
			console.error(e);
		}
	},
	refresh: function(){ // 새로고침 클릭시
		if(daum.Element.hasClassName(daum.$("myAlimi"), "alimi_notice")){ // 알림 새로고침
			this.getNotice(false); // 알림을 새로 가져오고
			FriendAdmin.friendViewList(this.blogid, this.getRequest.bind(this)); // 친구신청, 새로고침의 경우에 알림 유무에 대한 처리는 친구신청에서 최종적으로 처리할 수 있다.
		}else{ // 새글 새로고칩
			this.getArticle(false); // 새글을 새로 가져온다
		}
	},
	/*업데이트 친구*/
	prevFriend: function(){ // 이전 업데이트 친구 클릭
		if(this.currentPage != 1){ // 지금이 1이 아니면, 이전이 있다는 말이고
			this.currentPage--;
			this.move(this.currentPage);
		}
	},
	nextFriend: function(){ // 다음 업데이트 친구 클릭
		if(this.moreFriend) {
			if (this.lastPage === this.currentPage){ // 친구가 더 있고(벨로시티에서 넘어온값), 지금이 로딩된 마지막 페이지인경우 dwr 호출 
				Notification.getFriendList(this.blogid, this.lastDate_Friend, this.friendSize, this.appendFriendList.bind(this));
			} else {
				this.currentPage++;
				this.move(this.currentPage);
			}
		} else {
			if (this.totalPage !== this.currentPage) {
				this.currentPage++;
				this.move(this.currentPage);
			}
		}
	},
	/*알림 탭*/
	makeFriendObject: function(friend){
		return (friend.blogregdt === "WITHDRAWAL") ? {
							id: friend.blogid,
							link: "",
							click: "onclick=\"Blog.AlimiManager.removeFriend(\'" + friend.blogid + "\'); return false;\"",
							title: "폐쇄한 블로그입니다.",
							thumbnail: "http://i1.daumcdn.net/pimg/blog4/admin/img_sum1.gif",
							nickname: friend.nickname,
							fullnickname: "폐쇄한 블로그입니다."
						} : {
							id: friend.blogid,
							link: "http://blog.daum.net/" + friend.blogname,
							click: "",
							title: friend.blogtitle,
							thumbnail: (friend.profileImagePath && friend.profileImagePath.indexOf("basic_profile_ex_img.gif") == -1) ? friend.profileImagePath : "http://i1.daumcdn.net/pimg/blog4/admin/img_sum1.gif",
							nickname: daum.String.cutString(friend.nickname, 7),
							fullnickname: friend.nickname
					}
	},
	appendFriendList: function(data){
		var frag = document.createDocumentFragment();
		var len = data.length; 
		if(len != 0){ // 데이터 넘어온게 있으면,
			for(var i = 0; i<this.friendSize; i++){
				if(len > i){
					var friend = data[i];
					frag.appendChild(this.friendTemplate.toElement(this.makeFriendObject(friend)));
				}else{
					frag.appendChild(daum.createElement('<li class="no_update_friend"><span class="thumb"><span class="frame"></span></span></li>'));
				}
			}
			
			// 업데이트 친구 목록 ul의 width를 잡아준다.
			this.friendWrap.style.width = -(this.currentPage+1) * this.alimi_width + "px";
			daum.$("updatedfriendList").appendChild(frag);
			
			this.lastPage = ++this.currentPage;
			
			// 데이터가 꽉차서 넘어 오지 않은 경우 이것이 마지막 페이지이므로 더 이상 호출하지 않는다.
			if(len != this.friendSize){
				this.moreFriend = false;
				this.totalPage = this.lastPage; // 이게 진짜 마지막 페이지
			}
			this.lastDate_Friend = (friend && friend.friendarticlelastdt) ? friend.friendarticlelastdt : ""; // 마지막 업데이트 친구의 업데이트 날짜
			this.move(this.currentPage);
			
		}else{
			this.moreFriend = false; // 데이터가 넘어온게 없는 경우에는 이제 더 이상 호출하지 않는다.
			this.totalPage = this.lastPage; // 이제야 비로소 마지막 페이지인걸 알수 있고,
			this.move(this.currentPage);
		}
	},
	removeFriend: function(friendId){
		if(confirm("폐쇄된 블로그입니다.\n친구 목록에서 삭제하시겠습니까?")){
			FriendAdmin.endFriend(this.blogid, friendId, this.getRemoveFriendResult.bind(this, friendId));
		}
	},
	getRemoveFriendResult: function(friendId, r){
		// 값 세팅, 페이지 호출
		var el = daum.$("wrapFriend_" + friendId);
		if(r == "ADMIN_FAIL"){
			alert("친구 신청 실패 하였습니다. 잠시후 다시 시도해주세요.");
		}else if(r == "ADMIN_SAVE"){
			//클릭한 친구 하나 지우고,
			el.parentNode.removeChild(el);
			// 불러야 하는 경우에만
			if(this.moreFriend){
				Notification.getFriendList(this.blogid, this.lastDate_Friend, 1, this.appendFriendOne.bind(this));
			}else{
				this.appendFriendOne();
			}
		}
	},
	appendFriendOne: function(list){
	// 없는경우 [] 로 온다.
		var el; 
		if(list && list.length != 0){
			var friend = list[0];
			el = this.friendTemplate.toElement(this.makeFriendObject(friend));
			this.lastDate_Friend = friend.friendarticlelastdt;
		}else{ // 없는 경우에는 moreFriend = false 등의 설정을 해줘야함
			el = daum.createElement('<li class="no_update_friend"><span class="thumb"><span class="frame"></span></span></li>');
			this.moreFriend = false;
			this.totalPage = this.lastPage;
		}
		
		daum.$("updatedfriendList").appendChild(el);
		this.move(this.currentPage);
	},
	move: function(page){
		this.friendWrap.style.marginLeft = (page - 1) * this.alimi_width + "px"; //left 밀어주기
		daum.Element[page === 1 ? "addClassName" : "removeClassName"](this.friendPrevBtn, "btn_prev_dimmed");
		daum.Element[!this.moreFriend && page === this.totalPage ? "addClassName" : "removeClassName"](this.friendNextBtn, "btn_next_dimmed");
	},
	appendAllList: function(isMore, data){ // 알림 탭 - 알림 삭제 호출의 콜백으로(데이터 한개), 더보기/탭이동/새로고침 할때 알림 가져오기 호출의 콜백으로(데이터 여러개)
		this.isLastPage_All = data.isLastPage;
		this.lastId_All = data.lastObjectId;
		var li  = daum.$$("#alimiAllList li");
		
		if(!li || li.length == 0){
			isMore = false;
		}
		
		var noticeList = data.noti;
		if(noticeList && noticeList.length != 0){
			var frag = document.createDocumentFragment();
			for(var i=0, len=noticeList.length ; i<len ; i++){
				var noti = noticeList[i];
				frag.appendChild(this.noticeTemplate.toElement({
					isFirst: (!isMore && i == 0) ? 'class="fst"' : '',
					notice: noti.replaceContent,
					type: noti.type,
					id: noti._id
				}));
			}
			if(!isMore){
				$("alimiAllList").innerHTML = "";
			}
			$("alimiAllList").appendChild(frag);
		}
		this.setAllPanelMsg();
	},
	// 알림 영역의 display 세팅
	setAllPanelMsg: function(){
		var notiLen = this.getNotiLen();
		var requestLen = this.getRequestLen();
		if(notiLen == 0){
			 // 알림이 없는 경우로, list_impartment, box_moreadd를 display none 시키쟈
			daum.Element.hide(daum.$("alimiAllList"));
			daum.Element.hide(daum.$("wrapMoreNoticeBtn"));
		}else{
			daum.Element.show(daum.$("alimiAllList"));
			daum.Element[this.isLastPage_All ? 'hide' : 'show'](daum.$("wrapMoreNoticeBtn"));
			daum.Element.hide(daum.$("wrapNoNoticeTab"));
		}

		if(requestLen == 0){
			daum.Element.hide(daum.$("wrapRequest"));
		}else{
			daum.Element.show(daum.$("wrapRequest"));
			daum.Element.hide(daum.$("wrapNoNoticeTab"));
		}
		
		if(requestLen == 0 && notiLen == 0){
			daum.Element.show(daum.$("wrapNoNoticeTab"));
		}
		
	},
	/*새글 탭*/
	appendArticleList: function(isMore, data){
		this.isLastPage_Article = data.isLastPage;
		this.lastId_Article = data.lastObjectId;
		var parent, wrap, childFrag;
		var articleList = data.noti,
			isClosed = data.isClosed,
			childCount = data.childCount,
			parentFrag = document.createDocumentFragment(),
			childFrag = document.createDocumentFragment();

		var li = null; 
		var thread = "";
		var threadId = ""; // 이게 사실 id임
		var removeId = "";
		var parentId = "";
		
		for(var i=0, len=articleList.length ; i<len ; i++){
			var article = articleList[i];
			
			// 이전에 모아두었던 자식 글들을 처리해 준다. 지금글부터 새로 시작될거니깐! 지금글부터 새로 안 시작하는거면 CLOSE가 아닌데, 그럼 또 child니깐 밑에서 그리고 ul이 null 인 경우는 브라우저가 미치지 않고서야 없겠지
			if (article.openTag === 'CLOSE' && ul !== null) {
				ul.appendChild(childFrag);
				childFrag = document.createDocumentFragment();
			}
			thread = article.parent ? "" : "thread";
			if(article.parent){
				parentId = "l_" + article._id + "_" + article.actionBlogId;
			}
			threadId = "b_" + article._id + "_" + article.actionBlogId;
			removeId = (article.childCount > 0 || thread != "") ? threadId : parentId;
			 
			// 새로운 글 생성
			var articleFrag = this.articleTemplate.toElement({
				thread: thread,
				removeid: removeId,
				threadid: threadId,
				profile: '<div class="thumb_photo"><a class="thumb" target="_blank" href="/_blog/notification/redirectBlogURL.do?blogid=' + article.actionBlogId + '"><span class="inner"><img class="thmub_img" width="40" height="40" src="' + ((article.profileImagePath && article.profileImagePath.indexOf("basic_profile_ex_img.gif") == -1 )? article.profileImagePath : 'http://i1.daumcdn.net/pimg/blog4/admin/img_sum1.gif') + '" alt="' + article.actionNickname + '" /><span class="frame"></span></span></a></div>',
				photo: article.articleImage ? '<div class="thumb_append"><a class="thumb" target="_blank" href="' + article.link + '"><span class="inner"><img class="thmub_img" width="115" height="86" removeid="' + removeId + '" src="' + article.articleImage + '" alt="' + article.content1 + '" onerror="Blog.AlimiManager.removeImageNode(this);return false;"><span class="frame" removeid="' + removeId + '"></span></span></a></div>' : '',
				bloglink: '/_blog/notification/redirectBlogURL.do?blogid=' + article.actionBlogId + '&ntyp=w',
				nickname: article.actionNickname,
				link: article.link,
				title: article.content1,
				content: article.content2,
				date: article.regdateStr,
				child: (article.childCount > 0 || thread != "") ? '<span class="append num point">이외 ' + article.childCount + '개의 글</span>'+
						'<a class="append onoff point btn_show btn_action"  href="#' + parentId + '" onclick="Blog.AlimiManager.showChildArticles(this);return false;">더보기&nbsp;<span class="arr point">▼</span></a>'+
						'<a class="append onoff point btn_hide btn_action" href="#' + parentId + '" onclick="Blog.AlimiManager.hideChildArticles(this);return false;">접기&nbsp;<span class="arr point">▲</span></a>' : ''
			});
			
			// 그룹에서 최상위 글일때는 li밑에 ul을 하나 붙이고, 이제 ul에 저거 만든거 li 붙인다. 그리고 이 li들을 parentChild에 차곡차곡 모읍시다.
			if (article.parent) {
				var li = daum.createElement('<li id="' + parentId + '"' + (!isMore && i == 0 ? ' class="fst"' : '') + '><div class="line_dotted"></div></li>');
				var ul = daum.createElement('<ul></ul>');
				ul.appendChild(articleFrag);
				li.appendChild(ul);
				parentFrag.appendChild(li);
			} else { // 차곡차곡 모은다.
				childFrag.appendChild(articleFrag);
			}
		}
		// 마지막 자식글 처리
		if (ul != null) { // 없을리가 없음
			ul.appendChild(childFrag);
			childFrag = document.createDocumentFragment();
		}
		
		if(!isMore){
			$("alimiArticleList").innerHTML = "";
		}
		$("alimiArticleList").appendChild(parentFrag);

		if(daum.$$("#alimiArticleList li").length == 0){
			 // 알림이 없는 경우로, list_impartment, box_moreadd를 display none 시키쟈
			daum.Element.hide(daum.$("alimiArticleList"));
			daum.Element.hide(daum.$("wrapMoreArticleBtn"));
			daum.Element.show(daum.$("wrapNoArticleTab"));
		}else{
			daum.Element.show(daum.$("alimiArticleList"));
			daum.Element.show(daum.$("wrapMoreArticleBtn"));
			daum.Element.hide(daum.$("wrapNoArticleTab"));
		}

		daum.Element[this.isLastPage_Article ? 'hide' : 'show'](daum.$("wrapMoreArticleBtn"));
	},
	toggleChildArticles: function(el, show){
		try{
			var href = el.href;
			var id = href.substring(href.indexOf("#") + 1);
			daum.Element[show ? "addClassName" : "removeClassName"](daum.$(id), "showChild");
		}catch(e){
			console.error(e);
		}
	},
	showChildArticles: function(el){
		this.toggleChildArticles(el, true);
	},
	hideChildArticles: function(el){
		this.toggleChildArticles(el, false);
	},
	deleteArticle: function(id){
		var wrap = daum.$(id);
		var prefix_plural = "b_";
		var prefix_single = "l_";
		
		if(id.indexOf(prefix_single) != -1){
			// 지우고 fst 클래스명
			var isFstLi = daum.Element.hasClassName(wrap, "fst");
			// 첫번째 경우
			daum.$("alimiArticleList").removeChild(wrap);
		}else if(id.indexOf(prefix_plural) != -1){ // 글이 여러개 있는 경우
			// 두번째, 세번째 경우 (div 인 경우)
			// 일단 지움
			// parent는 ul이다
			var parent = wrap.parentNode;
			if(!parent || !parent.parentNode){
				return;
			}
			var isFstLi = daum.Element.hasClassName(parent.parentNode, "fst"); // 자기가 속한 li가 fst 클래스를 가지고 있는지 확인
			var isThread = daum.Element.hasClassName(wrap, "thread"); // true/false 지우려는, div가 접힌글인지 확인
			parent.removeChild(wrap); // 어쨌든 지운다
			var wraps = daum.$$('li.box_thumb', parent); // 지금 몇개 남았는지 확인, 이외에 x개의 글
			// div를 가져와서 하나만 있으면 thread 지우고, 하나도 없으면
			//wraps가 null 일때는 어떻게 해야하지? li를 완전히 지워야 하는거 아닌가?
			if(!wraps || wraps.length == 0){
				daum.$("alimiArticleList").removeChild(parent.parentNode);
			}else if(wraps.length == 1 || !isThread){
				daum.Element.removeClassName(wraps[0], "thread");
			}
			
			if(wraps.length > 1){
				var num = wraps.length - 1;
				var numEl = daum.$$(".num", wraps[0]);
				if(!numEl){
					return;
				}
				numEl[0].innerHTML = "이외 " + num.toString() + "개의 글";
			}else if(wraps.length == 1 && parent){
				daum.Element.addClassName(parent, "solo_article");
			}
		}else{
			return;
		}
		
		var list = daum.$("alimiArticleList");
		var firstChild = daum.Element.getFirstChild(list);
		
		if (firstChild && isFstLi) {
			daum.Element.addClassName(firstChild, "fst");
		} else if (!firstChild){
			this.refresh();
		}
	},
	deleteNotice: function(event, type, id){ // 알림 하나 삭제
		var self = this;
		Notification.deleteNotification(type, id, this.lastId_All, function(data){
			if(data.isDeleteSuccess){ // isDeleteSuccess 하나 삭제 완료
				var delNode = daum.$("n_" + id);
				var nextNode = daum.Element.getNext(delNode);
				if(daum.Element.hasClassName(delNode, "fst") && nextNode && nextNode.tagName.toLowerCase() == "li"){ 
					daum.Element.addClassName(nextNode, "fst");
				}
				$("alimiAllList").removeChild(delNode);
				self.appendAllList(true, data);
			}else{
				alert("삭제실패");
			}
		});
		this.reportClick(type);
		return;
	},
	/*친구 신청*/
	decideRequest: function(friend, applyMode){  // 수락/거부
		if (confirm("선택한 블로그의 친구신청을 " + this.applyMessage[applyMode] + "하시겠습니까?")) {
			this.applyMode = applyMode;
			FriendAdmin.agreeCalledFriend(this.blogid, friend, this.applyMode, this.getRequestResult.bind(this));
		}
		if(applyMode == "Y"){
			this.reportClick("b");
		}else{
			this.reportClick("c");
		}
	},
	deleteRequest: function(friend){ // 삭제
		this.applyMode = "V";
		FriendAdmin.deleteFriendViewList(this.blogid, friend, this.getRequestResult.bind(this));
	},	
	getRequest: function(data){ // 뒤로 없으면 아예 안옴
		var d = [];
		if (data && data.friendList) {
			d = data.friendList.slice(0,6);
		}
		this.generateRequest(d);
		this.setAllPanelMsg();
		if(data.friendList && data.friendList.length < 7){
			daum.Element.hide(daum.$("btnViewAllRequest"));
		}else{
			daum.Element.show(daum.$("btnViewAllRequest"));
		}
	},
	generateRequest: function(fl){
		var frag = document.createDocumentFragment();
		for(var i = 0, len = fl.length; i < len; i ++){
			var f = fl[i];
			var newRequest = this.requestTemplate.toElement({
				rPadding: (i % 2 == 0) ? "mg_right45" : "",
				nickname: f.friendName,
				date: f.friendRegDt,
				friendId: f.friendBlogID
			});
			frag.appendChild(newRequest);
		}
		daum.$("requestList").innerHTML = "";
		daum.$("requestList").appendChild(frag);
	},
	getRequestResult: function(data){ // 수락/거부와 삭제의 dwr 호출은 다르지만 콜백은 같은 동작을 하므로
		if(data.result=="ADMIN_SAVE"){
			alert(this.applyMessage[this.applyMode] + " 완료 되었습니다.");
			this.getRequest(data);
		}else if(data.result=="ADMIN_DELETE"){
			this.getRequest(data);
		}else{
			alert(this.applyMessage[this.applyMode]+" 실패 하였습니다.");
		}
	},
	reportClick: function(tag){
		var img = new Image(1, 1);
		img.src = "http://blog.daum.net/UX-JS_2008/1x1.png?ntyp=" + tag + "&dummy=" + this.getDummy();
	},
	getDummy: function() {
	    return new Date().getTime() + Math.ceil(Math.random() * 2147483647);
	},
	removeImageNode: function(el){
		if(el && el.parentNode && el.parentNode.parentNode && el.parentNode.parentNode.parentNode){
			var wrap = el.parentNode.parentNode.parentNode;
			wrap.parentNode.removeChild(wrap);
		}
	}
};