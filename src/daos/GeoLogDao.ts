import { SystemLog } from '@/entities/mysql/systemLog'
import {
  useBlogRepository,
} from '@/database/dbUtils';

// const { API, Errors } = M


class GeoLogDao {

  async getEveryDay() {
    // const sql = `
    //   SELECT DATE(FROM_UNIXTIME(s.created_at/1000)) as d, count(s.id) total
    //   FROM system_log s
    //   GROUP BY d;`
    const result = await useBlogRepository(SystemLog)
      .createQueryBuilder('s')
      .select('DATE(FROM_UNIXTIME(s.created_at/1000))', 'd')
      .addSelect('count(s.id)', 'total')
      .groupBy('d')
      .orderBy('d', 'ASC')
      .getRawMany()
    return result
  }


  async getGeographicStats() {
    const result = await useBlogRepository(SystemLog)
      .createQueryBuilder('s')
      .select('city_name_en', 'city_en')
      .addSelect('latitude')
      .addSelect('longitude')
      .addSelect('count(*)', 'total')
      .groupBy('city_en')
      .addGroupBy('latitude')
      .addGroupBy('longitude')
      .getRawMany()
    return result
  }
}

export default new GeoLogDao