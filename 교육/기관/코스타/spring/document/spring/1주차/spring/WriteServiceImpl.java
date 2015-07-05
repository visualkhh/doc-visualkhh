package kosta.spring;

public class WriteServiceImpl implements WriteService {
	private Dao dao;
	
	public WriteServiceImpl(Dao dao){
		this.dao = dao;
	}
	
	@Override
	public void write() {
		System.out.println("WriteServiceImpl write()�޼��� ȣ��");
		dao.insert();
	}

}
