import java.io.*;
class SelectionSort2{
	public static void main(String[] args) throws IOException{
		System.out.println("Hello World!");

		int data[]={45,34,45,456,56,5,2};

	int maxIndex;
	

		for(int i=0;i<data.length;i++)
		{
			System.out.print(data[i]+"\t");
		}



			System.out.print("\n\n선택정렬후\n\n");

			for(int i=6; i>0; i--)
			{
				maxIndex=i;

				for(int j =maxIndex-1;j>=0;j--)
				{
					if(data[maxIndex]<data[j])
						maxIndex=j;
				}

			if(i !=maxIndex)
				{
				int k=data[i];
				data[i]=data[maxIndex];
				data[maxIndex]=k;
				}



			}




		for(int i=0;i<data.length;i++)
		{
			System.out.print(data[i]+"\t");
		}


	}
}
