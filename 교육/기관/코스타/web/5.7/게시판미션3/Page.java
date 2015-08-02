package page;

import java.util.*;

abstract class PageButton {
	protected String name;
	
	public String getName() {
		return name;
	}
	
	abstract void setName(String name);
}

class PageButtonImage extends PageButton {
	
	public PageButtonImage(String name) {
		setName(name);
	}
	
	public void setName(String name) {
		StringBuilder buf = new StringBuilder();
		
		buf.append("<img style='vertical-align:bottom;' src='")
			.append(name)
			.append("'>");
		
		this.name = buf.toString();
	}
}

class PageButtonText extends PageButton {
	
	public PageButtonText(String name) {
		setName(name);
	}
	
	public void setName(String name) {
		this.name = name;
	}
}


public class Page {
	protected int pageNum;						
	protected int pageCount;					
	protected int pageSize = 10;				
	protected int pageListSize = 5;				
	protected String pageURL;					
	protected PageButton nextButton = new PageButtonText("[다음]");
	protected PageButton prevButton = new PageButtonText("[이전]");
	protected String pageNumName = "pageNum";
	protected String keysURL = null;

	protected HashMap<String, String> keys = new HashMap<String, String>();
	
	public Page(String pageURL) {
		this.pageURL = pageURL;
	}
	public Page(String pageURL, String pageNum) {
		this.pageURL = pageURL;
		this.pageNum = convPageNum(pageNum);
	}
	public Page(String pageURL, String pageNum, int pageSize) {
		this.pageURL = pageURL;
		this.pageNum = convPageNum(pageNum);
		this.pageSize = pageSize;
	}

	public Page(String pageURL, String pageNum, int pageSize, int pageListSize) {
		this.pageURL = pageURL;
		this.pageNum = convPageNum(pageNum);
		this.pageSize = pageSize;
		this.pageListSize = pageListSize;
	}
	
	public int convPageNum(String pageNum) {
		String pageStr = pageNum;
		if( pageNum == null || pageNum.trim().length() < 1 )
			pageStr = "1";
		
		return Integer.parseInt( pageStr );
	}
	

	public void addKey(String key, String value) 
	{
		if( value != null && value.length() > 0 && !value.equals(" "))
			keys.put(key, value);
	}
	
	
	public String getList() 
	{
		StringBuilder buf = new StringBuilder();
		
		makeKeysURL();
		
		buf.append(getPrevButtonTag());
		buf.append(getPageListTag());
		buf.append(getNextButtonTag());		
		
		return buf.toString();
	}
	
	public int getStartPage() {
		return pageNum - ((pageNum-1) % pageListSize);
	}
	
	private String getPrevButtonTag() {
		StringBuilder buf = new StringBuilder();
		
		if( (getStartPage()-pageListSize) > 0 ) {
			buf.append( makeAnchorTag(getStartPage()-1, getKeysURL()));
			buf.append( prevButton.getName() ).append("</a>&nbsp;&nbsp;");
		}
		
		return buf.toString();
	}
	
	private String getNextButtonTag() {
		StringBuilder buf = new StringBuilder();
		
		if( (getStartPage()+pageListSize) <= pageCount ) {
			buf.append( makeAnchorTag(getStartPage()+pageListSize, getKeysURL()));
			buf.append( nextButton.getName() ).append("</a>&nbsp;&nbsp;");
		}
		
		return buf.toString();
	}
	
	
	private String getPageListTag() {		
		StringBuilder buf = new StringBuilder();		
		int size = getStartPage()+pageListSize;
		
		for(int i = getStartPage(); i < size; i++) 
		{
			if( i == pageNum ) 
				buf.append("<B><BIG>[").append(i).append("]</BIG></B>&nbsp;&nbsp;");
			else {
				buf.append( makeAnchorTag(i, keysURL));
				buf.append("[").append(i).append("]</a>&nbsp;&nbsp;");
			}
			if( i >= pageCount ) break;
		}
		
		return buf.toString();
	}
	
	
	private String makeAnchorTag(int pageNum, String keysURL) {
		StringBuilder buf = new StringBuilder();
		
		buf.append("<a href='").append(pageURL).append("?").append(pageNumName).append("=")
			.append(pageNum).append( keysURL ).append("'>");
		
		return buf.toString();
	}
	
	
	
	private void makeKeysURL() {
		StringBuilder buf = new StringBuilder();

		if( keys.size() > 0 )
		{
			Iterator<String> iKeys = keys.keySet().iterator();
			while( iKeys.hasNext() ) {
				String key = iKeys.next();
				buf.append("&")
					.append(key)
					.append("=")
					.append( keys.get(key) );
			}
		}
		
		keysURL = buf.toString();
	}

	
	public String getKeysURL() {
		if( keysURL == null ) makeKeysURL();
		
		return keysURL;
	}
	
	
	
		
	public void setPageNumName(String pageNumName) {
		this.pageNumName = pageNumName;
	}	
	public String getPageNumName() {
		return pageNumName;
	}	
	public int getPageListSize() {
		return pageListSize;
	}
	public void setPageListSize(int pageListSize) {
		this.pageListSize = pageListSize;
	}
	public String getPageURL() {
		return pageURL;
	}
	public void setPageURL(String pageURL) {
		this.pageURL = pageURL;
	}
	public HashMap<String, String> getKeys() {
		return keys;
	}
	public void setKeys(HashMap<String, String> keys) {
		this.keys = keys;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPageCount() {
		return pageCount;
	}
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
}

