import Joi from 'joi'
import { UpdateUserDTO } from '../../dto/user.dto'

export const updateUserSchema = Joi.object<UpdateUserDTO>({
    fullName: Joi.string().min(3).max(100),
    userName: Joi.string().min(3).max(100),
    bio: Joi.string().min(3).max(100),
    image: Joi.string().optional().allow(null, ''),
    background: Joi.string().optional().allow(null, ''),
})