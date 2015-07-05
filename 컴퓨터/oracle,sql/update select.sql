update tablea set a='v' where  aa>4



update a set a.end_aprv_ymd = b.end_aprv_ymd
	   from ntttemp a, KLT0220@HIU2 b
		where a.cons_no = b.cons_no





update ntttemp a set a.end_aprv_ymd = b.end_aprv_ymd
	   from  KLT0220@HIU2 b
		where a.cons_no = b.cons_no




update ntttemp a set a.end_aprv_ymd = (select end_aprv_ymd from  KLT0220@HIU2 b where a.cons_no= b.cons_no)