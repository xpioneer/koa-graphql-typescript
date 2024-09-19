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


  async getGeographicStatsByCity() {
    const result = await useBlogRepository(SystemLog)
      .createQueryBuilder('s')
      .select('city_name_en', 'name_en')
      .addSelect('latitude')
      .addSelect('longitude')
      .addSelect('count(*)', 'total')
      .andWhere('s.latitude IS NOT NULL')
      .andWhere('s.source = :source', { source: 'v2' })
      .groupBy('name_en')
      .addGroupBy('latitude')
      .addGroupBy('longitude')
      .getRawMany()
    return result
  }

  async getGeographicStatsByChina() {
    const result = await useBlogRepository(SystemLog)
      .createQueryBuilder('s')
      .select('city_name_en', 'name_en')
      .addSelect('latitude')
      .addSelect('longitude')
      .addSelect('count(*)', 'total')
      .andWhere('s.source = :source', { source: 'v2' })
      .andWhere('s.country_name_en = :country', { country: 'China' })
      .groupBy('name_en')
      .addGroupBy('latitude')
      .addGroupBy('longitude')
      .getRawMany()
    return result
  }
}

export default new GeoLogDao