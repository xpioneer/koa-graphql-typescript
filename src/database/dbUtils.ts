import {
  getManager,
  getRepository,
  ObjectType,
  EntitySchema,
  getMongoManager,
  createQueryBuilder,
  DataSource,
} from "typeorm";


let DataSources: DataSource[] = []
let MongoSource: DataSource = null

export const setDataSource = (dataSources: DataSource[]) => {
  DataSources = dataSources
}

export const setMongoDataSource = (dataSource: DataSource) => {
  MongoSource = dataSource
}

export const useBlogRepository = () => {
  // return DataSources.map(d => d.getRepository)
  return DataSources[0].getRepository
}

export const useSharesRepository = () => {
  return DataSources[1].getRepository
}

export const useMongoRepository = () => {
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
