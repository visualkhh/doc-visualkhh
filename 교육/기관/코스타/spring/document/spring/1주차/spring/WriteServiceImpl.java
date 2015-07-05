package kosta.spring;

public class WriteServiceImpl implements WriteService {
	private Dao dao;
	
	public WriteServiceImpl(Dao dao){
		this.dao = dao;
	}
	
	@Override
	public void write() {
		System.out.println("WriteServiceImpl write()메서드 호출");
		dao.insert();
	}

}
