package springapp;

public class WriteArticleServiceImpl implements WriteArticleService {

	private ArticleDao articleDao;

	public WriteArticleServiceImpl(ArticleDao articleDao) {
		this.articleDao = articleDao;
		System.out.println("<WriteArticleServiceImpl> ����");
	}

	@Override
	public void write(Article article) {
		System.out.println("WriteArticleServiceImpl.write() �޼ҵ� ����");
		articleDao.insert(article);
	}

}
