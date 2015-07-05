package kosta.spring;

public class OracleDao implements Dao {

	@Override
	public void insert() {
		System.out.println("OracleDao insert()메서드 호출");
	}

}
