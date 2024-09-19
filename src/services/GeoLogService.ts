import GeoLogDao from '@/daos/GeoLogDao'
import { Context } from 'koa'
// import { SystemLog } from '@/entities/mysql/systemLog'


class GeoLogService {

  async getEveryDay() {
    return GeoLogDao.getEveryDay()
  }

  async getGeographicStatsByCity() {
    return GeoLogDao.getGeographicStatsByCity()
  }

  async getGeographicStatsByChina() {
    return GeoLogDao.getGeographicStatsByChina()
  }
}

export default new GeoLogService