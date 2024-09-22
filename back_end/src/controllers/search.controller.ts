import { Request, Response } from 'express';
import { searchService } from '../services/search-service';

export const searchController = async (req: Request, res: Response) => {
    const { query } = req.query
    const user = await searchService(query as string)
    res.json(user)
}