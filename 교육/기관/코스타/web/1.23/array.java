import java.io.*;
class array{
	public static void main(String[] args) throws IOException{

/*
�й�:1	����:5	����:3		int s1[]=new int[3]
�й�:2	����:6	����:5		int s2[]=new int[3]
�й�:3	����:7	����:6		int s3[]=new int[3]
*/
int s1[]=new int[3];
int s2[]=new int[3];
int s3[]=new int[3];
int s[][]=new int[3][3];


//System.out.println(s.length);

		for(int i=0;i<3;i++)
		{
			System.out.println(i+"��°�л�");

			for(int y=0;y<3;y++)
			{
				s[i][y] =System.in.read()-48;

				System.in.skip(2);
			}


		}




		for(int i=0;i<3;i++)
		{
			for(int y=0;y<3;y++)
			{
		
				System.out.print("\t"+s[i][y]);
			
			}

		}



	}
}
