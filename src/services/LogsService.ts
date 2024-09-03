import LogsDao from '../daos/LogsDao'


class LogsService {

  async getStats() {
    const statusCnt = await LogsDao.getStatusCount()
    const pathCnt = await LogsDao.getStatusCount('path')
    return {
      statusCnt,
      pathCnt,
    }
  }
}

export default new LogsService