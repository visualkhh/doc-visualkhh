
/******View Page Function**************************************************************************************/
//Not Use But No Error
function GoDaumSearchForMovie(oQuery) {
	var ie = (document.all ? true : false);
	var sQuery = (ie)? encodeURI(oQuery.innerText) : oQuery.textContent;
	window.open("http://search.daum.net/cgi-bin/nsp/search.cgi?nil_profile=g&nil_Search=sugtop&sw=tot&q="+sQuery);
}

function GoDaumSearch(oQuery) {
	var ie = (document.all ? true : false);
	var sQuery = (ie)? encodeURI(oQuery.innerText) : oQuery.textContent;
	window.open("http://search.daum.net/cgi-bin/nsp/search.cgi?nil_profile=g&nil_Search=sugtop&sw=tot&q="+sQuery);
}

function GoMovieInfo(sCode) {
	window.open("http://movie.daum.net/movieInfo?mkey="+sCode);
}

function GoBookInfo(sCode) {
	window.open("http://book.daum.net/bookdetail/book.do?bookid="+sCode+"&viewType=desc");
}

function GoBookBuy(sCode) {
	window.open("http://daum.kyobobook.co.kr/cart/cartAdd.laf?barcode="+sCode.substring(3,sCode.length())+"&ejkGb="+sCode.substring(0,3)+"&qty=1");
}

function GoBestSellerAtBook(sUrl) {
	window.open(sUrl);
}
function GoTVInfo(sUrl) {
	window.open(sUrl);
}

function GoShoppingInfo(sCode) {
	window.open("http://shopping.daum.net/product/productdetail.daum?productid="+sCode+"&viewType=desc");
}

function GoOthersAtShopping(sUrl) {
	window.open(sUrl);
}

function GoBuyAtShopping(sUrl) {
	window.open(sUrl);
}

function realImgView(img) {
	PhotoImagePopup(BLOGID,img);
}

function PhotoImagePopup(blogid,imageurl) {
	imageurl = imageurl.replace("/image/", "/original/");
	var winObj = window.open("/_blog/photoImage.do?blogid="+blogid+"&imgurl="+imageurl, "b_img_viewer", "width=800px, height=744px, resizable=yes, scrollbars=yes");
	winObj.focus();
}

//첨부파일 미리보기
function fileFilterViewer_dc	(filePath, fileUrl, fileKeyno,  blogidu, articleno) {
	var url = "http://dc.cafe.daum.net/filefilter.html?u=";
	var blogurl = "http://blog.daum.net/_blog/filefilterViewer.do?filePath="+filePath;
	blogurl = blogurl  + "&fileUrl="+fileUrl;
	blogurl = blogurl  + "&fileKeyno="+fileKeyno;
	blogurl = blogurl  + "&blogid="+blogidu;	
	blogurl = blogurl  + "&articleno="+articleno;
	var winObjs = window.open(url+escape(blogurl), "filefilter_viewer", "scrollbars=0,status=0");
	winObjs.focus();	
}

function ShowOrgImage(oImg) {
	PhotoImagePopup(BLOGID, oImg.src);
}

function toggleMoreLess(obj) {
	var _elWrap = obj.parentNode.parentNode;
	if(!_elWrap.className) {
		return;
	}
	if(_elWrap.className.indexOf("txc-moreless-spread") > -1) {
		_elWrap.className = 'txc-moreless';
	} else {
		_elWrap.className = 'txc-moreless-spread';
	}
	var no = null;
	if(typeof contents_article_no != 'undefined' && parent.document.getElementById('if_b_' + contents_article_no)){
		no = contents_article_no;
	}else if(typeof articleno != 'undefined' && parent.document.getElementById('if_b_' + articleno)){
		no = articleno;
	}
	if(no != null){
		if(document.all){
			setTimeout(function() { parent.document.getElementById('if_b_' + no).style.height = document.body.scrollHeight + 'px'; }, 10);
		}
		else{
			parent.document.getElementById('if_b_' + no).style.height = document.body.offsetHeight + 'px';
		}
	}
}

function showFootnote(elLink){
	var temp = document.getElementById(elLink.id.replace(/footnote_link_/, "footnote_box_")).innerHTML;
	var tDiv = parent.document.getElementById('footnoteBox');
	tDiv.innerHTML = '<div class=\"txc-footnote-box\">' + temp + '<\/div>';
	tDiv.style.display = 'block';
	var contId = 'div_' + elLink.id.split("_")[2];
	contId = parent.document.getElementById(contId);
	tDiv.style.top = (parent.getAbsoluteTop(elLink) + parent.getAbsoluteTop(contId)) + 5 + 'px';
	tDiv.style.left = (parent.getAbsoluteLeft(elLink) + parent.getAbsoluteLeft(contId)) + 10 + 'px';
}

function hideFootnote(elLink){
	if(!elLink.id || elLink.id.indexOf("footnote_link_") < 0) {
		return;
	}
	var _elBox = parent.document.getElementById('footnoteBox');
	if(!_elBox) {
		return;
	}
    _elBox.style.display = "none";
}

