import { randomBytes } from 'crypto';
import * as Redis from 'ioredis';
import { RedisConf } from '../../../conf/db.conf'

// const { Guid } = TOOLS;

export class RedisStore {
  private redis: Redis.Redis
  
  constructor() {
    this.redis = new Redis(RedisConf);
    this.redis.connect(() => {
      console.log('redis start...')
    })
  }

  private getID(length: number): string {
    return randomBytes(length).toString('hex');
  }

  public async get(sid: string): Promise<any> {
    let data = await this.redis.get(sid);
    return JSON.parse(data);
  }
 
  public async set(obj: any, { sid =  this.getID(32), maxAge }: any = {}): Promise<string> {
    try {
      await this.redis.set(sid, JSON.stringify(obj), 'PX', maxAge)
    } catch (e) {}
    return sid;
  }

  public async destroy(sid: string): Promise<void> {
    await this.redis.del(sid);
  }

  public async checkLogin(userId: string): Promise<string> {
    const sid = await this.redis.get(userId);
    if (sid) await this.destroy(sid);
    return sid;
  }
}

export default new RedisStore;
