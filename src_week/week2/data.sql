-- sql workbench
-- create schema db1 uft8 unicode_ci;

craete schema db1 uft8 unicode_ci;

-- create table db1.user2 
create table user2 (
	id int auto_increment,
    username varchar(32),
    created_at timestamp default now(),
    primary key (id),
    unique (username)
)

-- insert data
insert into user2 (username) values 
('Thawatchai'), ('diwwergg'), ('dark vanila');


select id, username from user2 order by id desc limit 10;