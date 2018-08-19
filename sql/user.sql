CREATE TABLE `user` 
( 
`id` int(4) NOT NULL auto_increment,
`loginId` varchar(20) NOT NULL, 
`name` varchar(20) NOT NULL, 
`password` varchar(20) NOT NULL, 
PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;