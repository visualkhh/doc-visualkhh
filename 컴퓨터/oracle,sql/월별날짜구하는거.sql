	 /*=============운전일수  GN31==============*/
			  days_01 := 31;  
			  days_02 := TO_NUMBER(TO_CHAR(LAST_DAY(TO_DATE(in_yyyy||'-02-01', 'yyyy-mm-dd')), 'dd'));  
			  days_03 := 31;  
			  days_04 := 30;  
			  days_05 := 31;  
			  days_06 := 30;
		      days_07 := 31;  
			  days_08 := 31;  
			  days_09 := 30;  
			  days_10 := 31;  
			  days_11 := 30;  
			  days_12 := 31;
			  days_B01 :=days_01+days_02+days_03; 
			  days_B02 :=days_04+days_05+days_06;
			  days_B03 :=days_07+days_08+days_09; 
			  days_B04 :=days_10+days_11+days_12;
			  days_T01 :=days_01+days_02+days_03+days_04+days_05+days_06+days_07+days_08+days_09+days_10+days_11+days_12;
	