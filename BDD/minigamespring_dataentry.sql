USE `minigamespring`;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES ('snakeDummy','p');
INSERT INTO `game` VALUES ('FlappyBird','m');
INSERT INTO `game` VALUES ('snack','s');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('raven','nest@gmail.fr','bird');
INSERT INTO `user` VALUES ('caique','betternest@gmail.fr','parrot');
INSERT INTO `user` VALUES ('liluzi','liluz@gmail.com','uzip38');
INSERT INTO `user` VALUES ('alix','@allixgmail.com','alix001');
INSERT INTO `user` VALUES ('cedric','ced@gmail.com','cedric001');
INSERT INTO `user` VALUES ('michel','michelm@gmail.com','michel01');
INSERT INTO `user` VALUES ('jiji','jmas@gmail.com','jijimas');
INSERT INTO `user` VALUES ('tournesol','tournesolLol@gmail.com','lol');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('raven');
INSERT INTO `player` VALUES ('caique');
INSERT INTO `player` VALUES ('liluzi');
INSERT INTO `player` VALUES ('alix');
INSERT INTO `player` VALUES ('cedric');
INSERT INTO `player` VALUES ('michel');
INSERT INTO `player` VALUES ('jiji');
INSERT INTO `player` VALUES ('tournesol');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `gamerank` WRITE;
/*!40000 ALTER TABLE `gamerank` DISABLE KEYS */;
INSERT INTO `gamerank` VALUES ('1','raven','snakeDummy','14','14500');
INSERT INTO `gamerank` VALUES ('2','caique','snakeDummy','50''45000');
INSERT INTO `gamerank` VALUES ('3','liluzi','snakeDummy','12','13500');
INSERT INTO `gamerank` VALUES ('4','alix','snakeDummy','8','1100');
INSERT INTO `gamerank` VALUES ('5','cedric','snakeDummy','5','10000');
INSERT INTO `gamerank` VALUES ('6','michel','snakeDummy','12','11590');
INSERT INTO `gamerank` VALUES ('7','jiji','snakeDummy','12','11450');
INSERT INTO `gamerank` VALUES ('8','tournesol','snakeDummy','2','2500');
INSERT INTO `gamerank` VALUES ('9','raven','FlappyBird','27','29400');
INSERT INTO `gamerank` VALUES ('10','michel','FlappyBird','19','15500');
/*INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('1','raven','snakeDummy','14','14500','1') ;
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('2','caique','snakeDummy','50','45000','1');
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('3','liluzi','snakeDummy','12','13500','1');
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('4','alix','snakeDummy','8','1100','1');
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('5','cedric','snakeDummy','5','10000','1');
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('6','michel','snakeDummy','12','11590','1');
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('7','jiji','snakeDummy','12','11450','1');
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('8','tournesol','snakeDummy','2','2500','1');
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('9','raven','FlappyBird','27','29400','1');
INSERT INTO `gamerank` ('idgamerank', 'gamename', 'score', 'time', 'positionclassement') VALUES ('10','michel','FlappyBird','19','15500','1');*/
/*!40000 ALTER TABLE `gamerank` ENABLE KEYS */;
UNLOCK TABLES;







