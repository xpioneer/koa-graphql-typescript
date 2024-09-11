// import 'reflect-metadata'
import { Entity, Column, PrimaryColumn} from "typeorm";

@Entity('system_log')
export class SystemLog {
  
  @PrimaryColumn({ unique: true })
  id: string // varchar(32) NOT NULL DEFAULT '' COMMENT '主键ID',
  
  @Column()
  request_ip: string // varchar(50) DEFAULT NULL COMMENT 'ipv4',
  
  @Column()
  request_url: string // varchar(2048) DEFAULT NULL COMMENT '请求url',
  
  @Column()
  request_method: string // varchar(10) DEFAULT NULL COMMENT '请求方法',
  
  @Column()
  request_params: string // longtext COMMENT '请求参数',
  
  @Column()
  request_client: string // varchar(500) DEFAULT NULL COMMENT '请求客户端',
  
  @Column()
  client_type: string // varchar(500) DEFAULT NULL COMMENT '客户端类型',
  
  @Column()
  client_version: string // varchar(500) DEFAULT NULL COMMENT '客户端版本',
  
  @Column()
  host: string // varchar(100) DEFAULT NULL COMMENT 'HOST',
  
  @Column()
  hostname: string // varchar(100) DEFAULT NULL COMMENT 'hostname',
  
  @Column()
  origin: string // varchar(100) DEFAULT NULL COMMENT 'URL的来源',
  
  @Column()
  path: string // varchar(1000) DEFAULT NULL COMMENT '请求路径',
  
  @Column()
  request_header: string // varchar(2000) DEFAULT NULL COMMENT '请求头',
  
  @Column()
  protocol: string // varchar(10) DEFAULT NULL COMMENT 'protocol',
  
  @Column()
  status: number // int(11) DEFAULT NULL COMMENT '请求状态',
  
  @Column()
  time: number // int(11) DEFAULT NULL COMMENT '处理时间',
  
  @Column()
  msg: string // varchar(1000) DEFAULT NULL COMMENT '消息',
  
  @Column()
  source: string // varchar(10) DEFAULT NULL COMMENT '来源',
  
  @Column()
  continent_code: string // varchar(20) DEFAULT NULL COMMENT '洲Code',
  
  @Column()
  continent_name_en: string // varchar(50) DEFAULT NULL COMMENT '洲名称-英文',
  
  @Column()
  continent_name_zh: string // varchar(50) DEFAULT NULL COMMENT '洲名称-中文',
  
  @Column()
  continent_geoname_id: number // int(11) DEFAULT NULL COMMENT '洲geoname_id',
  
  @Column()
  country_iso_code: string // varchar(20) DEFAULT NULL COMMENT '国家code',
  
  @Column()
  country_geoname_id: number // int(11) DEFAULT NULL COMMENT '国家geoname_id',
  
  @Column()
  country_name_en: string // varchar(50) DEFAULT NULL COMMENT '国家名称-英文',
  
  @Column()
  country_name_zh: string // varchar(50) DEFAULT NULL COMMENT '国家名称-中文',
  
  @Column()
  subdivisions_iso_code: string // varchar(20) DEFAULT NULL COMMENT '地区code',
  
  @Column()
  subdivisions_geoname_id: number // int(11) DEFAULT NULL COMMENT '地区geoname_id',
  
  @Column()
  subdivisions_name_en: string // varchar(50) DEFAULT NULL COMMENT '地区名称-英文',
  
  @Column()
  subdivisions_name_zh: string // varchar(50) DEFAULT NULL COMMENT '地区名称-中文',
  
  @Column()
  city_geoname_id: number // int(11) DEFAULT NULL,
  
  @Column()
  city_name_en: string // varchar(50) DEFAULT NULL COMMENT '城市名称-英文',
  
  @Column()
  city_name_zh: string // varchar(50) DEFAULT NULL COMMENT '城市名称-中文',
  
  @Column()
  accuracy_radius: number // int(11) DEFAULT NULL COMMENT '精度半径',
  
  @Column()
  latitude: string // varchar(20) DEFAULT NULL COMMENT '纬度',
  
  @Column()
  longitude: string // varchar(20) DEFAULT NULL COMMENT '经度',
  
  @Column()
  metro_code: number // int(11) DEFAULT NULL,
  
  @Column()
  time_zone: string // varchar(50) DEFAULT NULL COMMENT '时区',
  
  @Column()
  created_by: string // varchar(32) DEFAULT NULL,
  
  @Column()
  created_at: number // bigint(20) DEFAULT NULL,
  
  @Column()
  updated_by: string // varchar(32) DEFAULT NULL,
  
  @Column()
  updated_at: number // bigint(20) DEFAULT NULL,
  
  @Column()
  deleted_by: string // varchar(32) DEFAULT NULL,
  
  @Column()
  deleted_at: number // bigint(20) DEFAULT NULL,
  
  @Column()
  version: number // int(11) DEFAULT NULL,

}