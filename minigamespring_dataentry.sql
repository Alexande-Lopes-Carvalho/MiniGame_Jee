USE `minigamespring`;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES ('snakeDummy','p');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('raven','nest@gmail.fr','DpFvIrNx87lTjdvoNIvyIw==');
INSERT INTO `user` VALUES ('magpie','corvidae@gmail.fr','DpFvIrNx87lTjdvoNIvyIw==');
INSERT INTO `user` VALUES ('crow','corvus@gmail.fr','DpFvIrNx87lTjdvoNIvyIw==');
INSERT INTO `user` VALUES ('caique','betternest@gmail.fr','N93G9WsgK4xRpjXzqsx4sQ==');
INSERT INTO `user` VALUES ('conure','sun@gmail.fr','N93G9WsgK4xRpjXzqsx4sQ==');
INSERT INTO `user` VALUES ('cockatiel','pikachu@gmail.fr','N93G9WsgK4xRpjXzqsx4sQ==');
INSERT INTO `user` VALUES ('macaw','scarlet@gmail.fr','N93G9WsgK4xRpjXzqsx4sQ==');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('raven');
INSERT INTO `player` VALUES ('magpie');
INSERT INTO `player` VALUES ('crow');
INSERT INTO `player` VALUES ('caique');
INSERT INTO `player` VALUES ('conure');
INSERT INTO `player` VALUES ('cockatiel');
INSERT INTO `player` VALUES ('macaw');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `gamerank` WRITE;
/*!40000 ALTER TABLE `gamerank` DISABLE KEYS */;
INSERT INTO `gamerank` VALUES (1,'raven','snakeDummy',3,6758);
INSERT INTO `gamerank` VALUES (2,'magpie','snakeDummy',4,5000);
INSERT INTO `gamerank` VALUES (3,'crow','snakeDummy',5,10148);
INSERT INTO `gamerank` VALUES (4,'caique','snakeDummy',6,10369);
INSERT INTO `gamerank` VALUES (5,'conure','snakeDummy',7,11198);
INSERT INTO `gamerank` VALUES (6,'cockatiel','snakeDummy',8,9099);
INSERT INTO `gamerank` VALUES (7,'macaw','snakeDummy',9,11678);     /* SI AJOUT AU SUPPRESSION D'ELEMENT DANS GAMERANK IL FAUT CHANGER LE AUTO INCREMENT DANS CREATE TABLE GAMERANK */
/*!40000 ALTER TABLE `gamerank` ENABLE KEYS */;
UNLOCK TABLES;