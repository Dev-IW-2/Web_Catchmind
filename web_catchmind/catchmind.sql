-- --------------------------------------------------------
-- 호스트:                          localhost
-- 서버 버전:                        5.5.44 - MySQL Community Server (GPL)
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- catchmind 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `catchmind` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `catchmind`;


-- 테이블 catchmind.avatar 구조 내보내기
CREATE TABLE IF NOT EXISTS `avatar` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `link` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- 테이블 데이터 catchmind.avatar:~11 rows (대략적) 내보내기
/*!40000 ALTER TABLE `avatar` DISABLE KEYS */;
REPLACE INTO `avatar` (`idx`, `name`, `link`) VALUES
	(1, '알타룽', 'alta'),
	(2, '완란룽', 'wanran'),
	(3, '양파룽', 'yangpa'),
	(4, '반란룽', 'banran'),
	(5, '김치룽', 'kimchi'),
	(6, '주무룽', 'zumu'),
	(7, '양야룽', 'yangya'),
	(8, '버섯룽', 'mushroom'),
	(9, '토마토룽', 'tomato'),
	(10, '똥군룽', 'ddong'),
	(11, '또라이', 'haemin');
/*!40000 ALTER TABLE `avatar` ENABLE KEYS */;


-- 테이블 catchmind.rank 구조 내보내기
CREATE TABLE IF NOT EXISTS `rank` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `rank` varchar(10) NOT NULL DEFAULT '0',
  `limit_point` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- 테이블 데이터 catchmind.rank:~5 rows (대략적) 내보내기
/*!40000 ALTER TABLE `rank` DISABLE KEYS */;
REPLACE INTO `rank` (`idx`, `rank`, `limit_point`) VALUES
	(1, 'F', 50),
	(2, 'D', 150),
	(3, 'C', 500),
	(4, 'B', 1000),
	(5, 'A', 2000);
/*!40000 ALTER TABLE `rank` ENABLE KEYS */;


-- 테이블 catchmind.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(30) NOT NULL,
  `upw` varchar(200) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `avatar_idx` smallint(6) NOT NULL DEFAULT '1',
  `point` int(11) NOT NULL DEFAULT '0',
  `rank_idx` smallint(6) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- 테이블 데이터 catchmind.user:~18 rows (대략적) 내보내기
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`idx`, `uid`, `upw`, `nickname`, `avatar_idx`, `point`, `rank_idx`) VALUES
	(5, 'admin000', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'hong', 11, 1012, 5),
	(6, 'admin001', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'admin1', 1, 1028, 5),
	(7, 'admin002', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'admin0', 9, 967, 4),
	(8, 'admin004', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'admin2', 1, 8, 1),
	(9, 'admin005', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'admin5', 1, 254, 2),
	(10, 'admin010', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'am010', 10, 745, 4),
	(11, 'ghkdto89', 'cc68c71129d3f66df38f36a212a753814ffc8c1b5496e2ffb3893b29892e637e', 'hw', 6, 303, 3),
	(12, 'jihye0204', '6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918', 'ch', 11, 303, 3),
	(13, 'netma123', 'f4afea9a401e67bbfeb88c0e77eb70d3b490a41b229cb3bd87a20c11efdaffbd', 'odelo', 11, 357, 3),
	(14, 'yoonji10', '3fa228c32c4630f2810bef24e1c0b1b6308661fc72c8fb6d1affaca6bc34a748', 'jjocomi', 4, 223, 3),
	(15, 'aaaaaaaa', 'd4232f2b32252218f4cb7d68c3921710f13f26ddcebf722862af7169081bc968', 'aaa', 1, 344, 3),
	(16, 'admin006', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'adm06', 1, 0, 1),
	(17, 'admin007', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'adm07', 1, 0, 1),
	(18, 'admin008', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'adm08', 1, 0, 1),
	(19, 'dahy2122', '42a057c8f405a53ebf3e861e84f1ca895af85f6fce9e6f83791c7ab99350c6b6', 'Daehye', 6, 11, 1),
	(20, 'bokyung115', '260c56d282a3fc62049cbd8c86d1ee4c0bc253544b7f04cd07c3e68ead705b13', 'bogang', 8, 0, 1),
	(21, 'media0115', '260c56d282a3fc62049cbd8c86d1ee4c0bc253544b7f04cd07c3e68ead705b13', 'abcdef', 8, 9, 1),
	(22, 'abc123123', 'efa2a77528f5d155530a8994aa3244a08c509f15060ebbce73cf9b75ea6937d0', 'jiyoon', 1, 30, 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
