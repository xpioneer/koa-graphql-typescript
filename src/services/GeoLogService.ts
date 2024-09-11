import GeoLogDao from '@/daos/GeoLogDao'
import { Context } from 'koa'
// import { SystemLog } from '@/entities/mysql/systemLog'


class GeoLogService {

  async getEveryDay() {
    return GeoLogDao.getEveryDay()
  }
}

export default new GeoLogService