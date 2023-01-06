# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.22)
# Database: Shares
# Generation Time: 2023-01-06 07:11:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table gj_trade
# ------------------------------------------------------------

DROP TABLE IF EXISTS `gj_trade`;

CREATE TABLE `gj_trade` (
  `id` varchar(32) NOT NULL DEFAULT '' COMMENT '主键',
  `tradeAt` bigint(20) DEFAULT NULL COMMENT '交易时间',
  `amount` int(11) DEFAULT NULL COMMENT '交易数量',
  `price` decimal(11,4) DEFAULT NULL COMMENT '交易价格(单位元)',
  `total` decimal(11,4) DEFAULT NULL COMMENT '交易金额(单位元)',
  `code` int(11) DEFAULT NULL COMMENT '代码',
  `position` int(11) DEFAULT NULL COMMENT '持有股数',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `direction` smallint(11) DEFAULT NULL COMMENT '交易方向',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `createAt` bigint(20) DEFAULT NULL,
  `createBy` varchar(32) DEFAULT NULL,
  `updateAt` bigint(20) DEFAULT NULL,
  `updateBy` varchar(32) DEFAULT NULL,
  `deleteAt` bigint(20) DEFAULT NULL,
  `deleteBy` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table stock_history_new
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stock_history_new`;

CREATE TABLE `stock_history_new` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增',
  `stockId` int(11) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL COMMENT '交易时间',
  `volume` bigint(20) DEFAULT NULL COMMENT '交易量',
  `open` decimal(10,4) DEFAULT NULL COMMENT '开盘价',
  `high` decimal(10,4) DEFAULT NULL COMMENT '最高',
  `low` decimal(10,4) DEFAULT NULL COMMENT '最低',
  `close` decimal(10,4) DEFAULT NULL COMMENT '收盘价',
  `chg` decimal(10,4) DEFAULT NULL COMMENT '涨跌价',
  `percent` float DEFAULT NULL COMMENT '涨跌幅',
  `turnoverrate` float DEFAULT NULL COMMENT '换手率',
  `amount` decimal(16,4) DEFAULT NULL COMMENT '成交额',
  `volume_post` bigint(20) DEFAULT NULL COMMENT 'volume_post',
  `amount_post` bigint(20) DEFAULT NULL COMMENT 'amount_post',
  `pe` float DEFAULT NULL COMMENT '市盈率(TTM)',
  `pb` float DEFAULT NULL COMMENT '市净率',
  `ps` float DEFAULT NULL COMMENT '市销率',
  `pcf` float DEFAULT NULL COMMENT 'pcf',
  `market_capital` float DEFAULT NULL COMMENT '总市值',
  `balance` float DEFAULT NULL COMMENT 'balance',
  `hold_volume_cn` bigint(20) DEFAULT NULL COMMENT 'hold_volume_cn',
  `hold_ratio_cn` float DEFAULT NULL COMMENT 'hold_ratio_cn',
  `net_volume_cn` bigint(20) DEFAULT NULL COMMENT 'net_volume_cn',
  `hold_volume_hk` bigint(20) DEFAULT NULL COMMENT 'hold_volume_hk',
  `hold_ratio_hk` float DEFAULT NULL COMMENT 'hold_ratio_hk',
  `net_volume_hk` bigint(20) DEFAULT NULL COMMENT 'net_volume_hk',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table stocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stocks`;

CREATE TABLE `stocks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增',
  `uuid` varchar(32) DEFAULT NULL,
  `code` varchar(8) DEFAULT NULL COMMENT '股票代码',
  `name` varchar(20) DEFAULT NULL COMMENT '股票名称',
  `market` int(11) DEFAULT NULL COMMENT '市场',
  `block` int(11) DEFAULT NULL COMMENT '板块',
  `amount` int(11) DEFAULT NULL COMMENT '单手交易数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
