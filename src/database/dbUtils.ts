import {
  getManager,
  getRepository,
  ObjectType,
  EntitySchema,
  getMongoManager,
  createQueryBuilder,
  DataSource,
  EntityTarget,
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

export const useBlogRepository = <Entity>(target: EntityTarget<Entity>) => {
  const BlogDataSource = DataSources[0]
  if(BlogDataSource === undefined) {
    throw setError(useBlogRepository.name);
  }
  return BlogDataSource.getRepository(target)
}

export const useSharesRepository = <Entity>(target: EntityTarget<Entity>) => {
  const SharesDataSource = DataSources[1]
  if(SharesDataSource === undefined) {
    throw setError(useSharesRepository.name);
  }
  return SharesDataSource.getRepository(target)
}

export const useMongoRepository = <Entity>(target: EntityTarget<Entity>) => {
  if(!MongoSource) {
    throw setError(useMongoRepository.name);
  }
  return MongoSource.getMongoRepository(target)
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
