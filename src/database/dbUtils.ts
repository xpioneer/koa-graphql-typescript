import {
  DataSource,
  EntityTarget,
} from "typeorm";
import { format } from 'date-fns'
import Redis from 'ioredis'

const checkSrouce = (source: any, name: string) => {
  if(!source) {
    throw new Error(`[${name}] must be used after database connected. throw at ${format(new Date, 'yyyy-MM-dd HH:mm:ss:SSS')}`)
  }
}

let DataSources: DataSource[] = []
let MongoSource: DataSource = null
let RedisSource: Redis = null

export const setDataSource = (dataSources: DataSource[]) => {
  DataSources = dataSources
}

export const setMongoDataSource = (dataSource: DataSource) => {
  MongoSource = dataSource
}

export const setRedisSource = (dataSource: Redis) => {
  RedisSource = dataSource
}
export const useBlogRepository = <Entity>(target: EntityTarget<Entity>) => {
  const BlogDataSource = DataSources[0]
  checkSrouce(BlogDataSource, useBlogRepository.name)
  return BlogDataSource.getRepository(target)
}

export const useSharesRepository = <Entity>(target: EntityTarget<Entity>) => {
  const SharesDataSource = DataSources[1]
  checkSrouce(SharesDataSource, useSharesRepository.name)
  return SharesDataSource.getRepository(target)
}

export const useMongoRepository = <Entity>(target: EntityTarget<Entity>) => {
  checkSrouce(MongoSource, useMongoRepository.name)
  return MongoSource.getMongoRepository(target)
}

export const useRedis = () => {
  checkSrouce(RedisSource, useRedis.name)
  return RedisSource
}

/**
 * blog
 */
export const CONNECT_BLOG = 'Blog'

/**
 * shares
 */
export const CONNECT_SHARES = 'Shares'

/**
 * mongo
 */
export const CONNECT_MONGO = 'Mongo'
