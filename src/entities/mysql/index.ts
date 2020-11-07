import { Article } from './article'
import { ArticleType } from './articleType'
import { Comment } from './comment'
import { User } from './user'
import { Tag } from './tag'
import { LeaveMessage } from './leaveMessage'
import { Balls } from './balls'
import { ShareEntities } from './shares/shareEntites'

export const Entities:any[] = [
  Article,
  ArticleType,
  Comment,
  User,
  Tag,
  LeaveMessage,
  Balls
]

export {
  ShareEntities
}