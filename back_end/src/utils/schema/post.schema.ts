import Joi from 'joi'
import { CreatePostDTO } from '../../dto/post.dto'

export const postSchema = Joi.object<CreatePostDTO>({
    content: Joi.string().min(5),
    image: Joi.string().optional().allow(null, ''),
    authorId: Joi.number().integer(),
    mainReplyId: Joi.number().integer().optional(),
})