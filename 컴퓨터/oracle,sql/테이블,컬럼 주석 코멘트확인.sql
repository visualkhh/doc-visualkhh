select * from ntt1000;

--���̺� �ּ��ޱ� 
comment on table table1 is 'ccccc';

--�÷� �ּ��ޱ�
comment on column table1.aa is 'ccccccc';


--table comment  Ȯ��
select * from ALL_COL_COMMENTS where table_name='NTT1000';