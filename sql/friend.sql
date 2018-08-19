CREATE TABLE `friend` 
( 
`id` int(4) NOT NULL auto_increment,
`my_id` varchar(20) NOT NULL,
`friend_id` varchar(20) NOT NULL,
`status` varchar(20) NOT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;