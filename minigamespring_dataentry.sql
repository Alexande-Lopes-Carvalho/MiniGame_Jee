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
INSERT INTO `user` VALUES ('caique','betternest@gmail.fr','N93G9WsgK4xRpjXzqsx4sQ==');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('raven');
INSERT INTO `player` VALUES ('caique');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;