import UserDao from '../daos/UserDao'


class UserService {

  async getById(id: string) {
    const user = await UserDao.getById(id)
    return user
  }

  async getByUsername(username: string) {
    const user = await UserDao.getByUsername(username)
    return user
  }

  async getByIds(ids: string[]) {
    const users = await UserDao.getByIds(ids)
    return users
  }

  async save(args: any) {
    // 
  }
}

export default new UserService