import { useRedis } from '@/database/dbUtils';
import { randomBytes } from 'crypto';

// const { Guid } = TOOLS;

export class RedisStore {
  private get redis() {
    return useRedis()
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

