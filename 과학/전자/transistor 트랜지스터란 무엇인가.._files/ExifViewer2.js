/*jslint onevar:false,evil:true,regexp:false*/
/*global DaumImageViewer,ExifViewer*/
(function () {
	/*global CacheManager,
	 getCoords, setPosition, 
	 showLayer, hideLayerWithTimer
	 showPopup, buildExif, 
	 showExif, hideExif,
	 showIvBtn, hideIvBtn,
	 showInfoBtn, hideInfoBtn
	 */
	var IV_VERSION = "2012030702";
	var IMG_VERSION = "img0";
	
	var debugLine = 0;
	function debug() {
		try {
			console.log(debugLine += 1);
			console.log.apply(console, arguments);
		} catch (ignore) {}
	}
	function exifLog(name, value) {
		debug(name, value);
	}
	
	var WIN = window,
		DOC = document,
		jigu;

	var layerHideTimer = null;

	var exifWrap,
		ivBtnWrap,
		infoBtnWrap;
	
	var EXIF_ATTRIBUTE_NAME = "exif";
	var EXIF_MAP = {
		0: {code: 'taken', name: '촬영날짜'},
		1: {code: 'model', name: '카메라'},
		2: {code: 'exposureTime', name: '노출시간'},
		3: {code: 'exposureBias', name: '노출보정'},
		4: {code: 'iso', name: 'ISO감도'},
		5: {code: 'exposureProgram', name: '프로그램'},
		6: {code: 'fnumber', name: '조리개값'},
		7: {code: 'focalLength', name: '초점길이'}
	};
	var IV_BTN_IMAGE = "http://s1.daumcdn.net/editor/easel/" + IMG_VERSION + "/btn_viewer.png";
	var INFO_BTN_IMAGE = "http://s1.daumcdn.net/editor/easel/" + IMG_VERSION + "/btn_info.png";
	var TEMPLATE_STYLE = {
		"tx_exif": "overflow:hidden;position:absolute;z-index:99999;left:-99999px;top:-99999px;width:164px;text-align:left;",
		"tx_exif_inner": "",
		"exif_list": "float:left;position:relative;z-index:1;display:block;padding:17px 5px 11px 17px;margin:0;list-style:none;",
		"exif_key": "display:block;width:67px;height:18px;float:left;font:11px/1.2em Dotum,Arial;color:#A9A19C;margin:0;padding:0;list-style:none;",
		"exif_val": "overflow:hidden;display:block;white-space:nowrap;width:74px;height:18px;float:right;font:11px/1.2em Tahoma,Arial;color:#FFF;text-overflow:ellipsis;-o-text-overflow:ellipsis;margin:0;padding:0;list-style:none;",
		"tx_exif_bg": "position:absolute;left:0;top:0;width:100%;height:300px;background-color:#000;opacity:0.65;FILTER:alpha(opacity=65);",
		"tx_exif_cover": "position:absolute;z-index:2;left:0;top:0;width:100%;height:300px;background-color:#FFF;opacity:0;FILTER:alpha(opacity=0);",
		"tx_ivbtn": "position:absolute;z-index:99999;top:-99999px;left:-99999px;width:72px;height:20px;overflow:hidden;background:url(" + IV_BTN_IMAGE + ");_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + IV_BTN_IMAGE + "',sizingMethod='crop');cursor:pointer;",
		"tx_infobtn": "position:absolute;z-index:99999;top:-99999px;left:-99999px;width:72px;height:20px;overflow:hidden;background:url(" + INFO_BTN_IMAGE + ");_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + INFO_BTN_IMAGE + "',sizingMethod='crop');cursor:pointer;"
	};
	function getExifTemplate() {
		var template = '';
		template += '<div style="' + TEMPLATE_STYLE.tx_exif + '">';
		template += '<div style="' + TEMPLATE_STYLE.tx_exif_inner + '"></div>';
		template += '<div style="' + TEMPLATE_STYLE.tx_exif_bg + '"></div>';
		template += '<div style="' + TEMPLATE_STYLE.tx_exif_cover + '"></div>';
		template += '</div>';
		return template;
	}
	function getIvBtnTemplate() {
		return '<div style="' + TEMPLATE_STYLE.tx_ivbtn + '"></div>';
	}
	function getInfoBtnTemplate() {
		return '<div style="' + TEMPLATE_STYLE.tx_infobtn + '"></div>';
	}
	function getTemplate() {
		var template = '';
		template += getExifTemplate();
		template += getIvBtnTemplate();
		template += getInfoBtnTemplate();
		return template;
	}
	function createTemplate() {
		var virtualWrap;
		virtualWrap = DOC.createElement("div");
		virtualWrap.innerHTML = getTemplate();
		/*assign elements*/
		exifWrap = virtualWrap.childNodes[0];
		ivBtnWrap = virtualWrap.childNodes[1];
		infoBtnWrap = virtualWrap.childNodes[2];
		/*append*/
		DOC.body.appendChild(infoBtnWrap);
		DOC.body.appendChild(ivBtnWrap);
		DOC.body.appendChild(exifWrap);
	}
	function calculateRightBottomPosition(option) {
		var box = getCoords(option.imgObj);
		return {
			left: box.right - option.div.offsetWidth - option.margin.right,
			top: box.bottom - option.div.offsetHeight - option.margin.bottom
		};
	}
	
	function addEventExifWrap() {
		jigu.addEvent(exifWrap, "mouseover", function (ev) {
			var imgObj = CacheManager.get("CUR_IMG");
			showLayer(imgObj);
		});
		jigu.addEvent(exifWrap, "mouseout", hideLayerWithTimer);
	}
	function addEventIvBtnWrap() {
		jigu.addEvent(ivBtnWrap, "mouseover", function (ev) {
			var imgObj = CacheManager.get("CUR_IMG");
			showLayer(imgObj);
		});
		jigu.addEvent(ivBtnWrap, "mouseout", hideLayerWithTimer);
		jigu.addEvent(ivBtnWrap, "click", function (ev) {
			var imgObj = CacheManager.get("CUR_IMG");
			showPopup(imgObj);
		});
	}
	function addEventInfoBtnWrap() {
		jigu.addEvent(infoBtnWrap, "mouseover", function (ev) {
			var imgObj = CacheManager.get("CUR_IMG");
			showLayer(imgObj);
		});
		jigu.addEvent(infoBtnWrap, "mouseout", hideLayerWithTimer);
		jigu.addEvent(infoBtnWrap, "click", function (ev) {
			var imgObj = CacheManager.get("CUR_IMG");
			showExif(imgObj);
		});
	}
	
	function showLayer(imgObj) {
		var existExif;
		if (layerHideTimer) {
			clearTimeout(layerHideTimer);
			layerHideTimer = null;
		}
		if (!exifWrap) {
			createTemplate();
			addEventExifWrap();
			addEventIvBtnWrap();
			addEventInfoBtnWrap();
		}
		if (imgObj) {
			existExif = buildExif(imgObj);
			showIvBtn(imgObj);
			if (existExif) {
				showInfoBtn(imgObj);
			}
		}
	}
	function hideLayerWithTimer() {
		layerHideTimer = setTimeout(function () {
			hideExif();
			hideIvBtn();
			hideInfoBtn();
			layerHideTimer = null;
		});
	}
	function getIndexByImgObj(imgObj) {
		var arr, i, len;
		arr = ExifViewer.config.images;
		len = arr.length;
		for (i = 0; i < len; i += 1) {
			if (imgObj === arr[i]) {
				return i;
			}
		}
		return -1;
	}
	function showPopup(imgObj) {
		var index = getIndexByImgObj(imgObj);
		if (0 <= index) {
			DaumImageViewer.fireViewer(index);
		}
	}

	function addEventImageElem(imgObj) {
		jigu.addEvent(imgObj, "mouseover", function (ev) {
			showLayer(imgObj);
		});
		jigu.addEvent(imgObj, "mouseout", hideLayerWithTimer);
	}
	function addEventImages(images) {
		var i, len;
		len = images.length;
		for (i = 0; i < len; i += 1) {
			addEventImageElem(images[i]);
		}
	}
	
	function addEventWindow() {
		var resetCache = function () {
			CacheManager.reset();
		};
		jigu.addEvent(WIN, "resize", resetCache);
		jigu.addEvent(WIN, "load", resetCache);
	}
	
	function toValidJsonStr(str) {
		// sample : "{'exposureBias':'0/6','exposureTime':'1/200','ssss':'', 'model':'NIKON D200'}"
		var result = str;
		// 'null' 을 '' 로 치환
		result = result.replace(/'null'/g, "''");
		// jigu.jsonToObject에서 사용가능한 json 문자열 형태는 아래와 같아서 '를 "로 치환
		// ex) jigu.jsonToObject( '{"prop1":"value1", "prop2":"\\"value\\""}' );
		result = result.replace(/"/g, '\\"').replace(/'/g, '"');
		return result;
	}
	function addUnit(data) {
		if (data.exposureTime) {
			data.exposureTime += "sec";
		}
		if (data.focalLength) {
			data.focalLength += "mm";
		}
		if (data.exposureBias) {
			data.exposureBias += " eV";
		}
		if (data.fnumber) {
			data.fnumber = "F/" + data.fnumber;
		}
		return data;
	}
	function formatData(data) {
		if (data.taken) {
			data.taken = data.taken.split(" ")[0].replace(/:/g, ". ");
		} //raw ex) 2011:06:04 11:23:44
		return data;
	}
	function buildExifObj(attrValue) {
		var data = null;
		if (attrValue) {
			try {
				data = toValidJsonStr(attrValue);
				data = jigu.jsonToObject(data);
				data = addUnit(data);
				data = formatData(data);
			} catch (e) {
				exifLog("buildExifObj", e.message);
			}
		}
		return data;
	}
	
	function setExifInnerHtml(html) {
		exifWrap.firstChild.innerHTML = html;
	}
	function getExifHeadHtml() {
		return '<dl style="' + TEMPLATE_STYLE.exif_list + '">';
	}
	function getExifRowHtml(key, data) {
		var code = EXIF_MAP[key].code,
			name = EXIF_MAP[key].name,
			val = data[code],
			html = '';
		if (!val && ExifViewer.config.showAllItem) {
			val = "-";
		}
		if (val) {
			html += '<dt style="' + TEMPLATE_STYLE.exif_key + '">' + name + '</dt>';
			html += '<dd style="' + TEMPLATE_STYLE.exif_val + '">' + val + '</dd>';
		}
		return html;
	}
	function getExifBodyHtml(exifObj) {
		var key, html = '';
		for (key in EXIF_MAP) {
			if (EXIF_MAP.hasOwnProperty(key)) {
				html += getExifRowHtml(key, exifObj);
			}
		}
		return html;
	}
	function getExifFootHtml() {
		return '</dl>';
	}
	function setExifTemplate(exifAttr) {
		var cache = CacheManager.get(exifAttr);
		if (cache) {
			setExifInnerHtml(cache.html);
			return cache.existRow;
		}
		var exifContent,
			html = '',
			exifObj = buildExifObj(exifAttr);
		if (exifObj) {
			html += getExifHeadHtml();
			exifContent = getExifBodyHtml(exifObj);
			html += exifContent;
			html += getExifFootHtml();
		}
		setExifInnerHtml(html);
		CacheManager.set(exifAttr, {
			html: html,
			existRow: !!exifContent
		});
		return !!exifContent;
	}

	function drawExifAndReturnPos(imgObj) {
		var exifAttr, existExif;
		exifAttr = imgObj.getAttribute(EXIF_ATTRIBUTE_NAME);
		existExif = setExifTemplate(exifAttr);
		if (existExif) {
			return calculateRightBottomPosition({
				imgObj: imgObj,
				div: exifWrap,
				margin: {
					right: 5,
					bottom: 30
				}
			});
		} else {
			return {
				left: -99999,
				top: -99999,
				hide: true
			};
		}
	}
	function buildExif(imgObj) {
		var dataKey, data, isValidCache, pos;
		dataKey = imgObj.src;
		data = CacheManager.get(dataKey);
		isValidCache = data && data.imgObj === imgObj;
		if (isValidCache) {
			if (CacheManager.get("CUR_IMG") !== imgObj) {
				pos = drawExifAndReturnPos(imgObj);
			}
		} else {
			pos = drawExifAndReturnPos(imgObj);
			data = {
				imgObj: imgObj,
				pos: pos
			};
			CacheManager.set(dataKey, data);
		}
		//set current imgObj.
		CacheManager.set("CUR_IMG", imgObj);
		return !data.pos.hide;
	}
	function showExif(imgObj) {
		var dataKey, data, isValidCache;
		dataKey = imgObj.src;
		data = CacheManager.get(dataKey);
		isValidCache = data && data.imgObj === imgObj;
		if (isValidCache) {
			setPosition(exifWrap, data.pos);
		} else {
			exifLog("showExif", "not valid cache");
		}
	}
	function hideExif() {
		if (exifWrap) {
			setPosition(exifWrap, {
				left: -99999,
				top: -99999,
				hide: true
			});
		}
	}
	
	function showIvBtn(imgObj) {
		var pos = calculateRightBottomPosition({
			imgObj: imgObj,
			div: ivBtnWrap,
			margin: {
				right: 5,
				bottom: 5
			}
		});
		setPosition(ivBtnWrap, pos);
	}
	function hideIvBtn() {
		if (ivBtnWrap) {
			setPosition(ivBtnWrap, {
				left: -99999,
				top: -99999,
				hide: true
			});
		}
	}
	
	function showInfoBtn(imgObj) {
		var pos = calculateRightBottomPosition({
			imgObj: imgObj,
			div: infoBtnWrap,
			margin: {
				right: 82,
				bottom: 5
			}
		});
		setPosition(infoBtnWrap, pos);
	}
	function hideInfoBtn() {
		if (infoBtnWrap) {
			setPosition(infoBtnWrap, {
				left: -99999,
				top: -99999,
				hide: true
			});
		}
	}

	function setPosition(node, pos) {
		node.style.left = pos.left + "px";
		node.style.top = pos.top + "px";
	}
	function getCoords(node) {
		var 	doc, docElem, body, div, w3cBoxModelWorks,
			box, win, clientTop, clientLeft,
			scrollTop, scrollLeft, top, left;
		doc = node.ownerDocument;
		docElem = doc.documentElement;
		body = doc.body;
		div = doc.createElement("div");
		body.appendChild(div);
		div.style.width = div.style.paddingLeft = "1px";
		w3cBoxModelWorks = div.offsetWidth === 2;
		body.removeChild(div);
		box = node.getBoundingClientRect();
		win = doc.defaultView || doc.parentWindow;
		clientTop  = docElem.clientTop  || body.clientTop  || 0;
		clientLeft = docElem.clientLeft || body.clientLeft || 0;
		scrollTop  = win.pageYOffset || w3cBoxModelWorks && docElem.scrollTop  || body.scrollTop;
		scrollLeft = win.pageXOffset || w3cBoxModelWorks && docElem.scrollLeft || body.scrollLeft;
		top  = box.top  + scrollTop  - clientTop;
		left = box.left + scrollLeft - clientLeft;
		return {
			top: top,
			left: left,
			bottom: top + node.offsetHeight,
			right: left + node.offsetWidth
		};
	}
	
	var CacheManager = {
		datas: {},
		set: function (key, value) {
			this.datas[key] = value;
		},
		get: function (key) {
			return this.datas[key];
		},
		reset: function () {
			this.datas = {};
		}
	};
	
	var getFallbackJigu = function () {
		var REGX_TEST = /^[\],:{}\s]*$/,
			REGX_REPLACE_1 = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
			REGX_REPLACE_2 = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
			REGX_REPLACE_3 = /(?:^|:|,)(?:\s*\[)+/g;
		return {
			addEvent: function (src, type, handler) {
				if (!!DOC.addEventListener) {
					src.addEventListener(type, handler, false);
				} else {
					src.attachEvent("on" + type, handler);
				}
			},
			jsonToObject: function (text) {
				if (REGX_TEST.test(text
				.replace(REGX_REPLACE_1, "@")
				.replace(REGX_REPLACE_2, "]")
				.replace(REGX_REPLACE_3, ""))) {
					return WIN.JSON && WIN.JSON.parse ? 
						WIN.JSON.parse(text) :
						(new Function("return " + text))();
				} else {
					return {};
				}
			}
		};
	};

	WIN.ExifViewer = {
		config: {},
		load: function (config) {
			if ("daum" in WIN) {
				jigu = WIN.daum;
			} else {
				jigu = getFallbackJigu();
			}
			this.config = config;
			
			addEventImages(config.images);
			addEventWindow();
			
			config.imageViewer.serviceName = config.serviceName;
			DaumImageViewer.init(config.imageViewer);
		}
	};
	WIN.DaumImageViewer = {
		serviceName: "",
		data: null,
		imageurl: '',
		templateValue: {},
		photoList: {
			photoListProtocol: "iv"
		},
		groupList: null,
		popupUrl: "http://fp.daum.net/easel/" + IV_VERSION + "/imageViewer.html",
		popupName: "DaumImageViewer",
		popWin: null,
		popupStatus: {
			"top": screen.availTop || 0,
			"left": screen.availLeft || 0,
			"width": (screen.availWidth || screen.width || 1024) - 16,
			"height": (screen.availHeight || screen.height || 768) - 64,
			"resizable": 1,
			"scrollbars": 1
		},
		popupStatusStr: "",
		dataIndex: -1,
		dataStr: "",
		currentDataStr: "",
		init: function (config) {
			this.setConfig(config);
			this.makePopupStatusStr();
		},
		setConfig: function (config) {
			var name;
			for (name in config) {
				if (config.hasOwnProperty(name)) {
					this[name] = config[name];
				}
			}//serviceName, data, photoList, groupList, popupUrl
		},
		makePopupStatusStr: function () {
			var popupStatusArr, status, name;
			popupStatusArr = [];
			status = this.popupStatus;
			for (name in status) {
				if (status.hasOwnProperty(name)) {
					popupStatusArr.push(name + "=" + status[name]);
				}
			}
			this.popupStatusStr = popupStatusArr.join(",");
		},
		fireViewer: function (index) {
			if (0 <= index && index < this.data.count) {
				this.saveData(index);
				this.saveCurrentData(index);
				this.saveImageUrl(index);
			}
			this.popupOpen();
		},
		getTemplateValue: function (key) {
			if (key in this.templateValue) {
				return '' + this.templateValue[key];
			}
			if (key === 'imageurl') {
				return encodeURIComponent(this.imageurl);
			}
			return '';
		},
		getPhotoListData: function () {
			var self = this, data;
			data = {};
			if ("photoListProtocol" in this.photoList) {
				data.photoListProtocol = this.photoList.photoListProtocol;
			}
			if ("photoListDataFromUrl" in this.photoList) {
				data.photoListDataFromUrl = this.photoList.photoListDataFromUrl.replace(/\{(\w+)\}/g, function (matched, key) {
					return self.getTemplateValue(key);
				});
			}
			if ("photoListData" in this.photoList) {
				data.photoListData = this.photoList.photoListData;
			}
			return data;
		},
		getGroupListData: function () {
			var self = this, data;
			data = {};
			if ("groupListProtocol" in this.groupList) {
				data.groupListProtocol = this.groupList.groupListProtocol;
			}
			if ("groupListDataFromUrl" in this.groupList) {
				data.groupListDataFromUrl = this.groupList.groupListDataFromUrl.replace(/\{(\w+)\}/g, function (matched, key) {
					return self.getTemplateValue(key);
				});
			}
			if ("groupListData" in this.groupList) {
				data.groupListData = this.groupList.groupListData;
			}
			return data;
		},
		saveData: function (curIndex) {
			var dataStr, i, len;
			dataStr = '{"index":' + curIndex + ',"images":[';	
			len = this.data.count;
			for (i = 0; i < len; i += 1) {
				if (0 < i) {
					dataStr += ",";
				}
				dataStr += this.getImageData(i);
			}
			dataStr += "]}";
			this.dataIndex = curIndex;
			this.dataStr = encodeURIComponent(dataStr);
		},
		saveImageUrl: function (curIndex) {
			var dataObj = this.data;
			this.imageurl = dataObj.getViewingUrl(curIndex);
		},
		saveCurrentData: function (curIndex) {
			var imageDataStr = this.getImageData(curIndex);
			this.currentDataStr = encodeURIComponent(imageDataStr);
		},
		getImageData: function (index) {
			var dataObj, viewingUrl, dataArr;
			dataObj = this.data;
			viewingUrl = dataObj.getViewingUrl(index);
			dataArr = ['"url":"' + viewingUrl + '"'];
			if (dataObj.getOriginalUrl) {
				dataArr.push('"original":"' + dataObj.getOriginalUrl(index) + '"');
			}
			if (dataObj.getThumbnailUrl) {
				dataArr.push('"thumbnail":"' + dataObj.getThumbnailUrl(index) + '"');
			}
			if (dataObj.getLinkUrl) {
				dataArr.push('"linkurl":"' + dataObj.getLinkUrl(index) + '"');
			}
			if (dataObj.getLabel) {
				dataArr.push('"label":"' + dataObj.getLabel(index) + '"');
			}
			if (dataObj.getDate) {
				dataArr.push('"date":"' + dataObj.getDate(index) + '"');
			}
			return '{' + dataArr.join(",") + '}';
		},
		focusAndReloadPopup: function () {
			var popWin = this.popWin;
			popWin.reload(WIN);
			if (popWin.focus) {
				popWin.focus();
			}
		},
		getServiceName: function () {
			if (this.serviceName) {
				return this.serviceName;
			}
			var matched = location.href.match(/^http:\/\/(.+?)\.daum\.net/);
			if (matched && matched[1]) {
				return matched[1];
			}
			return "";
		},
		popupOpen: function () {
			var url = this.popupUrl + "#/" + IV_VERSION + "/" + this.getServiceName() + "/" + encodeURIComponent(this.imageurl);
			this.popWin = window.open(url, this.popupName, this.popupStatusStr);
			try {
				this.focusAndReloadPopup();
			} catch (ignore) {}
		},
		getData: function () {
			return this.dataStr;
		},
		getCurrentData: function () {
			return this.currentDataStr;
		}
	};
}());