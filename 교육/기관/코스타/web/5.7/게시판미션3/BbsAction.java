package bbs;

import util.*;
import java.util.ArrayList;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import page.Page;
import util.Result;

public class BbsAction extends DispatchAction {
	
	public ActionForward write(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		BbsArticle info = new BbsArticle();
		BeanUtils.copyProperties(info, (BbsForm)form);
		
		if( ((BbsForm)form).getHtml() == null )
			info.setHtml("N");
		else
			info.setHtml("Y");
			
		info.setIp( request.getRemoteHost() );
				
		BbsDAO bDao = BbsDAO.getInstance();
		if( bDao.write(info) ) {
			Result.link(request, "write.do?action=list", "글을 등록하셨습니다.");
		}
		else {
			Result.link(request, "writeForm.do", "글 작성에 실패하셨습니다.");
		}
		
		return mapping.findForward("list");
	}

	public ActionForward list(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		Page page = new Page("/struts_new_board/bbs/list.do", request.getParameter("pageNum"),3, 2);		
		page.addKey("action", "list");
		
		String keyword = request.getParameter("keyword");
			
		if( keyword != null ) 
		{			
			if( request.getParameter("subject") != null ) 
				page.addKey("subject", keyword);
			if( request.getParameter("writer") != null ) 
				page.addKey("writer", keyword);
		}
		else {
			page.addKey("subject", request.getParameter("subject"));
			page.addKey("writer", request.getParameter("writer"));
		}
		
		BbsDAO bDao = BbsDAO.getInstance();
		
		ArrayList<BbsArticle>list = bDao.getList(page);
		request.setAttribute("list", list);
		request.setAttribute("pageList", page.getList());
		
		return mapping.findForward("list");
	}
	