function getAbsolutePos(node){
	var _top = 0, _left = 0;
	while(node != null && (node.tagName.toUpperCase()!="BODY" || node.tagName.toUpperCase()!="HTML")) {
		_top += node.offsetTop;
		_left += node.offsetLeft;
		node = node.offsetParent;
	}
	return { top: _top, left: _left };
}

var UI = {};
UI.toolTip = function(){}

function goThemeLink() {
	this.target = "_blank";
	return true;
}

function blockContent(e){
	if(e.type=="keydown"){
		if((!e.ctrlKey && !e.metaKey) || (e.keyCode != 65 && e.keyCode != 97 && e.keyCode != 67 && e.keyCode != 99)){	
			return;	
		}
	}
	var myformtags=["input", "textarea", "select", "embed", "object"];
	var e = window.event || e;
	var el = e.srcElement || e.target;
	if(el.nodeType != 1) return;
	var tagName = el.tagName.toLowerCase();
	for(var i=myformtags.length-1;i>=0;i--){
		if(myformtags[i]==tagName) return;
	}
	if(e.type == "contextmenu"){
		alert("마우스 우클릭을 허용하지 않는 블로그입니다.\n소중한 저작권을 보호해 주세요.");
	}
	if(e.preventDefault){ e.preventDefault(); }
	if(e.stopPropagation){ e.stopPropagation(); }
	e.returnValue=false;
	e.cancelBubble=true;
}

function previewEbook(blogid, bookno){
	var winObj = window.open("/_blog/EbookPreview.do?blogid="+blogid+"&bookno="+bookno, "ebook_viewer", "width=638, height=780, resizable=yes, scrollbars=yes");
	winObj.focus();
}

function downEbook(blogid, bookno, e){
	var uaLower = navigator.userAgent.toLowerCase();
	var isIOS = (uaLower.indexOf("iphone")!=-1 || uaLower.indexOf("ipod")!=-1 || uaLower.indexOf("ipad")!=-1) && (uaLower.indexOf("applewebkit")!=-1);
	if(!isIOS){
		var ev = e || window.event;			 
		if(ev.stopPropagation){ev.preventDefault();}
		else {ev.returnValue = false;}
		location.href = "/_blog/ebookDownload.do?blogid="+blogid+"&bookno="+bookno;		
	}
}

function modifyEbook(blogid, bookno){
	location.href = "/_blog/ebookMake.do?blogid="+blogid+"&bookno="+bookno;
}

function deleteEbook(blogid,bookno){
	if(confirm("블로그북을 삭제하시겠습니까?")){
		loadXMLDocWithParam("GET","EbookDelete.ajax?blogid="+blogid+"&bookno="+bookno,null,"successDelEbook","failDelEbook",blogid);		
	}
}
function successDelEbook(xmlhttp, blogid){
	var code = getSimpleResponse(xmlhttp);
	code = both_trim(code);
	if(code=="success"){
		alert("블로그북이 삭제되었습니다.");
		location.href = "/_blog/EbookList.do?blogid="+blogid;
		xmlhttp=null;
	}else{
		console.log("successDelEbook fail", xmlhttp);
		failDelEbook(xmlhttp)
	}
}
function failDelEbook(xmlhttp){
	alert("블로그북 삭제에 실패하였습니다.");
	xmlhttp=null;
}

function shareSNS(service, linkinfo, prefixinfo, caption, message, imageinfo){
	var url = "";
	var oWinParams = "";
	if(service == "mypeople"){
		url = ['http://mypeople.daum.net/mypeople/web/share.do?'];
		oWinParams = "scrollbars=no,toolbar=no,location=no,directories=no,menubar=no,height=560,width=680,left=250,top=65,resizable=no";
		url.push('each=true');
	}else{
		url = ['http://profile.daum.net/api/popup/Share.daum?service_name=' + service];
		if (!!imageinfo && imageinfo != ""){
			url.push('meta_type=IMG');
			url.push('image_path=' + encodeURIComponent(imageinfo));
		}
		oWinParams = "scrollbars=no,toolbar=no,location=no,directories=no,menubar=no,height=275,width=355,left=250,top=65,resizable=no";
	}
	if (!!message && message != ""){
		url.push('message=' + encodeURIComponent(message));
	}
	if (!!caption && caption != ""){
		url.push('caption=' + encodeURIComponent(caption));
	}
	if(!!prefixinfo && prefixinfo!=""){
		url.push('prefix=' + encodeURIComponent(prefixinfo));
	} 
	if(!!linkinfo && linkinfo!=""){
		url.push('link=' + encodeURIComponent(linkinfo));
	} 
	url.push('source_id=22');
	
	var oWin = window.open(url.join('&'), "articleToSNS", oWinParams);
	oWin.focus();
}

function showMoreSNS(ev){
	var layer = document.getElementById("moreSNS");
	layer.style.display = "block";
}

function hideMoreSNS(ev){
	var e = ev || window.event;
	var layer = document.getElementById("moreSNS");
	var target = e.relatedTarget ? e.relatedTarget : e.toElement;
	if(!target){
		layer.style.display = "none";
		return;
	}
	while(target !== layer && target.nodeName != "BODY"){
		target = target.parentNode;
	}
	if(target !== layer){
		layer.style.display = "none";
	}
}