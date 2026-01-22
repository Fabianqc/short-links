-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: short-link
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `eventlink`
--

DROP TABLE IF EXISTS `eventlink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventlink` (
  `idEventLink` binary(16) NOT NULL,
  `ShortLinks_idShortLinks` binary(16) NOT NULL,
  `EventLinks` enum('CREATED','UPDATED','DELETED') NOT NULL,
  `Description` varchar(255) NOT NULL,
  PRIMARY KEY (`idEventLink`,`ShortLinks_idShortLinks`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventlink`
--

LOCK TABLES `eventlink` WRITE;
/*!40000 ALTER TABLE `eventlink` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventlink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventusersession`
--

DROP TABLE IF EXISTS `eventusersession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventusersession` (
  `idEventUserSession` binary(16) NOT NULL,
  `Users_idUsers` binary(16) NOT NULL,
  `Event` enum('LOGIN_SUCCESS','LOGIN_FAILED','LOGOUT','SESSION_REFRESH','PASSWORD_RESET_REQUEST','PASSWORD_RESET_SUCCESS') NOT NULL,
  `EventTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idEventUserSession`,`Users_idUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventusersession`
--

LOCK TABLES `eventusersession` WRITE;
/*!40000 ALTER TABLE `eventusersession` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventusersession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shortlinks`
--

DROP TABLE IF EXISTS `shortlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shortlinks` (
  `idShortLinks` binary(16) NOT NULL,
  `OriginalLink` text NOT NULL,
  `ShortLink` varchar(45) NOT NULL,
  `CreateTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idShortLinks`),
  UNIQUE KEY `ShortLink_UNIQUE` (`ShortLink`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shortlinks`
--

LOCK TABLES `shortlinks` WRITE;
/*!40000 ALTER TABLE `shortlinks` DISABLE KEYS */;
/*!40000 ALTER TABLE `shortlinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `IdStatistics` binary(16) NOT NULL,
  `ShortLinks_idShortLinks` binary(16) NOT NULL,
  `HourTimestamp` timestamp NOT NULL,
  `ClicksCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdStatistics`,`ShortLinks_idShortLinks`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUsers` binary(16) NOT NULL,
  `User` varchar(255) DEFAULT 'null',
  `PassHash` binary(64) DEFAULT NULL,
  `IdGoogle` varchar(255) DEFAULT 'null',
  `Email` varchar(255) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsers`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `User_UNIQUE` (`User`),
  UNIQUE KEY `IdGoogle_UNIQUE` (`IdGoogle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_shortlinks`
--

DROP TABLE IF EXISTS `users_has_shortlinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_has_shortlinks` (
  `Users_idUsers` binary(16) NOT NULL,
  `ShortLinks_idShortLinks` binary(16) NOT NULL,
  PRIMARY KEY (`Users_idUsers`,`ShortLinks_idShortLinks`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_shortlinks`
--

LOCK TABLES `users_has_shortlinks` WRITE;
/*!40000 ALTER TABLE `users_has_shortlinks` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_has_shortlinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'short-link'
--

--
-- Dumping routines for database 'short-link'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 21:08:08
