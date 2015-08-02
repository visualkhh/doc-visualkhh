package springapp;

public class WriteArticleServiceImpl implements WriteArticleService {

	private ArticleDao articleDao;

	public WriteArticleServiceImpl(ArticleDao articleDao) {
		this.articleDao = articleDao;
		System.out.println("<WriteArticleServiceImpl> 积己");
	}

	@Override
	public void write(Article article) {
		System.out.println("WriteArticleServiceImpl.write() 皋家靛 角青");
		articleDao.insert(article);
	}

}
