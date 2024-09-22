import { Request, Response } from 'express'
import userService from '../services/user-service'
import { updateUserSchema } from '../utils/schema/user.schema';

class userController {
    async update(req: Request, res: Response) {
        const userId = parseInt(req.params.id)
        const value = await updateUserSchema.validateAsync(req.body)
        const user = await userService.updateUser(userId, value)
        res.json(user);
    }
}

export default new userController()