# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.22)
# Database: Blog
# Generation Time: 2023-01-06 05:57:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table article
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` varchar(32) NOT NULL DEFAULT '' COMMENT '主键ID',
  `typeId` varchar(32) DEFAULT '' COMMENT '类型ID',
  `title` varchar(100) DEFAULT '' COMMENT '标题',
  `tag` varchar(100) DEFAULT '' COMMENT '标签',
  `isTop` smallint(1) DEFAULT '0' COMMENT '是否置顶',
  `abstract` varchar(200) DEFAULT '' COMMENT '摘要',
  `pics` varchar(100) DEFAULT '' COMMENT '图片',
  `description` longtext COMMENT '文章内容',
  `praise` int(11) DEFAULT '0' COMMENT '赞',
  `contempt` int(11) DEFAULT NULL COMMENT '鄙视',
  `viewCount` int(11) DEFAULT NULL COMMENT '浏览数',
  `createdBy` varchar(32) NOT NULL DEFAULT '' COMMENT '创建者',
  `createdAt` bigint(20) NOT NULL COMMENT '创建时间',
  `updatedBy` varchar(32) NOT NULL DEFAULT '' COMMENT '修改者',
  `updatedAt` bigint(20) NOT NULL COMMENT '修改时间',
  `user_id` varchar(32) DEFAULT NULL COMMENT '用户ID',
  `isOriginal` bit(1) DEFAULT NULL COMMENT '是否原创',
  `deletedBy` varchar(32) DEFAULT NULL COMMENT '删除者',
  `deletedAt` bigint(20) DEFAULT NULL COMMENT '删除时间',
  `version` int(11) NOT NULL DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table articleTag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articleTag`;

