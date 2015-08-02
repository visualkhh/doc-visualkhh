class Sung
{
	int kor;
	int eng;
	int mat;

	Sung(int k,int e, int m)
	{
		kor=k;
		eng=e;
		mat=m;
	}

	int Hap()
	{
		return kor+eng+mat;
	}

	int Average(int cnt)
	{
		return (kor+eng+mat)/cnt;
	}



}


class Meth{
	public static void main(String[] args){
/*
int kor=10;
int eng=20;
int mat=20;

System.out.println(Hap(kor,eng,mat));
System.out.println(Avg(Hap(kor,eng,mat),3));

	}


public static int Hap(int k, int e, int m)
	{
	return k+e+m;
	}


public static int Avg(int s,int c)
	{
	return s/c;
	}
*/


Sung ob=new Sung(10,20,30);
System.out.println("HAP="+Sung.Hap());
System.out.println("Average="+ob.Average(3));
}
}
