create table board(
	seq number primary key,
	title varchar2(100),
	writer varchar2(100),
	contents varchar2(2000),
	regdate DATE,
	hitcount number
);

create sequence board_seq;

create table admin(
	mem_id varchar2(50),
	mem_name varchar2(50)
);

insert into admin values('aaa', 'bbb');
