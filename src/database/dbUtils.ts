import {getManager, getRepository, ObjectType, EntitySchema, getMongoManager, createQueryBuilder} from "typeorm";

type TConnectName = 'Blog' | 'Shares' | 'Mongo'

/**
 * blog
 */
export const CONNECT_BLOG: TConnectName = 'Blog'

/**
 * shares
 */
export const CONNECT_SHARES: TConnectName = 'Shares'

/**
 * mongo
 */
export const CONNECT_MONGO: TConnectName = 'Mongo'

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
