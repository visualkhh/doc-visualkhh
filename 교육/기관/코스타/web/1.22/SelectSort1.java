class SelectSort1{
	public static void main(String[] args){

int [] data={5,8,7,8,5,6,3,6,7,3,5,6,4,1,1,0,-2,-1,9,8};



System.out.println("변경전 \n");		


		for(int i=0;i<data.length;i++)
		{
		
System.out.print(data[i]+"\t");		

		}


System.out.println("\n");		


		for(int i=0;i<data.length-1;i++)
		{
		
			for(int y=i+1;y<data.length;y++)
			{
				if(data[i]>data[y])
				{
					int temp =data[y];
					data[y]=data[i];
					data[i]=temp;
				}
			}


		}


System.out.println("변경후 \n");		

		for(int i=0;i<data.length;i++)
		{

		
	
System.out.print(data[i]+"\t");		

		}





//////////////////////////////////////
System.out.print("\n\n");		

int [] data2={2,7,5,4,8,1,6};

		for(int i=0;i<data2.length;i++)
		{

		
	
System.out.print(data2[i]+"\t");		

		}



int temp=0;int te=0;




int arlong=data2.length-1;

//System.out.print(arlong);	

		for(int i=0,ii=0;i<data2.length-1;i++)
		{



System.out.println("\n 아이변경"+i);
			for(int y=ii+1;y<data2.length;y++)
			{

				if (data2[ii]<data2[y])
				{
					temp=y;
					ii=y;

						System.out.println("\n 템프아이변경"+ii);
						System.out.println("\n 안쪽템프"+temp);

				}


			}
te=data2[arlong];

data2[arlong]=data2[temp];

data2[temp]=te;


arlong--;

ii++;

				
				
	
		

	}



System.out.print("\n\n\n");	

		for(int i=0;i<data2.length;i++)
		{

		
	
System.out.print(data2[i]+"\t");		




		}







	}
}
