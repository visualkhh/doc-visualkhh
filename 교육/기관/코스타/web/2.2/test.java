class top
{

int i=77;

}


class left extends top
{
int left;

		
		left()
		{

			i=1;
		}

}

class right extends top
{
int right;

	right()
	{
		i=2;
	}
}



class test{
	public static void main(String[] args){
		System.out.println("Hello World!");


		top t=new left();
		System.out.println(t.i);

		t=new right();
		System.out.println(t.i);

				t=new top();
				System.out.println(t.i);
	}
}
