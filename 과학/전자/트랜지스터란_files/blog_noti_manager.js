if (typeof Blog === 'undefined') Blog = {};
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