CREATE TABLE `articleTag` (
  `id` varchar(32) NOT NULL DEFAULT '' COMMENT 'ID',
  `articleId` varchar(32) DEFAULT NULL,
  `tagId` varchar(32) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `createdBy` varchar(32) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `updatedBy` varchar(32) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `deletedBy` varchar(32) DEFAULT NULL,
  `version` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table articleType
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articleType`;

CREATE TABLE `articleType` (
  `id` varchar(32) NOT NULL DEFAULT '' COMMENT '主键ID',
  `name` varchar(50) DEFAULT '',
  `remark` varchar(100) DEFAULT '',
  `front_back` varchar(10) DEFAULT NULL COMMENT '前端/后端',
  `createdBy` varchar(32) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedBy` varchar(32) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedBy` varchar(32) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `version` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` varchar(32) NOT NULL DEFAULT '' COMMENT '评论主键',
  `parentId` varchar(32) DEFAULT NULL COMMENT '评论父ID',
  `articleId` varchar(32) DEFAULT NULL COMMENT '文章ID',
  `description` varchar(500) DEFAULT NULL COMMENT '评论内容',
  `ip` varchar(18) DEFAULT '0.0.0.0' COMMENT '客户端请求ip',
  `client` varchar(200) DEFAULT NULL COMMENT '客户端类型',
  `url` varchar(100) DEFAULT '' COMMENT 'url',
  `isAuthor` bit(1) DEFAULT NULL COMMENT '是否是作者',
  `createdBy` varchar(32) DEFAULT NULL COMMENT '评论者ID',
  `createdAt` bigint(20) DEFAULT NULL,
  `createdAt1` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedBy` varchar(32) DEFAULT NULL COMMENT '修改时间',
  `updatedAt` bigint(20) DEFAULT NULL,
  `updatedAt1` datetime DEFAULT NULL COMMENT '修改时间',
  `deletedBy` varchar(32) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `deletedAt1` datetime DEFAULT NULL,
  `version` int(11) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table doubleColorBall
# ------------------------------------------------------------

DROP TABLE IF EXISTS `doubleColorBall`;

CREATE TABLE `doubleColorBall` (
  `id` varchar(32) NOT NULL DEFAULT '' COMMENT 'ID',
  `issue` varchar(20) NOT NULL DEFAULT '' COMMENT '期数',
  `red1` int(11) NOT NULL,
  `red2` int(11) NOT NULL,
  `red3` int(11) NOT NULL,
  `red4` int(11) NOT NULL,
  `red5` int(11) NOT NULL,
  `red6` int(11) NOT NULL,
  `blue` int(11) NOT NULL,
  `happySun` varchar(20) DEFAULT NULL COMMENT '快乐星期天',
  `pool` bigint(20) DEFAULT NULL COMMENT '奖金池',
  `prizeOne` int(11) DEFAULT NULL COMMENT '一等奖',
  `prizeOneNum` int(11) DEFAULT NULL COMMENT '一等奖注数',
  `prizeTwo` int(11) DEFAULT NULL COMMENT '二等奖',
  `prizeTwoNum` int(11) DEFAULT NULL COMMENT '二等奖注数',
  `bettingNum` int(11) DEFAULT NULL COMMENT '投注总金额',
  `drawDate` bigint(20) DEFAULT NULL COMMENT '开奖日期',
  `createdBy` varchar(32) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedBy` varchar(32) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedBy` varchar(32) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table leaveMessage
# ------------------------------------------------------------

DROP TABLE IF EXISTS `leaveMessage`;

CREATE TABLE `leaveMessage` (
  `id` varchar(32) NOT NULL COMMENT '主键ID',
  `parentId` varchar(32) NOT NULL DEFAULT '0' COMMENT '父级ID',
  `description` varchar(500) DEFAULT NULL COMMENT '留言内容',
  `ip` varchar(50) DEFAULT NULL,
  `createdBy` varchar(32) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `created_at` datetime DEFAULT NULL,
  `updatedBy` varchar(32) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL COMMENT '修改时间',
  `updated_at` datetime DEFAULT NULL,
  `deletedBy` varchar(32) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table system_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `system_log`;

CREATE TABLE `system_log` (
  `id` varchar(32) NOT NULL DEFAULT '' COMMENT '主键ID',
  `request_ip` varchar(50) DEFAULT NULL COMMENT 'ipv4',
  `request_url` varchar(2048) DEFAULT NULL COMMENT '请求url',
  `request_method` varchar(10) DEFAULT NULL COMMENT '请求方法',
  `request_params` longtext COMMENT '请求参数',
  `request_client` varchar(500) DEFAULT NULL COMMENT '请求客户端',
  `client_type` varchar(500) DEFAULT NULL COMMENT '客户端类型',
  `client_version` varchar(500) DEFAULT NULL COMMENT '客户端版本',
  `host` varchar(100) DEFAULT NULL COMMENT 'HOST',
  `hostname` varchar(100) DEFAULT NULL COMMENT 'hostname',
  `origin` varchar(100) DEFAULT NULL COMMENT 'URL的来源',
  `path` varchar(1000) DEFAULT NULL COMMENT '请求路径',
  `request_header` varchar(2000) DEFAULT NULL COMMENT '请求头',
  `protocol` varchar(10) DEFAULT NULL COMMENT 'protocol',
  `status` int(11) DEFAULT NULL COMMENT '请求状态',
  `time` int(11) DEFAULT NULL COMMENT '处理时间',
  `msg` varchar(1000) DEFAULT NULL COMMENT '消息',
  `source` varchar(10) DEFAULT NULL COMMENT '来源',
  `continent_code` varchar(20) DEFAULT NULL COMMENT '洲Code',
  `continent_name_en` varchar(50) DEFAULT NULL COMMENT '洲名称-英文',
  `continent_name_zh` varchar(50) DEFAULT NULL COMMENT '洲名称-中文',
  `continent_geoname_id` int(11) DEFAULT NULL COMMENT '洲geoname_id',
  `country_iso_code` varchar(20) DEFAULT NULL COMMENT '国家code',
  `country_geoname_id` int(11) DEFAULT NULL COMMENT '国家geoname_id',
  `country_name_en` varchar(50) DEFAULT NULL COMMENT '国家名称-英文',
  `country_name_zh` varchar(50) DEFAULT NULL COMMENT '国家名称-中文',
  `subdivisions_iso_code` varchar(20) DEFAULT NULL COMMENT '地区code',
  `subdivisions_geoname_id` int(11) DEFAULT NULL COMMENT '地区geoname_id',
  `subdivisions_name_en` varchar(50) DEFAULT NULL COMMENT '地区名称-英文',
  `subdivisions_name_zh` varchar(50) DEFAULT NULL COMMENT '地区名称-中文',
  `city_geoname_id` int(11) DEFAULT NULL,
  `city_name_en` varchar(50) DEFAULT NULL COMMENT '城市名称-英文',
  `city_name_zh` varchar(50) DEFAULT NULL COMMENT '城市名称-中文',
  `accuracy_radius` int(11) DEFAULT NULL COMMENT '精度半径',
  `latitude` varchar(20) DEFAULT NULL COMMENT '纬度',
  `longitude` varchar(20) DEFAULT NULL COMMENT '经度',
  `metro_code` int(11) DEFAULT NULL,
  `time_zone` varchar(50) DEFAULT NULL COMMENT '时区',
  `created_by` varchar(32) DEFAULT NULL,
  `created_at` bigint(20) DEFAULT NULL,
  `updated_by` varchar(32) DEFAULT NULL,
  `updated_at` bigint(20) DEFAULT NULL,
  `deleted_by` varchar(32) DEFAULT NULL,
  `deleted_at` bigint(20) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` varchar(32) NOT NULL DEFAULT '' COMMENT '主键ID',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '标签名',
  `tagType` int(11) DEFAULT '0' COMMENT '0:系统标签，1:用户自定义标签',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `createdBy` varchar(32) NOT NULL DEFAULT '' COMMENT '创建者',
  `createdAt` bigint(20) NOT NULL COMMENT '创建时间',
  `created_at` datetime DEFAULT NULL,
  `updatedBy` varchar(32) NOT NULL DEFAULT '',
  `updatedAt` bigint(20) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deletedBy` varchar(32) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `version` bigint(20) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` varchar(32) NOT NULL COMMENT '主键(UserID)',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名(登录名)',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `nickName` varchar(50) DEFAULT NULL COMMENT '昵称',
  `sex` int(9) DEFAULT '0' COMMENT '性别',
  `userType` int(9) DEFAULT NULL COMMENT '用户类型',
  `userResource` varchar(100) DEFAULT NULL COMMENT '用户来源',
  `remark` varchar(200) DEFAULT NULL,
  `createdBy` varchar(32) DEFAULT NULL COMMENT '创建者',
  `createdAt` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `updatedBy` varchar(32) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedBy` varchar(32) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
