import { User } from '@/entities/mysql/user'

export type UserLogin = Pick<User, 'username' | 'password'>
