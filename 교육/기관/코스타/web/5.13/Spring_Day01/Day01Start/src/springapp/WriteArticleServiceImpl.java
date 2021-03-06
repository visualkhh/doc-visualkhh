package springapp;

public class WriteArticleServiceImpl implements WriteArticleService {

	private ArticleDao articleDao;

	public WriteArticleServiceImpl(ArticleDao articleDao) {
		this.articleDao = articleDao;
		System.out.println("<WriteArticleServiceImpl> 생성");
	}

	@Override
	public void write(Article article) {
		System.out.println("WriteArticleServiceImpl.write() 메소드 실행");
		articleDao.insert(article);
	}

}
