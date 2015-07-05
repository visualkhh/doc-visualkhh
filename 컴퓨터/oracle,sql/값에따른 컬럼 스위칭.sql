/* Formatted on 2009/11/10 11:26 (Formatter Plus v4.8.8) */

SELECT MAX(CASE WHEN AMR_CH=0 THEN VALUE END) VALUE0
,MAX(CASE WHEN AMR_CH=1 THEN VALUE END) VALUE1
,MAX(CASE WHEN AMR_CH=2 THEN VALUE END) VALUE2
,MAX(CASE WHEN AMR_CH=3 THEN VALUE END) VALUE3
,MAX(CASE WHEN AMR_CH=4 THEN VALUE END) VALUE4
 FROM (
SELECT   b.amr_ch, SUBSTR (b.tx_date, 1, 6), SUM (b.day_use) VALUE
    FROM tr_if_device a JOIN tr_ls_amr_day b ON a.dv_seqno = b.dv_seqno 
   WHERE SUBSTR (b.tx_date, 0, 6) = SUBSTR (20091103, 0, 6) AND a.bd_seqno = 1
GROUP BY b.amr_ch, SUBSTR (b.tx_date, 1, 6)
UNION ALL
SELECT   0 amr, SUBSTR (b.tx_date, 1, 6),
         MAX (b.wtot_sum) - MIN (b.wtot_sum) VALUE
    FROM tr_if_device a JOIN tr_ls_base_hour b ON a.dv_seqno = b.dv_seqno
   WHERE SUBSTR (b.tx_date, 0, 6) = SUBSTR (20091103, 0, 6) AND a.bd_seqno = 1
GROUP BY SUBSTR (b.tx_date, 1, 6)
ORDER BY amr_ch
)









/* Formatted on 2009/11/10 11:26 (Formatter Plus v4.8.8) */

SELECT MAX(CASE WHEN AMR_CH=0 THEN VALUE END) VALUE0
,MAX(CASE WHEN AMR_CH=1 THEN VALUE END) VALUE1
,MAX(CASE WHEN AMR_CH=2 THEN VALUE END) VALUE2
,MAX(CASE WHEN AMR_CH=3 THEN VALUE END) VALUE3
,MAX(CASE WHEN AMR_CH=4 THEN VALUE END) VALUE4
 FROM (
SELECT   b.amr_ch, SUBSTR (b.tx_date, 1, 6), SUM (b.day_use) VALUE
    FROM tr_if_device a JOIN tr_ls_amr_day b ON a.dv_seqno = b.dv_seqno
    JOIN TR_IF_FLOOR C ON C.FL_SEQNO = A.FL_SEQNO
   WHERE SUBSTR (b.tx_date, 0, 6) = SUBSTR (20091103, 0, 6) AND a.bd_seqno = 1 AND C.FL_NUM=0
GROUP BY b.amr_ch, SUBSTR (b.tx_date, 1, 6)
UNION ALL
SELECT   0 amr, SUBSTR (b.tx_date, 1, 6),
         MAX (b.wtot_sum) - MIN (b.wtot_sum) VALUE
    FROM tr_if_device a JOIN tr_ls_base_hour b ON a.dv_seqno = b.dv_seqno
    JOIN TR_IF_FLOOR C ON C.FL_SEQNO = A.FL_SEQNO
   WHERE SUBSTR (b.tx_date, 0, 6) = SUBSTR (20091103, 0, 6) AND a.bd_seqno = 1 AND C.FL_NUM=0
GROUP BY SUBSTR (b.tx_date, 1, 6)
ORDER BY amr_ch
)



