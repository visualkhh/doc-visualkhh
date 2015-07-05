
//ie6 이상 , sp3, flash9이상 javascript 오류 수정	
	function fixRaceCondition () { 
	  var backup = window.__flash__removeCallback; 
	  window.__flash__removeCallback = function (instance, name) { try {backup(instance, name)} catch (x){} }; 
	}
	if (window.addEventListener) {
		window.addEventListener("onunload", fixRaceCondition , false ); 
	} else if (window.attachEvent) {
		window.attachEvent("onunload", fixRaceCondition ); 
	}
	
	var executeInitialfunction = false;
	
	function articleFileViewGeneration() {
		if (executeInitialfunction) {
			return;
		}
		else {
			//파일 미리보기
			//첨부파일화된 본문에서 파일미리보기 지원 koyoungmin
			executeInitialfunction = true;
			try {
				//frame size 와 image size 조절 ,bgm관련 
				parent.ContentViewer.setParameter_frame("b_" + contents_article_no, looping);
				parent.ContentViewer.sizeFrame("b_" + contents_article_no, looping);
				
				var oDoc = document.getElementById("contentDiv");
				var aLinks = oDoc.getElementsByTagName("a");
				for (var i = 0; i < aLinks.length; i++) {
					
					// 사진에 링크를 걸었을때에 사진 크게 보는 것 빼고 링크로 연결되는 것만 남게
					var aLinkImg = aLinks[i].getElementsByTagName("img");
					for(var j=0 ; j < aLinkImg.length ; j++){
						if(aLinkImg[j].className == "tx-daum-image" || aLinkImg[j].className == "txc-image"){
							aLinkImg[j].onclick = "";
						}
					}
					
					var aLinkString = aLinks[i].innerHTML;
					var aLinkStringLow = aLinkString.toLowerCase();
					
					// 본문에 첨부아이콘 중앙에 위치시키기 
					if (aLinks[i].href.indexOf("javascript:fileFilterViewer_dc") > -1) {
						return;
					}
					else if (aLinkStringLow.indexOf("http://blogimg.daum-img.net/") > -1 ||
						aLinkStringLow.indexOf("http://i1.daumcdn.net/pimg/") > -1 ||
						aLinkStringLow.indexOf("http://i1.daumcdn.net/icon") > -1 ||
						aLinkStringLow.indexOf("http://i1.daumcdn.net/cafeimg/") > -1 ) {
						
						oDoc.getElementsByTagName("a")[i].setAttribute("target", "_blank");
							
						if (oDoc.getElementsByTagName("a")[i].parentNode.getElementsByTagName("img").length > 0) {
							oDoc.getElementsByTagName("a")[i].parentNode.getElementsByTagName("img")[0].style.verticalAlign = "middle";
						}
					}
					
					// 진본 파일 URL을 가져옵니다.
					var orgFileUrl = oDoc.getElementsByTagName("a")[i].getAttributeNode("href").nodeValue;
					
					if (aLinkStringLow.indexOf("p_jpg_s.gif") > -1 || aLinkStringLow.indexOf("p_gif_s.gif") > -1 ||
					aLinkStringLow.indexOf("p_png_s.gif") > -1) {
						var aLinkAdd = oDoc.getElementsByTagName("a")[i].parentNode.innerHTML +
						" <img src=\"http://cafeimg.hanmail.net/cf_img2/bbs2/btn_imageview.gif\" alt=\"첨부이미지 미리보기\" style=\"vertical-align:middle;cursor:pointer;\" onclick=\"PhotoImagePopup('" +
						BLOGID +
						"', '" +
						orgFileUrl +
						"');\">";
						oDoc.getElementsByTagName("a")[i].parentNode.innerHTML = aLinkAdd;
					}
					// 첨부된 파일은 파일 미리 보기 등록 
					else if (aLinkStringLow.indexOf(".ppt<") > -1 || aLinkStringLow.indexOf(".doc<") > -1 ||
						aLinkStringLow.indexOf(".xls<") > -1 ||	aLinkStringLow.indexOf(".pptx<") > -1 ||
						aLinkStringLow.indexOf(".docx<") > -1 || aLinkStringLow.indexOf(".xlsx<") > -1 ||
						aLinkStringLow.indexOf(".hwp<") > -1) {
						
						if (orgFileUrl.indexOf(".daum.net") > -1) { // onlyDaumService
							oDoc.getElementsByTagName("a")[i].setAttribute("href", "javascript:fileFilterViewer_dc('" + orgFileUrl + "','" + orgFileUrl + "','','" + BLOGID + "','" + contents_article_no + "');");
							oDoc.getElementsByTagName("a")[i].setAttribute("class", "p11");
						}
					}
				}
			} 
			catch (e) {}
		}
	}

