import java.util.*;

class BaseBall {
	public static void main(String[] args) {
		int com[] = new int[3];
		int user[] = new int[3];
		int strike = 0, ball = 0;

		Random r = new Random();

		for(int i=0; i<3; i++){
			com[i] = r.nextInt(9)+1;

			if(i == 1){
				if(com[i] == com[i-1])
					i--;
			}

			if(i == 2){
				if(com[i] == com[i-1] || com[i] == com[i-2])
					i--;
			}
		}

		Scanner input = new Scanner(System.in);
		int num = 0;

		for(;;){
			strike=0;
			ball=0;

			System.out.print("숫자 3개 입력 : ");
			num = input.nextInt();
			user[0] = num / 100;
			user[1] = (num % 100) / 10;
			user[2] = (num % 100) % 10;
			
			for(int i=0; i<3; i++){
				if(com[i] == user[i])
					strike++;
			}

			if(com[0] == user[1] || com[0] == user[2])
				ball++;

			if(com[1] == user[0] || com[1] == user[2])
				ball++;

			if(com[2] == user[0] || com[2] == user[1])
				ball++;

			if(strike == 3){
				System.out.println("축하합니다.");
				break;
			}
			else if(strike == 0 && ball == 0){
				System.out.println("아웃입니다.");
				System.out.println("입력 결과 : " + user[0] + ", " + user[1] + ", " + user[2]);
				break;
			}
			else{
				System.out.println(strike + "스트라이크 " + ball + "볼 입니다");
				System.out.println("결과 : " + user[0] + ", " + user[1] + ", " + user[2]);
			}

			System.out.println("\n\n");

			System.out.println(com[0] + ", " + com[1] + ", " + com[2]);

		}

	}
}
