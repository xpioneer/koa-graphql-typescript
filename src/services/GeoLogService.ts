import GeoLogDao from '@/daos/GeoLogDao'
import { Context } from 'koa'
// import { SystemLog } from '@/entities/mysql/systemLog'


class GeoLogService {

  async getEveryDay() {
    return GeoLogDao.getEveryDay()
  }

  async getGeographicStats() {
    return GeoLogDao.getGeographicStats()
  }
}

export default new GeoLogService