// about mouse right button
	var formtags=["input", "textarea", "select", "html" , "embed", "object"];
	function disableselect(e){
		if(typeof e == "undefined") return;
		var el = e.srcElement || e.target;
		var tagName = el.tagName.toLowerCase();
		for(var i=formtags.length-1;i>=0;i--){
			if(formtags[i]==tagName) return true;
		}
		if (navigator.userAgent.toLowerCase().indexOf("gecko") != -1) {
			document.body.style.MozUserSelect = '';
		}
		return false;
	}
	
	function reEnable(){ return true; }

//bgm	
	var form_widget_amount_big_slider_handle = 'http://i1.daumcdn.net/cafeimg/cf_img2/img_blank2.gif';
	var big_slider_handle_image_obj = false;
	var big_sliderObjectArray = new Array();
	var big_slider_counter = 0;
	var big_slideInProgress = false;
	var big_handle_start_x;
	var big_event_start_x;
	var big_currentSliderIndex;
	var bgmNo;
	
	function form_widget_cancel_event2()
	{
		return false;
	}
	
	function getImageSliderHeight2(){
		if(!big_slider_handle_image_obj){
			big_slider_handle_image_obj = new Image();
			big_slider_handle_image_obj.src = form_widget_amount_big_slider_handle;
		}
		if(big_slider_handle_image_obj.width>0){
			return;
		}else{
			setTimeout('getImageSliderHeight2()',50);
		}
	}
	
	var ratio = 0;
	function positionSliderImage2(e,theIndex)
	{
		if(!theIndex)theIndex = this.getAttribute('sliderIndex');
		var theValue = big_sliderObjectArray[theIndex]['formTarget'].value;
		if(!theValue.match(/^[0-9]*$/g))theValue=big_sliderObjectArray[theIndex]['min'] +'';
		if(theValue/1>big_sliderObjectArray[theIndex]['max'])theValue = big_sliderObjectArray[theIndex]['max'];
		if(theValue/1<big_sliderObjectArray[theIndex]['min'])theValue = big_sliderObjectArray[theIndex]['min'];
		big_sliderObjectArray[theIndex]['formTarget'].value = theValue;
		var big_handleImg = document.getElementById('big_slider_handle' + theIndex);
		ratio = big_sliderObjectArray[theIndex]['width'] / (big_sliderObjectArray[theIndex]['max']-big_sliderObjectArray[theIndex]['min']);
		var currentValue = big_sliderObjectArray[theIndex]['formTarget'].value - big_sliderObjectArray[theIndex]['min'];
		big_handleImg.style.left = Math.round(currentValue * ratio) + 'px';
	}
	
	function adjustFormValue2(theIndex)
	{
		var big_handleImg = document.getElementById('big_slider_handle' + theIndex);
		var ratio = big_sliderObjectArray[theIndex]['width'] / (big_sliderObjectArray[theIndex]['max']-big_sliderObjectArray[theIndex]['min']);
		var currentPos = big_handleImg.style.left.replace('px','');
		big_sliderObjectArray[theIndex]['formTarget'].value = Math.round(currentPos / ratio) + big_sliderObjectArray[theIndex]['min'];
	}
	
	function initMoveSlider2(e)
	{
		if(document.all)e = event;
		big_slideInProgress = true;
		big_event_start_x = e.clientX;
		big_handle_start_x = this.style.left.replace('px','');
		big_currentSliderIndex = this.id.replace(/[^\d]/g,'');
		return false;
	}
	
	function startMoveSlider2(e)
	{
		if(document.all)e = event;
		if(!big_slideInProgress)return;
		var leftPos = big_handle_start_x/1 + e.clientX/1 - big_event_start_x;
		if(leftPos<0)leftPos = 0;
		if(leftPos/1>big_sliderObjectArray[big_currentSliderIndex]['width'])leftPos = big_sliderObjectArray[big_currentSliderIndex]['width'];
		document.getElementById('big_slider_handle' + big_currentSliderIndex).style.left = leftPos + 'px';
		document.getElementById('big_slider_slider' + big_currentSliderIndex).style.width = leftPos+3 + 'px';
	
		adjustFormValue2(big_currentSliderIndex);
		if(big_sliderObjectArray[big_currentSliderIndex]['onchangeAction']){
			eval(big_sliderObjectArray[big_currentSliderIndex]['onchangeAction']);
		}
	}
	
	function stopMoveSlider2(vol)
	{
		big_slideInProgress = false;
	//	parent.formBGM2.vol.value = vol;
	}
	
	function form_widget_amount_slider_big(targetElId,formTarget,width,min,max,onchangeAction,sliderHandleWidth,sliderHeight,bgmNo)
	{
		if(!big_slider_handle_image_obj){
			getImageSliderHeight2();
		}
	
	//	big_slider_counter = big_slider_counter +1;
		big_slider_counter = bgmNo;
		big_sliderObjectArray[big_slider_counter] = new Array();
		big_sliderObjectArray[big_slider_counter] = {"width":width - sliderHandleWidth,"min":min,"max":max,"formTarget":formTarget,"onchangeAction":onchangeAction};
		formTarget.setAttribute('sliderIndex',big_slider_counter);
		formTarget.onchange = positionSliderImage2;
	if(document.getElementById('big_slider_handle' + big_slider_counter)){
		document.getElementById(targetElId).removeChild(document.getElementById('big_slider_handle' + big_slider_counter));
	}
		var big_handleImg = document.createElement('IMG');
		big_handleImg.style.position = 'absolute';
		big_handleImg.style.left = '0px';
		big_handleImg.style.top = '8px';
		big_handleImg.style.zIndex = 5;
		big_handleImg.src = big_slider_handle_image_obj.src;
		big_handleImg.id = 'big_slider_handle' + big_slider_counter;
		big_handleImg.className = "playerControl hand";
		big_handleImg.onmousedown = initMoveSlider2;
	
		var mouseTarget = document.getElementById('playerBox' + bgmNo);
		if(mouseTarget.onmouseup){
			if(mouseTarget.onmouseup.toString().indexOf('stopMoveSlider2')==-1){
				//alert('You allready have an onmouseup event assigned to the body tag');
			}
		}else{
			mouseTarget.onmouseup = stopMoveSlider2;
			mouseTarget.onmousemove = startMoveSlider2;
		}
		big_handleImg.ondragstart = form_widget_cancel_event2;
		document.getElementById(targetElId).appendChild(big_handleImg);
		positionSliderImage2(false,big_slider_counter);
		document.getElementById('big_slider_slider' + bgmNo).style.width = Math.round(parent.formBGM2.vol.value * ratio)+3 + 'px';
	}
	
	function setVolume2(){
		var formObj = document.bbsForm;
		var vol = parent.formBGM2.vol.value.replace(/[^\d]/,'');
	//	changeVolume2(vol);
		parent.ArticleBgm.setVolume(vol);
	}
	
	/* 동영상 플레이어와 배경음악 제어 체크용 더미 함수 */
	function flvPlayerCheck(){  }
	function flvPlayerPause(){ 	}
	function flvPlayerPlay(){
		parent.BgmPlayManager.allStop();
	}

	document.onkeydown = function(evt) { if(window.event) { evt = window.event; } if(evt.keyCode == 27) { parent.BgmPlayManager.allStop(); } };
