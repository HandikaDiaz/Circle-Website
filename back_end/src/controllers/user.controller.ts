import { Request, Response } from 'express'
import userService from '../services/user-service'
import { updateUserSchema } from '../utils/schema/user.schema';

class userController {
    async update(req: Request, res: Response) {
        const value = await updateUserSchema.validateAsync(req.body)
        const user = await userService.updateUser(value)
        res.json(user);
    }
}

export default new userController()