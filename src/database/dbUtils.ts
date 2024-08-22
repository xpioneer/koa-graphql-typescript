import {
  getManager,
  getRepository,
  ObjectType,
  EntitySchema,
  getMongoManager,
  createQueryBuilder,
  DataSource,
} from "typeorm";
import { format } from 'date-fns'

const setError = (name: string) => {
  return new Error(`[${name}] must be used after database connected. throw at ${format(new Date, 'yyyy-MM-dd HH:mm:ss:SSS')}`)
}

let DataSources: DataSource[] = []
let MongoSource: DataSource = null

export const setDataSource = (dataSources: DataSource[]) => {
  DataSources = dataSources
}

export const setMongoDataSource = (dataSource: DataSource) => {
  MongoSource = dataSource
}

export const useBlogRepository = () => {
  const BlogDataSource = DataSources[0]
  if(BlogDataSource === undefined) {
    throw setError(useBlogRepository.name);
  }
  // return DataSources.map(d => d.getRepository)
  return BlogDataSource.getRepository
}

export const useSharesRepository = () => {
  const SharesDataSource = DataSources[0]
  if(SharesDataSource === undefined) {
    throw setError(useSharesRepository.name);
  }
  return SharesDataSource.getRepository
}

export const useMongoRepository = () => {
  console.log(Date.now(), 'mongo>>>>', MongoSource, useMongoRepository.name)
  if(!MongoSource) {
    throw setError(useMongoRepository.name);
  }
  return MongoSource.getMongoRepository
}

/**
 * blog
 */
export const CONNECT_BLOG: string = 'Blog'

/**
 * shares
 */
export const CONNECT_SHARES: string = 'Shares'

/**
 * mongo
 */
export const CONNECT_MONGO: string = 'Mongo'

/**
 * blog manager
 */
export const getBlogManager = () => getManager(CONNECT_BLOG)

/**
 * get blog entity
 * @param entity entityClass
 */
export const getBlogRepository = <Entity>(entity: ObjectType<Entity> | EntitySchema<Entity> | string) => getRepository(entity, CONNECT_BLOG)


/**
 * shares manager
 */
export const getSharesManager = () => getManager(CONNECT_SHARES)

/**
 * get shares entity
 * @param entity entityClass
 */
export const getSharesRepository = <Entity>(entity: ObjectType<Entity> | EntitySchema<Entity> | string) => getRepository(entity, CONNECT_SHARES)


export const createSharesQueryBuilder = <Entity>(entity: ObjectType<Entity> | string, alias = 'queryBuilder') => createQueryBuilder(entity, alias, CONNECT_SHARES)
