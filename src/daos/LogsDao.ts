import { Context } from 'koa'
import M from '@/entities/mongo'
import {
  useMongoRepository,
} from '@/database/dbUtils';

const { API, Errors } = M


class LogsDao {

  async getStatusCount(field = 'status') {
    const pipeline: any[] = [{
      $group: {
        _id: `$${field}`,
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0, // 排除原始的 _id 字段
        name: "$_id", // 将 _id 重命名为 name
        count: 1 // 保留 count 字段
      }
    }]
    const apiCnt = await useMongoRepository(API).aggregate(pipeline).toArray()
    const errCnt = await useMongoRepository(Errors).aggregate(pipeline).toArray()

    return {
      apiCnt,
      errCnt,
    }
  }
}

export default new LogsDao