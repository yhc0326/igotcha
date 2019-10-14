-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: igotcha
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `img` varchar(9999) DEFAULT NULL,
  `about` varchar(9999) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'Planet Coaster','https://upload.wikimedia.org/wikipedia/en/6/60/Planet_coaster_box.png','Surprise, delight and thrill crowds as you build the theme park of your dreams. Build and design incredible coaster parks with unparalleled attention to detail and manage your park in a truly living world.'),(2,'The Long Dark','https://production-gameflipusercontent.fingershock.com/us-east-1:a08f4406-851e-458d-a09e-440c03374fdb/a047272e-1e85-43a0-a92b-6bfa1c6311d6/0843cf54-4f2a-4bf4-8a96-c8d49362e3b5','Bright lights flare across the night sky. The wind rages outside the thin walls of your wooden cabin. A wolf howls in the distance. You look at the meagre supplies in your pack, and wish for the days before the power mysteriously went out. How much longer will you survive?'),(3,'Tera','https://i.ytimg.com/vi/9auvPj2qA_c/maxresdefault.jpg','TERA is at the forefront of a new breed of MMO. With True Action Combat - aim, dodge, and time your attacks for intense and rewarding tactical combat. Add the deep social experience of a MMO to best-in-class action combat mechanics for a unique blend of both genres. Play now for free!');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_type` (
  `type` varchar(45) NOT NULL,
  `desc` varchar(255) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES ('op','operations team member'),('player','player');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` varchar(45) NOT NULL,
  `pw` varchar(45) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_type_fk1_idx` (`type`),
  CONSTRAINT `user_type_fk1` FOREIGN KEY (`type`) REFERENCES `user_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('asdasd','asdasd','asd','asd','player'),('HeechanIsBack','12341234','Heechan2','Kim2','op'),('HeyYou','password','Hey','You','op'),('operator1','operator1','Heechan','Yang','op'),('operator2','operator2','Jane','Doe','op'),('player','player','player','player','player'),('player1','player1','Heechan','Kim','player'),('player2','player2','John','Doe','player'),('player3','player3','New','Person','player'),('TEST','TESTTEST','TEST','TEST','player'),('yhc0326@gmail.com','password','Kim','Kim','op'),('yhc3489@hanmail.net','password','I am','me','player');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `download`
--

DROP TABLE IF EXISTS `download`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `download` (
  `user_id` varchar(45) NOT NULL,
  `game_id` int(11) NOT NULL,
  `review` varchar(999) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `review_date` date DEFAULT NULL,
  `review_time` time DEFAULT NULL,
  PRIMARY KEY (`user_id`,`game_id`),
  KEY `game_id_fk1_idx` (`game_id`),
  CONSTRAINT `game_id_fk1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `user_id_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `download`
--

LOCK TABLES `download` WRITE;
/*!40000 ALTER TABLE `download` DISABLE KEYS */;
INSERT INTO `download` VALUES ('asdasd',1,NULL,NULL,NULL,NULL),('asdasd',2,NULL,NULL,NULL,NULL),('asdasd',3,NULL,NULL,NULL,NULL),('player1',1,'Awesome theme parks!',5,'2019-10-11','18:40:46'),('player1',2,'Wolves!!!!',4,'2019-10-10','19:16:56'),('player1',3,NULL,NULL,NULL,NULL),('player2',1,NULL,NULL,NULL,NULL),('player2',2,'I like this game too!',5,'2019-10-12','18:18:22'),('player3',1,'Great',3,'2019-10-12','14:00:00'),('player3',2,'Amazing game!',4,'2019-10-13','18:35:06'),('player3',3,NULL,NULL,NULL,NULL),('TEST',1,NULL,NULL,NULL,NULL),('TEST',2,'I like it!',5,'2019-10-13','19:56:08'),('TEST',3,'Good Game',4,'2019-10-13','19:56:38'),('yhc3489@hanmail.net',1,'Good, I wanna play this everyday but I can\'t.',3,'2019-10-13','19:06:11');
/*!40000 ALTER TABLE `download` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-13 20:52:30
