SELECT   a.table_name, a.constraint_name, a.status, b.column_name,
         a.r_constraint_name, b.POSITION
    FROM user_constraints a, user_cons_columns b
   WHERE a.constraint_type = 'R'
     AND a.constraint_name = b.constraint_name
     AND 
	 a.table_name = UPPER ('YTGENT10')
ORDER BY constraint_name, POSITION;
