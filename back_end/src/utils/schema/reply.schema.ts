import Joi from 'joi'
import { ReplyDTO } from '../../dto/reply.dto'

export const replySchema = Joi.object<ReplyDTO>({
    content: Joi.string().min(5),
    image: Joi.string(),
    postId: Joi.number().integer(),
})