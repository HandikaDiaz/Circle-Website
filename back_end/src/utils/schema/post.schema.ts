import Joi from 'joi'
import { PostDTO } from '../../dto/post.dto'

export const postSchema = Joi.object<PostDTO>({
    content: Joi.string().min(5)
})